import tsc from '@rollup/plugin-typescript';

const sharedConfig = {};

export default [
  {
    input: 'src/LanguageSwitcher.tsx',
    plugins: [tsc()],
    external: ['react'],
    ...sharedConfig,
    output: [
      {
        file: 'lib/cjs/index.js',
        format: 'cjs',
        exports: 'auto',
      },
      {
        file: 'lib/es/index.js',
        format: 'es',
      },
      // {
      //   file: 'lib/iife/index.js',
      //   format: 'iife',
      //   name: 'LanguageSwitcher',
      //   globals: {
      //     react: 'React',
      //   }
      // },
      // {
      //   file: 'lib/umd/index.js',
      //   format: 'umd',
      //   name: 'LanguageSwitcher',
      //   globals: {
      //     react: 'React',
      //   }
      // },
    ],
  },
];
