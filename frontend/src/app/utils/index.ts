const SERVICE_URL = 'http://127.0.0.1:4100/api';

export function getServiceUrl(path: string): string {
  return `${SERVICE_URL}/${path}`;
}
