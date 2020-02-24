#!/usr/bin/env bash

echo -n "Input a post URL: "
read postURL
ymd=$(date "+%Y/%-m/%-d")
postDirectory="./src/posts/"${ymd}
imageDirectory="./src/images/"${ymd}
date=$(date "+%Y-%m-%d %H:%M:%S %z")
frontmatter="---\ntitle: \"\"\npublished: \""${date}"\"\nupdated: \""${date}"\"\nfeaturedImage: \"../../../../images/${ymd}/${postURL}-featured.jpg\"\n---"
mkdir -p ${postDirectory}
mkdir -p ${imageDirectory}
echo -e ${frontmatter} > ${postDirectory}/${postURL}.md
