function showObj(){
  alert({id: 5, text: 'example'})
}

function showToString(){
  alert({id: 5, text: 'example', toString: function() {
    return `${this.id}: ${this.text}`;
  }})
}