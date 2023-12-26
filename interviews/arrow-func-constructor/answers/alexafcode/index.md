
В чём плюс использования стрелочных функций для методов в конструкторе?

Основным плюсом использования стрелочных функций для методов в конструкторе, является то, что this будет установлено во время создания функции и this не будет изменяться.
Cледовательно, когда конструктор используется для создания нового объекта, this всегда будет ссылаться на этот объект.

   ```js
   const Person = function (firstName) {
     this.firstName = firstName;
     this.sayName1 = function () {
       console.log(this.firstName);
     };
     this.sayName2 = () => {
       console.log(this.firstName);
     };
   };

   const ivan = new Person('Ivan');
   const petr = new Person('Petr');

   ivan.sayName1.call(petr); // Petr (потому что 'this' сейчас ссылается на объект petr)
   ivan.sayName2.call(petr); // Ivan (стрелочная функция не меняет контекст)
   ```
