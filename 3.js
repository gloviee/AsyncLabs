function asyncMapWithCancellation(array, asyncCallback, signal) {
  const promises = array.map((item, index) => {
    return new Promise((resolve, reject) => {
      if (signal.aborted) {
        return reject(new DOMException("Aborted", "AbortError"));
      }
      const onAbort = () => reject(new DOMException("Aborted", "AbortError"));
      signal.addEventListener("abort", onAbort);

      asyncCallback(item, index, array)
        .then(resolve)
        .catch(reject)
        .finally(() => signal.removeEventListener("abort", onAbort));
    });
  });

  return Promise.all(promises);
}


function promiseDouble(number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(number * 2);
    }, Math.random() * 500);
  });
}


function promiseSquare(number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(number * number);
    }, Math.random() * 500);
  });
}


async function demoFunc() {
  const controller1 = new AbortController();
  const { signal: signal1 } = controller1;

  const controller2 = new AbortController();
  const { signal: signal2 } = controller2;

  const numbers1 = [1, 2, 3, 4, 5];
  const numbers2 = [6, 7, 8, 9, 10];

  try {
    const res1 = await asyncMapWithCancellation(numbers1, promiseDouble, signal1);
    console.log("Case 1:", res1);
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Case 1 was aborted.");
    } else {
      console.error("Error in Case 1:", error);
    }
  }

  controller2.abort();
  
  try {
    const res2 = await asyncMapWithCancellation(numbers2, promiseSquare, signal2);
    console.log("Case 2:", res2);
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Case 2: aborted");
    } else {
      console.error("Error in Case 2:", error);
    }
  }
}

demoFunc()
  .then(() => {
    console.log("demoFunc completed successfully");
  })
  .catch((error) => {
    console.error("Error in demoFunc:", error);
  });
