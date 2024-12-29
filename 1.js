const numbers = [1, 2, 3, 4, 5];

const once = (fn) => {
  let called = false;
  return (...args) => {
    if (called) return;
    called = true;
    return fn(...args);
  };
};

const asyncMap = (array, process, onFinish) => {
  if (array.length === 0) {
    onFinish(null, []);
    return;
  }

  const result = Array(array.length);
  let completed = 0;
  let finished = false;

  array.forEach((item, index) => {
    process(item, once((error, processed) => {
      if (finished) return;

      if (error) {
        finished = true;
        onFinish(error, null);
        return;
      }

      result[index] = processed;
      completed++;

      if (completed === array.length) {
        onFinish(null, result);
      }
    }));
  });
};

const doubleAsync = (item, callback) => {
  setTimeout(() => callback(null, item * 2), 1000);
};

asyncMap(numbers, doubleAsync, (error, result) => {
  console.log({ error, result });
});
