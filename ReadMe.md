[![CircleCI](https://circleci.com/gh/pjolayres/isomorphic-react-boilerplate.svg?style=svg)](https://circleci.com/gh/pjolayres/isomorphic-react-boilerplate)
[![Travis CI](https://travis-ci.com/pjolayres/isomorphic-react-boilerplate.svg?branch=master)](https://travis-ci.com/pjolayres/isomorphic-react-boilerplate)
[![Azure Pipelines](https://pjolayres.visualstudio.com/CI/_apis/build/status/isomorphic-react-boilerplate?branchName=master)](https://pjolayres.visualstudio.com/CI/_build/latest?definitionId=2&branchName=master)

# Isomorphic React Boilerplate
Isomorphic Node.js + Express + ReactJS boilerplate.

## Features
- Uses Node.js Express for serving the web application.
- Uses webpack for packing and transpiling all assets (js, sass, images, etc.).
- Uses `@babel/preset-env` syntax for client, server, and webpack configuration.
- Enable Hot Module Replacement (HMR) for all client assets (js, scss, and images).
- Automatic server reload when any server-related code is modified.
- Sourcemaps for client, server, and stylesheets for easier debugging.
- Fully-configured debugging environment for Visual Studio Code (vscode).
- Ensure consistent coding convention through eslint.
- Redux for global state management
- Built-in react-router configuration for single-page-application (SPA) navigation
- URL and text localization
- RTL stylesheet support without the need for mixins
- Server-side rendering (isomorphic JavaScript) of client website.
- Critical CSS for faster Time-to-Interactive (TTI) with deferred full CSS for client website.
- Optional dockerized development and production environment.
- Unit testing using Jest.
- Integration testing using Jest.

## Quick Start

Install Prerequisites
- Install Node.js (>= v8.14.0)
- Install Nodemon by executing `npm install nodemon -g`

Execute the following in the terminal/command line:
```shell
npm install
npm run dev
```

## Scripts

### How to start development server

#### Local
```shell
npm run dev
```

This will clean the dist folder, run webpack, and start a web server at http://localhost:3000/. This will support Hot Replacement Module (HMR) for the react client application. This also automatically restarts the web server if any changes are made in the server source code.

#### Docker
```shell
docker-compose up --build
```

Same as if `npm run dev` is run locally, except that the web application will run inside a docker container with the necessary environment setup properly.

### How to build files for production
```shell
npm run prod
```

This will clean the dist folder and create an optimized react and server builds inside `/dist` folder. The server files will be inside `/dist/server`.
Also a `prod-bundle-stats.html` file will be created in the project root, this file shows an analysis for what included in the bundle

### Visual Studio Code Debugging
The boilerplate has provisions for debugging the Node.js server using Visual Studio Code. Note that **Node Debug 2** extension must be installed from vscode marketplace.

#### Local

1. Execute the following inside terminal:
```shell
npm run debug
```
1. Wait for webpack compilation to finish.
1. Open debug view in vscode sidebar and choose **Local: Attach to Node** from the configuration dropdown.
1. Start the debugger by pressing `F5`.

This configuration will attach the vscode debugger to the running node express server. Any changes to /src/server will automatically restart the web server and any breakpoints set in JavaScript files under this directory will cause vscode to pause execution. At the same time, any changes to /src/client files will automatically trigger the Hot Module Reloading (HMR) in ReactJS and update the relevant components in the client application.

This will start the web application in a docker environment and allows remote debugging. Note that the website will not start until a debugger is attached. This allows the developer to debug the application startup code.

#### Docker
```shell
docker-compose -f docker-compose.debug.yml up --build
```
1. Wait for the docker container to finish setting up and for webpack compilation to finish.
1. Open debug view in vscode sidebar and choose **Docker: Attach to Node** from the configuration dropdown.
1. Start the debugger by pressing `F5`.

This will start the web application in a docker environment that allows remote debugging. The debugging experience will be similar to that of debugging locally.

### Docker cleanup
To clean up docker containers:

```shell
docker-compose down -v --remove-orphans
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -a -q)
```

This will stop and remove all containers and delete any docker images in the system.

### Unit Tests
```shell
npm run test
```
Runs all tests with the file extension `.test.js`.

### Integration Tests
```shell
npm run test:integration
```
Runs all integration tests with the file extension `.test.integration.js`. By default, the API tests are executed from `http://localhost:3000`. To change this, set the `BASE_URL` environment variable before running the script.

Example:
```shell
BASE_URL=http://example.com npm run test:integration
```

## Deployment
### Docker
Compile the web application, build an image, and then push it to the Docker registry:
```shell
npm run prod

docker build . -f ./.docker/node.production.dockerfile -t [account]/[repository]:isomorphic-react-boilerplate

docker push [account]/[repository]:isomorphic-react-boilerplate
```

On the production server, setup Docker client and copy the docker-compose configuration files:
- `.docker/config/nginx.production.conf`
- `.docker/nginx.production.dockerfile`
- `docker-compose.production.yml`

On the production server, run the following commands:
```shell
docker-compose -f docker-compose.production.yml up --build
```

The web application is configured to run using `pm2` and served behind an `nginx` reverse proxy that serves the website under [localhost](http://localhost/) port 80.

### Amazon Web Services (AWS) Elastic Beanstalk
Prerequisites:
- [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- Setup the Elastic Beanstalk application through AWS console.

To deploy:
1. Run `eb init`, then choose the correct environment.
1. Then run the following commands:
```shell
npm run prod
eb deploy
```

Make sure the correct environment variables are set up in Elastic Beanstalk:

| Variable Name | Values                           | Purpose                                   |
| ------------- | -------------------------------- | ----------------------------------------- |
| NODE_ENV      | development, staging, production | Changes the behavior of the webserver     |
| AUTH_USER     | prototype                        | User name used when accessing the website |
| AUTH_PASS     | prototype                        | Password used when accessing the website  |

## Issues
1. Redux's `connect(...)` HoC is preventing `react-router` from updating the view upon location change. To work around this issue, wrap the element using `withRouter(...)` to forcibly update the view. [Reference](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md)

1. `favicons-webpack-plugin` requires the use of `PhantomJS` which doesn't play well with `node-alpine` docker image. Because of this, `node.development.dockerfile` uses standard node image which increases the size to > 1GB (compared to ~270 MB with `node-alpine`). Either remove dependency with `favicons-webpack-plugin` by pregenerating the icons, or wait for `favicons-webpack-plugin` to drop the use of `PhantomJS`.

## Technologies
- Node.js
- Express
- SASS (SCSS)
- PostCSS
- Bootstrap
- React
- React-Router
- JSX
- ES6
- Babel
- Webpack
- Docker
- Nodemon
- Hot Module Replacement (HMR)
- Redux
- Router
- Helmet
- Winston
- Jest

# TODO
- UI testing framework (Selenium/TestCafe)
- Production deployment guide using Kubernetes
