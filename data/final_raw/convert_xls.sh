for i in xls/*.xls; do libreoffice --headless --convert-to csv "$i" ; done
