import {correctionDate} from './correctionDate';
import {validationValue} from './validationValue';

describe('Fn correctionDate should works correct', () => {
    it('1', () => {
        expect(correctionDate('2022-07-13T17:13:38')).toBe('13-07-2022 17:13:38');
    });
    it('2', () => {
        expect(correctionDate('2022-07-13T17:13:38aaaaaaaaaaa')).toBe('13-07-2022 17:13:38');
    });
});

describe('Fn validationValue should works correct', () => {
    it('1', () => {
        expect(validationValue('erty1234567890azxxcsdfzf')).toBe('erty1234567890azxxcsdfzf');
    });
    it('2', () => {
        expect(validationValue('erty1234567890azxxcsdfzf1234')).toBe('erty1234567890azxxcs...');
    });
});

//13-07-2022 17:13:38