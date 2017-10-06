import {
  get,
  getLastPostPromise,
  getThreePostsPromise,
  getLastPostGenerator,
  getThreePostsGenerator,
  getLastPostAsync,
  getThreePostsAsync,
  fourNestedGetsExamplePromise,
  fourNestedGetsExampleGenerator,
  fourNestedGetsExampleAsync
} from './comparison';
import co from 'co';
const rootURL = 'https://jsonplaceholder.typicode.com';

describe('Tests for GET functionality', () => {
  it('GET first post', () => {
    return get(rootURL + '/posts/1')
      .then(response => {
        expect(response.title).toEqual("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
      });
  });

  it('GET all posts', () => {
    return get(rootURL + '/posts')
      .then(response => {
        expect(response.length).toEqual(100);
      });
  });
});

describe('GET last post functions', () => {
  function validateLastPostFunction(response) {
    return response
      .then(lastPost => {
        expect(lastPost.id).toEqual(100);
        expect(lastPost.title).toBe('at nam consequatur ea labore ea harum');
      });
  }

  it('GET last post available using promises', () => {
    return validateLastPostFunction(getLastPostPromise());
  });
  it('GET last post available using generators', () => {
    //co runs generator functions to completion
    return validateLastPostFunction(co(getLastPostGenerator()));
  });
  it('GET last post available using async/await', () => {
    return validateLastPostFunction(getLastPostAsync());
  });
});

describe('GET three posts functions', () => {
  function validateGetThreePostsFunction(response) {
    return response
      .then(postsArray => {
        expect(postsArray[0].title).toBe('magnam facilis autem');
        expect(postsArray[1].title).toBe('asperiores ea ipsam voluptatibus modi minima quia sint');
        expect(postsArray[2].title).toBe('ad iusto omnis odit dolor voluptatibus');
      });
  }

  it('GET the 7th, 21st, and 90th post using promises', () => {
    return validateGetThreePostsFunction(getThreePostsPromise(7, 21, 90));
  });
  it('GET the 7th, 21st, and 90th post using generators', () => {
    return validateGetThreePostsFunction(co(getThreePostsGenerator(7, 21, 90)));
  });
  it('GET the 7th, 21st, and 90th post using async/await', () => {
    return validateGetThreePostsFunction(getThreePostsAsync(7, 21, 90));
  });
})

describe('Four Nested GET Example functions', () => {
  function validateFourNestedGetsFunction(response) {
    return response
      .then(comment => {
        expect(comment.postId).toEqual(21);
        expect(comment.email).toEqual('Lura@rod.tv');
      });
  }

  it('Using Promises', () => {
    return validateFourNestedGetsFunction(fourNestedGetsExamplePromise(21));
  });
  it('Using generators', () => {
    return validateFourNestedGetsFunction(co(fourNestedGetsExampleGenerator(21)));
  });
  it('Using async/await', () => {
    return validateFourNestedGetsFunction(fourNestedGetsExampleAsync(21));
  });
})
