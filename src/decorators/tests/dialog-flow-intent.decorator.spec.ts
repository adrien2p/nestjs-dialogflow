import 'reflect-metadata'
import { DIALOG_FLOW_INTENT } from '../../constant';
import { DialogFlowIntent } from '../dialog-flow-intent.decorator';
import { expect } from 'chai';

describe('@DialogFlowIntent', () => {
    class TestWithMethod {
        @DialogFlowIntent('myIntent')
        public action() {}
    }

    it('should enhance method add action string into method metadata', () => {
        const metadata = Reflect.getMetadata(DIALOG_FLOW_INTENT, Reflect.getOwnPropertyDescriptor(TestWithMethod.prototype, 'action').value);
        expect(metadata).to.be.deep.equal('myIntent');
    });
});