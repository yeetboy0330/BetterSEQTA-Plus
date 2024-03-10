<script>
	import { settingsState } from '../state/SettingsState.ts';
  import { spring } from "svelte/motion";
  import { MotionDiv } from "svelte-motion";
  import './Switch.css'
  import { onMount } from "svelte"
  import { delay } from "../../seqta/utils/delay"

  export let setting;
  export let onChange = () => {}

  const toggleSwitch = () => {
    const newIsOn = !$settingsState[setting]
    onChange(newIsOn)
  }

  const springParams = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  }
</script>

<div
  id={setting}
  class="flex w-14 p-1 cursor-pointer rounded-full dark:bg-[#38373D] bg-[#DDDDDD] switch"
  data-ison={$settingsState[setting]}
  on:click={toggleSwitch}
  on:keydown={(e) => e.key === "Enter" && toggleSwitch()}
  role="switch"
  aria-checked={$settingsState[setting]}
  tabindex="0"
>
  <MotionDiv
    animate={{ x: $settingsState[setting] ? 24 : 0 }}
    transition={springParams}
    class="w-6 h-6 bg-white dark:bg-[#FEFEFE] rounded-full drop-shadow-md"
  />
</div>