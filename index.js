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


/*******************Async********************/
export async function getLastPostAsync() {
  let response = await get(rootURL + '/posts');
  let lastPostId = response.slice(-1)[0].id;
  response = await get(`${rootURL}/posts/${lastPostId}`);
  return response;
}

export async function getThreePostsAsync(idOne, idTwo, idThree) {
  return await Promise.all([
    get(`${rootURL}/posts/${idOne}`),
    get(`${rootURL}/posts/${idTwo}`),
    get(`${rootURL}/posts/${idThree}`)
  ]);
}
