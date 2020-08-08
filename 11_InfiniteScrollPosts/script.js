const postContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 3;
let page = 1;

/**
 * Fetch posts from API
 */
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data = await res.json();
    return data;
}

// Show posts in DOM
async function showPosts() {
    await (
            new Promise((resolve, reject) => {
                setTimeout( _ => resolve(), 1000);
            })
    );
    const posts = await getPosts();
    const postElements = posts.map( post => {
        return `
            <div class="post">
                <div class="number">${post.id}</div>
                <div class="post-info">
                    <h2 class="post-title">${post.title}</h2>
                    <p class="post-body">${post.body}</p>
                </div>
            </div>
        `;
    });
    loading.classList.remove('show');
    await(new Promise((resolve, reject) => setTimeout(resolve, 350)));
    postContainer.innerHTML += postElements.join('');
}

/**
 * My solution
 */
async function handleScrollöEnd() {
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        loading.classList.add('show');
        page++;
        await showPosts();
        loading.classList.remove('show');
    }
}

/**
 * Filter posts by input
 * @param {Event} event 
 */
function filterPosts(event) {
    const term = event.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');


    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
}


// Show initial posts
showPosts();

window.addEventListener('scroll', handleScrollöEnd);


// Solution from the video

/**
 * Show loader & fetch more posts
 */
// function showLoading() {
//     loading.classList.add('show');
//     setTimeout( () => {
//         loading.classList.remove('show');
//         setTimeout( _ => {
//             page++;
//             showPosts();
//         }, 300)
//     }, 1000)
// }

// window.addEventListener('scroll', _ => {
//     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

//     if((scrollTop + clientHeight) >= scrollHeight - 5) {
//         showLoading();
//     }
// })

filter.addEventListener('input', filterPosts);