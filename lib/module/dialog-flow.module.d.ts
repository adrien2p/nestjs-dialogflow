import { DynamicModule, MiddlewareConsumer, NestModule, OnModuleInit } from '@nestjs/common';
import { WebHookConfig } from '../interfaces/web-hook-config.interface';
import { ModulesContainer } from '@nestjs/core/injector';
import { ModuleRef } from '@nestjs/core';
import 'reflect-metadata';
import { HandlerContainer } from './../core';
export declare class DialogFlowModule implements NestModule, OnModuleInit {
    private readonly modulesContainer;
    private readonly moduleRef;
    private readonly handlerContainer;
    static forRoot(webHookConfig?: WebHookConfig): DynamicModule;
    constructor(modulesContainer: ModulesContainer, moduleRef: ModuleRef, handlerContainer: HandlerContainer);
    onModuleInit(): any;
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer;
}
