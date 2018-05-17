import 'reflect-metadata';
import { applyParamsMetadataDecorator } from '../utils';
import { DIALOG_FLOW_ACTION, DIALOG_FLOW_PARAMS } from '../constant';

export const DialogFlowAction = (action: string) => {
	return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
		const originalMethod = descriptor.value;
		descriptor.value = (...args: any[]) => {
			const paramsMetadata = (Reflect.getMetadata(DIALOG_FLOW_PARAMS, target) || []).filter(p => {
				return p.key === key;
			});
			return originalMethod.apply(this, applyParamsMetadataDecorator(paramsMetadata, args));
		};

		/* Apply the intent value on the descriptor to be handled. */
		Reflect.defineMetadata(DIALOG_FLOW_ACTION, action, descriptor.value);
		return descriptor;
	};
};
