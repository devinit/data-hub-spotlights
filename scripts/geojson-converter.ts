import * as readline from 'readline';
import { convertUG } from './utils/geojson';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the country code e.g UG, KE e.t.c? ', (answer) => {
  const sourcePath = './scripts/source/';
  if (answer === 'UG') {
    convertUG(sourcePath);
  }

  rl.close();
});
