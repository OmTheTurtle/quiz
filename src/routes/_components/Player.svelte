<script>
  import { createEventDispatcher } from 'svelte'
  import { questionScore } from '../../stores.js'

  const dispatch = createEventDispatcher();
  export let name = 'Közönség'
  let score = 0

  const updateScore = (positive) => {
    score += positive ? $questionScore : -$questionScore
    dispatch('pointAdded')
  }
</script>

<section>
  <div class="text-xl">{name}</div>
  <div class="text-3xl border border-blue-500 rounded pr-1 mb-1 score">
    {score}
  </div>
  <div class="buttons flex justify-center mb-2">
    <i on:click={() => updateScore(true)}
      class="button fa fa-plus-square text-blue-500 hover:text-blue-700">
    </i>
    <i on:click={() => updateScore(false)}
      class="button fa fa-minus-square text-blue-500 hover:text-blue-500">
    </i>
  </div>
</section>

<style>
  .score {
    text-align: end;
  }

  .buttons {
    justify-content: space-between;
  }

  i.button {
    font-size: 2rem;
    cursor: pointer;
  }
</style>