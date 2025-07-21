import type { StorybookConfig } from '@storybook/nextjs';
import dotenv from 'dotenv';
import path from 'path';

const storybookEnv = dotenv.config({ path: '.env.storybook' }).parsed || {};

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  env: (config) => ({
    ...config,
    ...storybookEnv,
  }),
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(process.cwd(), 'src'),
      };
    }
    return config;
  },
};

export default config;
