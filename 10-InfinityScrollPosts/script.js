const postsContainer = document.getElementById("post-container")
const loader = document.querySelector('.loader')
const filter = document.getElementById("filter")

let limit = 3;
let page = 1;

// fetch posts data from API
async function getPosts(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)

    const data = await res.json();

    return data;
}

// show posts in DOM
async function showPosts(){
    const posts = await getPosts();

    posts.forEach(post=>{
        const postEl = document.createElement('div')
        postEl.classList.add('post')
        postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">
                ${post.body}
            </p>
        </div>
        `
        postsContainer.appendChild(postEl)

    })
}

// Show Loader & fetch more posts
function showLoading(){
    loader.classList.add('show')
    
    setTimeout(()=>{
        loader.classList.remove('show')

        setTimeout(()=>{
            page++;
            showPosts()
        },300)
    },1000)
}

// Filter Posts by input
function filterPosts(e){
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post=>{
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(term) > -1 || body.indexOf(term) > -1){
            post.style.display = 'flex'
        }else{
            post.style.display = 'none'
        }
    })
}

showPosts();

window.addEventListener('scroll',()=>{
    const { scrollTop,scrollHeight,clientHeight } = document.documentElement

    if(scrollTop + clientHeight >= scrollHeight-5){
        showLoading()
    }
})

filter.addEventListener('input',filterPosts)