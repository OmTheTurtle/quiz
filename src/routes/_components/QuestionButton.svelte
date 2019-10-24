<script>
  import { createEventDispatcher } from 'svelte'
  import { questionScore } from '../../stores.js'

  const dispatch = createEventDispatcher()
  export let points = 0
  export let text = ''
  let disabled = false

  const onClick = () => {
    disabled = true
    upadateQuestionScore(points)
    dispatch('update', { text })
  }

  const upadateQuestionScore = (points) => {
    questionScore.set(points)
  }
</script>

<button
  on:click={onClick}
  disabled={disabled}>
  {points}
</button><br>
