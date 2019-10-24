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

<div>
  <div>{name}</div>
  <div>{score}</div>
  <button on:click={() => updateScore(true)}>+</button>
  <button on:click={() => updateScore(false)}>-</button>
</div>
