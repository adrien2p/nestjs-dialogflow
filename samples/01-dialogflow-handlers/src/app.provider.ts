import { Injectable } from '@nestjs/common';
import { AppProvider2 } from './app.provider2';
import {
    DialogFlowAction,
    DialogFlowFulfillmentResponse,
    DialogFlowIntent,
    DialogFlowResponse,
} from 'nestjs-dialogflow';

@Injectable()
export class AppProvider {
    constructor(private appProvider2: AppProvider2) {}

    @DialogFlowAction('events.debug')
    public handleEventDebug(dialogFlowResponse: DialogFlowResponse): DialogFlowFulfillmentResponse {
        this.appProvider2.haveBeenCalled('events.debug');
        return {
            fulfillmentText: 'events.debug action well received.',
            fulfillmentMessages: [],
        };
    }

    @DialogFlowIntent('Event:debug')
    public handleEventDebug2(dialogFlowResponse: DialogFlowResponse): DialogFlowFulfillmentResponse {
        this.appProvider2.haveBeenCalled('Event:debug');
        return {
            fulfillmentText: 'Events:debug intent well received.',
            fulfillmentMessages: [],
        };
    }
}
