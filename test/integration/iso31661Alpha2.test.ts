import { cleanEnv } from 'envalid';
import { iso31661Alpha2List } from '../../src';

describe('iso31661Alpha2List', (): void => {
    it.each([[['UA', 'US', 'GB']], [[' ua ', ' us   ', 'gb']]])(
        'should handle arrays for `default` (%p)',
        (def: string[]) => {
            const expected = {
                countries: ['UA', 'US', 'GB'],
            };

            const actual = cleanEnv(
                {},
                {
                    countries: iso31661Alpha2List({ default: def }),
                },
            );

            expect(actual).toEqual(expected);
        },
    );
});
