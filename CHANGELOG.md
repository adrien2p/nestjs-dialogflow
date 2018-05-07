# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2018-05-07

### Added

* Decorators to handle the intent/action sent from `DialogFlow`
  * `@DialogFlowIntent()` decorator to define the concerned intent instead of the action.
  * `@DialogFlowAction() `decorator to define the concerned action instead of the intent.
* `DialogFlowModule` Which provide the features
  * `DialogFlowController` configurable controller through `DialogFlowModule.forRoute(webHookConfig)`
  * `Handlers` provider which get the metadata from the components in order to store and return the handlers map
* Some interfaces to defined the response get from `DialogFlow` and the expected result await by `Dialogflow`
  * `DialogFlowFulfilmentResponse` which defined the expected response await by `DialogFlow`
  * `DialogFlowResponse` the response sent from `DialogFlow` and pass as argument to the handler
  * `WebHookConfig` which defined the expected parameters in order to configure the controller of `DialogFlowModule`
* Base files as `README`, `CHANGELOG`, `LICENCE`