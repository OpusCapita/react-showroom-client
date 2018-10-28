# OpusCapita Showroom 

[![CircleCI Status](https://circleci.com/gh/OpusCapita/react-showroom-client/tree/master.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/OpusCapita/react-showroom-client)
![badge-npm-version](https://img.shields.io/npm/v/@opuscapita/react-showroom-client.svg) 
![badge-license](https://img.shields.io/github/license/OpusCapita/react-showroom-client.svg)
[![NPM Downloads](https://img.shields.io/npm/dm/@opuscapita/react-showroom-client.svg)](https://npmjs.org/package/@opuscapita/react-showroom-client)


## Synopsis

Awesome react based components catalog which provides you with **markdown documentation** and **live examples**. :boom:

If you're interested in project development, please **star** it and send us **your** pull-requests!

![showroom-demo](./docs/demo.gif)

## Live demos

* [OpusCapita filemanager](https://demo.core.dev.opuscapita.com/filemanager/master/?currentComponentName=FileManager&maxContainerWidth=100%25&showSidebar=false)
* [@opuscapita/react-buttons](https://opuscapita.github.io/react-buttons/)
* [@opuscapita/react-rich-editors](https://opuscapita.github.io/react-rich-editors/)
* [@opuscapita/react-svg](https://opuscapita.github.io/react-svg/)
* [@opuscapita/react-dates](https://opuscapita.github.io/react-dates/)

## Start a new project in 2 minutes!

[Video](https://asciinema.org/a/dcif1setlofg8epuacvz0k0o9)

We have preconfigured a project template with  webpack, babel, tests, etc. ([full overview](./showroom-template/README.md))

Install template generator globally

```
npm install -g @opuscapita/react-showroom-template
```

Create an empty directory

```
mkdir my-react-project && cd my-react-project
```

Init a project and ask several questions

```
showroom init
```

Install deps

```
npm install
```

Done :star2: Let's run it!

```
npm start
```

Open in browser: [http://localhost:3000](http://localhost:3000)

---

You can easily add a new component.

```showroom add``` and specify component name

Component will be added to **src/client/components** directory

Component is a directory that includes:

* [<component_name>.DOCUMENTATION.md](./docs/example.DOCUMENTATION.md)
* <component_name>.react.js file with skeleton of component
* <component_name>.less file with styles
* index.js file with component export

## Add showroom to existing project

[See documentation here](./docs/embedded.md)

**Need help with integration to your open-source project? Create an issue or contact [us](https://github.com/OpusCapita/react-showroom-client#contributors)** :innocent:

## See also

* [Component documentation format](./docs/example.DOCUMENTATION.md)
* [Scope component](./docs/scope-component.md)

## Motivation to develop

The fundamental ideas of ReactJS is **modularity** and **code reuse**.
You shouldn't rewrite same things every time.

[What ReactJS creators say about it:](https://facebook.github.io/react/docs/thinking-in-react.html)

> How do you know what should be its own component? Just use the same techniques for deciding if you should create a new function or object. One such technique is the [single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle), that is, a component should ideally only do one thing. If it ends up growing, it should be decomposed into smaller subcomponents.

> As you start to build **large libraries of components**, you'll appreciate this **explicitness** and **modularity**, and with **code reuse**, your lines of code will start to shrink. :)

O.K., **ReactJS creators** :+1: We are sure you are clever.
We understand your ideas.
But if we want to have a **large libraries of components** we must have a **easy way to organize and browse** this library.

* Facebook has [thousands](https://facebook.github.io/react/docs/composition-vs-inheritance.html#so-what-about-inheritance)  of components.

* In contrast - now we **have no** common **UI** composable pieces which allows developers to construct complex **business logic** components fast with modern user interface for a better user experience. **Happy customer => happy seller**

* **Twitter Bootstrap/React Bootstrap** don't solve the problem. It has a good looking **typography** and a simple for use **grid system**. It has only a little number of basic components like buttons and inputs.

  For example if you have a vertical split-screen, default **bootstrap grid system** based on **html media-queries** became useless.     Media-queries reacts on **main viewport size** changes, but with split-screen we have two virtual viewports. **Simple react component** tracking size of specified `DOMNode` can solve the problem. If we can't find at http://npmjs.com we can write it themselves and reuse in future.

* There are lots of good-written **third-party** components. But they can't cover all use-cases. The problem of most of them:

  Written by different people with a different methodology of development and styles organization (style conflicts are not a rarity)

  We can't change them when met a limitations of **API**

**~~Allen Carr~~ The easy way to start organizing libraries:**

* Spent several hours/days creating a component? Spend 30 more minutes to put your component in a library and write simple documentation with a code example.
* Next time you or your teammate won't have to rewrite it again.
* Or you can spend several hours/days :clock10: to `/dev/null` again.
* **The choice is yours**.
* Take care about other developers and others take care about you :tophat:

## Contributors

| <img src="https://avatars.githubusercontent.com/u/24603787?v=3" width="100px;"/> | [**Alexey Sergeev**](https://github.com/asergeev-sc)     |
| :---: | :---: |
| <img src="https://avatars.githubusercontent.com/u/24652543?v=3" width="100px;"/> | [**Kirill Volkovich**](https://github.com/kvolkovich-sc) |

Contributing is welcome. We need YOU! :metal:

### Contributing guide

#### How to start

`npm start` npm script of `@opuscapita/react-showroom-client` can confuse if you want to contribute to showroom. Use this npm goal only to start showroom in server variant.

More preferred way is: run `npm link`, then `npm run link-mode`;

Install [showroom-template](https://github.com/OpusCapita/react-showroom-client/tree/master/showroom-template) separately.

Before running showroom-template's `npm start` run `npm link @opuscapita/react-showroom-client`. After that you can change showroom's source-code and see result.

> If you need more info about contribution - please create an [issue](https://github.com/OpusCapita/react-showroom-client/issues).

## License

**OpusCapita Showroom** is licensed under the Apache License, Version 2.0. See [LICENSE](./LICENSE) for the full license text.
