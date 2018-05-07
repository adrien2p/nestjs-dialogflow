import { WebHookConfig } from '../interfaces/web-hook-config.interface';
import { DialogFlowResponse } from '../interfaces/dialog-flow-response.interface';
export declare class DialogController {
    private readonly handlers;
    constructor(handlers: Map<string, any>);
    static forRoute(webHookConfig: WebHookConfig): typeof DialogController;
    dialogFlowWebHook(dialogFlowResponse: DialogFlowResponse, res: any): Promise<void>;
}
