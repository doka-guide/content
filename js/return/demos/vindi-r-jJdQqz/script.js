function isInteger(value) {
    if ((undefined === value) || (null === value)) {
        return false;
    }
    return value % 2 == 0;
}
function runExample1(){
  document.querySelector('#example1').textContent = isInteger(document.querySelector("#input1").value);
}