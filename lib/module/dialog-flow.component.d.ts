import { DialogFlowFulfillmentResponse } from '../interfaces/dialog-flow-fulfillment-response.interface';
import { DialogFlowResponse } from '../interfaces/dialog-flow-response.interface';
export declare class DialogFlowService {
    private readonly handlers;
    constructor(handlers: Map<string, any>);
    handleIntentOrAction(dialogFlowResponse: DialogFlowResponse): Promise<DialogFlowFulfillmentResponse>;
}
