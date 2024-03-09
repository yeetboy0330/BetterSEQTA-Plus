<script>
  import { spring } from "svelte/motion";
  import { MotionDiv } from "svelte-motion";
  import './Switch.css'

  export let state = false;
  export let onChange = () => {}

  const toggleSwitch = () => {
    const newIsOn = !state
    onChange(newIsOn)
  }

  const springParams = {
    stiffness: 700,
    damping: 30,
  }
</script>

<div
  class="flex w-14 p-1 cursor-pointer rounded-full dark:bg-[#38373D] bg-[#DDDDDD] switch"
  data-ison={state}
  on:click={toggleSwitch}
  on:keydown={(e) => e.key === "Enter" && toggleSwitch()}
  role="switch"
  aria-checked={state}
  tabindex="0"
>
  <MotionDiv
    animate={{ x: state ? 24 : 0 }}
    transition={spring(springParams)}
    class="w-6 h-6 bg-white dark:bg-[#FEFEFE] rounded-full drop-shadow-md"
  />
</div>