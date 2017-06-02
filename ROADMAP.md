# Roadmap

## Make initial configuration easier

* Remove dependence on webpack configs.

  * According to [@asergeev-sc](https://github.com/asergeev-sc) initial setup described in this [document](https://github.com/OpusCapita/react-showroom-client/blob/d6984d1011ebc3ae83cca068e2349b41b0f9113e/docs/embedded.md) looks too complicated. We can move all these steps into showroom iteself.
  * Components are exported in CommonJS module **dev.index.js** :
  
    ```
    module.exports = {
      Button: require('./components/Button'),
      Modal: require('./components/Modal')
    }
    ```
  * 
  
* Make `react.md` file names instead of `DOCUMENTATION.md`.
* Make showroom setup without explicit installation of `@opuscaptia/react-showroom-server`.
* Make showroom startable via CLI `npm run showroom [params]`.
  
  **Params:**
  
  Make it configureble via file **.react-showroom**

  * -t --target - path to **dev.index.js** file
  * -d --components-root (default - ./src) - direcotry where search documentation and wrapper files (now it SCOPE files)
  * --add-css - additional link to additional external css files
  * --add-script - additional link to additional external scripts
  * --config - paht to **.react-showroom** config file
  
* Remove bootstrap dependency from codebase.
* Rethink passing environment/other variables to documentation files.
* Update **@opuscapita/react-showroom-template** structure according to [this](https://github.com/OpusCapita/npm-module-template) project.

## Aggregate documentation service (draft)

Think about new project which aggregates multiple projects instead of support `@opuscapita/react-showroom-server`. 

Server side:

* Config example

```
{
  polling: true,
  pollingInterval: 60, // minutes
  projects: {
    'react-dates-master': {
      repositoryUrl: 'https://github.com/OpusCapita/react-dates',
      repositoryType: 'git',
      branch: 'master',
      installCommand: 'npm install'
      runCommand: 'npm start'
    },
    ...
  }
}
```

* REST API (draft)

  * **GET** `/projects`
  * **GET** `/project/:id`
  * **PUT** `/project/:id`
  * **DELETE** `/project/:id`

  * **POST** `/project/run/:id`
  * **POST** `/project/stop/:id`
  * **POST** `/project/restart/:id`
  * **POST** `/project/reinstall/:id`
  * **POST** `/project/refetch/:id`

Layout:

* At sidebar - links to running demo pages.

  Should display status (run, stop, run-error)
  Should contanin control (run, stop, run-error)
  
* At right side - markdown content of project info files: README.md, CHANGES.md, etc.
