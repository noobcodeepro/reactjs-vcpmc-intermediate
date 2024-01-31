export function parseToInt(input: string): number {
  const parsedNumber = parseInt(input, 10);

  if (!isNaN(parsedNumber) && parsedNumber > 0) {
    return parsedNumber;
  }

  return 0;
}
