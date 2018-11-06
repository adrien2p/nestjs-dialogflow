"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applyParamsMetadataDecorator(paramsMetadata, args) {
    if (paramsMetadata.length && args.length) {
        for (const param of paramsMetadata) {
            if (typeof args[param.index] === 'object') {
                if (!param.property)
                    continue;
                args[param.index] = param.property
                    .split('.')
                    .reduce((accumulator, property) => accumulator[property], args[param.index]);
            }
        }
    }
    return args;
}
exports.applyParamsMetadataDecorator = applyParamsMetadataDecorator;
