import { Injectable, Provider } from '@nestjs/common';
import { DialogFlowFulfillmentResponse } from '../interfaces/dialog-flow-fulfillment-response.interface';
import { DialogFlowResponse } from '../interfaces/dialog-flow-response.interface';
import { HandlerContainer } from './dialog-flow.handler.container';

@Injectable()
export class DialogFlowService {

	constructor(private readonly handlerContainer: HandlerContainer) {}

	public async handleIntentOrAction(
		dialogFlowResponse: DialogFlowResponse,
	): Promise<DialogFlowFulfillmentResponse> {
		const intent = dialogFlowResponse.queryResult.intent.displayName;
		const action = dialogFlowResponse.queryResult.action;

		const fulfillment = this.handlerContainer.findAndCallHandlers(intent, dialogFlowResponse);
		return fulfillment as DialogFlowFulfillmentResponse;
	}
}
