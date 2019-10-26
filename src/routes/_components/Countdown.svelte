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

  $: remainingTime = `
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

<section>
  <span on:click={pauseResume}
    style="color: {color};"
    class="text-5xl">
    {remainingTime}
  </span>

  <i on:click={reset}
    class="fa fa-repeat text-lg ml-1 hover:text-blue-500">
  </i>
</section>

<style>
  section {
    display: flex;
    align-items: center;
  }
  span, i {
    cursor: pointer;
  }
</style>