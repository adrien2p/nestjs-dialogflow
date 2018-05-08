import { DialogFlowResponse } from '../interfaces/dialog-flow-response.interface';
import { WebHookConfig } from '../interfaces/web-hook-config.interface';
export declare class DialogFlowController {
    private readonly handlers;
    constructor(handlers: Map<string, any>);
    static forRoute(webHookConfig: WebHookConfig): typeof DialogFlowController;
    dialogFlowWebHook(dialogFlowResponse: DialogFlowResponse, res: any): Promise<any>;
}
