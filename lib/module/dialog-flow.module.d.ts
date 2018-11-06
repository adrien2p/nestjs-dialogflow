import 'reflect-metadata';
import { DynamicModule, MiddlewareConsumer, NestModule, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ModulesContainer } from '@nestjs/core/injector';
import { HandlerContainer } from '../core';
import { WebHookConfig } from '../interfaces/web-hook-config.interface';
export declare class DialogFlowModule implements NestModule, OnModuleInit {
    private readonly moduleRef;
    private readonly modulesContainer;
    private readonly handlerContainer;
    static forRoot(webHookConfig?: WebHookConfig): DynamicModule;
    constructor(moduleRef: ModuleRef, modulesContainer: ModulesContainer, handlerContainer: HandlerContainer);
    onModuleInit(): any;
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer;
}
