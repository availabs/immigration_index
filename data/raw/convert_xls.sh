for i   in */*/*.xlsx; do  libreoffice --headless --convert-to csv "$i" ; done
