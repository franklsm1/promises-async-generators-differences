# Promise, Async/await, and generator functions comparison
An example using callbacks is also included.
Please use this as an example of what NOT to do and try to not use callbacks at all in your code.

#### Steps to run the comparison:
- clone this repository: `git clone https://github.com/franklsm1/promises-async-generators-differences.git`
- install needed packages: `npm install`
- run unit tests to show comparison: `npm test`

#### Things to know:
- There is no native way to run asynchronous tasks in parallel using async/await
- Async AND generator functions swallow errors, need try/catch to handle errors
- First rejected promise in `Promise.all(ArrayOfPromises)` immediately rejects all promises in the array without allowing them all to run to completion
- Always need to return a promise in a function otherwise it will not wait for completion
