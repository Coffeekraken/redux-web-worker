"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expose = expose;
exports.default = exports.registerWorker = void 0;

var _detectBrowser = require("detect-browser");

var browser = (0, _detectBrowser.detect)();
var workers = [];
var storeRef;
/**
 * Register a worker
 * @param    {Worker,Function}    WorkerInstance    A worker instance loaded through `worker-loader`, or the result of the `expose` function in case of NodeJS use
 * @return    {Function}    The unregister mecanisms function
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

var registerWorker = function registerWorker(WorkerInstance) {
  var newWorker; // register only if we are in a browser environment

  if (browser) {
    // create the new worker instance
    newWorker = new WorkerInstance(); // listen for new messages from the worker

    newWorker.addEventListener('message', function (e) {
      // dispatch a the new event in the system
      storeRef.dispatch(e.data);
    });
  } else {
    newWorker = WorkerInstance();
  } // add the new worker inside the workers stack


  workers.push(newWorker); // return the terminate function

  return function () {
    if (newWorker) {
      if (browser) newWorker.terminate();
      workers.splice(workers.indexOf(newWorker), 1);
    }
  };
};
/**
 * Expose our "API" to the web worker middleware
 * @param    {Object}    tasks    The tasks object on where we have our actions defined
 * @param    {Object}    self    The "self" variable of the worker context
 * @return    {Function}    A function that expose a fake api for NodeJS compatibility
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


exports.registerWorker = registerWorker;

function expose(tasks, self) {
  // in case we are in the browser
  if (browser) {
    tasks._dispatch = function (action) {
      self.postMessage(action);
    }; // listen for messages from the app


    self.addEventListener('message', function (e) {
      // extract the state from the action
      var action = e.data;
      var state = action._state;
      delete action._state; // call the method that has the name of the action type

      if (tasks[e.data.type]) {
        tasks[e.data.type]({
          action: action,
          state: state,
          dispatch: tasks._dispatch.bind(tasks)
        });
      }
    });
  } // return a function that expose a fake postMessage API for NodeJS


  return function () {
    return {
      postMessage: function postMessage(data) {
        if (!tasks[data.type]) return;
        tasks[data.type]({
          state: storeRef.getState(),
          action: data,
          dispatch: function dispatch(action) {
            storeRef.dispatch(action);
          }
        });
      }
    };
  };
}
/**
 * Web worker middleware that abstract the use of web workers
 * to handle the actions dispatched in the redux system
 */


var webworkerMiddleware = function webworkerMiddleware(store) {
  // save store in a ref to share it with other functions
  storeRef = store; // return the rest of the curried functions

  return function (next) {
    return function (action) {
      // pass the state with the action
      action._state = store.getState(); // on each action dispatched in the redux system,
      // pass it to each registered worker(s)

      workers.forEach(function (worker) {
        worker.postMessage(action);
      });
      next(action);
    };
  };
};

var _default = webworkerMiddleware;
exports.default = _default;