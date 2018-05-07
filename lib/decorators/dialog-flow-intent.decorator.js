"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const constant_1 = require("../constant");
const common_1 = require("@nestjs/common");
exports.DialogFlowIntent = (intent) => common_1.ReflectMetadata(constant_1.DIALOG_FLOW_INTENT, intent);
