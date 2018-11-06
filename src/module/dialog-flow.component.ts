import { Injectable } from '@nestjs/common';
import { DialogFlowFulfillmentResponse } from '../interfaces/dialog-flow-fulfillment-response.interface';
import { DialogFlowResponse } from '../interfaces/dialog-flow-response.interface';
import { HandlerContainer } from './../core';

@Injectable()
export class DialogFlowComponent {
	constructor(private readonly handlerContainer: HandlerContainer) {}

	public async handleIntentOrAction(
		dialogFlowResponse: DialogFlowResponse,
	): Promise<DialogFlowFulfillmentResponse> {
		const intent = dialogFlowResponse.queryResult.intent.displayName;
		const action = dialogFlowResponse.queryResult.action;

		const fulfillment = this.handlerContainer.findAndCallHandlers(dialogFlowResponse, {
			intent,
			action,
		});
		return fulfillment as DialogFlowFulfillmentResponse;
	}
}
