import { EnvError, makeValidator } from 'envalid';
import validator from 'validator';

export const iso31661Alpha2 = makeValidator((input: string) => {
    const uppercased = input.toUpperCase();
    if (validator.isISO31661Alpha2(uppercased)) {
        return uppercased;
    }

    throw new EnvError(`Invalid ISO 3166-1 alpha-2 input: "${input}"`);
}, 'iso31661Alpha2');

export const iso31661Alpha2List = makeValidator((input: string) => {
    const uppercased = input.trim().toUpperCase();
    if (!uppercased) {
        return [];
    }

    const items = uppercased.split(',').map((s) => s.trim());
    const valid = items.every((s) => validator.isISO31661Alpha2(s));

    if (valid) {
        return items;
    }

    throw new EnvError(`Invalid ISO 3166-1 alpha-2 list input: "${input}"`);
}, 'iso31661Alpha2List');
