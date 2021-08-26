// «База данных»:

const post = {
  title: 'Заголовок поста',
  body: 'Текст поста в лучшей на свете социальной сети Switter. Все совпадения вымышлены и случайны.',
  likes: 77,
  reposts: 7,
}


// «Сервер API»:

const server = {
  posts(page = 2) {
    const finished = page >= 5;
    const next = finished ? null : page + 1;
    const posts = Array(5).fill(post);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({posts, next});
      }, 0)
    })
  }
};


// Клиент:

let nextPage = 2;
let isLoading = false;
let shouldLoad = true;

function appendPost(postData) {
  if (!postData) return;
  const main = document.querySelector('main');
  const postNode = composePost(postData);
  main.append(postNode);
}

function composePost(postData) {  
  if (!postData) return;
  const template = document.getElementById('post_template');
  const post = template.content.cloneNode(true);

  const {title, body, likes, reposts} = postData;
  post.querySelector('h1').innerText = title;
  post.querySelector('p').innerText = body;
  post.querySelector('button:first-child').innerText += likes;
  post.querySelector('button:last-child').innerText += reposts;
  
  return post;
}

async function fetchPosts() {
  if (isLoading || !shouldLoad) return;
  isLoading = true;
  
  const {posts, next} = await server.posts(nextPage);
  nextPage = next;
  
  posts.forEach(appendPost);
  
  // Здесь можно менять адресную строку,
  // чтобы сохранить положение прокрутки.
  
  if (!next) shouldLoad = false;
  isLoading = false;
}

function throttle(callee, timeout) {
  let timer = null;

  return function perform(...args) {
    if (timer) return;

    timer = setTimeout(() => {
      callee(...args);

      clearTimeout(timer);
      timer = null;
    }, timeout);
  }
}

async function checkPosition() {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;
  const scrolled = window.scrollY;

  const threshold = height - screenHeight / 4;
  const position = scrolled + screenHeight;

  if (position >= threshold) {
    await fetchPosts();
  }
}

(() => {
  window.addEventListener('scroll', throttle(checkPosition));
  window.addEventListener('resize', throttle(checkPosition));
})();