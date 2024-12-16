import { EnvError, makeValidator } from 'envalid';
import validator from 'validator';

export const iso31661Alpha2 = makeValidator((input: string) => {
    const uppercased = input.toUpperCase();
    if (validator.isISO31661Alpha2(uppercased)) {
        return uppercased;
    }

    throw new EnvError(`Invalid ISO 3166-1 alpha-2 input: "${input}"`);
});

export const iso31661Alpha2List = makeValidator((input: string) => {
    input = input.trim();
    if (!input) {
        return [];
    }

    const items = input.split(',').map((s) => s.trim().toUpperCase());
    const valid = items.every((s) => validator.isISO31661Alpha2(s));

    if (valid) {
        return items;
    }

    throw new EnvError(`Invalid ISO 3166-1 alpha-2 list input: "${input}"`);
});
