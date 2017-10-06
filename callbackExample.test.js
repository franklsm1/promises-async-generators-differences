import {
  callbackHellExample,
  refactoredCallbackHellExample
} from './callbackExample';

describe('Callback Example Refactor comparison', () => {
  it('Callback Hell example', (done) => {
    callbackHellExample(() => {
      done();
    });
  });
  it('Refactored Callback Hell example', () => {
    return refactoredCallbackHellExample()
  });
});
