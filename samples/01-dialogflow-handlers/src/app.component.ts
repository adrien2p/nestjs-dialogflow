import { Injectable } from '@nestjs/common';
import { AppComponent2 } from './app.component2';
import {
    DialogFlowAction,
    DialogFlowFulfillmentResponse,
    DialogFlowIntent,
    DialogFlowResponse,
} from 'nestjs-dialogflow';

@Injectable()
export class AppComponent {
    constructor(private appComponent2: AppComponent2) {}

    @DialogFlowAction('events.debug')
    public handleEventDebug(dialogFlowResponse: DialogFlowResponse,): DialogFlowFulfillmentResponse {
        this.appComponent2.haveBeenCalled('events.debug');
        return {
            fulfillmentText: 'events.debug action well received.',
            fulfillmentMessages: [],
        };
    }

    @DialogFlowIntent('Event:debug')
    public handleEventDebug2(dialogFlowResponse: DialogFlowResponse,): DialogFlowFulfillmentResponse {
        this.appComponent2.haveBeenCalled('Event:debug');
        return {
            fulfillmentText: 'Events:debug intent well received.',
            fulfillmentMessages: [],
        };
    }
}
