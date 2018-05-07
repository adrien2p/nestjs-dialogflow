import { DialogController } from './dialog-flow.controller';
import { DynamicModule, Module } from '@nestjs/common';
import { provider } from './dialog-flow.provider';
import { WebHookConfig } from '../interfaces/web-hook-config.interface';

@Module({
    components: [provider]
})
export class DialogFlowModule {
    public static forRoute(webHookConfig?: WebHookConfig): DynamicModule {
        webHookConfig = {
            basePath: 'web-hooks',
            postPath: 'dialog-glow',
            ...webHookConfig
        };

        return {
            module: DialogFlowModule,
            controllers: [DialogController.forRoute(webHookConfig)]
        }
    }
}