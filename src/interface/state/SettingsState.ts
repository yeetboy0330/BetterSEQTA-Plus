import { writable, type Writable } from 'svelte/store';
import browser from 'webextension-polyfill';
import type { MainConfig, SettingsState } from '../types/AppProps';

interface KeyToStateMap {
  notificationcollector: 'notificationCollector';
  lessonalert: 'lessonAlerts';
  telemetry: 'telemetry';
  animatedbk: 'animatedBackground';
  bksliderinput: 'animatedBackgroundSpeed';
  selectedColor: 'customThemeColor';
  onoff: 'betterSEQTAPlus';
  shortcuts: 'shortcuts';
  customshortcuts: 'customshortcuts';
  transparencyEffects: 'transparencyEffects';
}

const keyToStateMap = {
  notificationcollector: 'notificationCollector',
  lessonalert: 'lessonAlerts',
  telemetry: 'telemetry',
  animatedbk: 'animatedBackground',
  bksliderinput: 'animatedBackgroundSpeed',
  selectedColor: 'customThemeColor',
  onoff: 'betterSEQTAPlus',
  shortcuts: 'shortcuts',
  customshortcuts: 'customshortcuts',
  transparencyEffects: 'transparencyEffects'
};

const initialSettingsState: SettingsState = {
  notificationCollector: false,
  lessonAlerts: false,
  telemetry: false,
  animatedBackground: false,
  animatedBackgroundSpeed: '0',
  customThemeColor: '',
  betterSEQTAPlus: false,
  shortcuts: [],
  customshortcuts: [],
  transparencyEffects: false,
  theme: ''
};

const settingsStore: Writable<SettingsState> = writable(initialSettingsState);
const previousSettingsStateStore: Writable<SettingsState> = writable(initialSettingsState);

const storageChangeListener = (changes: browser.Storage.StorageChange) => {
  for (const [key, { newValue }] of Object.entries(changes)) {
    if (key === 'DarkMode') {
      if (newValue) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
    const stateKey = keyToStateMap[key as keyof KeyToStateMap];
    if (stateKey) {
      settingsStore.update((prevState) => ({ ...prevState, [stateKey]: newValue }));
    }
  }
};

const setStorage = (key: keyof MainConfig, value: any) => {
  browser.storage.local.set({ [key]: value });
};

$: {
  browser.storage.local.get().then((result: any) => {
    const mainConfigResult = result as MainConfig;
    settingsStore.set({
      notificationCollector: mainConfigResult.notificationcollector,
      lessonAlerts: mainConfigResult.lessonalert,
      telemetry: mainConfigResult.telemetry,
      animatedBackground: mainConfigResult.animatedbk,
      animatedBackgroundSpeed: mainConfigResult.bksliderinput,
      customThemeColor: mainConfigResult.selectedColor,
      betterSEQTAPlus: mainConfigResult.onoff,
      shortcuts: mainConfigResult.shortcuts,
      customshortcuts: mainConfigResult.customshortcuts,
      transparencyEffects: mainConfigResult.transparencyEffects,
      theme: mainConfigResult.theme
    });
    if (mainConfigResult.DarkMode) {
      document.body.classList.add('dark');
    }
  });
}

$: {
  const prevSettingsState = previousSettingsStateStore;
  const currSettingsState = settingsStore;
  for (const [key, value] of Object.entries(currSettingsState)) {
  const storageKey = Object.keys(keyToStateMap).find((k) => keyToStateMap[k as keyof KeyToStateMap] === key);
  if (storageKey && value !== (prevSettingsState as any)[key]) {
      setStorage(storageKey as keyof MainConfig, value);
    }
  }
  previousSettingsStateStore.set(currSettingsState as any);
}

browser.storage.onChanged.addListener(storageChangeListener);

export { settingsStore }