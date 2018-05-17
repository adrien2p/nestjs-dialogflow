import 'reflect-metadata';
import { DIALOG_FLOW_PARAMS } from '../constant';

export const DialogFlowParam = (property?: string) => {
	return (target, key, index) => {
		const metadataValue = Reflect.getMetadata(DIALOG_FLOW_PARAMS, target) || [];
		metadataValue.push({ key, property, index });
		Reflect.defineMetadata(DIALOG_FLOW_PARAMS, metadataValue, target);
		return target;
	};
};
