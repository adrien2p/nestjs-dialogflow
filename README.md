[![Build Status](https://travis-ci.org/adrien2p/nestjs-dialogflow.svg?branch=master)](https://travis-ci.org/adrien2p/nestjs-dialogflow.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/adrien2p/nestjs-dialogflow/badge.svg?branch=master)](https://coveralls.io/github/adrien2p/nestjs-dialogflow?branch=master)
[![npm version](https://badge.fury.io/js/nestjs-dialogflow.svg)](https://badge.fury.io/js/nestjs-dialogflow)
[![npm](https://img.shields.io/npm/dm/nestjs-dialogflow.svg)](https://badge.fury.io/js/nestjs-dialogflow)

# DialogFlow module for NestJS :satellite:

Dialog flow module that simplify the web hook handling for your NLP application using NestJS

## Getting Started

To start using this module you should run the following command

`npm i nestjs-dialogflow @nestjs/common @nestjs/core reflect-metadata`

### Features

There are 3 decorators provided by the module that allow you to handle intent/action or pick properties from the response.


| Name | Usage | behavior |
|:----:|:-----:|:--------:|
|`@DialogFlowIntent(/*...*/)`| `@DialogFlowIntent('myIntent') public method(param: DialogFlowResponse) ... `| Handle the specified intent into the decorated method |
|`@DialogFlowAction(/*...*/)`| `@DialogFlowAction('myAction') public method(param: DialogFlowResponse) ... `| Handle the specified action into the decorated method |
|`@DialogFlowParam(/*...*/)`| `@DialogFlowIntent('myIntent') public method(@DialogFlowParam('queryResult') param: QueryResult) ... `| Get the value of the property specified through the parameter decorator |


### Set up

To use the module, you have to import it into your `ApplicationModule` and call the `forRoot` in order
to initialize the module. The `forRoot` method can take as parameters an object with a `basePath` and a `postPath`
in order to configure the controller used for the web hook.

```ts
@Module({
    imports: [
        DialogFlowModule.forRoot({
            basePath: 'web-hooks',
            postPath: 'dialog-flow'
        })
    ]
})
export class ApplicationModule { }
```

After that, you have to go to your dialogFlow account to set up the url that should be reach to provide the result of
your NLP request into the `Fulfillment` section of your agent. The url with the default config should looks like `https://myurl.me/web-hooks/dialog-flow`

To handle an intent, you have to create your own component that will implement all the methods needed in order to handle 
the concerned intents/action.

```ts
@Component()
export class MyDialogFlowComponent {
    
    @DialogFlowIntent('My:intent1')
    public async handleMyIntent1(dialogFlowResponse: DialogFlowResponse): Promise<DialogFlowFulfillmentResponse> {
        /* Your code here */
        return {} as DialogFlowFulfillmentResponse;
    }

    @DialogFlowIntent('My:intent2')
    public async handleMyIntent2(dialogFlowResponse: DialogFlowResponse): Promise<DialogFlowFulfillmentResponse> {
        /* Your code here */
        return {} as DialogFlowFulfillmentResponse;
    }
    
}
```

You also have the possibility to pick any properties that you need directly from the `dialogFlowResponse`, to get them from 
the handler parameters. To do that, you can use the `@DialogFlowParam` decorator and pass as parameter a string path to
the property that you want to pick.

```ts
@Component()
export class MyDialogFlowComponent {
    
    @DialogFlowIntent('My:intent1')
    public async handleMyIntent1(@DialogFlowParam('queryResult.outputContexts') outputContexts: OutputContexts): Promise<DialogFlowFulfillmentResponse> {
        /* Your code here */
        return {} as DialogFlowFulfillmentResponse;
    }

    @DialogFlowIntent('My:intent2')
    public async handleMyIntent2(@DialogFlowParam('queryResult') queryResult: QueryResult): Promise<DialogFlowFulfillmentResponse> {
        /* Your code here */
        return {} as DialogFlowFulfillmentResponse;
    }
    
}
```

Inside the `DialogFlowModule` a middleware is apply in order to validate the token sent by `dialogFlow`, so when your start
your server, you will have to set the `DIALOG_FLOW_AUTHORIZATION_TOKEN` env variable.

That's it, you can run your application and test it !! :)

## Built With

* [NestJS](https://github.com/nestjs/nest) A progressive Node.js framework for building efficient and scalable server-side applications on top of TypeScript & JavaScript (ES6 / ES7 / ES8) heavily inspired by Angular 


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/adrien2p/nestjs-dialogflow/tags). 

## Authors

* **Adrien de Peretti** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
