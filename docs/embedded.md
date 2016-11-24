## Integration with your React package

**Install required packages** 

`npm install --save-dev -E postcss-loader raw-loader @opuscapita/showroom @opuscapita/showroom-server`

**Modify files:**


* **Choose appropriate version of `react` and `react-dom`**

**demo-index.html**

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.15.2/react-with-addons.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.15.2/react-dom.js"></script>
```


* **Add scanning packages**

**server.js**

```js
let componentsRoot = path.resolve(__dirname, '../../client/components');
require('jcatalog-showroom-server').makeLocalScan(componentsRoot);
```

**index-page.js**

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Showroom from 'jcatalog-showroom';

let element = document.getElementById('main');
let showroom = React.createElement(Showroom, {
  loaderOptions: {
    componentsInfo: require('.jcatalog-showroom/componentsInfo'),
    packagesInfo: require('.jcatalog-showroom/packageInfo')
  }
});

ReactDOM.render(showroom, element);
```

### Documentation File Example

You can find it[**here**](./example.DOCUMENTATION.md)

### Edit your webpack config

* **Add to config these loaders:**

**webpack.development.config.js**

```js
{
  test: /\.md$/,
  loader: 'raw-loader'
},
{
  test: /\.json$/,
  loader: 'json-loader'
}
```

* **We highly recommend to include [autoprefixer](https://github.com/postcss/autoprefixer) to your project:**

```
npm install --save-dev postcss-loader autoprefixer
```

**webpack.development.config.js**

```js
postcss: function () {
  return [require('autoprefixer')];
}
```

```js
// modify module.loaders
{ 
  test: /\.less$/, 
  loader: 'style!css!postcss-loader!less?sourceMap'
},
{
  test: /\.css$/,
  loader: "style!css-loader!postcss-loader"
}
```
