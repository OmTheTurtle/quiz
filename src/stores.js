import { writable } from 'svelte/store'

const DEFAULT_PLAYER_COUNT = 4

export const questionScore = writable(0)

export const playerCount = writable(DEFAULT_PLAYER_COUNT)
export const players = writable(Array(DEFAULT_PLAYER_COUNT))
export const enableQuestionClick = writable(true)
