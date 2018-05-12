export interface DialogFlowResponse {
	originalDetectIntentRequest: any;
	queryResult: QueryResult;
	responseId: string;
	session: string;
}

export interface QueryResult {
	action: string;
	allRequiredParamsPresent: boolean;
	diagnosticInfo: { webhook_latency_ms: number };
	fulfillmentMessages: any;
	fulfillmentText: string;
	intent: { name: string; displayName: string };
	intentDetectionConfidence: Number;
	languageCode: string;
	outputContexts: {
		name: string;
		lifespanCount: number;
		parameters: { param: string; value: any };
	};
	parameters: { param: string; value: any };
	queryText: string;
}
