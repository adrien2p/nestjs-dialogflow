import { DialogFlowFulfillmentResponse } from '../interfaces/dialog-flow-fulfillment-response.interface';
import { DialogFlowResponse } from '../interfaces/dialog-flow-response.interface';
import { HandlerContainer } from './../core';
export declare class DialogFlowService {
    private readonly handlerContainer;
    constructor(handlerContainer: HandlerContainer);
    handleIntentOrAction(dialogFlowResponse: DialogFlowResponse): Promise<DialogFlowFulfillmentResponse>;
}
