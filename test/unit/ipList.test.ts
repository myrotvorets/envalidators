import { describe, it } from 'node:test';
import { deepEqual, throws } from 'node:assert/strict';
import { EnvError } from 'envalid';
import ipaddr from 'ipaddr.js';
import { ipList, ipListEx } from '../../lib';

void describe('IP List Validation', async () => {
    const validator = ipList();
    const validatorEx = ipListEx();

    await describe('ipList', async () => {
        for (const input of ['ip.ad.dr.es', '1::1::1', '256.256.256.256', '::DEFG', 'null']) {
            await it(`should reject invalid IPs (${input})`, () => throws(() => validator._parse(input), EnvError));
        }

        for (const input of ['', ' ']) {
            await it('should accept empty list', () => deepEqual(validator._parse(input), []));
        }

        for (const [input, expected] of [
            ['127.0.0.1,::1', ['127.0.0.1', '::1']],
            ['::FFFF:169.219.13.133', ['::FFFF:169.219.13.133']],
            [' 192.168.1.1, 10.0.0.1 , 10.0.0.2', ['192.168.1.1', '10.0.0.1', '10.0.0.2']],
        ] as const) {
            await it(`should accept valid IPs (${input})`, () => deepEqual(validator._parse(input), expected));
        }
    });

    void describe('ipListEx', async () => {
        for (const input of ['ip.ad.dr.es', '1::1::1', '256.256.256.256', '::DEFG', 'null']) {
            await it(`should reject invalid IPs (${input})`, () => throws(() => validatorEx._parse(input), EnvError));
        }

        for (const input of ['', ' ']) {
            await it('should accept empty list', () => deepEqual(validatorEx._parse(input), []));
        }

        for (const [input, expected] of [
            ['127.0.0.1,::1', ['127.0.0.1', '::1'].map((s) => ipaddr.process(s))],
            ['::FFFF:169.219.13.133', ['::FFFF:169.219.13.133'].map((s) => ipaddr.process(s))],
            [
                ' 192.168.1.1, 10.0.0.1 , 10.0.0.2',
                ['192.168.1.1', '10.0.0.1', '10.0.0.2'].map((s) => ipaddr.process(s)),
            ],
        ] as const) {
            await it(`should accept valid IPs (${input})`, () => deepEqual(validatorEx._parse(input), expected));
        }
    });
});
