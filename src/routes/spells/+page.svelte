<script lang="ts">
	import { onMount } from 'svelte'
	import { build } from '$lib/stores'
	import Collapses from '../../components/pages/spells/Collapses.svelte'
	// http://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/SummonerFlash.png

	let spells: any = []
	let localSummoners: any = []

	const spellBuildHandler = (spell: any) => {
		const champbuild = JSON.parse($build)

		if (champbuild.summoners.some((s) => spell.name === s.name)) {
			localSummoners = localSummoners.filter((s) => s.name !== spell.name)
			champbuild.summoners = localSummoners
			$build = JSON.stringify(champbuild)
			return
		}

		if (champbuild.summoners.length === 2) {
			console.log('MAX SUMMONERS')
			champbuild.summoners = []
			localSummoners = []
			$build = JSON.stringify(champbuild)
			return
		}
		console.log(localSummoners)
		console.log(spell)
		localSummoners = [...champbuild.summoners, spell]
		champbuild.summoners = [...champbuild.summoners, spell]
		$build = JSON.stringify(champbuild)
	}

	onMount(async () => {
		try {
			const summoners = await fetch(
				'https://ddragon.leagueoflegends.com/cdn/13.8.1/data/en_US/summoner.json'
			)
			const res = await summoners.json()
			spells = Object.values(res.data)
				.map((spell) => spell)
				.filter(
					(spell: any) =>
						!spell.id.includes('Placeholder') &&
						!spell.id.includes('Poro') &&
						!spell.id.includes('Hail') &&
						!spell.name.includes('Mark')
				)
			console.log(spells)
			localSummoners = JSON.parse($build).summoners
			console.log(localSummoners)
		} catch (error) {
			console.error(error)
		}
	})
</script>

<main class="w-full max-w-5xl m-auto flex-grow p-4">
	<section class="flex flex-col items-center justify-center gap-2">
		{#each spells as spell}
			<Collapses {spell} {spellBuildHandler} {localSummoners}/>
		{/each}
	</section>
</main>
