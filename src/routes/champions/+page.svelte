<script lang="ts">
	import { onMount } from 'svelte'
	import { leagueChampions, mythicItems, legendaryItems } from '$lib/league-of-legends/champions'
	import ChampionAvatar from '../../components/pages/champions/ChampionAvatar.svelte'
	import SelectedChamp from '../../components/pages/champions/SelectedChamp.svelte'
	import FilterChampions from '../../components/pages/champions/FilterChampions.svelte'
	import ChampionDefaultPage from '../../components/pages/champions/ChampionDefaultPage.svelte'

	let champions: any = []
	let items: any = []
	let filteredChampions: any[]
	let filter: string
	let champTags: any[]
	let selectedChampion: any

	onMount(async () => {
		const leagueAPI = await leagueChampions()
		items = Object.values(leagueAPI.items.data)
			.map((item) => item)
			.filter(
				(i: any) =>
					mythicItems.includes(i.name) ||
					legendaryItems.includes(i.name) ||
					i.tags.includes('Boots') ||
					i.tags.includes('Jungle')
			)
		champions = Object.values(leagueAPI.champions.data).map((champ) => champ)
		champTags = [...new Set(champions.map((tag: { tags: any }) => tag.tags).flat())]
	})

	const buttonHndlr = async (event: any) => {
		selectedChampion = false
		window.scrollTo({ top: 0, behavior: 'smooth' })
		try {
			const champData = await fetch(
				`https://ddragon.leagueoflegends.com/cdn/13.8.1/data/en_US/champion/${event.target.dataset.id}.json`
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

<main class="w-full max-w-6xl p-4 text-white mx-auto">
	<div class="flex h-full">
		<section id="champions" class="w-96 h-fit bg-base-300 p-2 rounded-lg rounded-r-none">
			<FilterChampions {filterHandler} {filter} />
			<div class="divider m-0 h-[3%]" />
			<div class="overflow-auto h-auto flex flex-wrap gap-[3px] justify-center w-full p-1">
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
		<section class="w-full h-full rounded-r-xl">
			<!-- Toggled Champion -->
			{#if selectedChampion}
				<SelectedChamp {selectedChampion} {items} />
			{:else}
				<ChampionDefaultPage />
			{/if}
		</section>
	</div>
</main>
