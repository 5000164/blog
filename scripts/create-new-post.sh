#!/usr/bin/env bash

echo -n "Input a post URL: "
read postURL
postDirectory="./src/posts/"$(date "+%Y/%-m/%-d")
date=$(date "+%Y-%m-%d %H:%M:%S %z")
frontmatter="---\ntitle: \"\"\npublished: \""${date}"\"\nupdated: \""${date}"\"\n---"
mkdir -p ${postDirectory}
echo -e ${frontmatter} > ${postDirectory}/${postURL}.md
