<script lang="ts">
  import Switch from "../../components/Switch.svelte"
  import Button from "../../components/Button.svelte"
  import PickerSwatch from "../../components/PickerSwatch.svelte"
  import Slider from "../../components/Slider.svelte"

  import browser from "webextension-polyfill"
  
  import { SettingsList } from "../../types/SettingsProps"
  import { setSettingsValue, settingsState } from "../../state/SettingsState2"
  
  const settings: SettingsList[] = [
    {
      title: "Transparency Effects",
      description: "Enables transparency effects on certain elements such as blur. (May impact battery life)",
      component: Switch,
      props: {
        state: $settingsState.transparencyEffects,
        onChange: (isOn: boolean) => setSettingsValue('transparencyEffects', isOn)
      }
    },
    {
      title: "Animated Background",
      description: "Adds an animated background to BetterSEQTA. (May impact battery life)",
        component: Switch,
        props: {
          state: $settingsState.animatedBackground,
          onChange: (isOn: boolean) => setSettingsValue('animatedBackground', isOn)
      }
    },
    {
      title: "Animated Background Speed",
      description: "Controls the speed of the animated background.",
      component: Slider,
      props: {
        state: parseInt($settingsState.animatedBackgroundSpeed),
        onChange: (value: number) => setSettingsValue('animatedBackgroundSpeed', `${value}`)
      }
    },
    {
      title: "Custom Theme Colour",
      description: "Customise the overall theme colour of SEQTA Learn.",
      component: PickerSwatch
    },
    {
      title: "Telemetry",
      description: "Enables/disables error collecting.",
      component: Switch,
      props: {
        state: $settingsState.telemetry,
        onChange: (isOn: boolean) => setSettingsValue('telemetry', isOn)
      }
    },
    {
      title: "Edit Sidebar Layout",
      description: "Customise the sidebar layout.",
        component: Button,
        props: {
          onClick: () => browser.runtime.sendMessage({ type: 'currentTab', info: 'EditSidebar' }),
          className: 'px-4 py-1 text-[0.75rem] dark:bg-[#38373D] bg-[#DDDDDD] dark:text-white rounded-md'
      }
    },
    {
      title: "Notification Collector",
      description: "Uncaps the 9+ limit for notifications, showing the real number.",
        component: Switch,
        props: {
          state: $settingsState.notificationCollector,
          onChange: (isOn: boolean) => setSettingsValue('notificationCollector', isOn)
      }
    },
    {
      title: "Lesson Alerts",
      description: "Sends a native browser notification ~5 minutes prior to lessons.",
      component: Switch,
      props: {
        state: $settingsState.lessonAlerts,
        onChange: (isOn: boolean) => setSettingsValue('lessonAlerts', isOn)
      }
    },
    {
      title: "BetterSEQTA+",
      description: "Enables BetterSEQTA+ features",
      component: Switch,
      props: {
        state: $settingsState.betterSEQTAPlus,
        onChange: (isOn: boolean) => setSettingsValue('betterSEQTAPlus', isOn)
      }
    }
  ];
</script>

<div class="flex flex-col -mt-4 overflow-y-scroll divide-y divide-zinc-100 dark:divide-zinc-700">
  {#each settings as { title, description, component: Component, props }}
    <div class="flex items-center justify-between px-4 py-3">
      <div class="pr-4">
        <h2 class="text-sm font-bold">{title}</h2>
        <p class="text-xs">{description}</p>
      </div>
      <div>
        <svelte:component this={Component} {...props} />
      </div>
    </div>
  {/each}
</div>