<script>
  import { createEventDispatcher } from 'svelte'
  import { onDestroy } from 'svelte'
  import { questionScore } from '../../stores.js'

  const dispatch = createEventDispatcher();
  export let name = 'Közönség'
  let score = 0
  let plusPoints = 0
  const unsubscribe =
    questionScore.subscribe(value => plusPoints = value)

  const updateScore = (positive) => {
    score += positive ? plusPoints : -plusPoints
    dispatch('pointAdded')
  }

  onDestroy(unsubscribe)
</script>

<section class="player">
  <div class="name text-l">{name}</div>
  <div class="text-3xl border border-blue-500 rounded pr-1 mb-1 score">{score}</div>
  <div class="buttons">
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      on:click={() => updateScore(true)}>
      +
    </button>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      on:click={() => updateScore(false)}>
      -
    </button>
  </div>
</section>

<style>
  section.player {
    padding: .3rem;
  }

  .score {
    text-align: end;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
  }
</style>