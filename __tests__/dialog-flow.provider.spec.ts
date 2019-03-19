import { Injectable } from '@nestjs/common';
import { DialogFlowFulfillmentResponse } from '../src/interfaces/dialog-flow-fulfillment-response.interface';
import { DialogFlowIntent } from '../src/decorators/dialog-flow-intent.decorator';
import { DialogFlowAction } from '../src/decorators/dialog-flow-action.decorator';
import { DialogFlowResponse } from '../src/interfaces/dialog-flow-response.interface';
import { DialogFlowProvider } from '../src/module/dialog-flow.provider';
import { DialogFlowModule } from '../src/module/dialog-flow.module';
import { Test, TestingModule } from '@nestjs/testing';

describe('dialog flow service', () => {
    let dialogFlowProvider: DialogFlowProvider;
    let app;

    @Injectable()
    class FakeService {
        @DialogFlowIntent('intent')
        public handlerIntent() {
            return { fulfillmentText: 'fulfilled' } as DialogFlowFulfillmentResponse;
        }
    }

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [DialogFlowModule.forRoot()],
            providers: [FakeService],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        dialogFlowProvider = module.get<DialogFlowProvider>(DialogFlowProvider);

    });

    it('should return a fulfillment response', async () => {
        const dialogFlowResponse = { queryResult: { intent: { displayName: 'intent' } } } as DialogFlowResponse;
        const fulfillment = await dialogFlowProvider.handleIntentOrAction(dialogFlowResponse);
        expect(fulfillment).toEqual({ fulfillmentText: 'fulfilled' });
    });

    it('should throw an error if no intent or action has been found', async () => {
        const dialogFlowResponse = { queryResult: { intent: { displayName: 'intent2' } } } as DialogFlowResponse;

        let error;
        try {
            await dialogFlowProvider.handleIntentOrAction(dialogFlowResponse);
        } catch (e) {
            error = e;
        }

        expect(error).not.toEqual(null);
        expect(error.message).toEqual('Unknown handler for [intent: intent2].');
    });

    afterAll(async () => {
        await app.close();
    });
});

describe('Dialog Flow Handlers', () => {
    it('Duplicate handler exception', async () => {

        @Injectable()
        class ExpectionService {

            @DialogFlowAction('duplicate')
            public handlerAction() {
                return { fulfillmentText: 'fulfilled' } as DialogFlowFulfillmentResponse;
            }

            @DialogFlowIntent('duplicate')
            public handlerIntent() {
                return { fulfillmentText: 'fulfilled' } as DialogFlowFulfillmentResponse;
            }
        }

        let error;
        let app;

        try {
            const module: TestingModule = await Test.createTestingModule({
                imports: [DialogFlowModule.forRoot()],
                providers: [ExpectionService],
            }).compile();

            app = module.createNestApplication();

            await app.init();

        } catch (e) {
            error = e;
        }

        expect(error).not.toBeNull();
        expect(error.message).toEqual('Cannot have duplicate handlers for intent [duplicate]');

        app.close();
    });
});
