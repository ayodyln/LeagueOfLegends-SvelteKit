<script lang="ts">
	import { onMount } from 'svelte'
	import { leagueChampions } from '$lib/league-of-legends/champions'
	import ChampionAvatar from '../../components/pages/champions/ChampionAvatar.svelte'
	import SelectedChamp from '../../components/pages/champions/SelectedChamp.svelte'
	import FilterChampions from '../../components/pages/champions/FilterChampions.svelte'
	import ChampionDefaultPage from '../../components/pages/champions/ChampionDefaultPage.svelte'

	let champions: any = []
	let filteredChampions: any[]
	let filter: string
	let champTags: any[]
	let selectedChampion: any

	onMount(async () => {
		const leagueAPI = await leagueChampions()
		champions = Object.values(leagueAPI.champions.data).map((champ) => champ)
		champTags = [...new Set(champions.map((tag: { tags: any }) => tag.tags).flat())]
	})

	const buttonHndlr = async (event: any) => {
		selectedChampion = false

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

	const filterHandler = (e: any) => {
		if (filter === e.target.dataset.type) {
			filter = ''
			filteredChampions = []
			return
		}

		filter = e.target.dataset.type
		filteredChampions = champions.filter((champ: { tags: string | string[] }) =>
			champ.tags.includes(filter)
		)
	}
</script>

<main class="w-full max-w-6xl m-auto p-4 text-white">
	<div class="flex h-[700px]">
		<section id="champions" class="w-96 h-full bg-base-300 p-2 rounded-lg rounded-r-none">
			<FilterChampions {filterHandler} {filter} />
			<div class="divider m-0 h-[3%]" />
			<div class="overflow-auto max-h-[85%] flex flex-wrap gap-[3px] justify-center w-full p-1">
				{#if !filter}
					{#each champions as champ}
						<ChampionAvatar {champ} {buttonHndlr} {selectedChampion} />
					{/each}
				{:else}
					{#each filteredChampions as champ}
						<ChampionAvatar {champ} {buttonHndlr} {selectedChampion} />
					{/each}
				{/if}
			</div>
		</section>

		<!-- Chosen Champion -->
		<section class="bg-neutral w-full h-full rounded-r-xl overflow-auto">
			<!-- Toggled Champion -->
			{#if selectedChampion}
				<SelectedChamp {selectedChampion} />
			{:else}
				<ChampionDefaultPage />
			{/if}
		</section>
	</div>
</main>
