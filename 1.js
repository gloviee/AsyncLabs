const numbers = [1, 2, 3, 4, 5];

function asyncMap(array, asyncCallback, callback) {
  const promises = array.map((item, index) => asyncCallback(item, index, array));
  Promise.all(promises)
    .then((results) => callback(null, results))
    .catch((error) => callback(error, null));
}


function asyncMultiply(number, index, array) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(number * index * 2);
    }, 100 * index);
  });
}


asyncMap(
  numbers,
  asyncMultiply,
  (error, results) => {
    if (error) {
      console.error("Error during async map operation:", error);
    } else {
      console.log("Async map results:", results);
    }
  }
);
