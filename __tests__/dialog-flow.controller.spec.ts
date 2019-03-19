import 'reflect-metadata';
import { Injectable, RequestMethod } from '@nestjs/common';
import { DialogFlowController } from '../src/module/dialog-flow.controller';
import { DialogFlowFulfillmentResponse } from '../src/interfaces/dialog-flow-fulfillment-response.interface';
import { DialogFlowIntent } from '../src/decorators/dialog-flow-intent.decorator';
import { DialogFlowResponse } from '../src/interfaces/dialog-flow-response.interface';
import { METHOD_METADATA, PATH_METADATA } from '../src/constant';
import { mockRes } from 'sinon-express-mock';
import { Test } from '@nestjs/testing';
import { WebHookConfig } from '../src/interfaces/web-hook-config.interface';
import { DialogFlowModule } from '../src/module/dialog-flow.module';

describe('dialog flow controller', () => {
    const webHookConfig: WebHookConfig = { basePath: 'basePath', postPath: 'postPath' };
    let controller: DialogFlowController;
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

        controller = module.get<DialogFlowController>(DialogFlowController);
    });

    it('should be able to return the controller with new reflected metadata', () => {
        const _controller = DialogFlowController.forRoot(webHookConfig);

        const pathMetadata = Reflect.getMetadata(PATH_METADATA, _controller);
        const methodMetadata = Reflect.getMetadata(METHOD_METADATA, Reflect.getOwnPropertyDescriptor(_controller.prototype, 'dialogFlowWebHook').value);
        const methodPathMetadata = Reflect.getMetadata(PATH_METADATA, Reflect.getOwnPropertyDescriptor(_controller.prototype, 'dialogFlowWebHook').value);

        expect(pathMetadata).toEqual(webHookConfig.basePath);
        expect(methodMetadata).toEqual(RequestMethod.POST);
        expect(methodPathMetadata).toEqual(webHookConfig.postPath);
    });

    it('should call the appropriate handler and call res', async () => {
        const res = mockRes();
        const dialogFlowResponse = { queryResult: { intent: { displayName: 'intent' } } } as DialogFlowResponse;

        await controller.dialogFlowWebHook(dialogFlowResponse, res);
        expect(res.status.called).toBe(true);
        expect(res.send.called).toBe(true);
        expect(res.send.calledWith({ fulfillmentText: 'fulfilled' })).toBe(true);
    });

    afterAll(async () => {
        await app.close();
    });
});
