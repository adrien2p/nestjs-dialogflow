import { DynamicModule } from '@nestjs/common';
import { WebHookConfig } from '../interfaces/web-hook-config.interface';
export declare class DialogFlowModule {
    static forRoute(webHookConfig?: WebHookConfig): DynamicModule;
}
