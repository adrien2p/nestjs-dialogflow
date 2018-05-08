import { DialogController } from './dialog-flow.controller';
import { DialogFlowAuthorizationMiddleware } from '../middlewares/dialog-flow-authorization.middleware';
import { DynamicModule, MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';
import { provider } from './dialog-flow.provider';
import { WebHookConfig } from '../interfaces/web-hook-config.interface';

@Module({
    components: [provider]
})
export class DialogFlowModule implements NestModule{
    public static forRoute(webHookConfig?: WebHookConfig): DynamicModule {
        webHookConfig = {
            basePath: 'web-hooks',
            postPath: 'dialog-flow',
            ...webHookConfig
        };

        return {
            module: DialogFlowModule,
            controllers: [DialogController.forRoute(webHookConfig)]
        }
    }

    public configure(consumer: MiddlewaresConsumer) {
        return consumer
            .apply([DialogFlowAuthorizationMiddleware])
            .forRoutes(DialogController);
    }
}