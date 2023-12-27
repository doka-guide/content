GENERATE_FONT() {
  for i in "${!SUBSETNAMES[@]}"; do
    for j in "${!FORMATS[@]}"; do
      for k in "${!FILENAMES[@]}"; do
        INPUT="$INPUTPATH/${FILENAMES[k]}-subset.${FORMATS[j]}"
        OUTPUT="$OUTPUTPATH/${FILENAMES[k]}-${SUBSETNAMES[i]}.${FORMATS[j]}"
        echo "----------------\n$INPUT -> $OUTPUT\n----------------\n"
        glyphhanger --whitelist="${SUBSETCODES[i]}" --formats="${FORMATS[j]}" --subset="$INPUTPATH/${FILENAMES[k]}.$EXTENSION" --css
        mv $(echo "$INPUT") $(echo "$OUTPUT")
      done
    done
  done
}

# Глобальные переменные
# Набор названий для сабсетов
SUBSETNAMES=("Latin" "LatinSupplement" "LatinExtendedA" "LatinExtendedB" "GreekCoptic" "Cyrilic" "CyrilicSupplement")

# Набор диапозонов кодов глифов для каждого из сабсетов
SUBSETCODES=("0000−007F" "0080−00FF" "0100−017F" "0180−024F" "0370−03FF" "0400−04FF" "0500−052F")
FORMATS=("woff" "woff2")

# Набор значений переменных для шрифта FiraSans
FILENAMES=("FiraSans-Black" "FiraSans-BlackItalic" "FiraSans-Bold" "FiraSans-BoldItalic" "FiraSans-ExtraBold" "FiraSans-ExtraBoldItalic" "FiraSans-ExtraLight" "FiraSans-LightItalic" "FiraSans-Italic" "FiraSans-Light" "FiraSans-LightItalic" "FiraSans-Medium" "FiraSans-MediumItalic" "FiraSans-Regular" "FiraSans-SemiBold" "FiraSans-SemiBoldItalic" "FiraSans-Thin" "FiraSans-ThinItalic")
EXTENSION="ttf"
INPUTPATH="./service/fonts/Fira-Sans"
OUTPUTPATH="./src/fonts/Fira-Sans"
GENERATE_FONT

# Набор значений переменных для шрифта FiraCode
FILENAMES=("FiraCode-Bold" "FiraCode-Light" "FiraCode-Medium" "FiraCode-Regular" "FiraCode-SemiBold")
EXTENSION="ttf"
INPUTPATH="./service/fonts/Fira-Code"
OUTPUTPATH="./src/fonts/Fira-Code"
GENERATE_FONT

# Набор значений переменных для шрифта FiraMath
FILENAMES=("FiraMath-Regular")
EXTENSION="otf"
INPUTPATH="./service/fonts/Fira-Math"
OUTPUTPATH="./src/fonts/Fira-Math"
GENERATE_FONT
