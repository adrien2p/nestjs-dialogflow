import 'reflect-metadata';
import { DIALOG_FLOW_ACTION, DIALOG_FLOW_INTENT } from '../constant';
import { DialogFlowAuthorizationMiddleware } from '../middlewares/dialog-flow-authorization.middleware';
import { DialogFlowController } from './dialog-flow.controller';
import { DialogFlowProvider } from './dialog-flow.provider';
import { DiscoveryModule, DiscoveryService } from '@nestjs-plus/discovery';
import {
	DynamicModule,
	MiddlewareConsumer,
	Module,
	NestModule,
	OnModuleInit,
} from '@nestjs/common';
import { HandlerContainer } from '../core';
import { WebHookConfig } from '../interfaces/web-hook-config.interface';

@Module({
	imports: [DiscoveryModule],
	providers: [DialogFlowProvider, HandlerContainer],
	controllers: [DialogFlowController],
})
export class DialogFlowModule implements NestModule, OnModuleInit {
	public static forRoot(webHookConfig?: WebHookConfig): DynamicModule {
		webHookConfig = {
			basePath: 'web-hooks',
			postPath: 'dialog-flow',
			...webHookConfig,
		};

		return {
			module: DialogFlowModule,
			providers: [DialogFlowProvider, HandlerContainer],
			controllers: [DialogFlowController.forRoot(webHookConfig)],
		};
	}

	constructor(
		private readonly discoveryService: DiscoveryService,
		private readonly handlerContainer: HandlerContainer,
	) {}

	public async onModuleInit(): Promise<void> {
		const providersMethodAndMetaForIntent = await this.discoveryService.providerMethodsWithMetaAtKey<
			string
		>(DIALOG_FLOW_INTENT);
		const providersMethodAndMetaForAction = await this.discoveryService.providerMethodsWithMetaAtKey<
			string
		>(DIALOG_FLOW_ACTION);

		const providersMethodAndMeta = [
			...providersMethodAndMetaForIntent,
			...providersMethodAndMetaForAction,
		];

		for (const providerMethodAndMeta of providersMethodAndMeta) {
			this.handlerContainer.register(
				providerMethodAndMeta.meta,
				providerMethodAndMeta.discoveredMethod.parentClass.instance,
				providerMethodAndMeta.discoveredMethod.methodName,
			);
		}
	}

	public configure(consumer: MiddlewareConsumer) {
		return consumer.apply(DialogFlowAuthorizationMiddleware).forRoutes(DialogFlowController);
	}
}
