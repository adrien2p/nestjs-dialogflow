import { Injectable, Provider } from '@nestjs/common';
import { DialogFlowFulfillmentResponse } from '../interfaces/dialog-flow-fulfillment-response.interface';
import { DialogFlowResponse } from '../interfaces/dialog-flow-response.interface';

@Injectable()
export class DialogFlowService {
	private readonly handlers: Map<string, { provider: Provider, methodName: string }> = new Map<string, { provider: Provider, methodName: string }>();

	public async handleIntentOrAction(
		dialogFlowResponse: DialogFlowResponse,
	): Promise<DialogFlowFulfillmentResponse> {
		const intent = dialogFlowResponse.queryResult.intent.displayName;
		const action = dialogFlowResponse.queryResult.action;

		const matchedHandlers = [this.handlers.get(intent), this.handlers.get(action)].filter(v => v);

		if (matchedHandlers.length === 0) {
			throw new Error(
				`Unknown handler for ${
					intent
						? `intent: ${intent}.`
						: action
							? `action: ${action}.`
							: 'an undefined intent and/or action.'
				}`,
			);
		}

		if (matchedHandlers.length > 1) {
			throw new Error(`Unable to process multiple handlers [${matchedHandlers.map((handler, key) => key).join(', ')}]`);
		}

		const {provider, methodName} = matchedHandlers.pop();

		const fulfillment = await provider[methodName](dialogFlowResponse);
		return fulfillment as DialogFlowFulfillmentResponse;
	}

	public addHandler(handlerName: string, provider: Provider, methodName: string) {
		this.handlers.set(handlerName, {provider, methodName});
	}
}
