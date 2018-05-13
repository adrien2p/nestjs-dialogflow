import { DialogFlowResponse } from '../interfaces/dialog-flow-response.interface';
import { DialogFlowService } from './dialog-flow.component';
import { WebHookConfig } from '../interfaces/web-hook-config.interface';
export declare class DialogFlowController {
    private readonly dialogFlowService;
    constructor(dialogFlowService: DialogFlowService);
    static forRoot(webHookConfig: WebHookConfig): typeof DialogFlowController;
    dialogFlowWebHook(dialogFlowResponse: DialogFlowResponse, res: any): Promise<any>;
}
