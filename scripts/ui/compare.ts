import fs from 'node:fs';
import { normalizeColor } from './normalize';

const expected = JSON.parse(
  fs.readFileSync('artifacts/expected/inspect.json', 'utf8'),
);

const actual = JSON.parse(
  fs.readFileSync('artifacts/actual/inspect.json', 'utf8'),
);

type Difference = {
  path: string;
  expected: unknown;
  actual: unknown;
};

function compare(
  expected: unknown,
  actual: unknown,
  path = '',
): Difference[] {
  const differences: Difference[] = [];

  if (
    expected === null ||
    actual === null ||
    typeof expected !== 'object' ||
    typeof actual !== 'object'
  ) {
    const normalizedExpected = normalizeColor(expected);
    const normalizedActual = normalizeColor(actual);
    
    if (
      JSON.stringify(normalizedExpected) !==
      JSON.stringify(normalizedActual)
    ) {
      differences.push({
        path,
        expected,
        actual,
      });
    }

    return differences;
  }

  const expectedObject = expected as Record<string, unknown>;
  const actualObject = actual as Record<string, unknown>;

  const keys = new Set([
    ...Object.keys(expectedObject),
    ...Object.keys(actualObject),
  ]);

  for (const key of keys) {
    const childPath = path ? `${path}.${key}` : key;

    differences.push(
      ...compare(
        expectedObject[key],
        actualObject[key],
        childPath,
      ),
    );
  }

  return differences;
}

const differences = compare(expected, actual);

if (differences.length > 0) {
  console.error(`Found ${differences.length} difference(s):\n`);

  for (const difference of differences) {
    console.error(
      `${difference.path}: expected ${JSON.stringify(
        difference.expected,
      )}, actual ${JSON.stringify(difference.actual)}`,
    );
  }

  process.exit(1);
}

console.log('All values match');