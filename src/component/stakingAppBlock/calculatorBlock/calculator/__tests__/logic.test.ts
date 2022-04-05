import { isCorrectInput } from '../logic';

it('isCorrectInput works', () => {
  expect(isCorrectInput('0.123')).toBeTruthy();
  expect(isCorrectInput('.123')).toBeTruthy();
  expect(isCorrectInput('132.123')).toBeTruthy();
  expect(isCorrectInput('123')).toBeTruthy();
  expect(isCorrectInput('10.123')).toBeTruthy();
  expect(isCorrectInput('24.')).toBeTruthy();

  expect(isCorrectInput('asad')).toBeFalsy();
  expect(isCorrectInput('a123sad')).toBeFalsy();
  expect(isCorrectInput('-0.123')).toBeFalsy();
  expect(isCorrectInput('-.123')).toBeFalsy();
  expect(isCorrectInput('123 124')).toBeFalsy();
  expect(isCorrectInput('123 sdfa')).toBeFalsy();
  expect(isCorrectInput('123.123324.12')).toBeFalsy();
  expect(isCorrectInput('..1239')).toBeFalsy();
  expect(isCorrectInput('000.3243')).toBeFalsy();
});
