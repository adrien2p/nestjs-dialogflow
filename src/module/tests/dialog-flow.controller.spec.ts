import { DialogFlowController } from '../dialog-flow.controller';
import { METHOD_METADATA, PATH_METADATA } from '../../constant';
import { WebHookConfig } from '../../interfaces/web-hook-config.interface';
import { RequestMethod } from '@nestjs/common';

describe('dialog flow controller', () => {
    const webHookConfig: WebHookConfig = { basePath: 'basePath', postPath: 'postPath' };

    it('should be able to return the controller with new reflected path data', () => {
        const controller = DialogFlowController.forRoute(webHookConfig);

        const pathMetadata = Reflect.getMetadata(PATH_METADATA, controller);
        const methodMetadata = Reflect.getMetadata(METHOD_METADATA, Reflect.getOwnPropertyDescriptor(controller.prototype, 'dialogFlowWebHook').value);
        const methodPathMetadata = Reflect.getMetadata(PATH_METADATA, Reflect.getOwnPropertyDescriptor(controller.prototype, 'dialogFlowWebHook').value);

        expect(pathMetadata).toEqual(webHookConfig.basePath);
        expect(methodMetadata).toEqual(RequestMethod.POST);
        expect(methodPathMetadata).toEqual(webHookConfig.postPath);
    });
});