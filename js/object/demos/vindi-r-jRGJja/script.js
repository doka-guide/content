let cat = {
  name: 'Tomas',
  age: 10,
}
console.log(Object.keys(cat));
delete cat.age;
console.log(Object.keys(cat));