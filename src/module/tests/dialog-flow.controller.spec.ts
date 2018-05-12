import 'reflect-metadata';
import { mockRes } from 'sinon-express-mock';
import { Component, RequestMethod } from '@nestjs/common';
import { DialogFlowController } from '../dialog-flow.controller';
import { DialogFlowFulfillmentResponse } from '../../interfaces/dialog-flow-fulfillment-response.interface';
import { DialogFlowIntent } from '../../decorators/dialog-flow-intent.decorator';
import { DialogFlowResponse } from '../../interfaces/dialog-flow-response.interface';
import { DialogFlowService } from '../dialog-flow.component';
import { METHOD_METADATA, PATH_METADATA } from '../../constant';
import { provider } from '../dialog-flow.provider';
import { Test } from '@nestjs/testing';
import { WebHookConfig } from '../../interfaces/web-hook-config.interface';

describe('dialog flow controller', () => {
    const webHookConfig: WebHookConfig = { basePath: 'basePath', postPath: 'postPath' };
    let controller: DialogFlowController;

    @Component()
    class FakeService {
        @DialogFlowIntent('intent')
        public handlerIntent() {
            return { fulfillmentText: 'fulfilled' } as DialogFlowFulfillmentResponse;
        }
    }

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            controllers: [DialogFlowController.forRoute(webHookConfig)],
            components: [FakeService, DialogFlowService, provider]
        }).compile();

        controller = module.get<DialogFlowController>(DialogFlowController);
    });

    it('should be able to return the controller with new reflected metadata', () => {
        const _controller = DialogFlowController.forRoute(webHookConfig);

        const pathMetadata = Reflect.getMetadata(PATH_METADATA, _controller);
        const methodMetadata = Reflect.getMetadata(METHOD_METADATA, Reflect.getOwnPropertyDescriptor(_controller.prototype, 'dialogFlowWebHook').value);
        const methodPathMetadata = Reflect.getMetadata(PATH_METADATA, Reflect.getOwnPropertyDescriptor(_controller.prototype, 'dialogFlowWebHook').value);

        expect(pathMetadata).toEqual(webHookConfig.basePath);
        expect(methodMetadata).toEqual(RequestMethod.POST);
        expect(methodPathMetadata).toEqual(webHookConfig.postPath);
    });

    it('should called the appropriate handler and call res', async () => {
        const res = mockRes();
        const dialogFlowResponse = { queryResult: { intent: { displayName: 'intent' } } } as DialogFlowResponse;

        await controller.dialogFlowWebHook(dialogFlowResponse, res);
        expect(res.status.called).toBe(true);
        expect(res.send.called).toBe(true);
        expect(res.send.calledWith({ fulfillmentText: 'fulfilled' })).toBe(true);
    });
});