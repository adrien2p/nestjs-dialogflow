import { Injectable, Provider } from '@nestjs/common';
import { DialogFlowFulfillmentResponse } from '../interfaces/dialog-flow-fulfillment-response.interface';
import { DialogFlowResponse } from '../interfaces/dialog-flow-response.interface';

@Injectable()
export class HandlerContainer {
	private container: Map<string, { provider: Provider; methodName: string }> = new Map();

	public register(actionOrIntent: string, provider: Provider, methodName: string): void {

    if (this.container.has(actionOrIntent)) {
      throw new Error(`Cannot have duplicate handlers for intent [${actionOrIntent}]`);
    }

		this.container.set(actionOrIntent, {provider, methodName});
	}

	public async findAndCallHandlers(
		actionOrIntent: string,
		dialogFlowResponse: DialogFlowResponse,
	): Promise<DialogFlowFulfillmentResponse> {

		if (!this.container.has(actionOrIntent)) {
			throw new Error(`Unknown handler for [${actionOrIntent}].`);
		}

		const registeredHandler = this.container.get(actionOrIntent);

		const { provider, methodName } = registeredHandler;

		return await provider[methodName](dialogFlowResponse);
	}
}
