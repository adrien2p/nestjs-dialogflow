import 'reflect-metadata';
import { DIALOG_FLOW_ACTION, DIALOG_FLOW_INTENT, nestMetadata } from '../constant';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { ModulesContainer } from '@nestjs/core/injector';

export const provider = {
    provide: 'Handlers',
    useFactory: (moduleContainer: ModulesContainer) => {
        const metadataScanner = new MetadataScanner();
        const modules = [...moduleContainer.values()];

        const handlers = new Map<string, any>();
        modules.forEach(({ metatype }) => {
            const metadata = Reflect.getMetadata(nestMetadata.COMPONENTS, metatype) || [];
            const components = [...metadata.filter(metatype => typeof metatype === 'function')];

            components.map(component => {
                const reflectedMetadata = metadataScanner.scanFromPrototype(null, component.prototype, method => {
                    const intentOrAction = Reflect.getMetadata(DIALOG_FLOW_INTENT, Reflect.getOwnPropertyDescriptor(component.prototype, method).value) ||
                        Reflect.getMetadata(DIALOG_FLOW_ACTION,  Reflect.getOwnPropertyDescriptor(component.prototype, method).value);
                    return {
                        handler: component.prototype[method],
                        intentOrAction
                    }
                });
                [...reflectedMetadata].forEach(metadata => {
                    handlers.set(metadata.intentOrAction, metadata.handler);
                });
            });
        });

        return handlers;
    },
    inject: [ModulesContainer]
};
