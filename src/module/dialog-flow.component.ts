import { Injectable, Provider } from '@nestjs/common';
import { DialogFlowFulfillmentResponse } from '../interfaces/dialog-flow-fulfillment-response.interface';
import { DialogFlowResponse } from '../interfaces/dialog-flow-response.interface';

interface MethodProvider {
	provider: string;
	method: string;
}

interface MethodsTree {
	[name: string]: MethodProvider[];
}

@Injectable()
export class DialogFlowService {
	private readonly providers: { [s: string]: Provider }[];
	private readonly methods: MethodsTree;

	constructor() {}

	public async handleIntentOrAction(
		dialogFlowResponse: DialogFlowResponse,
	): Promise<DialogFlowFulfillmentResponse> {
		const intent = dialogFlowResponse.queryResult.intent.displayName;
		const action = dialogFlowResponse.queryResult.action;

		const handlers = [];

		if (this.methods.hasOwnProperty(intent)) {
			handlers.push(this.methods[intent]);
		}

		if (this.methods.hasOwnProperty(action)) {
			handlers.push(this.methods[action]);
		}

		if (!handlers) {
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

		//TODO verify if I need to call multiple handlers or just one singular handler
		const fulfillment = await handler.call(this, dialogFlowResponse);
		return fulfillment as DialogFlowFulfillmentResponse;
	}

	protected addProvider(provider: Provider) {
		this.providers[provider.constructor.name] = provider;
	}

	public addMethod(name: string, provider: Provider, method: string) {
		this.addProvider(provider);
		this.methods[name] = [
			...this.methods[name],
			{
				provider: provider.constructor.name,
				method,
			},
		];
	}
}
