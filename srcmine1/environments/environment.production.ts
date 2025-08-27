import { BuildConfig } from '../config/build-config.interface';

export const environment: Partial<BuildConfig> = {
  production: true,

  // REST API settings - Production (will be overridden by config.prod.yml)
  // REPLACE 'your-domain.com' with your actual domain
  rest: {
    ssl: true,
    host: 'your-domain.com',  // REPLACE with your actual domain
    port: 443,
    nameSpace: '/server',
    baseUrl: 'https://your-domain.com/server'  // REPLACE with your actual domain
  },

  // UI settings
  ui: {
    ssl: false,
    host: 'localhost',
    port: 4000,
    nameSpace: '/',
    baseUrl: 'http://localhost:4000/',
    useProxies: true
  },

  // Angular SSR (Server Side Rendering) settings
  ssr: {
    enabled: true,
    enablePerformanceProfiler: false,
    inlineCriticalCss: false,
    transferState: true,
    replaceRestUrl: true,
    paths: [ '/home', '/items/', '/entities/', '/collections/', '/communities/', '/bitstream/', '/bitstreams/', '/handle/', '/reload/' ],
    enableSearchComponent: false,
    enableBrowseComponent: false,
  },
};
