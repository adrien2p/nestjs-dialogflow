"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const constant_1 = require("../constant");
const metadata_scanner_1 = require("@nestjs/core/metadata-scanner");
const injector_1 = require("@nestjs/core/injector");
exports.provider = {
    provide: 'Handlers',
    useFactory: (moduleContainer) => {
        const metadataScanner = new metadata_scanner_1.MetadataScanner();
        const modules = [...moduleContainer.values()];
        const handlers = new Map();
        modules.forEach(({ metatype }) => {
            const metadata = Reflect.getMetadata(constant_1.nestMetadata.COMPONENTS, metatype) || [];
            const components = [...metadata.filter(metatype => typeof metatype === 'function')];
            components.map(component => {
                const reflectedMetadata = metadataScanner.scanFromPrototype(null, component.prototype, method => {
                    const intentOrAction = Reflect.getMetadata(constant_1.DIALOG_FLOW_INTENT, component.prototype[method]) ||
                        Reflect.getMetadata(constant_1.DIALOG_FLOW_ACTION, component.prototype[method]);
                    return {
                        handler: component.prototype[method],
                        intentOrAction
                    };
                });
                [...reflectedMetadata].forEach(metadata => {
                    handlers.set(metadata.intentOrAction, metadata.handler);
                });
            });
        });
        return handlers;
    },
    inject: [injector_1.ModulesContainer]
};
