import { browser } from '$app/environment'
import { writable } from 'svelte/store'

// This configuration maintains data, even on reloads/refresh.

const initFavorites: any = browser ? window.localStorage.getItem('favorites') : ['Aatrox']

export const favorites = writable(initFavorites)

favorites.subscribe((value: any) => {
	if (browser) window.localStorage.setItem('favorites', value)
})
