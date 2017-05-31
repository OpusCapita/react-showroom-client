# OpusCapita showroom template

Preconfigured to OpusCapita defaults react project template

## Installation

```npm install -g opuscapita-react-template```

## Global commands

* ```showroom init``` - create project skeleton in empty folder
* ```showroom add``` - add new react component. Includes styles, unit-test, [showroom](https://github.com/OpusCapita/react-showroom-client) specific files

## Template commands

* ```npm start``` - start demopage
* ```npm run lint``` - run code [lint](https://github.com/OpusCapita/eslint-config)
* ```npm run publish-release``` - patch package version and publish release

## Stuff:

### Build and deploy

* [babel](https://babeljs.io/) - JavaScript compiler
* [webpack 2](https://webpack.js.org/concepts/) - modern bundler
* [opuscapita-npm-scripts](https://github.com/OpusCapita/npm-scripts) - unified release/build approach for npm package and grails plugin from npm packages
* [eslint](http://eslint.org/) - code-style checker
* [opuscapita-eslint-config](https://github.com/OpusCapita/eslint-config) - OpusCapita code-style config

### Demo and documentation

* [opuscapita-showroom](https://github.com/OpusCapita/react-showroom-client)

### Testing

* [mocha](https://mochajs.org/) - feature-rich JavaScript test framework
* [chai](http://chaijs.com/) - BDD / TDD assertion library
* [enzyme](https://github.com/airbnb/enzyme) - testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output
* [chai-enzyme](https://github.com/airbnb/enzyme) - chai.js assertions for enzyme
* [sinon](http://sinonjs.org/) - stubs and mocks

### Styles

* [LESS](http://lesscss.org/)
* [BEM-like](https://en.bem.info/methodology/quick-start/) notation by default
* [PostCSS](https://github.com/postcss/postcss) with [autoprefixer](https://github.com/postcss/autoprefixer)
* You can use [CSS modules](https://github.com/css-modules/css-modules) in some cases
  > You should rename *Component.less* => *Component.module.less**

It also includes OpusCapita bootstrap default styles. This stuff is deprecated and will be removed in future.
