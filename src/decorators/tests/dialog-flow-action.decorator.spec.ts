import 'reflect-metadata'
import { DIALOG_FLOW_ACTION } from '../../constant';
import { DialogFlowAction } from '../dialog-flow-action.decorator';
import { expect } from 'chai';

describe('@DialogFlowAction', () => {
    class TestWithMethod {
        @DialogFlowAction('myAction')
        public action() {}
    }

    it('should enhance method add action string into method metadata', () => {
        const metadata = Reflect.getMetadata(DIALOG_FLOW_ACTION, Reflect.getOwnPropertyDescriptor(TestWithMethod.prototype, 'action').value);
        expect(metadata).to.be.deep.equal('myAction');
    });
});