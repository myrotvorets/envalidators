import { describe, it } from 'node:test';
import { equal, throws } from 'node:assert/strict';
import { EnvError } from 'envalid';
import { portOrZero } from '../../lib';

void describe('portOrZero', async () => {
    const validator = portOrZero();

    for (const input of ['bad', '123.0', '-1', '65536', 'null', '']) {
        await it(`should reject invalid input (${input})`, () => throws(() => validator._parse(input), EnvError));
    }

    await it('should accept zero as port number', () => equal(validator._parse('0'), 0));

    for (const input of ['1', '100', '1024', '60000', '65535']) {
        await it(`should accept valid port numbers (${input})`, () => equal(validator._parse(input), +input));
    }
});
