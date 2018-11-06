import { HandlerContainer } from './handlers';
import { ModuleRef } from '@nestjs/core';
import { ModulesContainer } from '@nestjs/core/injector';
export declare class Scanner {
    private readonly moduleRef;
    private readonly modulesContainer;
    private readonly handlerContainer;
    constructor(moduleRef: ModuleRef, modulesContainer: ModulesContainer, handlerContainer: HandlerContainer);
    scanAndRegisterHandlers(): void;
}
