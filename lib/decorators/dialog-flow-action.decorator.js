"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const utils_1 = require("../utils");
const constant_1 = require("../constant");
exports.DialogFlowAction = (action) => {
    return (target, key, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = (...args) => {
            const paramsMetadata = (Reflect.getMetadata(constant_1.DIALOG_FLOW_PARAMS, target) || []).filter(p => {
                return p.key === key;
            });
            return originalMethod.apply(this, utils_1.applyParamsMetadataDecorator(paramsMetadata, args));
        };
        Reflect.defineMetadata(constant_1.DIALOG_FLOW_ACTION, action, descriptor.value);
        return descriptor;
    };
};
