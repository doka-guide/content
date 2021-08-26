function formatFio() {
  let f = document.querySelector('#F').value || "Иванов";
  let i = document.querySelector('#I').value || "Иван";
  let o = document.querySelector('#O').value || "Иванович";
  
  f = f[0].toUpperCase() + f.slice(1).toLowerCase();
  i = i[0].toUpperCase() + i.slice(1).toLowerCase();
  o = o[0].toUpperCase() + o.slice(1).toLowerCase();
  
  document.querySelector('#FF').innerText = f;
  document.querySelector('#II').innerText = i;
  document.querySelector('#OO').innerText = o;
}