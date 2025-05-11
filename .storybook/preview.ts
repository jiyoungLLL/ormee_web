import type { Preview } from '@storybook/react';
import '../src/app/globals.css';
import { handlers } from '../src/mock/handlers';
import { initialize, mswLoader } from 'msw-storybook-addon';

initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: [...handlers],
    },
  },
  loaders: [mswLoader],
};

export default preview;
