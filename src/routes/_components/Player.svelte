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
  <div class="name text-xl">{name}</div>
  <div class="text-3xl border border-blue-500 rounded pr-1 mb-1 score">
    {score}
  </div>
  <div class="buttons">
    <i on:click={() => updateScore(true)}
      class="button fa fa-plus-square text-blue-500 hover:text-blue-700">
    </i>
    <i on:click={() => updateScore(false)}
      class="button fa fa-minus-square text-blue-500 hover:text-blue-700">
    </i>
  </div>
</section>

<style>
  section.player {
    padding: .3rem;
  }

  .score {
    text-align: end;
  }

  i.button {
    font-size: 2rem;
    cursor: pointer;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
  }
</style>