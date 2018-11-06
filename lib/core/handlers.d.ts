import { Provider } from '@nestjs/common';
import { DialogFlowFulfillmentResponse } from '../interfaces/dialog-flow-fulfillment-response.interface';
import { DialogFlowResponse } from '../interfaces/dialog-flow-response.interface';
export declare class HandlerContainer {
    private container;
    constructor();
    register(actionOrIntent: string, provider: Provider, methodName: string): void;
    findAndCallHandlers(dialogFlowResponse: DialogFlowResponse, { intent, action }: {
        intent: string;
        action: string;
    }): Promise<DialogFlowFulfillmentResponse>;
}
