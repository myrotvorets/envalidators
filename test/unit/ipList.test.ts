import { EnvError } from 'envalid';
import { process } from 'ipaddr.js';
import { IPv4, IPv6, ipList, ipListEx } from '../../lib';

const validator = ipList();
const validatorEx = ipListEx();

describe('ipList', (): void => {
    it.each([['ip.ad.dr.es'], ['1::1::1'], ['256.256.256.256'], ['::DEFG'], ['null']])(
        'should reject invalid IPs (%s)',
        (input: string) => {
            expect(() => validator._parse(input)).toThrow(EnvError);
        },
    );

    it.each([[''], [' ']])('should accept empty list', (input: string): void => {
        expect(validator._parse(input)).toEqual([]);
    });

    it.each([
        ['127.0.0.1,::1', ['127.0.0.1', '::1']],
        ['::FFFF:169.219.13.133', ['::FFFF:169.219.13.133']],
        [' 192.168.1.1, 10.0.0.1 , 10.0.0.2', ['192.168.1.1', '10.0.0.1', '10.0.0.2']],
    ])('should accept valid IPs (%s)', (input: string, expected: string[]): void => {
        expect(validator._parse(input)).toEqual(expected);
    });
});

describe('ipListEx', (): void => {
    it.each([['ip.ad.dr.es'], ['1::1::1'], ['256.256.256.256'], ['::DEFG'], ['null']])(
        'should reject invalid IPs (%s)',
        (input: string) => {
            expect(() => validatorEx._parse(input)).toThrow(EnvError);
        },
    );

    it.each([[''], [' ']])('should accept empty list', (input: string): void => {
        expect(validatorEx._parse(input)).toEqual([]);
    });

    it.each([
        ['127.0.0.1,::1', ['127.0.0.1', '::1'].map((s) => process(s))],
        ['::FFFF:169.219.13.133', ['::FFFF:169.219.13.133'].map((s) => process(s))],
        [' 192.168.1.1, 10.0.0.1 , 10.0.0.2', ['192.168.1.1', '10.0.0.1', '10.0.0.2'].map((s) => process(s))],
    ])('should accept valid IPs (%s)', (input: string, expected: (IPv4 | IPv6)[]): void => {
        expect(validatorEx._parse(input)).toEqual(expected);
    });
});
