import { EnvError } from 'envalid';
import { positiveInteger } from '../../lib';

const validator = positiveInteger();

describe('positiveInteger', (): void => {
    it.each([['bad'], ['123.0'], ['-1'], ['false'], ['null'], ['0'], ['']])(
        'should reject invalid input (%s)',
        (input: string) => {
            expect(() => validator._parse(input)).toThrowError(EnvError);
        },
    );

    it.each([['1'], ['100'], ['1024'], ['60000'], ['65535'], ['1048576']])(
        'should accept positive integers (%s)',
        (input: string): void => {
            expect(validator._parse(input)).toEqual(+input);
        },
    );
});
