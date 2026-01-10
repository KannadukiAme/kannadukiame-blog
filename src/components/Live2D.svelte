<script lang="ts">
  import * as PIXI from 'pixi.js'
  import { Live2DModel } from 'pixi-live2d-display/cubism4'
  import { onDestroy, onMount } from 'svelte'
  window.PIXI = PIXI

  let container: HTMLCanvasElement
  let app: PIXI.Application = null
  let translateYClass = $state('translate-y-full')

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

      translateYClass = 'translate-y-0'
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
  <!-- <div class="absolute top-2 right-2 z-10">
    <button
      class="bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-full hover:cursor-pointer w-6 h-6 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
      onclick={() => (translateYClass = 'translate-y-full')}
      aria-label="Close Live2D Widget"
    >
      &times;
    </button>
  </div> -->
  <canvas bind:this={container} id="live2d-container" class="w-full h-full"
  ></canvas>
</div>
