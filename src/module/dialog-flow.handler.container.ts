import { Injectable, Provider } from '@nestjs/common';
import { DialogFlowFulfillmentResponse } from '../interfaces/dialog-flow-fulfillment-response.interface';
import { DialogFlowResponse } from '../interfaces/dialog-flow-response.interface';

@Injectable()
export class HandlerContainer {
	private container: Map<string, { provider: Provider; methodName: string }[]> = new Map();

	public register(actionOrIntent: string, provider: Provider, methodName: string): void {
		const registeredHandlers = this.container.get(actionOrIntent) || [];
		registeredHandlers.push({ provider, methodName });
		this.container.set(actionOrIntent, registeredHandlers);
	}

	public async findAndCallHandlers(
		actionOrIntent: string,
		dialogFlowResponse: DialogFlowResponse,
	): Promise<DialogFlowFulfillmentResponse> {
		const registeredHandlers = this.container.get(actionOrIntent);

		if (!registeredHandlers) {
			throw new Error(`Unknown handler for ${actionOrIntent}.`);
		}

		if (registeredHandlers.length > 1) {
			throw new Error(`Multiple handler found for ${actionOrIntent}`);
		}

		const { provider, methodName } = registeredHandlers.pop();

		return await provider[methodName](dialogFlowResponse);
	}
}
