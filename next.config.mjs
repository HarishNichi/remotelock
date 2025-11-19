/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: ['next-pwa'],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.__NEXT_PWA_BUILD_ID__': JSON.stringify(buildId),
      })
    );
    if (!dev && !isServer) {
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        if (entries['main.js'] && !entries['main.js'].includes('./src/app/registerSW.js')) {
          entries['main.js'].unshift('./src/app/registerSW.js');
        }
        return entries;
      };
    }
    return config;
  },
  experimental: {
    forceSwcTransforms: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // This is a temporary fix for next-pwa with Next.js 16 and Turbopack
  // See: https://github.com/vercel/turborepo/discussions/5199
  // And: https://github.com/shadowwalker/next-pwa/issues/424
  // This ensures the service worker is registered correctly in the app directory

  // End of temporary fix
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
})(nextConfig);
