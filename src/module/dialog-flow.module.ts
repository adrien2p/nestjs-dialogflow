import { DialogFlowAuthorizationMiddleware } from '../middlewares/dialog-flow-authorization.middleware';
import { DialogFlowController } from './dialog-flow.controller';
import { DialogFlowService } from './dialog-flow.component';
import { DynamicModule, MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';
import { provider } from './dialog-flow.provider';
import { WebHookConfig } from '../interfaces/web-hook-config.interface';

@Module({
    components: [
        DialogFlowService,
        provider
    ]
})
export class DialogFlowModule implements NestModule {
    public static forRoute(webHookConfig?: WebHookConfig): DynamicModule {
        webHookConfig = {
            basePath: 'web-hooks',
            postPath: 'dialog-flow',
            ...webHookConfig
        };

        return {
            module: DialogFlowModule,
            controllers: [DialogFlowController.forRoute(webHookConfig)]
        }
    }

    public configure(consumer: MiddlewaresConsumer) {
        return consumer
            .apply([DialogFlowAuthorizationMiddleware])
            .forRoutes(DialogFlowController);
    }
}