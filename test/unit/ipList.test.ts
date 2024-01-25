import { EnvError } from 'envalid';
import ipaddr from 'ipaddr.js';
import { ipList, ipListEx } from '../../lib';

import '../types';

const validator = ipList();
const validatorEx = ipListEx();

describe('ipList', () => {
    ['ip.ad.dr.es', '1::1::1', '256.256.256.256', '::DEFG', 'null'].forEach((input) =>
        it(`should reject invalid IPs (${input})`, () => expect(() => validator._parse(input)).to.throw(EnvError)),
    );

    ['', ' '].forEach((input) =>
        it('should accept empty list', () => expect(validator._parse(input)).to.deep.equal([])),
    );

    (
        [
            ['127.0.0.1,::1', ['127.0.0.1', '::1']],
            ['::FFFF:169.219.13.133', ['::FFFF:169.219.13.133']],
            [' 192.168.1.1, 10.0.0.1 , 10.0.0.2', ['192.168.1.1', '10.0.0.1', '10.0.0.2']],
        ] as const
    ).forEach(([input, expected]) =>
        it(`should accept valid IPs (${input})`, () => expect(validator._parse(input)).to.deep.equal(expected)),
    );
});

describe('ipListEx', () => {
    ['ip.ad.dr.es', '1::1::1', '256.256.256.256', '::DEFG', 'null'].forEach((input) =>
        it(`should reject invalid IPs (${input})`, () => expect(() => validatorEx._parse(input)).to.throw(EnvError)),
    );

    ['', ' '].forEach((input) =>
        it('should accept empty list', () => expect(validatorEx._parse(input)).to.deep.equal([])),
    );

    (
        [
            ['127.0.0.1,::1', ['127.0.0.1', '::1'].map((s) => ipaddr.process(s))],
            ['::FFFF:169.219.13.133', ['::FFFF:169.219.13.133'].map((s) => ipaddr.process(s))],
            [
                ' 192.168.1.1, 10.0.0.1 , 10.0.0.2',
                ['192.168.1.1', '10.0.0.1', '10.0.0.2'].map((s) => ipaddr.process(s)),
            ],
        ] as const
    ).forEach(([input, expected]) =>
        it(`should accept valid IPs (${input})`, () => expect(validatorEx._parse(input)).to.deep.equal(expected)),
    );
});
