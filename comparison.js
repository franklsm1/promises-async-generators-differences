require('es6-promise').polyfill();
require('isomorphic-fetch');
const rootURL = 'https://jsonplaceholder.typicode.com';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function get(url) {
  return sleep(250)
    .then(() => fetch(url))
    .then(response => response.json())
    .catch(error => {
      console.log("I failed getting: ", url);
    });
}

/*****************Last Post*******************/
export function getLastPostPromise() {
  return get(rootURL + '/posts')
    .then(response => {
      let lastPostId = response.slice(-1)[0].id;
      return get(`${rootURL}/posts/${lastPostId}`);
    });
}

export function* getLastPostGenerator() {
  let response = yield get(rootURL + '/posts');
  let lastPostId = response.slice(-1)[0].id;
  return get(`${rootURL}/posts/${lastPostId}`);
}

export async function getLastPostAsync() {
  let response = await get(rootURL + '/posts');
  let lastPostId = response.slice(-1)[0].id;
  return get(`${rootURL}/posts/${lastPostId}`);
}

/****************Three Posts******************/
export function getThreePostsPromise(idOne, idTwo, idThree) {
  return Promise.all([
    get(`${rootURL}/posts/${idOne}`),
    get(`${rootURL}/posts/${idTwo}`),
    get(`${rootURL}/posts/${idThree}`)
  ]);
}

export function* getThreePostsGenerator(idOne, idTwo, idThree) {
  return yield [
    get(`${rootURL}/posts/${idOne}`),
    get(`${rootURL}/posts/${idTwo}`),
    get(`${rootURL}/posts/${idThree}`)
  ];
}

export async function getThreePostsAsync(idOne, idTwo, idThree) {
  return Promise.all([
    get(`${rootURL}/posts/${idOne}`),
    get(`${rootURL}/posts/${idTwo}`),
    get(`${rootURL}/posts/${idThree}`)
  ]);
}

/*******************Four Nested********************/
export function fourNestedGetsExamplePromise(postId) {
  //get post given post id
  return get(`${rootURL}/posts/${postId}`)
    .then(post => {
      //get all posts by user who authored original post
      return get(`${rootURL}/posts?userId=${post.userId}`)
        .then(postArray => {
          //get all comments on that users first post
          return get(`${rootURL}/posts/${postArray[0].id}/comments`)
            .then(commentArray => {
              //get first comment
              return get(`${rootURL}/comments/${commentArray[0].id}`)
            })
        })
    });
}

export function* fourNestedGetsExampleGenerator(postId) {
  //get post given post id
  let post = yield get(`${rootURL}/posts/${postId}`);
  //get all posts by user who authored original post
  let postArray = yield get(`${rootURL}/posts?userId=${post.userId}`);
  //get all comments on that users first post
  let commentArray = yield get(`${rootURL}/posts/${postArray[0].id}/comments`);
  //get first comment
  return get(`${rootURL}/comments/${commentArray[0].id}`)
}

export async function fourNestedGetsExampleAsync(postId) {
  //get post given post id
  let post = await get(`${rootURL}/posts/${postId}`);
  //get all posts by user who authored original post
  let postArray = await get(`${rootURL}/posts?userId=${post.userId}`);
  //get all comments on that users first post
  let commentArray = await get(`${rootURL}/posts/${postArray[0].id}/comments`);
  //get first comment
  return get(`${rootURL}/comments/${commentArray[0].id}`)
}
