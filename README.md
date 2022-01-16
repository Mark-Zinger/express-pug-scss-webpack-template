# template EXPRESS PUG SCSS WEBPACK
##### (Work in progress...)
## Need Todo: 
    * Add Express support

## Setup this template:

```shell
    git clone https://github.com/Mark-Zinger/express-pug-scss-webpack-template.git

    cd client
    npm install
    npm run start
```
## Component(create|remove|refresh):

All components exists in './client/src/components'.

You can create or remove components;

```shell
    cd client

    // Component create
    npm run component:create <component-name>

    // Component remove
    npm run component:remove <component-name>
```
## Pages
All pages exists in './client/src/pages'.

To add a new page just create a file <page-name>.pug in pages folder. 

The handler will automatically add the page to the build webpack process. 



