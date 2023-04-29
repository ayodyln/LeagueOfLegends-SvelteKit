<script lang="ts">
	import { onMount } from 'svelte'
	import RecentChamp from '../components/RecentChamp.svelte'
	import { build, buildChampion } from '$lib/stores'
	import { leagueChampions, recentChampions } from '$lib/league-of-legends/champions'

	let newChampions: any = {}

	onMount(async () => {
		const leagueAPI = await leagueChampions()
		newChampions = await recentChampions(leagueAPI.champions)

		// FIX THIS ERROR SITE WIDE THEN FINISH LAST FEATURES
		const buildModel = $build ? JSON.parse($build) : null
		if (!buildModel || !buildModel.hasOwnProperty('champion')) {
			$build = JSON.stringify(buildChampion)
		}
	})
</script>

<svelte:head>
	<title>LoL SvelteKit App</title>
</svelte:head>

<main class="w-full max-w-5xl m-auto flex-grow p-4">
	<section class="font-sans">
		<RecentChamp recents={newChampions.recents} />
		<div class="divider m-0 mt-3" />
	</section>
</main>
