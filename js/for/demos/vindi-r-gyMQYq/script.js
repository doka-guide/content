function slowInsert() {
  let tbody = document.querySelector('tbody');
  let startTime = new Date().getTime();
  for (let i =0;i<10;i++){
    let row = document.createElement('tr');
    let id = document.createElement('td');
    id.innerText = i;
    let val = document.createElement('td');
    val.innerText = 'Value #'+i;
    row.appendChild(id);
    row.appendChild(val);
    tbody.appendChild(row);
  }
}
