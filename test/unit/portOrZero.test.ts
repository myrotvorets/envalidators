import { EnvError } from 'envalid';
import { portOrZero } from '../../lib';

import '../types';

const validator = portOrZero();

describe('portOrZero', () => {
    ['bad', '123.0', '-1', '65536', 'null', ''].forEach((input) =>
        it(`should reject invalid input (${input})`, () => expect(() => validator._parse(input)).to.throw(EnvError)),
    );

    it('should accept zero as port number', () => expect(validator._parse('0')).to.equal(0));

    ['1', '100', '1024', '60000', '65535'].forEach((input) =>
        it(`should accept valid port numbers (${input})`, () => expect(validator._parse(input)).to.equal(+input)),
    );
});
