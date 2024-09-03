import { describe, it } from 'node:test';
import { equal, throws } from 'node:assert/strict';
import { EnvError } from 'envalid';
import { positiveInteger } from '../../lib';

void describe('positiveInteger', async () => {
    const validator = positiveInteger();

    for (const input of ['bad', '123.0', '-1', 'false', 'null', '0', '']) {
        await it(`should reject invalid input (${input})`, () => throws(() => validator._parse(input), EnvError));
    }

    for (const input of ['1', '100', '1024', '60000', '65535', '1048576']) {
        await it(`should accept positive integers (${input})`, () => equal(validator._parse(input), +input));
    }
});
