import { describe, it } from 'mocha';
import { expect } from 'chai';
import { EnvError } from 'envalid';
import { positiveInteger } from '../../lib';

const validator = positiveInteger();

describe('positiveInteger', () => {
    ['bad', '123.0', '-1', 'false', 'null', '0', ''].forEach((input) =>
        it(`should reject invalid input (${input})`, () => expect(() => validator._parse(input)).to.throw(EnvError)),
    );

    ['1', '100', '1024', '60000', '65535', '1048576'].forEach((input) =>
        it(`should accept positive integers (${input})`, () => expect(validator._parse(input)).to.equal(+input)),
    );
});
