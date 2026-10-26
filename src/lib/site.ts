// Company facts used across the site. Edit here, not in components.
export const site = {
  url: 'https://www.eigentech.ai',
  name: 'EigenTech',
  nameAr: 'آيجينتك',
  email: 'ceo@eigentech.ai',
  phoneDisplay: '+966 56 603 6956',
  phoneHref: '+966566036956',
  domain: 'www.eigentech.ai',
  linkedin: 'https://www.linkedin.com/company/eigentech-ai/',
} as const;

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Prefix a public asset path with the configured base path. */
export const asset = (path: string) => `${basePath}${path}`;

/**
 * Change this date whenever the logo or icon files change. It is added to their addresses, so browsers and
 * Cloudflare fetch the new files at once instead of showing copies they saved earlier (images are kept 4 hours).
 */
export const brandVersion = '2026-10-26';
export const brandAsset = (path: string) => `${asset(path)}?v=${brandVersion}`;

export const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || '';
