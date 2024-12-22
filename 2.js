const numbers = [1, 2, 3, 4, 5];


function asyncMap(array, asyncCallback) {
  const promises = array.map((item, index) => asyncCallback(item, index, array));
  return Promise.all(promises);
}


function asyncDouble(number, index, array) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(number * index * 2);
    }, 100 * index);
  });
}


asyncMap(numbers, asyncDouble)
  .then((results) => {
    console.log("Promise-based async map results (then):", results);
  })
  .catch((error) => {
    console.error("Error during promise-based async map operation:", error);
  });


async function demoAsyncMap() {
  try {
    const results = await asyncMap(numbers, asyncDouble);
    console.log("Promise-based async map results (async/await):", results);
  } catch (error) {
    console.error("Error during async map operation in async/await:", error);
  }
}

demoAsyncMap();
