<script lang="ts">
	import { onMount } from 'svelte'
	import { leagueChampions } from '$lib/league-of-legends/champions'
	import ChampionAvatar from '../../components/pages/champions/ChampionAvatar.svelte'
	import SelectedChamp from '../../components/pages/champions/SelectedChamp.svelte'

	let champions: any = []
	let selectedChampion: any = false

	onMount(async () => {
		const leagueAPI = await leagueChampions()
		champions = Object.values(leagueAPI.champions.data).map((champ, index) => champ)
	})

	const buttonHndlr = async (event: any) => {
		try {
			const champData = await fetch(
				`http://ddragon.leagueoflegends.com/cdn/13.8.1/data/en_US/champion/${event.target.dataset.id}.json`
			)
			const res = await champData.json()
			selectedChampion = Object.values(res.data)[0]
		} catch (error) {
			console.log(error)
		}
	}
</script>

<main class="w-full max-w-5xl m-auto p-4">
	<div class="flex">
		<section
			id="champions"
			class="flex flex-wrap gap-[3px] w-96 h-[1000px] overflow-auto bg-base-300 p-2 rounded-lg justify-center rounded-l-xl">
			{#each champions as champ}
				<ChampionAvatar {champ} {buttonHndlr} />
			{/each}
		</section>

		<!-- Chosen Champion -->
		<section class="bg-neutral w-full rounded-r-xl">
			<!-- Toggled Champion -->
			{#if selectedChampion}
				<SelectedChamp {selectedChampion} />
			{:else}
				<p>select a champion</p>
			{/if}
		</section>
	</div>
</main>
