export interface PredicateWithTimeout {
  predicate: () => Promise<boolean>;
  timeout: number;
}
export const predicateCheckerTime = (params: PredicateWithTimeout): Promise<string> => {
  const { predicate, timeout } = params;
  let predicateAnswer: boolean;
  let timerForTimeout: ReturnType<typeof setTimeout>;

  return new Promise<{ duration: number; predicateAnswer: boolean }>((resolve, reject) => {
    timerForTimeout = setTimeout(() => {
      reject('Превышен таймаут');
    }, timeout);

    const startTime = performance.now();
    predicate().then((r: boolean) => {
      predicateAnswer = r;
      const finishTime = performance.now();
      resolve({ duration: finishTime - startTime, predicateAnswer });
    });
  })
    .then((r) => {
      return Promise.resolve(`Время выполнения - ${r.duration}`);
    })
    .catch((e) => {
      return Promise.reject(e);
    })
    .finally(() => {
      clearTimeout(timerForTimeout);
    });
};
