![Coffeekraken redux web worker](/.resources/redux-web-worker.jpg)

# Coffeekraken redux-web-worker <img src=".resources/coffeekraken-logo.jpg" height="25px" />

<p>
	<!-- <a href="https://travis-ci.org/coffeekraken/redux-web-worker">
		<img src="https://img.shields.io/travis/coffeekraken/redux-web-worker.svg?style=flat-square" />
	</a> -->
	<a href="https://www.npmjs.com/package/coffeekraken-redux-web-worker">
		<img src="https://img.shields.io/npm/v/coffeekraken-redux-web-worker.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/redux-web-worker/blob/master/LICENSE.txt">
		<img src="https://img.shields.io/npm/l/coffeekraken-redux-web-worker.svg?style=flat-square" />
	</a>
	<!-- <a href="https://github.com/coffeekraken/redux-web-worker">
		<img src="https://img.shields.io/npm/dt/coffeekraken-redux-web-worker.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/redux-web-worker">
		<img src="https://img.shields.io/github/forks/coffeekraken/redux-web-worker.svg?style=social&label=Fork&style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/redux-web-worker">
		<img src="https://img.shields.io/github/stars/coffeekraken/redux-web-worker.svg?style=social&label=Star&style=flat-square" />
	</a> -->
	<a href="https://twitter.com/coffeekrakenio">
		<img src="https://img.shields.io/twitter/url/http/coffeekrakenio.svg?style=social&style=flat-square" />
	</a>
	<a href="http://coffeekraken.io">
		<img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=flat-square&label=coffeekraken.io&colorB=f2bc2b&style=flat-square" />
	</a>
</p>

Redux middleware that let you use web worker with ease to handle your expensive (or not) actions

## Table of content

1. [Install](#readme-install)
2. [Get Started](#readme-get-started)
3. [Requirements](#readme-requirements)
4. [A note about nodejs](#readme-nodejs)
5. [Browsers support](#readme-browsers-support)
6. [Contribute](#readme-contribute)
7. [Who are Coffeekraken?](#readme-who-are-coffeekraken)
8. [Licence](#readme-license)

<a id="readme-install"></a>
## Install

```
npm install coffeekraken-redux-web-worker --save
```

<a id="readme-get-started"></a>
## Get Started

Suppose we have container that trigger a `FETCH_TODOS` action like so:

#### `TodoContainer.js`
```js
import { registerWorker } from 'coffeekraken-redux-web-worker'
import tasksWorker from './tasks.worker'
import { FETCH_TODOS } from './constants'
class TodoContainer extends React.Component {
  componentDidMount() {
    registerWorker(tasksWorker)
    const { dispatch } = this.props
    dispatch({
      type: FETCH_TODOS,
      payload: 'something'
    })
  }
}
```

> Note that we have imported and registered the worker before dispatching the action.

Now that we have an action dispatched and our worker registered, let's see the `tasks.worker.js` content:

#### `tasks.worker.js`

```js
import axios from 'axios'
import { WebWorker } from 'coffeekraken-redux-web-worker'
import { FETCH_TODOS, TODOS_FETCHED } from './constants'

class TodoTasks extends WebWorker {
  // take care of the FETCH_TODOS action	
  async [FETCH_TODOS]({ action, dispatch }) {
    const todos = await axios.get(
      'https://my-json-server.typicode.com/coffeekraken/react-boilerplate/todos'
    )
    dispatch({
      type: TODOS_FETCHED,
      todos: todos.data
    })
  }
}
new TodoTasks(self)
```

The last step if to apply the middleware as you would do for any other redux middleware. Here's how:

#### `store.js`

```js
import { createStore, applyMiddleware } from 'redux'
import webworkerMiddleware from 'coffeekraken-redux-web-worker'

import reducer from './reducers'

// create the store with our middleware
const store = createStore(
  reducer,
  applyMiddleware(webworkerMiddleware)
)

// render the application
```

<a id="readme-requirements"></a>
## Requirements

In order for this middleware to work, you'll need to install the [worker-loader](https://github.com/webpack-contrib/worker-loader) webpack loader.

```
npm install worker-loader --save-dev
```

Here's an example of webpack configuration:

#### `webpack.config.js`
```js
module.exports = {
  //...
  module: {
    rules: [{
      test: /\.worker\.js$/,
      use: {
        loader: 'worker-loader',
        options: {
          inline: true,
          fallback: false
        }
      }
    }]
  }
}
```

<a id="readme-nodejs"></a>
## A note about nodejs

Unfortunately, this middleware can't fully work in a nodejs environement. This said, it doesn't mean that you cannot use it for SSR (server side rendering). When you run your code in a nodejs environment, the workers will just not being registered and when your code runs in the browser side, the code will run again and the execution of your workers will start as normal.

<a id="readme-browsers-support"></a>
## Browsers support

| <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" /></br>IE / Edge | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" /></br>Firefox | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" /></br>Chrome | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" /></br>Safari |
| --------- | --------- | --------- | --------- |
| IE11+ | last 2 versions| last 2 versions| last 2 versions

> As browsers are automatically updated, we will keep as reference the last two versions of each but this component can work on older ones as well.

<a id="readme-contribute"></a>
## Contribute

This is an open source project and will ever be! You are more that welcomed to contribute to his development and make it more awesome every day.
To do so, you have several possibilities:

1. [Share the love ❤️](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-share-the-love)
2. [Declare issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-declare-issues)
3. [Fix issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-fix-issues)
4. [Add features](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-add-features)
5. [Build web component](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-build-web-component)

<a id="readme-who-are-coffeekraken"></a>
## Who are Coffeekraken

We try to be **some cool guys** that build **some cool tools** to make our (and yours hopefully) **every day life better**.  

#### [More on who we are](https://github.com/Coffeekraken/coffeekraken/blob/master/who-are-we.md)

<a id="readme-license"></a>
## License

The code is available under the [MIT license](LICENSE.txt). This mean that you can use, modify, or do whatever you want with it. This mean also that it is shipped to you for free, so don't be a hater and if you find some issues, etc... feel free to [contribute](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md) instead of sharing your frustrations on social networks like an asshole...
