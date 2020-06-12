import { EnvError, makeValidator } from 'envalid';
import { isValid, process } from 'ipaddr.js';
export type { IPv4, IPv6 } from 'ipaddr.js';

export const ipList = makeValidator((input: string) => {
    const trimmed = input.trim();
    if (!trimmed) {
        return [];
    }

    const items = input.split(',').map((s) => s.trim());
    const valid = items.every((ip) => isValid(ip));

    if (!valid) {
        throw new EnvError(`Invalid IP list input: "${input}"`);
    }

    return items;
}, 'ipList');

export const ipListEx = makeValidator((input: string) => {
    const trimmed = input.trim();
    if (!trimmed) {
        return [];
    }

    try {
        return input.split(',').map((s) => process(s.trim()));
    } catch (e) {
        throw new EnvError(`Invalid IP list input: "${input}"`);
    }
}, 'ipListEx');
