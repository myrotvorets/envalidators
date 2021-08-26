import { EnvError, makeValidator } from 'envalid';
import ipaddr, { IPv4, IPv6, isValid } from 'ipaddr.js';
export type { IPv4, IPv6 };

export const ipList = makeValidator((input: string | string[]) => {
    let items: string[];
    if (typeof input === 'string') {
        const trimmed = input.trim();
        if (!trimmed) {
            return [];
        }

        items = trimmed.split(',');
    } else {
        items = input;
    }

    const valid = items.every((ip, idx, arr) => {
        ip = ip.trim();
        arr[idx] = ip;
        return isValid(ip);
    });

    if (!valid) {
        throw new EnvError(`Invalid IP list input: "${input}"`);
    }

    return items;
});

export const ipListEx = makeValidator((input: string | (IPv4 | IPv6)[]) => {
    if (Array.isArray(input)) {
        // This can only happen if we get a default value
        return input;
    }

    if (!input.trim()) {
        return [];
    }

    const items = input.split(',');

    try {
        return items.map((s) => ipaddr.process(s.trim()));
    } catch (e) {
        throw new EnvError(`Invalid IP list input: "${input}"`);
    }
});
