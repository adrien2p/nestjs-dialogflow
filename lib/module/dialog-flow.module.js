"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var DialogFlowModule_1;
require("reflect-metadata");
const dialog_flow_authorization_middleware_1 = require("../middlewares/dialog-flow-authorization.middleware");
const dialog_flow_controller_1 = require("./dialog-flow.controller");
const dialog_flow_component_1 = require("./dialog-flow.component");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const injector_1 = require("@nestjs/core/injector");
const core_2 = require("../core");
let DialogFlowModule = DialogFlowModule_1 = class DialogFlowModule {
    constructor(moduleRef, modulesContainer, handlerContainer) {
        this.moduleRef = moduleRef;
        this.modulesContainer = modulesContainer;
        this.handlerContainer = handlerContainer;
    }
    static forRoot(webHookConfig) {
        webHookConfig = Object.assign({ basePath: 'web-hooks', postPath: 'dialog-flow' }, webHookConfig);
        return {
            module: DialogFlowModule_1,
            providers: [dialog_flow_component_1.DialogFlowService, core_2.HandlerContainer],
            controllers: [dialog_flow_controller_1.DialogFlowController.forRoot(webHookConfig)],
        };
    }
    onModuleInit() {
        const scanner = new core_2.Scanner(this.moduleRef, this.modulesContainer, this.handlerContainer);
        scanner.scanAndRegisterHandlers();
    }
    configure(consumer) {
        return consumer.apply(dialog_flow_authorization_middleware_1.DialogFlowAuthorizationMiddleware).forRoutes(dialog_flow_controller_1.DialogFlowController);
    }
};
DialogFlowModule = DialogFlowModule_1 = __decorate([
    common_1.Module({
        providers: [dialog_flow_component_1.DialogFlowService, core_2.HandlerContainer],
        controllers: [dialog_flow_controller_1.DialogFlowController],
    }),
    __metadata("design:paramtypes", [core_1.ModuleRef,
        injector_1.ModulesContainer,
        core_2.HandlerContainer])
], DialogFlowModule);
exports.DialogFlowModule = DialogFlowModule;
