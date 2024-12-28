const numbers = [1, 2, 3, 4, 5];


function asyncMap(array, asyncCallback, finalCallback) {
  const results = [];
  let pending = array.length;

  if (array.length === 0) {
    finalCallback(null, results);
    return;
  }

  array.forEach((item, index) => {
    asyncCallback(item, index, array, (err, result) => {
      if (err) {
        finalCallback(err);
        return;
      }

      results[index] = result;
      pending--;

      if (pending === 0) {
        finalCallback(null, results);
      }
    });
  });
}


function doubleAsync(num, index, array, callback) {
  setTimeout(() => {
    if (num < 0) {
      callback(new Error("Negative numbers are not allowed"));
    } else {
      callback(null, num * 2);
    }
  }, 100);
}


function handleResults(err, results) {
  if (err) {
    console.error("Error:", err.message);
  } else {
    console.log("Results:", results);
  }
}

asyncMap(numbers, doubleAsync, handleResults);
