# Study on functionnal programming with typescript

This is a personal study repository, to keep track of my research on "functional programming".

## Goals
- Get trough the [Mostly adequate guide to FP](https://github.com/MostlyAdequate/mostly-adequate-guide) book.
- Use [typescript](https://www.typescriptlang.org/) to perform examples, so we can practice typing too.
- Get familiar with [visual studio code](https://code.visualstudio.com) IDE, because why not? ¯\_(ツ)_/¯

## Feedback

### Curried method and typescript
Did have some struggle to figure out how to ["type" curried functions from lodash](https://github.com/sire-sam/ss.study.fp-typescript/commit/9333fab8a6a64feeb8f28db5f2c39beed4a3ad3e#diff-f41e9d04a45c83f3b6f6e630f10117feR30). 

It looks like "lodash" type definition provide ["type" for curried functions"](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/lodash/index.d.ts#L10408),
so I used those to type the results of the curry method. I thing it worked well, and have been able to type curried function
for the appropriates values type like [string](https://github.com/sire-sam/ss.study.fp-typescript/commit/9333fab8a6a64feeb8f28db5f2c39beed4a3ad3e#diff-f41e9d04a45c83f3b6f6e630f10117feR117)
or [number](https://github.com/sire-sam/ss.study.fp-typescript/commit/9333fab8a6a64feeb8f28db5f2c39beed4a3ad3e#diff-f41e9d04a45c83f3b6f6e630f10117feR123).

#### Know issue
I don't know if I did all wrong from the beginning, but there's one "use case" I wasn't able to resolve.
Use a "curried" function of filter, give a "callback function" who should handle `string` and an array of `number` as set of value.
[Running the script throw an error](https://github.com/sire-sam/ss.study.fp-typescript/commit/9333fab8a6a64feeb8f28db5f2c39beed4a3ad3e#diff-f41e9d04a45c83f3b6f6e630f10117feR132) (obviously)   
I wish I could find a way to tell TypeScript this two are incompatible.
