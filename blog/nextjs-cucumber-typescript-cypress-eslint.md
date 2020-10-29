---
title: Setup cucumber and cypress on NextJS
date: 2020-10-23T05:12:55.252Z
metaTitle: Setup cucumber and cypress on NextJS
metaDescription: Setup cucumber and cypress on NextJS
metaImage: uploads/meta.jpg
tags:
  - setup
  - cucumber
  - typescript
  - nextjs
  - cypress
  - eslint
authors:
  - rafaelnsantos
  - andrebonizi
published: true
---
<h2>Setup</h2>
<h3>Install dependencies</h3>
<div>
<pre class="language-css"><code>yarn add -D @cucumber/cucumber @cypress/browserify-preprocessor @types/cypress-cucumber-preprocessor cypress cypress-cucumber-preprocessor eslint-plugin-cypress</code></pre>
</div>
<div>&nbsp;</div>
<h3>add scripts in package.json</h3>
<pre class="language-markup"><code>"cypress": "cypress",
"dev:test": "concurrently \"next dev\" \"cypress open\""</code></pre>
<div>&nbsp;</div>
<h3>Setup .eslintrc.js</h3>
<pre class="language-javascript"><code>module.exports = {
  ...
  plugins: [..., 'cypress'],
  extends: [
    ...
    'plugin:cypress/recommended',
  ],
  env: {
    ...,
    'cypress/globals': true
  }
}</code></pre>
<div>add "<em>cypress"</em>&nbsp;to <strong>plugins</strong></div>
<div>add <em>"plugin:cypress/recommended"</em> to <strong>extends</strong></div>
<div>add <em>"cypress/globals": true</em> to <strong><em>env</em></strong></div>
<p>&nbsp;</p>
<h3>Setup cypress</h3>
<div>&nbsp;</div>
<div>run&nbsp;cypress&nbsp;once&nbsp;to&nbsp;generate&nbsp;the&nbsp;default&nbsp;files.</div>
<div>&nbsp;</div>
<div>yarn dev:test</div>
<div>&nbsp;</div>
<h4>create&nbsp;cypress.json</h4>
<div>
<pre class="language-markup"><code>{
  "baseUrl": "http://localhost:3000"
} </code></pre>
<p>&nbsp;</p>
</div>
<h4>Setup tsconfig</h4>
<div>add<em> "cypress"</em>&nbsp; <strong>exclude </strong>in <strong>tsconfig.json</strong></div>
<div>&nbsp;</div>
<h4>setup cucumber plugins</h4>
<div>on <strong>cypress/plugins/index.js</strong>&nbsp;add&nbsp;</div>
<div>
<pre class="language-javascript"><code>const browserify = require('@cypress/browserify-preprocessor');
const cucumber = require('cypress-cucumber-preprocessor').default;
const resolve = require('resolve');


module.exports = (on, config) =&gt; {
  const options = {
    ...browserify.defaultOptions,
    typescript: resolve.sync('typescript', { baseDir: config.projectRoot }),
  };


  on('file:preprocessor', cucumber(options));
};</code></pre>
<p>&nbsp;</p>
</div>
<h2>Features</h2>
<div>place the .feature files in <strong>cypress/integration/ </strong>folder</div>
<div>&nbsp;</div>
<div>
<pre class="language-markup"><code>Feature: Navigation
  Scenario: Guest visits website
    Given guest visits the homepage
    When he clicks blog on navigation
    Then he must visit the blog</code></pre>
<p>&nbsp;</p>
</div>
<h2>Step definitions</h2>
<div>place the step definitions in <strong>cypress/support/step_definitions/ </strong>folder</div>
<div>&nbsp;</div>
<div>
<pre class="language-javascript"><code>import { When, Then, Given } from 'cypress-cucumber-preprocessor/steps';

Given(/^guest visits the homepage$/, () =&gt; {
  cy.visit('/');
});

When(/^he clicks blog on navigation$/, () =&gt; {
  cy.get('#link-blog').click();
});

Then(/^he must visit the blog$/, () =&gt; {
  cy.title().should('equal', 'Blog | Monx.dev');
});</code></pre>
<p>&nbsp;</p>
<h2>Run tests with Git Action</h2>
<p><strong>.github/workflows/cypress.yml</strong></p>
<pre class="language-markup"><code>name: Cypress Test

on: push

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Use Node.js
      uses: actions/setup-node@v1
      with:
        node-version: '12.x'

    - name: Cypress run
      uses: cypress-io/github-action@v2
      with:
        cache-key: cypress-${{ hashFiles('**/yarn.lock') }}
        build: yarn build
        start: yarn start</code></pre>
</div>