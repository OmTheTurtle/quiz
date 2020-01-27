<script>
  export let minutes = 7
  export let seconds = 0

  let remainingSeconds = minutes * 60 + seconds
  $: remainingMinutes = Math.floor(remainingSeconds / 60)
  $: remainingSecondsFromMinute = remainingSeconds - remainingMinutes * 60
  $: additionalZero = remainingSecondsFromMinute
    .toString()
    .length === 1 ? '0' : ''

  $: remainingTime = `
    ${remainingMinutes}:${additionalZero}${remainingSecondsFromMinute}`

  let timer = {}
  let running = false
  let color = 'orange'

  const pauseResume = () => {
    if (!running && remainingSeconds) {
      running = true
      color = 'green'
      timer = setInterval(() => {
        remainingSeconds--
        if (!remainingSeconds) {
          color = 'red'
          clearInterval(timer)
          remainingSeconds = 0
        }
      }, 1000)
    } else if (remainingSeconds) {
      color = 'orange'
      running = false
      clearInterval(timer)
    }
  }

  const reset = () => {
    if(confirm('Biztosan reseteled az időzítőt?')) {
      running = false
      color = 'orange'
      clearInterval(timer)
      remainingSeconds = minutes * 60 + seconds
    }
  }
</script>

<section>
  <span on:click={pauseResume}
    style="color: {color};"
    class="text-6xl">
    {remainingTime}
  </span>

  <i on:click={reset}
    class="fa fa-repeat ml-1 text-blue-500 hover:text-blue-700">
  </i>
</section>

<style>
  section {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  span, i {
    cursor: pointer;
  }

  i {
    font-size: 1.25rem;
  }
</style>