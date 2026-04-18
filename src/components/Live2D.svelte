<script lang="ts">
  import * as PIXI from 'pixi.js'
  import { Live2DModel } from 'pixi-live2d-display/cubism4'
  import { onDestroy, onMount } from 'svelte'
  window.PIXI = PIXI

  let container: HTMLCanvasElement
  let app: PIXI.Application
  let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  let isOpened = $state(!isMobile)

  let translateYClass = $derived.by(() => {
    return isOpened ? 'translate-y-0' : 'translate-y-full'
  })

  onMount(() => {
    app = new PIXI.Application({
      view: container,
      backgroundAlpha: 0,
      width: container.clientWidth,
      height: container.clientHeight,
      resolution: 2,
      autoDensity: true,
      antialias: true
    })

    const model = Live2DModel.fromSync('/models/101750/model.model3.json', {
      onError: console.warn
    })

    model.once('load', () => {
      app.stage.addChild(model)

      model.scale.set(0.15, 0.15)
      model.anchor.set(0, 0)
      model.position.set(0, 30)
      model.motion('Motion')
      model.expression()
    })

    model.on('hit', (hitAreas) => {
      if (hitAreas.includes('body')) {
        model.internalModel.motionManager.stopAllMotions()
        model.internalModel.motionManager.startRandomMotion('Motion')
      } else if (hitAreas.includes('head')) {
        model.internalModel.motionManager.expressionManager.setRandomExpression()
      }
    })
  })

  onDestroy(() => {
    app.destroy(true)
  })
</script>

<div
  id="live2d-widget"
  class={[
    'fixed left-0 bottom-0 w-90 h-120 z-50 transition-transform duration-1000 ease-in-out will-change-transform ',
    translateYClass
  ]}
>
  <canvas bind:this={container} id="live2d-container" class="w-full h-full"
  ></canvas>
</div>

<div class="fixed bottom-2 left-2 z-100">
  <button
    class="bg-gray-100 dark:bg-gray-800 text-black w-6 h-6 dark:text-white hover:cursor-pointer flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
    onclick={() => (isOpened = !isOpened)}
    aria-label="Close Live2D Widget"
  >
    <span
      class:icon-[material-symbols--close]={isOpened}
      class:icon-[material-symbols--add]={!isOpened}
    ></span>
  </button>
</div>
