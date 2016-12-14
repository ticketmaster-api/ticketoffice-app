export default function promiseMiddleware() {
  return next => action => {
    const { promise, type, callback, ...rest } = action;

    if (!promise) return next(action);

    const SUCCESS = type + '_SUCCESS';
    const REQUEST = type + '_REQUEST';
    const FAILURE = type + '_FAILURE';
    next({ ...rest, type: REQUEST });

    const newPromise = promise
    .then(req => {
      next({ ...rest, req, type: SUCCESS });
      return req;
    })
    .catch(error => {
      next({ ...rest, error, type: FAILURE });
      console.log(error);
      return error;
    });

    if (typeof callback === 'function') {
      newPromise.then((value) => {
        callback(value);
        return true;
      });
    }

    return newPromise;
  };
}
