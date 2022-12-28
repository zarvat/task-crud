self.addEventListener(
  'message',
  function (event) {
    const predicate = new Function(event.data.predicate);
    self.postMessage({
      type: 'startEvaluation',
    });
    const startTime = performance.now();
    const result = predicate();
    const finalTime = performance.now();

    self.postMessage({
      type: 'finishEvaluation',
      duration: finalTime - startTime,
    });
    self.postMessage(result);
  },
  false
);
