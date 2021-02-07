import { EnvError, makeValidator } from 'envalid';

export const positiveInteger = makeValidator((input: string) => {
    const coerced = +input;
    if (Number.isNaN(coerced) || `${coerced}` !== `${input}` || coerced % 1 !== 0 || coerced <= 0) {
        throw new EnvError(`Invalid port input: "${input}"`);
    }

    return coerced;
});
