// @ts-expect-error - Svelte is not a module
import App from './main.svelte';

const app = new App({
  target: document.body,
  props: {
    name: 'Svelte',
  },
});

export default app;