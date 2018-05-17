"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const constant_1 = require("../constant");
exports.DialogFlowParam = (property) => {
    return (target, key, index) => {
        const metadataValue = Reflect.getMetadata(constant_1.DIALOG_FLOW_PARAMS, target) || [];
        metadataValue.push({ key, property, index });
        Reflect.defineMetadata(constant_1.DIALOG_FLOW_PARAMS, metadataValue, target);
        return target;
    };
};
