import { cleanEnv } from 'envalid';
import { ipList, ipListEx } from '../../lib';

describe('ipList', (): void => {
    it('should handle arrays for `default`', (): void => {
        const expected = {
            ips: ['1.2.3.4'],
        };

        const actual = cleanEnv(
            {},
            {
                ips: ipList({ default: expected.ips }),
            },
        );

        expect(actual).toEqual(expected);
    });
});

describe('ipListEx', (): void => {
    it('should handle arrays for `default`', (): void => {
        const actual = cleanEnv(
            {},
            {
                ips: ipListEx({ default: [] }),
            },
        );

        const expected = {
            ips: [],
        };

        expect(actual).toEqual(expected);
    });
});
