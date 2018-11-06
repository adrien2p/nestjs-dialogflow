import { DialogFlowResponse } from '../interfaces/dialog-flow-response.interface';
import { DialogFlowComponent } from './dialog-flow.component';
import { WebHookConfig } from '../interfaces/web-hook-config.interface';
export declare class DialogFlowController {
    private readonly DialogFlowComponent;
    constructor(DialogFlowComponent: DialogFlowComponent);
    static forRoot(webHookConfig: WebHookConfig): typeof DialogFlowController;
    dialogFlowWebHook(dialogFlowResponse: DialogFlowResponse, res: any): Promise<any>;
}
