# Coffeekraken redux-web-worker <img src=".resources/coffeekraken-logo.jpg" height="25px" />

<p>
	<!-- <a href="https://travis-ci.org/coffeekraken/ww-axios">
		<img src="https://img.shields.io/travis/coffeekraken/ww-axios.svg?style=flat-square" />
	</a> -->
	<a href="https://www.npmjs.com/package/coffeekraken-ww-axios">
		<img src="https://img.shields.io/npm/v/coffeekraken-ww-axios.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/ww-axios/blob/master/LICENSE.txt">
		<img src="https://img.shields.io/npm/l/coffeekraken-ww-axios.svg?style=flat-square" />
	</a>
	<!-- <a href="https://github.com/coffeekraken/ww-axios">
		<img src="https://img.shields.io/npm/dt/coffeekraken-ww-axios.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/ww-axios">
		<img src="https://img.shields.io/github/forks/coffeekraken/ww-axios.svg?style=social&label=Fork&style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/ww-axios">
		<img src="https://img.shields.io/github/stars/coffeekraken/ww-axios.svg?style=social&label=Star&style=flat-square" />
	</a> -->
	<a href="https://twitter.com/{twitter-username}">
		<img src="https://img.shields.io/twitter/url/http/{twitter-username}.svg?style=social&style=flat-square" />
	</a>
	<a href="http://coffeekraken.io">
		<img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=flat-square&label=coffeekraken.io&colorB=f2bc2b&style=flat-square" />
	</a>
</p>

Redux middleware that let you use web worker with ease to handle your expensive (or not) actions

## Table of content

1. [Install](#readme-install)
2. [Get Started](#readme-get-started)
3. [Available features](#readme-features)
4. [Browsers support](#readme-browsers-support)
5. [Contribute](#readme-contribute)
6. [Who are Coffeekraken?](#readme-who-are-coffeekraken)
7. [Licence](#readme-license)

<a name="readme-install"></a>
## Install

```
npm install coffeekraken-ww-axios --save
```

<a name="readme-get-started"></a>
## Get Started

```js
import axios from 'coffeekraken-ww-axios'
axios.get('...', {
	// options
}).then((response) => {
	// do something with the response
})
```

<a id="readme-features"></a>
## Available features

1. All the query methods like `request, get, delete, head, options, post, put, patch`
2. The `axios.create` method. It will return a promise filled with the actual axios instance
3. All the `axios.create` query methods like `request, get, delete, head, options, post, put, patch`
4. Setting some default configuration through the `axios.defaults...`

#### Unavailable features

1. All the callbacks like `paramsSerializer`, `adapter`, `onUploadProgress`, `onDownloadProgress`, etc...
2. interceptors
3. Cancellation
4. application/x-www-form-urlencoded format

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
