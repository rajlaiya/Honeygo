const IMAGEKIT_PUBLIC_KEY = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY ?? '';
const IMAGEKIT_URL_ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT ?? '';
const IMAGEKIT_AUTH_ENDPOINT = import.meta.env.VITE_IMAGEKIT_AUTH_ENDPOINT ?? '';

export type ImageKitAuth = {
  signature: string;
  token: string;
  expire: number;
};

const getImageKitAuth = async (): Promise<ImageKitAuth> => {
  if (!IMAGEKIT_AUTH_ENDPOINT) {
    throw new Error('Missing ImageKit auth endpoint');
  }
  const res = await fetch(IMAGEKIT_AUTH_ENDPOINT, { method: 'GET' });
  if (!res.ok) {
    throw new Error('ImageKit auth failed');
  }
  return res.json() as Promise<ImageKitAuth>;
};

export const isImageKitUrl = (url: string) =>
  Boolean(IMAGEKIT_URL_ENDPOINT) && url.startsWith(IMAGEKIT_URL_ENDPOINT);

const withTransform = (url: string, transform: string) => {
  if (url.includes('?')) return `${url}&tr=${transform}`;
  return `${url}?tr=${transform}`;
};

export const imageKitUrlForWidth = (url: string, width: number) =>
  withTransform(url, `w-${width}`);

export const buildImageKitSrcSet = (url: string, widths: number[]) =>
  widths.map((w) => `${imageKitUrlForWidth(url, w)} ${w}w`).join(', ');

export const uploadImageKitFile = async (file: File, folder = '/uploads') => {
  if (!IMAGEKIT_PUBLIC_KEY) {
    throw new Error('Missing ImageKit public key');
  }
  const auth = await getImageKitAuth();
  const form = new FormData();
  form.append('file', file);
  form.append('fileName', file.name || `upload-${Date.now()}`);
  form.append('publicKey', IMAGEKIT_PUBLIC_KEY);
  form.append('signature', auth.signature);
  form.append('token', auth.token);
  form.append('expire', String(auth.expire));
  form.append('useUniqueFileName', 'true');
  form.append('folder', folder);

  const res = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    throw new Error('ImageKit upload failed');
  }

  const data = (await res.json()) as { url: string };
  return data.url;
};
