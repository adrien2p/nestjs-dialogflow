import { DynamicModule, MiddlewaresConsumer, NestModule } from '@nestjs/common';
import { WebHookConfig } from '../interfaces/web-hook-config.interface';
export declare class DialogFlowModule implements NestModule {
    static forRoute(webHookConfig?: WebHookConfig): DynamicModule;
    configure(consumer: MiddlewaresConsumer): MiddlewaresConsumer;
}
