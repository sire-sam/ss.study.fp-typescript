import { curry } from 'lodash';

const add = (x: number): (y: number) => number => {
  return (y: number): number  => x + y;
};

const increment = add(1);
const addTen = add(10);

process.stdout.write(`
  ${increment(1).toString()}
  ${addTen(2).toString()}
`);
