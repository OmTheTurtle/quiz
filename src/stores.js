import { writable } from 'svelte/store'

const DEFAULT_PLAYER_COUNT = 4

export const questionScore = writable(0)

export const playerCount = writable(DEFAULT_PLAYER_COUNT)

export const players = writable(
  [...Array(DEFAULT_PLAYER_COUNT)].map((_, i) => ({
    name: `Játékos${i + 1}`,
    score: 0
  }))
)

export const enableQuestionClick = writable(true)
