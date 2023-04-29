<script lang="ts">
	import { onMount } from 'svelte'
	// http://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/SummonerFlash.png

	let spells: any = []

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
		} catch (error) {
			console.error(error)
		}
	})
</script>

<main class="w-full max-w-5xl m-auto flex-grow p-4">
	<section class="flex flex-wrap justify-center gap-2">
		{#each spells as spell}
			<div class="card bg-neutral text-neutral-content w-[400px] h-[250px] bg-base-100 shadow-xl">
				<div class="card-body p-2">
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

					<p class="text-sm">{spell.description}</p>

					<div class="card-actions">
						<button class="btn btn-primary">Add to Build</button>
					</div>
				</div>
			</div>
		{/each}
	</section>
</main>
