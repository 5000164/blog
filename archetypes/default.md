+++
title = "{{ replace .TranslationBaseName "-" " " | title }}"
date = {{ .Date }}
url = "{{ dateFormat "2006-01" .Date }}-"
+++

## {{ replace .TranslationBaseName "-" " " | title }}
