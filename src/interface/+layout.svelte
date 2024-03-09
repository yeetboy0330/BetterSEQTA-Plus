<script lang="ts">
  // @ts-expect-error - svelte-hash-router is not typed
  import Router from 'svelte-hash-router'
  import browser from 'webextension-polyfill';
  import * as Sentry from "@sentry/react";

  import IconFamily from 'url:../resources/fonts/IconFamily.woff'
  import IconFamily2 from 'url:../resources/fonts/IconFamily.woff2'
  import './index.css';

  browser.storage.local.get([ "telemetry" ]).then((telemetry) => {
    if (telemetry.telemetry === true)
    Sentry.init({
      dsn: "https://4bc7197431b170218e15daba4095d08b@o4506347383291904.ingest.sentry.io/4506347394105344",
      integrations: [
        Sentry.browserTracingIntegration()
      ],
      // Performance Monitoring
      tracesSampleRate: 1.0, // Capture 100% of the transactions
    });
  })

  const style = document.createElement("style");
  style.setAttribute("type", "text/css");
  style.innerHTML = `
  @font-face {
    font-family: 'IconFamily';
    src: url('${IconFamily}') format('woff'),
         url('${IconFamily2}') format('woff2');
    font-weight: normal;
    font-style: normal;
  }`;
  document.head.appendChild(style);
</script>

<Router />
