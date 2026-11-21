MONTH_TO_ENG() {
case "$1" in
    01) echo "December" ;;
    02) echo "January" ;;
    03) echo "February" ;;
    04) echo "March" ;;
    05) echo "April" ;;
    06) echo "May" ;;
    07) echo "June" ;;
    08) echo "July" ;;
    09) echo "August" ;;
    10) echo "September" ;;
    11) echo "October" ;;
    12) echo "November" ;;
esac
}

MONTH_TO_RUS() {
case "$1" in
    01) echo "декабрь" ;;
    02) echo "январь" ;;
    03) echo "февраль" ;;
    04) echo "март" ;;
    05) echo "апрель" ;;
    06) echo "май" ;;
    07) echo "июнь" ;;
    08) echo "июль" ;;
    09) echo "август" ;;
    10) echo "сентябрь" ;;
    11) echo "октябрь" ;;
    12) echo "ноябрь" ;;
esac
}

CURRENT_MONTH=$(date -u +"%m")
CURRENT_YEAR=$(date -u +"%Y")
SHORT_YEAR=$(date -u +"%y")
# Релиз подводит итог прошлого месяца, поэтому в январе это декабрь
# прошлого года. Скрипт запускается через `sh` (dash), поэтому `[`, а не `[[`:
# с `[[` условие молча не срабатывало, и 1 января 2026 вышел v.0.26
# «December 2026» вместо v.12.25 «December 2025».
RELEASE_MONTH="$((${CURRENT_MONTH#0} - 1))"
if [ "$CURRENT_MONTH" = "01" ]; then
  RELEASE_MONTH=12
  CURRENT_YEAR="$((CURRENT_YEAR - 1))"
  SHORT_YEAR="$(printf '%02d' "$((${SHORT_YEAR#0} - 1))")"
fi

TAG="v.$RELEASE_MONTH.$SHORT_YEAR"
TITLE="$(MONTH_TO_ENG $CURRENT_MONTH) $CURRENT_YEAR ($TAG)"

SUBTITLE_OLD_1="## What's Changed"
SUBTITLE_OLD_2="## New Contributors"
SUBTITLE_OLD_3="Full Changelog"

SUBTITLE_NEW_1="## Ченджлог ($(MONTH_TO_RUS $CURRENT_MONTH) $CURRENT_YEAR)"
SUBTITLE_NEW_2="## Новые контрибьюторы"
SUBTITLE_NEW_3="Весь ченджлог"

gh repo set-default doka-guide/content
gh release create "$TAG" --title="$TITLE" --generate-notes
gh release view --repo=github.com/doka-guide/content >> auto-notes.md
sed -E 's/\* /- /g' auto-notes.md | sed -E 's/'"$SUBTITLE_OLD_1"'/'"$SUBTITLE_NEW_1"'/' | sed -E 's/'"$SUBTITLE_OLD_2"'/'"$SUBTITLE_NEW_2"'/' | sed -E 's/'"$SUBTITLE_OLD_3"'/'"$SUBTITLE_NEW_3"'/' > notes.md
gh release edit "$TAG" --notes-file notes.md
