/* eslint-disable sonarjs/no-nested-functions */
import { EnvError } from 'envalid';
import { iso31661Alpha2, iso31661Alpha2List } from '../../lib';

import '../types';

const validator = iso31661Alpha2();
const validatorList = iso31661Alpha2List();

describe('iso31661Alpha2 Validation', function () {
    describe('iso31661Alpha2', function () {
        // eslint-disable-next-line mocha/no-setup-in-describe
        ['bad', 'A', '11', 'UKR', 'null', ''].forEach((input) =>
            it(`should reject invalid input (${input})`, function () {
                return expect(() => validator._parse(input)).to.throw(EnvError);
            }),
        );

        // eslint-disable-next-line mocha/no-setup-in-describe
        'AD|AE|AF|AG|AI|AL|AM|AO|AQ|AR|AS|AT|AU|AW|AX|AZ|BA|BB|BD|BE|BF|BG|BH|BI|BJ|BL|BM|BN|BO|BQ|BR|BS|BT|BV|BW|BY|BZ|CA|CC|CD|CF|CG|CH|CI|CK|CL|CM|CN|CO|CR|CU|CV|CW|CX|CY|CZ|DE|DJ|DK|DM|DO|DZ|EC|EE|EG|EH|ER|ES|ET|FI|FJ|FK|FM|FO|FR|GA|GB|GD|GE|GF|GG|GH|GI|GL|GM|GN|GP|GQ|GR|GS|GT|GU|GW|GY|HK|HM|HN|HR|HT|HU|ID|IE|IL|IM|IN|IO|IQ|IR|IS|IT|JE|JM|JO|JP|KE|KG|KH|KI|KM|KN|KP|KR|KW|KY|KZ|LA|LB|LC|LI|LK|LR|LS|LT|LU|LV|LY|MA|MC|MD|ME|MF|MG|MH|MK|ML|MM|MN|MO|MP|MQ|MR|MS|MT|MU|MV|MW|MX|MY|MZ|NA|NC|NE|NF|NG|NI|NL|NO|NP|NR|NU|NZ|OM|PA|PE|PF|PG|PH|PK|PL|PM|PN|PR|PS|PT|PW|PY|QA|RE|RO|RS|RU|RW|SA|SB|SC|SD|SE|SG|SH|SI|SJ|SK|SL|SM|SN|SO|SR|SS|ST|SV|SX|SY|SZ|TC|TD|TF|TG|TH|TJ|TK|TL|TM|TN|TO|TR|TT|TV|TW|TZ|UA|UG|UM|US|UY|UZ|VA|VC|VE|VG|VI|VN|VU|WF|WS|YE|YT|ZA|ZM|ZW'
            .split('|')
            .forEach((input) =>
                it(`should accept valid input (${input})`, function () {
                    return expect(validator._parse(input)).to.equal(input);
                }),
            );

        // eslint-disable-next-line mocha/no-setup-in-describe
        ['ua', 'Us', 'uG'].forEach((input) =>
            it(`should uppercase valid input (${input})`, function () {
                return expect(validator._parse(input)).to.equal(input.toUpperCase());
            }),
        );
    });

    describe('iso31661Alpha2List', function (): void {
        // eslint-disable-next-line mocha/no-setup-in-describe
        ['', ' '].forEach((input) =>
            it('should accept empty lists', function () {
                return expect(validatorList._parse(input)).to.deep.equal([]);
            }),
        );

        it('should fail if there are invalid items in the list', function () {
            return expect(() => validatorList._parse('UA,UK,US')).to.throw(EnvError);
        });

        // eslint-disable-next-line mocha/no-setup-in-describe
        (
            [
                [' ua, us, ug ', ['UA', 'US', 'UG']],
                ['UA,US,UG', ['UA', 'US', 'UG']],
            ] as const
        ).forEach(([input, expected]) =>
            it(`should handle valid input (${input})`, function () {
                return expect(validatorList._parse(input)).to.deep.equal(expected);
            }),
        );
    });
});
