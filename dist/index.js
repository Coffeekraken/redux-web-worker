"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.WebWorker = exports.registerWorker = void 0;

var _detectBrowser = require("detect-browser");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var browser = (0, _detectBrowser.detect)();
var workers = [];
var storeRef;

var registerWorker = function registerWorker(WorkerInstance) {
  var newWorker; // register only if we are in a browser environment

  if (browser) {
    // create the new worker instance
    newWorker = new WorkerInstance(); // add the new worker inside the workers stack

    workers.push(newWorker); // listen for new messages from the worker

    newWorker.addEventListener('message', function (e) {
      // dispatch a the new event in the system
      storeRef.dispatch(e.data);
    });
  } // return the terminate function


  return function () {
    if (newWorker) {
      newWorker.terminate();
      workers.splice(workers.indexOf(newWorker), 1);
    }
  };
}; // base class to extends inside the worker


exports.registerWorker = registerWorker;

var WebWorker =
/*#__PURE__*/
function () {
  function WebWorker(self) {
    var _this = this;

    _classCallCheck(this, WebWorker);

    this.self = self; // listen for messages from the app

    self.addEventListener('message', function (e) {
      // call the method that has the name of the action type
      if (_this[e.data.type]) {
        _this[e.data.type]({
          action: e.data,
          dispatch: _this._dispatch.bind(_this)
        });
      }
    });
  }
  /**
   * Internal dispatch method
   * @param    {Object}    action    The action to dispatch
   */


  _createClass(WebWorker, [{
    key: "_dispatch",
    value: function _dispatch(action) {
      this.self.postMessage(action);
    }
  }]);

  return WebWorker;
}();
/**
 * Web worker middleware that abstract the use of web workers
 * to handle the actions dispatched in the redux system
 */


exports.WebWorker = WebWorker;

var webworkerMiddleware = function webworkerMiddleware(store) {
  // save store in a ref to share it with other functions
  storeRef = store; // return the rest of the curried functions

  return function (next) {
    return function (action) {
      // on each action dispatched in the redux system,
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