# gh-emojis [![Latest version](https://badgen.net/npm/v/gh-emojis)](https://npm.im/gh-emojis) [![Monthly downloads](https://badgen.net/npm/dm/gh-emojis)](https://npm.im/gh-emojis) [![Install size](https://packagephobia.now.sh/badge?p=gh-emojis)](https://packagephobia.now.sh/result?p=gh-emojis)

Use GitHub emojis from their API as an npm package

<sub>If you like this project, please star it & [follow me](https://github.com/privatenumber) to see what other cool projects I'm working on! ❤️</sub>

## 🙋‍♂️ Why?
GitHub has an [API end-point for emojis](https://docs.github.com/en/free-pro-team@latest/rest/reference/emojis) but the response is static and it counts against your rate limit quota. This package contains the response in JSON, UMD, and ESM formats.

## 🚀 Install
```sh
npm i gh-emojis
```

## 🚦 Quick Setup
```js
import ghEmojis from 'gh-emojis';
```

### For Browsers
#### ESM
```js
import ghEmojis from 'https://unpkg.com/gh-emojis/emojis.esm.js';
```

#### UMD
```
https://unpkg.com/gh-emojis/emojis.umd.js
```

#### JSON
```
https://unpkg.com/gh-emojis/emojis.json
```
