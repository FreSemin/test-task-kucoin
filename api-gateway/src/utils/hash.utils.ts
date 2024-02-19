import { createHmac } from 'crypto';

export function hashValue(value: string): string {
  const hmac = createHmac('sha256', process.env.APP_API_SECRET || '');

  hmac.update(value);

  return hmac.digest('hex');
}

export function isValueEqualToHash(
  value: string,
  hashedValue: string,
): boolean {
  return hashValue(value) === hashedValue;
}
