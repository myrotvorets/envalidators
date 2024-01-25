import { EnvError } from 'envalid';
import { positiveInteger } from '../../lib';

import '../types';

const validator = positiveInteger();

describe('positiveInteger', function () {
    // eslint-disable-next-line mocha/no-setup-in-describe
    ['bad', '123.0', '-1', 'false', 'null', '0', ''].forEach((input) =>
        it(`should reject invalid input (${input})`, function () {
            return expect(() => validator._parse(input)).to.throw(EnvError);
        }),
    );

    // eslint-disable-next-line mocha/no-setup-in-describe
    ['1', '100', '1024', '60000', '65535', '1048576'].forEach((input) =>
        it(`should accept positive integers (${input})`, function () {
            return expect(validator._parse(input)).to.equal(+input);
        }),
    );
});
