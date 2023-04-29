<script lang="ts">
	import { onMount } from 'svelte'
	import { build } from '$lib/stores'
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
	<section class="flex flex-wrap justify-center gap-2">
		{#each spells as spell}
			<div class="card bg-neutral text-neutral-content w-[400px] h-[350px] bg-base-100 shadow-xl">
				<div class="card-body p-2 flex">
					<section class="h-full flex flex-col justify-between">
						<section class="flex flex-col gap-2">
							<div class="flex gap-2">
								<figure class="">
									<img
										src="http://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/{spell.image.full}"
										class="rounded-xl w-20"
										alt={spell.name} />
								</figure>

								<section>
									<h2 class="card-title">{spell.name}</h2>
									<span class="text-sm">{spell.cooldown} cooldown | {spell.range} range</span>
								</section>
							</div>

							<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
							<div
								tabindex="0"
								class="collapse border border-base-300 bg-base-100 rounded-box p-0 h-fit">
								<div class="collapse-title text-lg font-medium">{spell.name} Details</div>
								<div class="collapse-content">
									<p class="text-sm">{spell.description}</p>
								</div>
							</div>
						</section>

						<div class="card-actions self-end">
							{#if localSummoners.some((s) => s.name === spell.name)}
								<button on:click={() => spellBuildHandler(spell)} class="btn btn-error"
									>Remove from Build</button>
							{:else if localSummoners.length === 2 && localSummoners.some((s) => s.name !== spell.name)}
								<button class="btn btn-disabled" />
							{:else}
								<button on:click={() => spellBuildHandler(spell)} class="btn btn-primary"
									>Add to Build</button>
							{/if}
						</div>
					</section>
				</div>
			</div>
		{/each}
	</section>
</main>
