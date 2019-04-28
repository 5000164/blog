#!/usr/bin/env bash

echo -n "Input a post URL: "
read postURL
postDirectory="./src/posts/"$(date "+%Y/%-m/%-d")
frontmatter="---\ntitle: \"\"\ndate: \""$(date "+%Y-%m-%d %H:%M:%S %z")"\"\n---"
mkdir -p ${postDirectory}
echo -e ${frontmatter} > ${postDirectory}/${postURL}.md
