require('es6-promise').polyfill();
require('isomorphic-fetch');
const rootURL = 'https://jsonplaceholder.typicode.com';

export function get(url) {
  let responsePromise = fetch(url)
    .then(response => response.json())
    .catch(error => {
      console.log("I failed getting: ",url);
    });

    return responsePromise
      .then(json => json);
}


/*****************Promises*******************/
export function getLastPostPromise() {
  return get(rootURL + '/posts')
    .then(response => {
      let lastPostId = response.slice(-1)[0].id;
       return get(`${rootURL}/posts/${lastPostId}`);
    });
}

export function getThreePostsPromise(idOne, idTwo, idThree) {
  return Promise.all([
    get(`${rootURL}/posts/${idOne}`),
    get(`${rootURL}/posts/${idTwo}`),
    get(`${rootURL}/posts/${idThree}`)
  ]);
}

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


/****************Generators******************/
export function* getLastPostGenerator() {
  let response = yield get(rootURL + '/posts');
  let lastPostId = response.slice(-1)[0].id;
  return yield get(`${rootURL}/posts/${lastPostId}`);
}

export function* getThreePostsGenerator(idOne, idTwo, idThree) {
  return yield [
    get(`${rootURL}/posts/${idOne}`),
    get(`${rootURL}/posts/${idTwo}`),
    get(`${rootURL}/posts/${idThree}`)
  ];
}
export function* fourNestedGetsExampleGenerator(postId) {
  //get post given post id
  let post = yield get(`${rootURL}/posts/${postId}`);
  //get all posts by user who authored original post
  let postArray = yield get(`${rootURL}/posts?userId=${post.userId}`);
  //get all comments on that users first post
  let commentArray = yield get(`${rootURL}/posts/${postArray[0].id}/comments`);
  //get first comment
  return yield get(`${rootURL}/comments/${commentArray[0].id}`)
}


/*******************Async********************/
export async function getLastPostAsync() {
  let response = await get(rootURL + '/posts');
  let lastPostId = response.slice(-1)[0].id;
  return await get(`${rootURL}/posts/${lastPostId}`);
}

export async function getThreePostsAsync(idOne, idTwo, idThree) {
  return await Promise.all([
    get(`${rootURL}/posts/${idOne}`),
    get(`${rootURL}/posts/${idTwo}`),
    get(`${rootURL}/posts/${idThree}`)
  ]);
}

export async function fourNestedGetsExampleAsync(postId) {
  //get post given post id
  let post = await get(`${rootURL}/posts/${postId}`);
  //get all posts by user who authored original post
  let postArray = await get(`${rootURL}/posts?userId=${post.userId}`);
  //get all comments on that users first post
  let commentArray = await get(`${rootURL}/posts/${postArray[0].id}/comments`);
  //get first comment
  return await get(`${rootURL}/comments/${commentArray[0].id}`)
}
