<script lang="ts">
	import { onMount } from 'svelte'
	import { leagueChampions } from '$lib/league-of-legends/champions'
	import ChampionAvatar from '../../components/pages/champions/ChampionAvatar.svelte'

	let champions: any = []

	onMount(async () => {
		const leagueAPI = await leagueChampions()
		champions = Object.values(leagueAPI.champions.data).map((champ, index) => champ)
	})
</script>

<main class="w-full max-w-5xl m-auto flex-grow p-4">
	<!-- Champions -->
	<section id="champions">
		{#each champions as champ}
			<ChampionAvatar {champ} />
		{/each}
	</section>

	<!-- Chosen Champion -->
</main>
