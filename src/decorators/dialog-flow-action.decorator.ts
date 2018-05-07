import 'reflect-metadata';
import { DIALOG_FLOW_ACTION } from '../constant';
import { ReflectMetadata } from '@nestjs/common';

export const DialogFlowAction = (action: string) => ReflectMetadata(DIALOG_FLOW_ACTION, action);
