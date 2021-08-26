let cat = {
  name: 'Tom',
  play() {
    console.log('I am playing cat!');
  },
  say(word) {
    console.log('I say: '+word);
  }
}

console.log('cat name: '+ cat.name);
cat.play();
cat.say('mew-mew');
