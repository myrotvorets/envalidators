/* eslint-disable sonarjs/no-nested-functions */
/* eslint-disable sonarjs/no-hardcoded-ip */
import { EnvError } from 'envalid';
import ipaddr from 'ipaddr.js';
import { ipList, ipListEx } from '../../lib';

import '../types';

const validator = ipList();
const validatorEx = ipListEx();

describe('IP List Validation', function () {
    describe('ipList', function () {
        // eslint-disable-next-line mocha/no-setup-in-describe
        ['ip.ad.dr.es', '1::1::1', '256.256.256.256', '::DEFG', 'null'].forEach((input) =>
            it(`should reject invalid IPs (${input})`, function () {
                return expect(() => validator._parse(input)).to.throw(EnvError);
            }),
        );

        // eslint-disable-next-line mocha/no-setup-in-describe
        ['', ' '].forEach((input) =>
            it('should accept empty list', function () {
                return expect(validator._parse(input)).to.deep.equal([]);
            }),
        );

        // eslint-disable-next-line mocha/no-setup-in-describe
        (
            [
                ['127.0.0.1,::1', ['127.0.0.1', '::1']],
                ['::FFFF:169.219.13.133', ['::FFFF:169.219.13.133']],
                [' 192.168.1.1, 10.0.0.1 , 10.0.0.2', ['192.168.1.1', '10.0.0.1', '10.0.0.2']],
            ] as const
        ).forEach(([input, expected]) =>
            it(`should accept valid IPs (${input})`, function () {
                return expect(validator._parse(input)).to.deep.equal(expected);
            }),
        );
    });

    describe('ipListEx', function () {
        // eslint-disable-next-line mocha/no-setup-in-describe
        ['ip.ad.dr.es', '1::1::1', '256.256.256.256', '::DEFG', 'null'].forEach((input) =>
            it(`should reject invalid IPs (${input})`, function () {
                return expect(() => validatorEx._parse(input)).to.throw(EnvError);
            }),
        );

        // eslint-disable-next-line mocha/no-setup-in-describe
        ['', ' '].forEach((input) =>
            it('should accept empty list', function () {
                return expect(validatorEx._parse(input)).to.deep.equal([]);
            }),
        );

        // eslint-disable-next-line mocha/no-setup-in-describe
        (
            [
                // eslint-disable-next-line mocha/no-setup-in-describe
                ['127.0.0.1,::1', ['127.0.0.1', '::1'].map((s) => ipaddr.process(s))],
                // eslint-disable-next-line mocha/no-setup-in-describe
                ['::FFFF:169.219.13.133', ['::FFFF:169.219.13.133'].map((s) => ipaddr.process(s))],
                [
                    ' 192.168.1.1, 10.0.0.1 , 10.0.0.2',
                    // eslint-disable-next-line mocha/no-setup-in-describe
                    ['192.168.1.1', '10.0.0.1', '10.0.0.2'].map((s) => ipaddr.process(s)),
                ],
            ] as const
        ).forEach(([input, expected]) =>
            it(`should accept valid IPs (${input})`, function () {
                return expect(validatorEx._parse(input)).to.deep.equal(expected);
            }),
        );
    });
});
