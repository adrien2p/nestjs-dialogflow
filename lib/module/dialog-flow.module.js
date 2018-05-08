"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dialog_flow_controller_1 = require("./dialog-flow.controller");
const dialog_flow_authorization_middleware_1 = require("../middlewares/dialog-flow-authorization.middleware");
const common_1 = require("@nestjs/common");
const dialog_flow_provider_1 = require("./dialog-flow.provider");
let DialogFlowModule = DialogFlowModule_1 = class DialogFlowModule {
    static forRoute(webHookConfig) {
        webHookConfig = Object.assign({ basePath: 'web-hooks', postPath: 'dialog-flow' }, webHookConfig);
        return {
            module: DialogFlowModule_1,
            controllers: [dialog_flow_controller_1.DialogFlowController.forRoute(webHookConfig)]
        };
    }
    configure(consumer) {
        return consumer
            .apply([dialog_flow_authorization_middleware_1.DialogFlowAuthorizationMiddleware])
            .forRoutes(dialog_flow_controller_1.DialogFlowController);
    }
};
DialogFlowModule = DialogFlowModule_1 = __decorate([
    common_1.Module({
        components: [dialog_flow_provider_1.provider]
    })
], DialogFlowModule);
exports.DialogFlowModule = DialogFlowModule;
var DialogFlowModule_1;
