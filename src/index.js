import { detect } from 'detect-browser'

const browser = detect()
const workers = []
let storeRef

export const registerWorker = (WorkerInstance) => {
  let newWorker
  // register only if we are in a browser environment
  if (browser) {
    // create the new worker instance
    newWorker = new WorkerInstance()
    // add the new worker inside the workers stack
    workers.push(newWorker)
    // listen for new messages from the worker
    newWorker.addEventListener('message', e => {
      // dispatch a the new event in the system
      storeRef.dispatch(e.data)
    })
  }
  // return the terminate function
  return () => {
    if (newWorker) {
      newWorker.terminate()
      workers.splice(workers.indexOf(newWorker), 1)
    }
  }
}

// base class to extends inside the worker
export class WebWorker {
  constructor(self) {
    this.self = self
    // listen for messages from the app
    self.addEventListener('message', e => {
      // call the method that has the name of the action type
      if (this[e.data.type]) {
        this[e.data.type]({
          action: e.data,
          dispatch: this._dispatch.bind(this)
        })
      }
    })
  }

  /**
   * Internal dispatch method
   * @param    {Object}    action    The action to dispatch
   */
  _dispatch(action) {
    this.self.postMessage(action)
  }
}

/**
 * Web worker middleware that abstract the use of web workers
 * to handle the actions dispatched in the redux system
 */
const webworkerMiddleware = store => {

  // save store in a ref to share it with other functions
  storeRef = store

  // return the rest of the curried functions
  return next => action => {

    // on each action dispatched in the redux system,
    // pass it to each registered worker(s)
    workers.forEach((worker) => {
      worker.postMessage(action)
    })
    next(action)
  }
}
export default webworkerMiddleware
