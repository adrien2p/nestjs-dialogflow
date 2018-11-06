import 'reflect-metadata';
import { DialogFlowAuthorizationMiddleware } from '../middlewares/dialog-flow-authorization.middleware';
import { DialogFlowController } from './dialog-flow.controller';
import { DialogFlowComponent } from './dialog-flow.component';
import {
	DynamicModule,
	MiddlewareConsumer,
	Module,
	NestModule,
	OnModuleInit,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ModulesContainer } from '@nestjs/core/injector';
import { Scanner, HandlerContainer } from '../core';
import { WebHookConfig } from '../interfaces/web-hook-config.interface';

@Module({
	providers: [DialogFlowComponent, HandlerContainer],
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
			providers: [DialogFlowComponent, HandlerContainer],
			controllers: [DialogFlowController.forRoot(webHookConfig)],
		};
	}

	constructor(
		private readonly moduleRef: ModuleRef,
		private readonly modulesContainer: ModulesContainer,
		private readonly handlerContainer: HandlerContainer,
	) {}

	public onModuleInit(): any {
		const scanner = new Scanner(this.moduleRef, this.modulesContainer, this.handlerContainer);
		scanner.scanAndRegisterHandlers();
	}

	public configure(consumer: MiddlewareConsumer) {
		return consumer.apply(DialogFlowAuthorizationMiddleware).forRoutes(DialogFlowController);
	}
}
