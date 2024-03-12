<script lang="ts">
  import { onMount } from 'svelte';
  import iro from '@jaames/iro';

  type GradientStop = { color: string; position: number };

  let ColorPicker: iro.ColorPicker;
  let gradientStops: GradientStop[] = [
    { color: '#ff0000', position: 0 },
    { color: '#00ff00', position: 0.5 },
    { color: '#0000ff', position: 1 },
  ];
  let currentStop = 0;
  let draggingStop = -1;
  let initialDragPosition = 0;

  onMount(() => {
    ColorPicker = new (iro.ColorPicker as any)('#picker', {
      width: 320,
      color: gradientStops[0].color,
      layout: [
        {
          component: iro.ui.Box,
        },
        {
          component: iro.ui.Slider,
          options: {
            id: 'hue-slider',
            sliderType: 'hue',
          },
        },
        {
          component: iro.ui.Slider,
          options: {
            id: 'alpha-slider',
            sliderType: 'alpha',
          },
        },
      ],
    });

    ColorPicker.on('color:change', () => {
      gradientStops[currentStop].color = ColorPicker.color.rgbaString;
    });

    console.log(ColorPicker.color.rgba);
  });

  function handleDragStart(event: PointerEvent, index: number) {
    draggingStop = index;
    initialDragPosition = event.clientX;
  }

  function handleDragMove(event: PointerEvent) {
    if (draggingStop !== -1) {
      const stopWidth = (event.currentTarget as HTMLDivElement).offsetWidth;
      const dragDelta = event.clientX - initialDragPosition;
      const newPosition = Math.max(
        0,
        Math.min(1, gradientStops[draggingStop].position + dragDelta / stopWidth)
      );
      gradientStops = gradientStops.map((stop, index) =>
        index === draggingStop ? { ...stop, position: newPosition } : stop
      );
      gradientStops = gradientStops.sort((a, b) => a.position - b.position);
    }
  }

  function handleDragEnd() {
    draggingStop = -1;
  }
</script>

<div
  class="w-16 h-8 rounded-md swatch"
  style="background: linear-gradient(to right, {gradientStops
    .map(({ color, position }) => `${color} ${position * 100}%`)
    .join(', ')});"
></div>
<div class="fixed top-0 left-0 z-20 flex flex-col w-48 h-32 gap-8">
  <div id="picker"></div>

  <div
    class="w-[320px] h-4 relative"
    style={`background: linear-gradient(to right, ${gradientStops
      .map(({ color, position }) => `${color} ${position * 100}%`)
      .join(', ')});`}
    on:pointermove={handleDragMove}
    on:pointerup={handleDragEnd}
  >
    {#each gradientStops as { position }, index}
      <button
        class="absolute w-4 h-4 bg-white rounded-md top-1/2"
        style={`left: ${position * 100}%; transform: translate(-50%, -50%);`}
        on:click={() => (currentStop = index)}
        on:pointerdown={(event) => handleDragStart(event, index)}
      ></button>
    {/each}
  </div>
</div>