// @ts-expect-error - Svelte Hash Router is not typed (yet)
import { routes } from 'svelte-hash-router'
import App from './+layout.svelte';
import Settings from './pages/settings.svelte';

routes.set({
  'settings': Settings,
  '*': Settings
})

const app = new App({
  target: document.body
});

export default app;