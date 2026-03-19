#!/bin/bash
cd /Users/gauthyeh/Documents/Perso/timoun-web/timoun-front/public/resources || exit
find . -type f -print0 | while IFS= read -r -d $'\\0' file; do
  dirname=$(dirname "$file")
  filename=$(basename "$file")
  new_filename=$(echo "$filename" | iconv -f UTF-8 -t ASCII//TRANSLIT | tr '[:upper:]' '[:lower:]' | tr -c 'a-z0-9.' '-' | sed -e 's/--/-/g' -e 's/^-//' -e 's/-$//')
  if [ "$filename" != "$new_filename" ]; then
    mv -v "$file" "$dirname/$new_filename"
  fi
done
