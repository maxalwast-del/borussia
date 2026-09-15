#!/bin/bash
# SessionStart-Hook: stellt die Arbeitsumgebung fuer Claude Code auf dem Web her.
#
# Der Remote-Container wird nach Inaktivitaet recycelt und startet mit einem
# frischen Klon ohne node_modules und ohne die Agent-Skills. Beides wird hier
# wiederhergestellt, damit Build, Linter und Tests sofort laufen.
#
# Idempotent und nicht-interaktiv; mehrfaches Ausfuehren ist unschaedlich.
set -euo pipefail

# Lokal ist die Umgebung bereits eingerichtet - nur im Remote-Container laufen.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}"

# 1. npm-Abhaengigkeiten. Bewusst `npm install` statt `npm ci`: der
#    Container-Zustand wird nach dem Hook gecacht, und install nutzt den
#    vorhandenen node_modules-Baum, statt ihn jedes Mal zu loeschen.
echo "[session-start] npm install"
npm install --no-audit --no-fund

# 2. Agent-Skills aus skills-lock.json wiederherstellen. Die Skill-Dateien
#    liegen unter .agents/ und sind absichtlich nicht im Repository
#    (siehe .gitignore); getrackt ist nur das Lockfile mit Quelle und Hash.
#    Fehlschlaege hier duerfen den Hook nicht abbrechen - ohne Skills laesst
#    sich weiterarbeiten, ohne node_modules nicht.
if [ -f skills-lock.json ]; then
  echo "[session-start] Skills aus skills-lock.json wiederherstellen"
  npx --yes skills experimental_install \
    || echo "[session-start] WARNUNG: Skill-Wiederherstellung fehlgeschlagen, wird uebersprungen"

  # `experimental_install` befuellt nur .agents/skills/ und legt den Symlink
  # unter .claude/skills/ nicht wieder an - genau dort liest Claude Code aber
  # seine Skills. Ohne diesen Schritt waere jedes Skill nach einem
  # Container-Neustart unsichtbar. `ln -sfn` ist idempotent.
  if [ -d .agents/skills ]; then
    mkdir -p .claude/skills
    for skill_dir in .agents/skills/*/; do
      [ -d "$skill_dir" ] || continue
      skill_name=$(basename "$skill_dir")
      ln -sfn "../../.agents/skills/$skill_name" ".claude/skills/$skill_name"
      echo "[session-start] Skill verlinkt: $skill_name"
    done
  fi
fi

echo "[session-start] fertig"
