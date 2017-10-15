import { curry } from 'lodash';

/**
 * Set od fata to perform testing
 */
const testWith: { aString: string, anArrayOfString: string[], anArrayOfNumber: number[] } = {
  aString: 'hello world Of mountains',
  anArrayOfNumber: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73,
    79, 83, 89, 97, 101],
  anArrayOfString: [
    'spaceless',
    'value with spaces',
  ],
};

// Sample Vanilla Curriyng
// -----------------------
const add = (x: number): (y: number) => number => {
  return (y: number): number => x + y;
};

const increment = add(1);
const addTen = add(10);

process.stdout.write(`
  ${increment(1).toString()}
  ${addTen(2).toString()}
`);

// Curriyng with lodash "curry" function
// -------------------------------------

/**
 * Curried function for String.prototype.match
 * @param what The regular expression pattern and flags.
 * @param inValue A string where to perform search
 */
const match: _.CurriedFunction2<RegExp, string, RegExpMatchArray | null> = curry(
  (what: string | RegExp, inValue: string): RegExpMatchArray | null => {
    return inValue.match(what);
  },
);

/**
 * Return matched "spaces" in given string
 * @param inValue A string where to perform search for "/spaces/"
 */
const hasSpace: _.CurriedFunction1<string, RegExpMatchArray | null> = match(/\s+/g);

process.stdout.write(`
Curriyng String.prototype.match:
--------------------------------
  - Match space in "${testWith.aString}":
    "${match(/\s+/g, testWith.aString)}"
  - Has space in "${testWith.aString}":
    "${hasSpace(testWith.aString)}"
`);

/**
 * Curried function for String.prototype.replace
 * @param what A string to search for.
 * @param byValue A string who replace every successful match of searchValue
 * @param inValue A string where to perform replacement
 */
const replace: _.CurriedFunction3<RegExp, string, string, string> = curry(
  (what: string | RegExp, byValue: string, inValue: string): string => {
    return inValue.replace(what, byValue);
  },
);

/**
 * Replace voyels by given string in given string
 * @param byValue A string who replace every successful match of "/voyels/"
 * @param inValue A string where to perform replacement of "/voyels/"
 */
const replaceVoyelsBy: _.CurriedFunction2<string, string, string> = replace(/[aeiouy]/ig);

/**
 * Replace voyels by string "*" in given string
 * @param inValue A string where to perform replacement of "/voyels/" by "*"
 */
const censoredSentence: _.CurriedFunction1<string, string> = replaceVoyelsBy('*');

process.stdout.write(`
Curriyng String.prototype.replace:
--------------------------------
  - Replace "voyels" by "*" in "${testWith.aString}":
    "${replace(/[aeiouy]/ig, '*', testWith.aString)}"
  - Replace-Voyels-By "*" in "${testWith.aString}":
    "${replaceVoyelsBy('*', testWith.aString)}"
  - Censored sentence "${testWith.aString}":
    "${censoredSentence(testWith.aString)}"
`);

/**
 *  Curried function for Array.prototype.filter
 * @param accordingCondition A function called one time for each element in the array.
 * @param valueSet An object where to perform filtering
 */
const filter: _.CurriedFunction2<
  (value: any, index: number, array: any[]) => any,
  any[],
  any[]
  > = curry(
    (
      accordingCondition: (value: any, index: number, array: [any]) => boolean,
      valueSet: [any],
    ): any[] => {
      return valueSet.filter(accordingCondition);
    },
  );

/**
 * Return only values with /space/ in given object
 * @param valueSet An object where to recover only value with "/space/"
 */
const filterEntryWithSpace: _.CurriedFunction1<string[], string[]> = filter(hasSpace);

/**
 * Return only values higher than 40 in given object
 * @param valueSet An object where to recover only value higher than 40
 */
const filterHigher40: _.CurriedFunction1<number[], number[]> = filter(
  (value: number): boolean => value > 40,
);

process.stdout.write(`
Curriyng Array.prototype.filter
-------------------------------
  - Only value with accepted by "hasSpace" in "${testWith.anArrayOfString.toString()}"
    "${filter(hasSpace, testWith.anArrayOfString)}"
  - Only value with accepted by "hasSpace" in "${testWith.anArrayOfNumber.toString()}"
    "filter(hasSpace, testWith.anArrayOfNumber)"
     --> Throw error: cause number[] give hasSpace:inValue "number" instead of "string"
                      Any way to prevent/fix this?
  - Only value with "space" in "${testWith.anArrayOfString.toString()}"
    "${filterEntryWithSpace(testWith.anArrayOfString)}"
  - Only value higher than 40 in "${testWith.anArrayOfNumber.toString()}"
    "${filterHigher40(testWith.anArrayOfNumber)}"
 `);

// comprend pas pq ca marche

/**
 * Curried function for Array.prototype.map
 * @param transformation to apply for each element in the array.
 * @param valueSet on which apply transformation
 */
const map: _.CurriedFunction2<(value: any, index: number, array: any[]) => any, any[], any> = curry(
  (
    transformation: (value: any, index: number, array: any[]) => any,
    valueSet: any[],
  ): any[] => {
    return valueSet.map<any>(transformation);
  },
);

/**
 * Double each number in given valueSet
 * @param valueSet on which double values
 */
const doubleValues: _.CurriedFunction1<number[], number[]> = map(
  (val: number) => {
    return (val * 2);
  },
);

/**
 * Add an "E" on each string i givenn valueSet
 * @param valueSet on which add an "E"
 */
const addAnE: _.CurriedFunction1<string[], string[]> = map(
  (val: string) => {
    return val + 'E';
  },
);

process.stdout.write(`
Curriyng Array.prototype.map
----------------------------
  - Doubles each value in "${testWith.anArrayOfNumber.toString()}"
    "${doubleValues(testWith.anArrayOfNumber)}"
  - Add an "E" on each value in "${testWith.anArrayOfString}"
  "${addAnE(testWith.anArrayOfString)}"
 `);
