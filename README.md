# Borussia Baudienstleistungen: Website mit Terminbuchung

Website für Borussia Baudienstleistungen, einen Trockenbau- und Innenausbaubetrieb im Großraum Berlin und Brandenburg. Kern ist eine
Terminanfrage, die echte freie Zeiten aus dem Google Kalender anzeigt, den gewählten
Slot sofort sperrt und nach der Freigabe durch den Betrieb automatisch eine
Bestätigungsmail an den Kunden schickt.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS · Google Calendar API · Resend

---

## Wie die Terminbuchung funktioniert

```
Kunde wählt Slot
   │
   ▼
POST /api/bookings
   ├─ Freebusy-Abfrage: ist der Slot (inkl. Fahrzeitpuffer) noch frei?
   ├─ Kalendereintrag als "tentative" anlegen  →  Slot ist ab jetzt gesperrt
   ├─ Mail an den Betrieb mit signierten Links "Bestätigen" / "Absagen"
   └─ Eingangsbestätigung an den Kunden
   │
   ▼
Betrieb klickt in der Mail
   │
   ▼
/api/bookings/decision
   ├─ Zusage  →  Event auf "confirmed"  +  automatische Bestätigungsmail
   └─ Absage  →  Event gelöscht (Slot wieder frei)  +  Absagemail mit Link auf neue Termine
```

### Zwei Entwurfsentscheidungen, die den Unterschied machen

**Der Google Kalender ist die einzige Datenquelle.** Es gibt bewusst keine zusätzliche
Datenbank. Anfragen liegen als vorgemerkte (`tentative`) Termine im Kalender. Dadurch
kann nichts auseinanderlaufen, es gibt keine Doppelbuchung im Zeitfenster zwischen
Anfrage und Zusage, und der Betrieb sieht Anfragen direkt in der gewohnten Kalender-App
– auch auf dem Handy auf der Baustelle.

**Die Freigabe-Links sind signiert, und der Klick allein bestätigt nichts.** Die Links
tragen eine HMAC-Signatur (`BOOKING_TOKEN_SECRET`) und laufen nach 14 Tagen ab.
Der Aufruf zeigt zunächst nur eine Seite mit einem Button; erst dessen Absenden
verändert etwas. Grund: Viele Mailclients und Sicherheitsscanner rufen Links in
E-Mails automatisch ab – ein Link, der direkt bestätigt, würde dadurch Termine ohne
Zutun zusagen.

---

## Einrichtung

### 1. Projekt starten

```bash
npm install
cp .env.example .env.local   # Werte eintragen, siehe unten
npm run dev
```

### 2. Google Kalender anbinden

1. In der [Google Cloud Console](https://console.cloud.google.com) ein Projekt anlegen
   und die **Google Calendar API** aktivieren.
2. Unter *IAM & Verwaltung → Dienstkonten* ein Dienstkonto erstellen und einen
   **JSON-Schlüssel** herunterladen.
3. In Google Kalender den Zielkalender öffnen → *Einstellungen → Für bestimmte Personen
   freigeben* → die E-Mail-Adresse des Dienstkontos eintragen, Berechtigung
   **„Änderungen an Terminen vornehmen"**.
4. Aus der JSON-Datei `client_email` und `private_key` in die `.env.local` übertragen.

> Diese Freigabe-Variante funktioniert mit privaten Google-Konten und mit Workspace.
> Domain-weite Delegation wird nicht gebraucht.

### 3. E-Mail-Versand einrichten

1. Konto bei [Resend](https://resend.com) anlegen.
2. Absenderdomain verifizieren (SPF- und DKIM-Einträge im DNS). **Ohne verifizierte
   Domain landen Bestätigungsmails im Spam** – dieser Schritt ist nicht optional.
3. API-Key erzeugen und in die `.env.local` eintragen.

### 4. Signaturschlüssel erzeugen

```bash
openssl rand -base64 32
```

Ergebnis als `BOOKING_TOKEN_SECRET` eintragen. Ändert sich dieser Wert, werden alle
bereits verschickten Freigabe-Links ungültig.

### 5. Deployment (Vercel)

Repository in Vercel importieren, alle Variablen aus `.env.example` unter
*Settings → Environment Variables* hinterlegen, `NEXT_PUBLIC_SITE_URL` auf die echte
Domain setzen. Ohne diese Variable zeigen die Links in den E-Mails ins Leere.

---

## Was vor dem Livegang angepasst werden muss

Alle inhaltlichen Platzhalter sind im Code mit `[PLATZHALTER]` markiert.

| Datei | Inhalt |
|---|---|
| `src/config/site.ts` | Firmenname, Adresse, Telefon, Registerdaten, Öffnungszeiten, Einsatzgebiet, Terminarten, buchbare Zeiten |
| `src/content/projects.ts` | Referenzprojekte |
| `src/app/jobs/page.tsx` | Offene Stellen und Benefits |
| `src/app/impressum/page.tsx` | Pflichtangaben nach § 5 DDG |
| `src/app/datenschutz/page.tsx` | Datenschutzhinweise |
| `src/components/visual.tsx` | Platzhaltergrafiken durch echte Fotos (`next/image`) ersetzen |

**Rechtstexte:** Impressum und Datenschutzerklärung sind fachlich vorbereitete Gerüste,
die die tatsächlich implementierten Verarbeitungen beschreiben. Sie ersetzen keine
Rechtsberatung und sollten vor dem Livegang geprüft werden.

---

## Buchungsverhalten anpassen

Alles in `src/config/site.ts`:

- **`bookingWindows`** – an welchen Wochentagen zu welchen Zeiten überhaupt Termine
  angeboten werden (0 = Sonntag … 6 = Samstag).
- **`appointmentTypes`** – Terminarten mit `durationMinutes` und `bufferMinutes`.
  Der Puffer wird beidseitig auf den Termin aufgeschlagen und bildet die Fahrzeit ab.
  Bei 60 Minuten Termin und 45 Minuten Puffer braucht es also 150 Minuten freien
  Kalender, damit ein Slot angeboten wird.
- **`bookingRules.minLeadTimeHours`** – wie kurzfristig gebucht werden darf.
- **`bookingRules.bookingHorizonDays`** – wie weit der Kalender in die Zukunft öffnet.
- **`serviceZones`** – PLZ-Präfixe je Einsatzzone. Die längste Übereinstimmung gewinnt,
  damit z. B. `14467` (Potsdam) im Umland landet und nicht in der Brandenburg-Sammelzone.

---

## Tests

```bash
npm test        # Slot-Berechnung, Zeitzonen, Zonen-Matching, Token-Signatur
npm run build   # Produktions-Build
npx tsc --noEmit
```

Die Prüfungen in `scripts/check-booking-logic.ts` laufen ohne Google- oder Mail-Zugang
und decken die Fälle ab, die im Betrieb wehtun: Sommer-/Winterzeitwechsel,
Fahrzeitpuffer, Vorlaufzeit, Wochenendsperre und manipulierte Freigabe-Links.

---

## Schutz der Formulare

- Honeypot-Feld in allen drei Formularen (für Menschen unsichtbar)
- Rate-Limit pro IP: 5 Anfragen pro Stunde und Formular
- Serverseitige Validierung mit Zod, unabhängig von der Browser-Prüfung
- Erneute Verfügbarkeitsprüfung beim Absenden (Antwort 409, falls der Slot
  zwischenzeitlich vergeben wurde)

Das Rate-Limit liegt im Arbeitsspeicher. Für einen Handwerksbetrieb reicht das; bei
mehreren Serverinstanzen gehört an diese Stelle Upstash Redis
(`src/lib/rate-limit.ts`).
