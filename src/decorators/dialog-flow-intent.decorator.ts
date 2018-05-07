import 'reflect-metadata';
import { DIALOG_FLOW_INTENT } from '../constant';
import { ReflectMetadata } from '@nestjs/common';

export const DialogFlowIntent = (intent: string) => ReflectMetadata(DIALOG_FLOW_INTENT, intent);
