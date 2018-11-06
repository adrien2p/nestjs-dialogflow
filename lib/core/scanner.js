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
            const providers = [...metadata.filter((metatype) => typeof metatype === 'function')];
            providers.map(provider => {
                metadataScanner.scanFromPrototype(null, provider.prototype, methodName => {
                    const intentOrAction = Reflect.getMetadata(constant_1.DIALOG_FLOW_INTENT, Reflect.getOwnPropertyDescriptor(provider.prototype, methodName).value) ||
                        Reflect.getMetadata(constant_1.DIALOG_FLOW_ACTION, Reflect.getOwnPropertyDescriptor(provider.prototype, methodName).value);
                    if (intentOrAction) {
                        this.handlerContainer.register(intentOrAction, this.moduleRef.get(provider, { strict: false }), methodName);
                    }
                });
            });
        });
    }
}
exports.Scanner = Scanner;
