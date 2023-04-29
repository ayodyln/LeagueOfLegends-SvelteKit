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

const initFavorites: any = browser ? window.localStorage.getItem('favorites') : ['Aatrox']

export const favorites = writable(initFavorites)

favorites.subscribe((value: any) => {
	if (browser) window.localStorage.setItem('favorites', value)
})

const initBuild: any = browser
	? window.localStorage.getItem('build')
	: JSON.stringify(buildChampion)

export const build = writable(initBuild)

build.subscribe((value: any) => {
	if (browser) window.localStorage.setItem('build', value)
})

const initBuilds: any = browser ? window.localStorage.getItem('builds') : []

export const builds = writable(initBuilds)

builds.subscribe((value: any) => {
	if (browser) window.localStorage.setItem('builds', value)
})
