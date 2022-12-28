//milliseconds

import { typescriptTasksLog } from '@/utils/typescriptTasksLog';

interface PredicateWithTimeout {
  predicate: () => boolean;
  timeout: number;
}

const createWorker = (timeout, predicate) => {
  return new Promise(function (resolve, reject) {
    const worker = new Worker(new URL('./predicateWorker.ts', import.meta.url));

    const stringPredicate = predicate.toString();

    worker.postMessage({
      predicate: stringPredicate.substring(
        stringPredicate.indexOf('{') + 1,
        stringPredicate.lastIndexOf('}')
      ),
    });

    worker.addEventListener('error', function (error) {
      return reject(error.message);
    });

    worker.addEventListener(
      'message',
      function (e) {
        const { type, duration } = e.data;
        let timer;
        if (type === 'startEvaluation') {
          timer = setTimeout(() => {
            clearTimeout(timer);
            worker.terminate();
            return reject(new Error('Превышен таймаут'));
          }, timeout);
        }

        if (type === 'finishEvaluation') {
          clearTimeout(timer);
          resolve(duration);
          worker.terminate();
        }
      },
      false
    );
  });
};

const predicateCheckerTime = (params: PredicateWithTimeout): Promise<any> => {
  const { predicate, timeout } = params;

  return createWorker(timeout, predicate).catch((e) => {
    return Promise.reject(e);
  });
};

const testArray: PredicateWithTimeout[] = [
  { predicate: () => 3 > 2, timeout: 10 },
  {
    predicate: () => {
      let i = 13;
      while (i < 10000000000) {
        i = i + 3;
      }
      return !!i;
    },
    timeout: 8000,
  },
  {
    predicate: () => {
      for (let i = 0; i < Infinity; i++) {}
      return true;
    },
    timeout: 10000,
  },
];

export const testPredicate = async () => {
  typescriptTasksLog.value = '';
  for (let i = 0; i < testArray.length; i++) {
    const predicateWithTimeout = testArray[i];
    await predicateCheckerTime(predicateWithTimeout)
      .then((r) => {
        const log = `Output ${i} = ${r} ms`;
        typescriptTasksLog.value += `${log} \n`;
        console.log(log);
      })
      .catch((e) => {
        const log = `Output ${i} = ${e}`;
        typescriptTasksLog.value += `${log} \n`;
        console.log(log);
      });
  }
  typescriptTasksLog.value += '\n DONE';
};
