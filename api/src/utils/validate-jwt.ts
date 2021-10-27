export function isValidToken(fullToken: string) {
  if (!fullToken) return { isValid: false, message: 'token.missing' };

  const [scheme, token] = fullToken.split(' ');

  const startsWithBearer = /^Bearer$/i.test(scheme);
  const isWellFormatted = token.split('.').length === 3;
  const hasNoSpaces = token.split(' ').length === 1;

  // input here all the validations we must do
  const validationArray = [startsWithBearer, isWellFormatted, hasNoSpaces];

  if (validationArray.some((validation) => !validation)) {
    return { isValid: false, message: 'token.invalid' };
  }

  return { isValid: true, token };
}
