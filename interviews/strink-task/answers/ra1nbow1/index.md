Значение этого выражения в JavaScript будет <!-- yaspeller ignore:start -->"искат ьтакси"<!-- yaspeller ignore:end -->. Почему?

1. Вызов "искать такси".split('') разделяет строку на массив символов: <!-- yaspeller ignore:start -->"и", "с", "к", "а", "т", "ь", " ", "т", "а", "к", "с", "и"<!-- yaspeller ignore:end -->.
2. Вызов reverse() переворачивает порядок элементов в массиве: <!-- yaspeller ignore:start -->"и", "с", "к", "а", "т", " ", "ь", "т", "а", "к", "с", "и"<!-- yaspeller ignore:end -->.
3. Вызов join('') объединяет элементы массива в строку, используя пустую строку в качестве разделителя: <!-- yaspeller ignore:start -->"искат ьтакси"<!-- yaspeller ignore:end -->.
