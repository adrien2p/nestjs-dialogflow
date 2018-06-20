# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2018-06-20

Update library to be used with nestjs V5

## [1.2.0] - 2018-05-17

### Add

* `@DialogFlowParam()` decorator in order to pick properties from `DialogFlowResponse` param and apply as new method parameters
* `Utils` internal usage
* `DIALOG_FLOW_PARAMS` constant for the new metadata key of `@DialogFlowParam()` decorator

### Update

* Improve and add tests, better coverage
* Constants has been updated to avoid any collision
* `OutputContexts` and `QueryResult` interfaces are now exposed

## [1.1.9] - 2018-05-12

### Update

* Rename `static forRoute` by `static forRoot`

## [1.1.6] - 2018-05-12

### Update

* README

## [1.1.5] - 2018-05-12

### Add

* `DialogFlowService` in order to handle the controller logic and dispatch intent
* tests in order to have well test suite
  * `Decorators/` tested
  * `module/[provider, component, controller]` tested
  
### Update

* `DialogFlowController` logic now delegated to the `DialogFlowService`

### Fixes

* `Handlers` provider stored handler method when no intent or action was found

## [1.1.4] - 2018-05-08

### Update

* Rename `DialogController` to `DialogFlowController` in order to keep coherence

## [1.1.3] - 2018-05-08

### Fixes

* Typo in the default config path in the module
* Remove console.log in the controller

### Add

* Samples directory
  * Add `01-dialogflow-handlers` that show how to use the library

## [1.1.2] - 2018-05-08

### Fixes

* Action support with `@DialogFlowAction()`

## [1.1.1] - 2018-05-07

### Fixes

* Regenerate the lib directory

## [1.1.0] - 2018-05-07

### Update

* `DialogFlowModule` now apply the `DialogFlowAuthorizationMiddleware` middleware to validate the token sent by `DialogFlow`

### Add

* `DialogFlowAuthorizationMiddleware` the middleware compare the token sent by `DialogFlow` to the token set in the env variable
`DIALOG_FLOW_AUTHORIZATION_TOKEN`

## [1.0.1] - 2018-05-07

### Update

Change project name.

## [1.0.0] - 2018-05-07

### Add

* Decorators to handle the intent/action sent from `DialogFlow`
  * `@DialogFlowIntent()` decorator to define the concerned intent instead of the action
  * `@DialogFlowAction()` decorator to define the concerned action instead of the intent
* `DialogFlowModule` Which provide the features
  * `DialogFlowController` configurable controller through `DialogFlowModule.forRoute(webHookConfig)`
  * `Handlers` provider which get the metadata from the components in order to store and return the handlers map
* Some interfaces to defined the response get from `DialogFlow` and the expected result await by `Dialogflow`
  * `DialogFlowFulfilmentResponse` which defined the expected response await by `DialogFlow`
  * `DialogFlowResponse` the response sent from `DialogFlow` and pass as argument to the handler
  * `WebHookConfig` which defined the expected parameters in order to configure the controller of `DialogFlowModule`
* Base files as `README`, `CHANGELOG`, `LICENCE`