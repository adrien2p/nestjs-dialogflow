import { Injectable, Provider } from '@nestjs/common';
import { DialogFlowFulfillmentResponse } from '../interfaces/dialog-flow-fulfillment-response.interface';
import { DialogFlowResponse } from '../interfaces/dialog-flow-response.interface';

@Injectable()
export class HandlerContainer {
	private container: Map<string, { provider: Provider; methodName: string }> = new Map();

	constructor() {}

	public register(actionOrIntent: string, provider: Provider, methodName: string): void {
		if (this.container.has(actionOrIntent)) {
			throw new Error(`Cannot have duplicate handlers for intent [${actionOrIntent}]`);
		}

		this.container.set(actionOrIntent, { provider, methodName });
	}

	public async findAndCallHandlers(
		dialogFlowResponse: DialogFlowResponse,
		{ intent, action }: { intent: string; action: string },
	): Promise<DialogFlowFulfillmentResponse> {
		if (!this.container.has(intent) && !this.container.has(action)) {
			throw new Error(`Unknown handler for [intent: ${intent}, action: ${action}].`);
		}

		const { provider, methodName } = this.container.get(intent) || this.container.get(action);
		return await provider[methodName](dialogFlowResponse);
	}
}
