export function applyParamsMetadataDecorator(paramsMetadata: any[], args: any[]): any[] {
    if (paramsMetadata.length && args.length) {
        /* Override the original parameter value with the expected property of the value even a deep property. */
        for (const param of paramsMetadata) {
            if (typeof args[param.index] === 'object') {
                if (!param.property) continue;
                args[param.index] = param.property
                    .split('.')
                    .reduce((accumulator, property) => accumulator[property], args[param.index]);
            }
        }
    }
    return args;
}
