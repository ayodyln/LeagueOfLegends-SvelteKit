<script lang="ts">
	import { onMount } from 'svelte'
	import RecentChamp from '../components/RecentChamp.svelte'
	import { build, buildChampion, builds } from '$lib/stores'
	import { leagueChampions, recentChampions } from '$lib/league-of-legends/champions'

	let newChampions: any = {}
	let localBuilds: any = []

	onMount(async () => {
		const leagueAPI = await leagueChampions()
		newChampions = await recentChampions(leagueAPI.champions)
		localBuilds = JSON.parse($builds)
		console.log(localBuilds)
	})
</script>

<svelte:head>
	<title>LoL SvelteKit App</title>
</svelte:head>

<main class="w-full max-w-5xl m-auto flex-grow p-4">
	<section class="font-sans">
		<RecentChamp recents={newChampions.recents} />
		<div class="divider m-0 mt-3" />

		<div>
			<h2>Recent Builds</h2>

			{#each localBuilds as build}
				<p>{build.champion.name}</p>
			{/each}
		</div>
	</section>
</main>
