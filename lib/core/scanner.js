"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_scanner_1 = require("@nestjs/core/metadata-scanner");
const constant_1 = require("../constant");
class Scanner {
    constructor(moduleRef, modulesContainer, handlerContainer) {
        this.moduleRef = moduleRef;
        this.modulesContainer = modulesContainer;
        this.handlerContainer = handlerContainer;
    }
    scanAndRegisterHandlers() {
        const metadataScanner = new metadata_scanner_1.MetadataScanner();
        const modules = [...this.modulesContainer.values()];
        modules.forEach(({ metatype }) => {
            const metadata = Reflect.getMetadata(constant_1.nestMetadata.COMPONENTS, metatype) || [];
            const components = [...metadata.filter((metatype) => typeof metatype === 'function')];
            components.map(component => {
                const reflectedMetadata = metadataScanner
                    .scanFromPrototype(null, component.prototype, methodName => {
                    const intentOrAction = Reflect.getMetadata(constant_1.DIALOG_FLOW_INTENT, Reflect.getOwnPropertyDescriptor(component.prototype, methodName).value) ||
                        Reflect.getMetadata(constant_1.DIALOG_FLOW_ACTION, Reflect.getOwnPropertyDescriptor(component.prototype, methodName).value);
                    return intentOrAction ? { component, intentOrAction, methodName } : null;
                })
                    .filter(v => v);
                [...reflectedMetadata].forEach(metadata => {
                    this.handlerContainer.register(metadata.intentOrAction, this.moduleRef.get(metadata.component, { strict: false }), metadata.methodName);
                });
            });
        });
    }
}
exports.Scanner = Scanner;
