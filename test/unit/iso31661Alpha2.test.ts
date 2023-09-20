import { describe, it } from 'mocha';
import { expect } from 'chai';
import { EnvError } from 'envalid';
import { iso31661Alpha2, iso31661Alpha2List } from '../../lib';

const validator = iso31661Alpha2();
const validatorList = iso31661Alpha2List();

describe('iso31661Alpha2', () => {
    ['bad', 'A', '11', 'UKR', 'null', ''].forEach((input) =>
        it(`should reject invalid input (${input})`, () => expect(() => validator._parse(input)).to.throw(EnvError)),
    );

    'AD|AE|AF|AG|AI|AL|AM|AO|AQ|AR|AS|AT|AU|AW|AX|AZ|BA|BB|BD|BE|BF|BG|BH|BI|BJ|BL|BM|BN|BO|BQ|BR|BS|BT|BV|BW|BY|BZ|CA|CC|CD|CF|CG|CH|CI|CK|CL|CM|CN|CO|CR|CU|CV|CW|CX|CY|CZ|DE|DJ|DK|DM|DO|DZ|EC|EE|EG|EH|ER|ES|ET|FI|FJ|FK|FM|FO|FR|GA|GB|GD|GE|GF|GG|GH|GI|GL|GM|GN|GP|GQ|GR|GS|GT|GU|GW|GY|HK|HM|HN|HR|HT|HU|ID|IE|IL|IM|IN|IO|IQ|IR|IS|IT|JE|JM|JO|JP|KE|KG|KH|KI|KM|KN|KP|KR|KW|KY|KZ|LA|LB|LC|LI|LK|LR|LS|LT|LU|LV|LY|MA|MC|MD|ME|MF|MG|MH|MK|ML|MM|MN|MO|MP|MQ|MR|MS|MT|MU|MV|MW|MX|MY|MZ|NA|NC|NE|NF|NG|NI|NL|NO|NP|NR|NU|NZ|OM|PA|PE|PF|PG|PH|PK|PL|PM|PN|PR|PS|PT|PW|PY|QA|RE|RO|RS|RU|RW|SA|SB|SC|SD|SE|SG|SH|SI|SJ|SK|SL|SM|SN|SO|SR|SS|ST|SV|SX|SY|SZ|TC|TD|TF|TG|TH|TJ|TK|TL|TM|TN|TO|TR|TT|TV|TW|TZ|UA|UG|UM|US|UY|UZ|VA|VC|VE|VG|VI|VN|VU|WF|WS|YE|YT|ZA|ZM|ZW'
        .split('|')
        .forEach((input) =>
            it(`should accept valid input (${input})`, () => expect(validator._parse(input)).to.equal(input)),
        );

    ['ua', 'Us', 'uG'].forEach((input) =>
        it(`should uppercase valid input (${input})`, () =>
            expect(validator._parse(input)).to.equal(input.toUpperCase())),
    );
});

describe('iso31661Alpha2List', (): void => {
    ['', ' '].forEach((input) =>
        it('should accept empty lists', () => expect(validatorList._parse(input)).to.deep.equal([])),
    );

    it('should fail if there are invalid items in the list', () =>
        expect(() => validatorList._parse('UA,UK,US')).to.throw(EnvError));

    (
        [
            [' ua, us, ug ', ['UA', 'US', 'UG']],
            ['UA,US,UG', ['UA', 'US', 'UG']],
        ] as const
    ).forEach(([input, expected]) =>
        it(`should handle valid input (${input})`, () => expect(validatorList._parse(input)).to.deep.equal(expected)),
    );
});
