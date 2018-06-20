import { Injectable } from '@nestjs/common';
import { DialogFlowIntent } from '../../decorators/dialog-flow-intent.decorator';
import { expect } from 'chai';
import { provider } from '../dialog-flow.provider';
import { Test } from '@nestjs/testing';

describe('dialog flow provider', () => {
    let handlers: Map<string, any>;

    @Injectable()
    class Service {
        @DialogFlowIntent('firstIntent')
        public handler() {}

        @DialogFlowIntent('secondIntent')
        public handler2() {}
    }

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [Service, provider]
        }).compile();

        handlers = module.get<Map<string, any>>(provider.provide);
    });

    it('should have register handlers from component', () => {
        expect([...handlers.values()].length).to.equal(2);
        expect(typeof handlers.get('firstIntent')).not.equal(null);
        expect(typeof handlers.get('secondIntent')).not.equal(null);
        expect(typeof handlers.get('firstIntent')).to.equal('function');
        expect(typeof handlers.get('secondIntent')).to.equal('function');
    });
});