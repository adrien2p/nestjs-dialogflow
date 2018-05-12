import { Component, Inject } from '@nestjs/common';
import { DialogFlowFulfillmentResponse } from '../interfaces/dialog-flow-fulfillment-response.interface';
import { DialogFlowResponse } from '../interfaces/dialog-flow-response.interface';

@Component()
export class DialogFlowService {
	constructor(@Inject('Handlers') private readonly handlers: Map<string, any>) {}

	public async handleIntentOrAction(
		dialogFlowResponse: DialogFlowResponse,
	): Promise<DialogFlowFulfillmentResponse> {
		const intent = dialogFlowResponse.queryResult.intent.displayName;
		const action = dialogFlowResponse.queryResult.action;

		const handler = this.handlers.get(intent) || this.handlers.get(action);
		if (!handler) {
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

		const fulfillment = await handler.call(this, dialogFlowResponse);
		return fulfillment as DialogFlowFulfillmentResponse;
	}
}
