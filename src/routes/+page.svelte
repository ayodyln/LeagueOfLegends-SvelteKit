<script lang="ts">
	import { onMount } from 'svelte'
	import RecentChamp from '../components/RecentChamp.svelte'
	import { championsData } from '$lib/champions/Champions'

	let champions: any = {}

	onMount(async () => {
		try {
			const lol_data = await fetch(`api/riot`)
			const lol_res = await lol_data.json()
			champions = await championsData(lol_res.champions)
			console.log(champions)
		} catch (error) {
			console.error(error)
		}
	})
</script>

<svelte:head>
	<title>LoL SvelteKit App</title>
</svelte:head>

<main class="w-full max-w-5xl m-auto flex-grow">
	<section class="font-sans">
		<RecentChamp recents={champions.recents} />
		<div class="divider m-0" />
	</section>
</main>
