import { browser } from '$app/environment'
import { writable } from 'svelte/store'

// This configuration maintains data, even on reloads/refresh.

export const buildChampion = {
	champion: {
		name: '',
		abilities: [],
		type: []
	},
	items: [],
	boots: {},
	summoners: []
}

const initFavorites = browser ? window.localStorage.getItem('favorites') : ['Aatrox']

export const favorites: any = writable(initFavorites)

favorites.subscribe((value: any) => {
	if (value === null) value = []
	if (browser) window.localStorage.setItem('favorites', value)
})

const initBuild = browser ? window.localStorage.getItem('build') : JSON.stringify(buildChampion)

export const build: any = writable(initBuild)

build.subscribe((value: any) => {
	if (browser) window.localStorage.setItem('build', value)
})

const initBuilds = browser ? window.localStorage.getItem('builds') : []

export const builds: any = writable(initBuilds)

builds.subscribe((value: any) => {
	if (browser) window.localStorage.setItem('builds', value)
})
