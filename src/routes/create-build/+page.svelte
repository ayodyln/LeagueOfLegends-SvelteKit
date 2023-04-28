<script lang="ts">
	import { onMount } from 'svelte'
	import { build } from '$lib/stores'
	import { colorBadgeHandler } from '$lib/league-of-legends/champions'
	import Stats from '../../components/pages/champions/Stats.svelte'
	let myBuild: any

	onMount(() => {
		console.log(JSON.parse($build))
		myBuild = JSON.parse($build)
		console.log(myBuild)
	})
</script>

<main class="w-full max-w-5xl m-auto flex-grow p-4 flex gap-4">
	{#if myBuild}
		<div class="rounded-lg overflow-hidden w-96">
			<img
				src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/{myBuild.champion
					.id}_0.jpg"
				alt={myBuild.champion.name} />
		</div>

		<section class="w-full flex flex-col gap-4">
			<!-- Champion -->
			<div class="flex w-full justify-between items-end">
				<div>
					<h1 class="text-5xl font-bold">{myBuild.champion.name}</h1>
					<p class="italic">{myBuild.champion.title}</p>
				</div>

				<div class="flex gap-2">
					{#each myBuild.champion.tags as tag}
						<div class="badge badge-lg {colorBadgeHandler(tag)}">{tag}</div>
					{/each}
				</div>
			</div>

			<div>
				<Stats selectedChampion={myBuild.champion} />
			</div>

			<!-- Items -->
			<div>
				{#each myBuild.items as item}
					<p>{item.name}</p>
				{/each}

				{#if myBuild.boots.name}
					<span>Boots: {myBuild.boots.name}</span>
				{/if}
			</div>

			<!-- Summoner -->
		</section>
	{/if}
</main>
