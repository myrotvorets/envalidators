import { EnvError } from 'envalid';
import { portOrZero } from '../../lib';

import '../types';

const validator = portOrZero();

describe('portOrZero', function () {
    // eslint-disable-next-line mocha/no-setup-in-describe
    ['bad', '123.0', '-1', '65536', 'null', ''].forEach((input) =>
        it(`should reject invalid input (${input})`, function () {
            return expect(() => validator._parse(input)).to.throw(EnvError);
        }),
    );

    it('should accept zero as port number', function () {
        return expect(validator._parse('0')).to.equal(0);
    });

    // eslint-disable-next-line mocha/no-setup-in-describe
    ['1', '100', '1024', '60000', '65535'].forEach((input) =>
        it(`should accept valid port numbers (${input})`, function () {
            return expect(validator._parse(input)).to.equal(+input);
        }),
    );
});
