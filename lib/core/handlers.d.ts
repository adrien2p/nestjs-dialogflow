import { Provider } from '@nestjs/common';
import { DialogFlowFulfillmentResponse } from '../interfaces/dialog-flow-fulfillment-response.interface';
import { DialogFlowResponse } from '../interfaces/dialog-flow-response.interface';
export declare class HandlerContainer {
    private container;
    register(actionOrIntent: string, provider: Provider, methodName: string): void;
    findAndCallHandlers(actionOrIntent: string, dialogFlowResponse: DialogFlowResponse): Promise<DialogFlowFulfillmentResponse>;
}
