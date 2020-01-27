<script>
  import { createEventDispatcher } from 'svelte'
  import { questionScore, enableQuestionClick } from '../../stores.js'

  const dispatch = createEventDispatcher()
  export let points = 0
  export let text = ''
  let disabled = false

  const onClick = () => {
    if ($enableQuestionClick) {
      disabled = true
      upadateQuestionScore(points)
      dispatch('update', { text })
      enableQuestionClick.set(false)
    }
  }

  const upadateQuestionScore = (points) => {
    questionScore.set(points)
  }
</script>

<button
  class="bg-blue-500 hover:bg-blue-700 text-white text-2xl font-bold py-2 rounded"
  on:click={onClick}
  disabled={disabled}>
  {points}
</button>

<style>
  button {
    width: 90%;
    cursor: pointer;
  }

  button:disabled {
    opacity: 20%;
    color: black;
  }
</style>