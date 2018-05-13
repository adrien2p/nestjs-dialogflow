"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const constant_1 = require("../constant");
const common_1 = require("@nestjs/common");
exports.DialogFlowAction = (action) => common_1.ReflectMetadata(constant_1.DIALOG_FLOW_ACTION, action);
