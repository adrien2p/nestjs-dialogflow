import { Body, Controller, HttpStatus, Inject, RequestMethod, Res } from '@nestjs/common';
import { DialogFlowResponse } from '../interfaces/dialog-flow-response.interface';
import { METHOD_METADATA, PATH_METADATA } from '../constant';
import { WebHookConfig } from '../interfaces/web-hook-config.interface';

@Controller()
export class DialogController {
    constructor(@Inject('Handlers') private readonly handlers: Map<string, any>) { }

    public static forRoute(webHookConfig: WebHookConfig) {
        Reflect.defineMetadata(PATH_METADATA, webHookConfig.basePath, DialogController);
        Reflect.defineMetadata(PATH_METADATA, webHookConfig.postPath, Object.getOwnPropertyDescriptor(DialogController.prototype, 'dialogFlowWebHook').value);
        Reflect.defineMetadata(METHOD_METADATA, RequestMethod.POST, Object.getOwnPropertyDescriptor(DialogController.prototype, 'dialogFlowWebHook').value);
        return DialogController;
    }

    async dialogFlowWebHook(@Body() dialogFlowResponse: DialogFlowResponse, @Res() res) {
        const intent = dialogFlowResponse.queryResult.intent.displayName;
        const action = dialogFlowResponse.queryResult.action;

        console.log(intent, action);
        const handler = this.handlers.get(intent) || this.handlers.get(action);
        if (!handler) {
            throw new Error(`Unknown handler for ${intent ? `intent ${intent}.` : (action ? `action ${action}.` : 'an undefined intent and/or action.')}`);
        }

        const fulfillment = await handler.call(this, dialogFlowResponse);
        return res.status(HttpStatus.OK).send(fulfillment);
    }
}