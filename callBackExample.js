function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function sleepCallback(ms, cb) {
  setTimeout(function() {
    cb()
  }, ms);
}

const sleepTime = 250;

// Please do not use callbacks, this is an example of what NOT to do!
export function callbackHellExample(cb) {
  sleepCallback(sleepTime, () => {
    sleepCallback(sleepTime, () => {
      sleepCallback(sleepTime, () => {
        sleepCallback(sleepTime, () => {
          sleepCallback(sleepTime, () => {
            cb();
          });
        });
      });
    });
  });
}

export async function refactoredCallbackHellExample() {
  await sleep(sleepTime)
  await sleep(sleepTime)
  await sleep(sleepTime)
  await sleep(sleepTime)
  await sleep(sleepTime)
}
