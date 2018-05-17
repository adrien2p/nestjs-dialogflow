export declare const dialogFlowResponseData: {
    "responseId": string;
    "queryResult": {
        "queryText": string;
        "parameters": {
            "date": string;
            "geo-city": string;
        };
        "allRequiredParamsPresent": boolean;
        "fulfillmentMessages": {
            "text": {
                "text": string[];
            };
        }[];
        "outputContexts": {
            "name": string;
            "lifespanCount": number;
            "parameters": {
                "date.original": string;
                "date": string;
                "geo-city.original": string;
                "geo-city": string;
            };
        }[];
        "intent": {
            "name": string;
            "displayName": string;
        };
        "intentDetectionConfidence": number;
        "diagnosticInfo": {
            "webhook_latency_ms": number;
        };
        "languageCode": string;
    };
    "webhookStatus": {
        "code": number;
        "message": string;
    };
};
