import 'reflect-metadata';
import { ModulesContainer } from '@nestjs/core/injector';
export declare const provider: {
    provide: string;
    useFactory: (moduleContainer: ModulesContainer) => Map<string, any>;
    inject: (typeof ModulesContainer)[];
};
