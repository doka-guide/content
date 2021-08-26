const pizzaList = [
  'Margherita', 
  'Pepperoni',
  'Hawaii', 
  '4 Cheeses', 
  'Diabola', 
  'Sfincione'
];

function contains(query) {
  return pizzaList.filter(title => 
    title.toLowerCase().includes(query.toLowerCase()));
}

const server = {
  search(query) {
    console.log(query);
    return new Promise(resolve => {
      setTimeout(() => resolve({ 
        list: query ? contains(query) : []
      }), 100)
    })
  }
}

const searchForm = document.getElementById('search');
const searchInput = searchForm.querySelector('[type="search"]');
const searchResults = document.querySelector('.search-results');

function debounce(callee, timeoutMs) {
  return function perform(...args) {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();
    
    if (previousCall && ((this.lastCall - previousCall) <= timeoutMs)) {
      clearTimeout(this.lastCallTimer);
    }
    
    this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs);
  }
}

function handleInput(e) {
  const {value} = e.target;

  server.search(value).then(function (response) {
    const {list} = response;
    
    const html = list.reduce((markup, item) => {
      return `${markup}<li>${item}</li>`;
    }, ``);

    searchResults.innerHTML = html;
  })
}

const debouncedHandle = debounce(handleInput, 250);
searchInput.addEventListener('input', debouncedHandle);