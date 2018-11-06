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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var DialogFlowController_1;
const common_1 = require("@nestjs/common");
const dialog_flow_component_1 = require("./dialog-flow.component");
const constant_1 = require("../constant");
let DialogFlowController = DialogFlowController_1 = class DialogFlowController {
    constructor(DialogFlowComponent) {
        this.DialogFlowComponent = DialogFlowComponent;
    }
    static forRoot(webHookConfig) {
        Reflect.defineMetadata(constant_1.PATH_METADATA, webHookConfig.basePath, DialogFlowController_1);
        Reflect.defineMetadata(constant_1.PATH_METADATA, webHookConfig.postPath, Object.getOwnPropertyDescriptor(DialogFlowController_1.prototype, 'dialogFlowWebHook').value);
        Reflect.defineMetadata(constant_1.METHOD_METADATA, common_1.RequestMethod.POST, Object.getOwnPropertyDescriptor(DialogFlowController_1.prototype, 'dialogFlowWebHook').value);
        return DialogFlowController_1;
    }
    dialogFlowWebHook(dialogFlowResponse, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fulfillment = yield this.DialogFlowComponent.handleIntentOrAction(dialogFlowResponse);
            return res.status(common_1.HttpStatus.OK).send(fulfillment);
        });
    }
};
__decorate([
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DialogFlowController.prototype, "dialogFlowWebHook", null);
DialogFlowController = DialogFlowController_1 = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [dialog_flow_component_1.DialogFlowComponent])
], DialogFlowController);
exports.DialogFlowController = DialogFlowController;
