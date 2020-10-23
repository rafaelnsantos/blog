---
title: Setup NextJS, cucumber, typescript, cypress, eslint
date: 2020-10-23T05:12:55.252Z
metaTitle: NextJS, cucumber, typescript, cypress, eslint
metaDescription: NextJS, cucumber, typescript, cypress, eslint
metaImage: uploads/meta.jpg
tags:
  - bdd
  - cucumber
  - typescript
  - nextjs
  - cypress
  - continuous integration
  - end to end testing
  - github actions
  - eslint
authors:
  - rafaelnsantos
  - andrebonizi
published: true
---
[commit](https://github.com/rafaelnsantos/blog/commit/cd5957999e1fd8136dfc48f99bca9ba70bc5afb6)

## Setup

### Install dependencies

```bash
yarn add -D @cucumber/cucumber @cypress/browserify-preprocessor @types/cypress-cucumber-preprocessor cypress cypress-cucumber-preprocessor eslint-plugin-cypress
```

### add scripts in package.json

```json
"cypress": "cypress",
"dev:test": "concurrently \"next dev\" \"cypress open\""
```

### Setup .eslintrc.js

add **'cypress'** to ***plugins***

add **'plugin:cypress/recommended'** to ***extends***

add **'cypress/globals': true** to ***env***


### Setup cypress

run cypress once to generate the default files.

create cypress.json

```json
{
  "baseUrl": "http://localhost:3000"
} 
```

#### Setup tsconfig

add **"cypress"** to ***exclude in tsconfig.json:


#### setup cucumber plugins

on **cypress/plugins/index.js** add 
```
const browserify = require('@cypress/browserify-preprocessor');
const cucumber = require('cypress-cucumber-preprocessor').default;
const resolve = require('resolve');

module.exports = (on, config) => {
  const options = {
    ...browserify.defaultOptions,
    typescript: resolve.sync('typescript', { baseDir: config.projectRoot }),
  };

  on('file:preprocessor', cucumber(options));
};
```

## Features

go on folder **cypress/integration/**

```gherkin
Feature: Guess the word

  Scenario: Maker starts a game
    Given o visitante entra no site
    When ele clica no blog
    Then deve acessar o blog 
```

## Step definitions

on folder **cypress/support/step_definitions/**


```
import { When, Then, Given } from 'cypress-cucumber-preprocessor/steps';

Given(/^o visitante entra no site$/, () => {
  cy.visit('/');
});

When(/^ele clica no blog$/, () => {
  cy.get('#link-blog').click();
});

Then(/^deve acessar o blog$/, () => {
  cy.title().should('equal', 'Blog | Monx.dev');
});
```