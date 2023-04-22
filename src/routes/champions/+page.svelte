<script lang="ts">
	import { onMount } from 'svelte'
	import { getRandomIconImage, leagueChampions } from '$lib/league-of-legends/champions'
	import ChampionAvatar from '../../components/pages/champions/ChampionAvatar.svelte'
	import SelectedChamp from '../../components/pages/champions/SelectedChamp.svelte'

	let champions: any = []
	let selectedChampion: any
	let champTags: any[] = []
	let randomIcon = ''

	onMount(async () => {
		const leagueAPI = await leagueChampions()
		champions = Object.values(leagueAPI.champions.data).map((champ) => champ)
		champTags = [...new Set(champions.map((tag: { tags: any }) => tag.tags).flat())]

		const icon: any = await getRandomIconImage()
		randomIcon = `http://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/${icon.image.full}`
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
</script>

<main class="w-full max-w-5xl m-auto p-4 text-white">
	<div class="flex">
		<section
			id="champions"
			class="flex flex-wrap gap-[3px] w-96 h-[1000px] overflow-auto bg-base-300 p-2 rounded-lg justify-center rounded-l-xl">
			{#each champions as champ}
				<ChampionAvatar {champ} {buttonHndlr} {selectedChampion} />
			{/each}
		</section>

		<!-- Chosen Champion -->
		<section class="bg-neutral w-full rounded-r-xl overflow-hidden">
			<!-- Toggled Champion -->
			{#if selectedChampion}
				<SelectedChamp {selectedChampion} />
			{:else}
				<div class="w-full h-full flex flex-col justify-center items-center gap-2">
					<div class="avatar bg-base-300">
						<div class="w-56 rounded-lg">
							<img src={randomIcon} alt="icon" />ƒ
						</div>
					</div>

					<p class="text-3xl">Pick a Champion Summoner!</p>
				</div>
			{/if}
		</section>
	</div>
</main>
