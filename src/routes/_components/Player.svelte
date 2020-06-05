<script>
  import { createEventDispatcher } from 'svelte'
  import { enableQuestionClick, players, questionScore } from '../../stores.js'

  const dispatch = createEventDispatcher();
  export let name
  export let score = 0

  const updateScore = (positive) => {
    score += positive ? $questionScore : -$questionScore
    players.update(prev => prev.map(p => (p.name === name) ? ({ name: p.name, score }) : p))
    dispatch('pointAdded')
    enableQuestionClick.set(true)
  }
</script>

<section>
  <div class="text-xl">{name}</div>
  <div class="text-3xl border border-blue-500 rounded pr-1 mb-1 text-right">
    {score}
  </div>
  <div class="flex justify-between mb-2">
    <i on:click={() => updateScore(true)}
      class="button fa fa-plus-square text-blue-500 hover:text-blue-700">
    </i>
    <i on:click={() => updateScore(false)}
      class="button fa fa-minus-square text-blue-500 hover:text-blue-700">
    </i>
  </div>
</section>

<style>
  i.button {
    font-size: 2rem;
    cursor: pointer;
  }
</style>