export interface DialogFlowFulfillmentResponse {
    followupEventInput?: {
        name: string;
        languageCode: number;
        parameters: {
            [param: string]: any;
        };
    };
    fulfillmentMessages?: Array<any>;
    fulfillmentText?: string;
    outputContexts?: {
        name: string;
        lifeSpan: number;
        parameters: {
            [param: string]: any;
        };
    };
    payload?: any;
    source?: string;
}
