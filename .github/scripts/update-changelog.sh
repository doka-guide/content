git fetch origin ${{ github.base_ref }}
git diff --name-status origin/${{ github.base_ref }} HEAD | grep '^A' | grep -E '^(html|css|js|tools|a11y|recipies)/.*/$' > added_dirs.txt

month_to_rus() {
  case "$1" in
    01) echo "января" ;;
    02) echo "февраля" ;;
    03) echo "марта" ;;
    04) echo "апреля" ;;
    05) echo "мая" ;;
    06) echo "июня" ;;
    07) echo "июля" ;;
    08) echo "августа" ;;
    09) echo "сентября" ;;
    10) echo "октября" ;;
    11) echo "ноября" ;;
    12) echo "декабря" ;;
  esac
}

merge_date=$(date -u +"%d %m")
day=$(echo $merge_date | cut -d ' ' -f 1)
month=$(echo $merge_date | cut -d ' ' -f 2)
rus_month=$(month_to_rus $month)
formatted_date="${day} ${rus_month}"

if [ -s added_dirs.txt ]; then
  while IFS= read -r dir; do
    path=${dir%/*}
    new_folder="${dir##*/}"
    if [ -f "${path}/${new_folder}/index.md" ]; then
      title=$(sed -n 's/^title: \(.*\)/\1/p' "${path}/${new_folder}/index.md")
      authors=$(sed -n 's/^authors: \[?\(.*\)\]?/\\1/p' "${path}/${new_folder}/index.md")
      author_links=()
      IFS=',' read -ra ADDR <<< "$authors"
      for author in "${ADDR[@]}"; do
        trimmed_author=$(echo $author | xargs)
        if [ -d "people/$trimmed_author" ] && [ -f "people/$trimmed_author/index.md" ]; then
          author_name=$(sed -n 's/^name: \(.*\)/\1/p' "people/$trimmed_author/index.md")
          author_links+=("[${author_name}](https://doka.guide/people/${trimmed_author}/)")
        else
          author_links+=("[${trimmed_author}](https://doka.guide/people/${trimmed_author}/)")
        fi
      done
      authors_string=$(IFS=, ; echo "${author_links[*]}")
      echo "- ${formatted_date}, [${title}](https://doka.guide/${path#*/}/${new_folder}/), ${authors_string}" >> CHANGELOG.new.md
    fi
  done < added_dirs.txt
  git config --local user.email "<hi@doka.guide>"
  git config --local user.name "Doka Dog"
  git add CHANGELOG.md
  git commit -m "Обновляет CHANGELOG"
  git push
fi
