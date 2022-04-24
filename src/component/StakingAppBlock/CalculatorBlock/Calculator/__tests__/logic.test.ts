import { isValidInput } from '../logic';

it('isValidInput works', () => {
  expect(isValidInput('0.123')).toBeTruthy();
  expect(isValidInput('.123')).toBeTruthy();
  expect(isValidInput('132.123')).toBeTruthy();
  expect(isValidInput('123')).toBeTruthy();
  expect(isValidInput('10.123')).toBeTruthy();
  expect(isValidInput('24.')).toBeTruthy();

  expect(isValidInput('asad')).toBeFalsy();
  expect(isValidInput('a123sad')).toBeFalsy();
  expect(isValidInput('-0.123')).toBeFalsy();
  expect(isValidInput('-.123')).toBeFalsy();
  expect(isValidInput('123 124')).toBeFalsy();
  expect(isValidInput('123 sdfa')).toBeFalsy();
  expect(isValidInput('123.123324.12')).toBeFalsy();
  expect(isValidInput('..1239')).toBeFalsy();
  expect(isValidInput('000.3243')).toBeFalsy();
});
