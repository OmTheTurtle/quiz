<script>
  export let minutes = 7
  export let seconds = 0

  let remainingSeconds = minutes * 60 + seconds
  $: remainingMinutes = Math.floor(remainingSeconds / 60)
  $: remainingSecondsFromMinute =
    remainingSeconds - Math.floor(remainingSeconds / 60) * 60
  $: additionalZero = remainingSecondsFromMinute
    .toString()
    .length === 1 ? '0' : ''

  $: resultString = `
    ${remainingMinutes}:${additionalZero}${remainingSecondsFromMinute}`

  let timer = {}
  let running = false
  let color = 'orange'

  const pauseResume = () => {
    if (!running) {
      running = true
      color = 'green'
      timer = setInterval(() => {
        remainingSeconds--
        if (!remainingSeconds) {
          color = 'red'
          clearInterval(timer)
        }
      }, 1000)
    } else {
      color = 'orange'
      running = false
      clearInterval(timer)
    }
  }

  const reset = () => {
    running = false
    color = 'orange'
    clearInterval(timer)
    remainingSeconds = minutes * 60 + seconds
  }
</script>

<div>
  <span on:click={pauseResume}
    style="color: {color};">
    {resultString}
  </span>

  <i on:click={reset}
    class="fa fa-repeat">
  </i>
</div>

<style>
  div {
    display: flex;
    align-items: center;
  }
  span {
    font-size: 3rem;
    cursor: pointer;
  }

  i {
    margin-left: .2rem;
    cursor: pointer;
    font-size: 1.2rem;
  }

  i:hover {
    color: rgb(75, 114, 224);
  }
</style>