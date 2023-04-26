<script lang="ts">
	import { onMount } from 'svelte'
	// http://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/SummonerFlash.png

	let spells: any = []

	onMount(async () => {
		try {
			const summoners = await fetch(
				'http://ddragon.leagueoflegends.com/cdn/13.8.1/data/en_US/summoner.json'
			)
			const res = await summoners.json()
			console.log(res)
			spells = Object.values(res.data).map((spell) => spell)
		} catch (error) {
			console.error(error)
		}
	})
</script>

<main class="w-full max-w-5xl m-auto flex-grow p-4">
	{#each spells as spell}
		<div>
			<button>{spell.name}</button>
		</div>
	{/each}
</main>
