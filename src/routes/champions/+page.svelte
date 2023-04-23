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
	<div class="flex h-[700px]">
		<section
			id="champions"
			class="flex flex-wrap gap-[3px] w-96 h-full overflow-auto bg-base-300 p-2 rounded-lg justify-center rounded-l-xl">
			{#each champions as champ}
				<ChampionAvatar {champ} {buttonHndlr} {selectedChampion} />
			{/each}
		</section>

		<!-- Chosen Champion -->
		<section class="bg-neutral w-full h-full rounded-r-xl overflow-auto">
			<!-- Toggled Champion -->
			{#if selectedChampion}
				<SelectedChamp {selectedChampion} />
			{:else}
				<div class="w-full h-full flex flex-col justify-center items-center gap-2">
					{#if !randomIcon}
						<div class="w-56 h-56 flex justify-center items-center bg-base-300 rounded-lg">
							<svg
								class="animate-spin h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24">
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4" />
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
							</svg>
						</div>
					{:else}
						<div class="avatar bg-base-300">
							<div class="w-56 rounded-lg">
								<img src={randomIcon} alt="icon" />
							</div>
						</div>
					{/if}

					<p class="text-3xl">Pick a Champion Summoner!</p>
				</div>
			{/if}
		</section>
	</div>
</main>
