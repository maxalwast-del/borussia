/**
 * Prüfungen der Buchungslogik ohne externe Dienste.
 * Ausführen mit: npm test
 */
import { buildSlotsForDay, isSlotStillAvailable } from '@/lib/slots';
import { berlinWallClockToUtc, formatBerlinDateTime } from '@/lib/time';
import { matchZone } from '@/lib/zones';
import { signDecision, verifyDecision } from '@/lib/tokens';

let failures = 0;
function check(name: string, condition: boolean, extra = '') {
  console.log(`${condition ? 'PASS' : 'FAIL'}  ${name}${extra ? ' – ' + extra : ''}`);
  if (!condition) failures++;
}

// --- Zeitzone -------------------------------------------------------------
// 15. Juli = Sommerzeit (UTC+2), 15. Januar = Winterzeit (UTC+1)
const summer = berlinWallClockToUtc(2026, 7, 15, 9, 0);
const winter = berlinWallClockToUtc(2026, 1, 15, 9, 0);
check('Sommerzeit: 09:00 Berlin = 07:00 UTC', summer.toISOString() === '2026-07-15T07:00:00.000Z', summer.toISOString());
check('Winterzeit: 09:00 Berlin = 08:00 UTC', winter.toISOString() === '2026-01-15T08:00:00.000Z', winter.toISOString());

// --- Slots ----------------------------------------------------------------
const now = berlinWallClockToUtc(2026, 7, 6, 8, 0); // Montag
const wednesday = '2026-07-08';

const free = buildSlotsForDay(wednesday, 'aufmass', [], now);
check('Mittwoch hat freie Slots', free.length > 0, `${free.length} Slots, erster ${free[0]?.label}`);
check('Erster Slot ist 07:30', free[0]?.label === '07:30', free[0]?.label ?? '-');
check('Letzter Slot endet spätestens 16:00', new Date(free[free.length - 1].end) <= berlinWallClockToUtc(2026, 7, 8, 16, 0));

const sunday = buildSlotsForDay('2026-07-12', 'aufmass', [], now);
check('Sonntag ist nicht buchbar', sunday.length === 0);

const friday = buildSlotsForDay('2026-07-10', 'aufmass', [], now);
check('Freitag endet früher', new Date(friday[friday.length - 1].end) <= berlinWallClockToUtc(2026, 7, 10, 13, 0));

// Vorlaufzeit: Dienstag 07:30 liegt weniger als 24 h nach "jetzt" (Mo 08:00)
const tuesday = buildSlotsForDay('2026-07-07', 'aufmass', [], now);
check('Vorlaufzeit greift', tuesday.every((s) => new Date(s.start).getTime() >= now.getTime() + 24 * 3600_000), `erster ${tuesday[0]?.label}`);

// Puffer: Termin 10:00–11:00 belegt, aufmass hat 45 min Puffer beidseitig
const busy = [{ start: berlinWallClockToUtc(2026, 7, 8, 10, 0), end: berlinWallClockToUtc(2026, 7, 8, 11, 0) }];
const guarded = buildSlotsForDay(wednesday, 'aufmass', busy, now);
const labels = guarded.map((s) => s.label);
check('Belegter Slot 10:00 entfernt', !labels.includes('10:00'));
check('Puffer davor greift (09:30 entfernt)', !labels.includes('09:30'));
check('Puffer danach greift (11:00 entfernt)', !labels.includes('11:00'));
check('08:00 bleibt frei', labels.includes('08:00'), labels.slice(0, 4).join(', '));

// Race-Condition-Prüfung
check('isSlotStillAvailable: freier Slot ok', isSlotStillAvailable(free[0].start, 'aufmass', [], now));
check('isSlotStillAvailable: belegter Slot abgelehnt',
  !isSlotStillAvailable(berlinWallClockToUtc(2026, 7, 8, 10, 0).toISOString(), 'aufmass', busy, now));

// Kürzerer Termin mit kleinerem Puffer -> mehr Slots
const phone = buildSlotsForDay(wednesday, 'telefon', [], now);
check('Telefontermin bietet mehr Slots als Aufmaß', phone.length > free.length, `${phone.length} vs ${free.length}`);

// --- Zonen ----------------------------------------------------------------
check('10115 -> Berlin', matchZone('10115').id === 'kern');
check('14467 Potsdam -> Umland (längstes Präfix gewinnt)', matchZone('14467').id === 'umland', matchZone('14467').label);
check('15234 Frankfurt/Oder -> Brandenburg', matchZone('15234').id === 'brandenburg');
check('80331 München -> außerhalb', matchZone('80331').id === 'outside');

// --- Tokens ---------------------------------------------------------------
process.env.BOOKING_TOKEN_SECRET = 'x'.repeat(40);
const token = signDecision({ eventId: 'abc123', action: 'accept', expiresAt: Math.floor(Date.now() / 1000) + 600 });
check('Token verifiziert', verifyDecision(token)?.eventId === 'abc123');
check('Manipuliertes Token abgelehnt', verifyDecision(token.slice(0, -2) + 'zz') === null);
const expired = signDecision({ eventId: 'abc', action: 'accept', expiresAt: Math.floor(Date.now() / 1000) - 10 });
check('Abgelaufenes Token abgelehnt', verifyDecision(expired) === null);

console.log(`\n${failures === 0 ? 'Alle Prüfungen bestanden.' : failures + ' Prüfung(en) fehlgeschlagen.'}`);
process.exit(failures === 0 ? 0 : 1);
