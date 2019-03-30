export const dialogFlowResponseData = {
    "responseId": "1d05835a-1092-442e-b363-910c34c6e735",
    "queryResult": {
        "queryText": "Météo de demain à marseille",
        "parameters": {
            "date": "2018-05-16T12:00:00+02:00",
            "geo-city": "Marseille"
        },
        "allRequiredParamsPresent": true,
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        ""
                    ]
                }
            }
        ],
        "outputContexts": [
            {
                "name": "projects/hermes-d8e54/agent/sessions/f060c5a3-f95e-4551-aedd-3d970d0d4dc4/contexts/weather_question",
                "lifespanCount": 5,
                "parameters": {
                    "date.original": "de demain",
                    "date": "2018-05-16T12:00:00+02:00",
                    "geo-city.original": "marseille",
                    "geo-city": "Marseille"
                }
            }
        ],
        "intent": {
            "name": "projects/hermes-d8e54/agent/intents/62e2d690-bf1b-4eaa-af39-c9c0d48b8c41",
            "displayName": "Question:weather"
        },
        "intentDetectionConfidence": 1,
        "diagnosticInfo": {
            "webhook_latency_ms": 75
        },
        "languageCode": "fr"
    },
    "webhookStatus": {
        "code": 5,
        "message": "Webhook call failed. Error: 404 Not Found"
    }
};
