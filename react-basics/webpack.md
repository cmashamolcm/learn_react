1. Webpack:
  - Static module bundler.
  -Tool to manage and build js code
  - Helps to minify the code for production
2. Webpack 2.0:
  - npm install webpack@2 --save-dev
  - Then in package.json
    `script{"build": "webpack <entry js file from relative to package.json> <destination folder and file>"}`
    `script{"build": "webpack src/js/app.js dist/bundle.js"}`
    `script{"build": "webpack src/js/app.js dist/bundle.js" -p}` - -p will ensure minification.
    *Ensure that app.js has all required dependenies inported. Else, thatw ill not be packed as webpack packs from entry point js file.*
    *Ensure to specify in index.html `<script src="dist/bundle.js"/>` instead of specifying individual js files.*
  - How can we get a feel of real web-server so that the download in broswer for files are mocked to verify delay, file size etc?
    * `webpack-dev-server` is the solution.
    * npm install -D webpack-dev-server@2
    * In package.json,
    `script{"build": "webpack-dev-server src/js/app.js dist/bundle.js"}`
    - This depends on dist/bundle.js. To avoid that and load from memory;
    `script{"build": "webpack-dev-server --entry src/js/app.js --output-filename dist/bundle.js"}`
3. Core concepts:
  - entry - staring point js
  - output - where build output comes
  - module/ rules (to apply on individual files eg: collect css)
  - plugins -  to apply some action on full code. Eg: minification
4. webpack.config.js:
  - This file helps us to configure build.
  - `webpack -p`
  - `webpack-dev-server`
  - can search for this file in project folder near to package.json and use it instead of command line.
  - Eg:
``` 
  var path = require("path");// helps for file operations.
  var webpack = require("webpack");
  module.exports = {// items to export by creating a module structure
    entry: "./src/js/app.js",// rlative path from webpack.config.js to starting point
    output:{
      path: path.resove(__dirname, "dist"),// __dirname means absolute path to current directory. Then create dist folder there
      filename: 'bundle.js',// name of resulting build file. addes as src in script in index.html
      publicPath: '/dist', // if not specified, dev-server fails to load bundle.js in memory.
    },
    module: {// applies to individual files. Ensure import './css/something.css' in .js files. No need to explictly give in index.html.
      rules: [{// When webpack finds an import of .css file, it uses this rule.
        test: /\.css$/,
        use: ['style-loader', 'css-loader']//order of execution is css-loader then style-loader. Reverse of adding. Need to install style-loader@0 and css-loader@0
      }]
    },
    plugins: [// To apply something on full code. Not in individual files. module rules are for individual files. Plugins are for all.
    new webpack.optimize.UglifyJsPlugin({})// makes sure webpack build minifies.
    ]
  }
  
```
- Similar to this, we can use scss and parse it by scss-loader and then using css-loader, we can get it as css. Then with text extractor plugin, we can add all css together in single main.css
- Note that we need to explictly specify the style src and css path in index.html.
- babel-loader can be used to convert from ES6 to ES5
- *.scss is Sassy CSS which is css+ more easy to use like @import, mixin etc. but browser undestands css at the end and we need to convert those files.*
- Can use file-loader to have images in dist.
- HtmlWebpackPlugin can be used to create index.html in dist folder. Then localhost:8080 from webpack-dev-server can use html from dist.
- clean-webpack-plugin can be used to clean dist folder (or any output path before each webpack build.)
- to add a third party lib,
  * Add inport of lib in .js files (eg: jquery). Then it will get added to bundle. Then to use it;
  * add `new webpack.Provideplugin({$: 'jquery'})` inside plugins [] of webpack.config.js. This indicates that $ means use from jquery library.
- We can use different config files by specifying 'webpack -config' for prod, dev etc. If there is a common config for prod and dev, use webpack-merge to 
  inherit common file and use rest of each env by its own.
- Babel can be integrated with webpack to transpile ES6/7 to browser supported versions. Refer sample project `babel-demo` readme.md for details. 
