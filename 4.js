async function* processLargeData(data, signal) {
  for (const chunk of data) {
    if (signal.aborted) {
      throw new DOMException("Processing aborted", "AbortError");
    }
    // Simulate async processing of the chunk
    await new Promise((resolve) => setTimeout(resolve, 100));
    yield chunk * 2; // Processed data 
  }
}


async function processChunks(generator, signal) {
  const results = [];
  try {
    for await (const result of generator) {
      results.push(result);
    }
    console.log("Processing completed:", results);
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Processing aborted.");
    } else {
      console.error("An error occurred:", error);
    }
  }
}

const largeDataSet = Array.from({ length: 100 }, (_, i) => i + 1); // Simulated large dataset
const controller = new AbortController();
const { signal } = controller;

processChunks(processLargeData(largeDataSet, signal), signal);

setTimeout(() => {
  controller.abort();
}, 1000);
