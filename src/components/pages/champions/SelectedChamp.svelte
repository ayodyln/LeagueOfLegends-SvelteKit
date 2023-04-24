<script lang="ts">
	import { onMount } from 'svelte'
	import { favorites } from '$lib/stores'

	import Stats from './Stats.svelte'
	import { colorBadgeHandler } from '$lib/league-of-legends/champions'

	export let selectedChampion: any

	const favHandler = () => {
		$favorites = [...$favorites, selectedChampion.id]
	}

	onMount(() => {
		console.log(selectedChampion)
		console.log($favorites)
	})
</script>

<section id="champArt" class="relative">
	<div class="carousel h-[410px]">
		{#each selectedChampion.skins as skin, i}
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<div class="carousel-item h-auto w-full relative">
				<img
					id={`item${i}`}
					loading="lazy"
					class="w-full"
					src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${selectedChampion.id}_${skin.num}.jpg`}
					alt={skin.name} />
				{#if i !== 0}
					<span class="absolute z-1 bottom-0 left-0 bg-neutral bg-opacity-50 w-full p-2 font-bold"
						>{skin.name}</span>
				{/if}
			</div>
		{/each}
	</div>
	<div class="flex justify-center w-full py-1 gap-2">
		{#each selectedChampion.skins as skin, i}
			<a href="#item{i}" class="btn btn-xs btn-ghost">{i + 1}</a>
		{/each}
	</div>
	<button on:click={favHandler} class="w-8 absolute top-2 right-2 cursor-pointer hover:opacity-50">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			class="{$favorites.includes(selectedChampion.id)
				? 'fill-error'
				: 'fill-current'} pointer-events-none">
			<!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
			<path
				d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
		</svg>
	</button>
</section>

<section class="p-2">
	<div class="flex justify-between items-center">
		<span>
			<h1 class="text-3xl font-bold">{selectedChampion.name}</h1>
			<h3 class="text-xs font-extralight capitalize">{selectedChampion.title}</h3>
		</span>

		<span class="flex gap-3">
			{#each selectedChampion.tags as tag}
				<div class="badge badge-outline badge-lg {colorBadgeHandler(tag)}">{tag}</div>
			{/each}
		</span>
	</div>

	<div class="divider m-0" />

	<div class="flex flex-col gap-4">
		<section id="baseStats" class="flex w-full justify-between">
			<Stats {selectedChampion} />
		</section>

		<section id="abilities" class="flex flex-wrap w-full gap-2">
			<h2 class="text-lg font-bold">Abilities</h2>
			<div class="w-full h-24 bg-neutral-focus rounded-lg flex">
				<div class="h-full rounded overflow-hidden">
					<img
						src="http://ddragon.leagueoflegends.com/cdn/13.8.1/img/passive/{selectedChampion.passive
							.image.full}"
						alt="Tailwind-CSS-Avatar-component"
						class="h-full" />
				</div>

				<div class="p-2 w-3/4">
					<p>Passive - {selectedChampion.passive.name}</p>

					<p class="text-xs">{selectedChampion.passive.description}</p>
				</div>
			</div>
			{#each selectedChampion.spells as spell}
				<div class="w-full h-24 bg-neutral-focus rounded-lg flex">
					<div class="h-full rounded overflow-hidden">
						<img
							src="http://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/{spell.image.full}"
							alt="Tailwind-CSS-Avatar-component"
							class="h-full" />
					</div>

					<div class="p-2 w-3/4">
						<p class="capitalize">{spell.id.slice(-1)} - {spell.name}</p>

						<p class="text-xs">{spell.description}</p>
					</div>
				</div>
			{/each}
		</section>

		<div id="lore" class="h-auto italic">
			<div class="divider h-0" />
			{selectedChampion.lore}
			<div class="divider h-0" />
		</div>

		<section id="tips" class="flex gap-2">
			<div id="ally" class="flex flex-col gap-2 w-1/2">
				<h2 class="text-success">Ally Tips</h2>
				{#each selectedChampion.allytips as tip}
					<span class="bg-base-100 rounded-lg p-4 border border-success">{tip}</span>
				{/each}
			</div>
			<div class="divider divider-horizontal m-0 w-1" />
			<div id="enemy" class="flex flex-col gap-2 w-1/2">
				<h2 class="text-error">Enemy Tips</h2>
				{#each selectedChampion.enemytips as tip}
					<span class="bg-base-100 rounded-lg p-4 border border-error">{tip}</span>
				{/each}
			</div>
		</section>
	</div>
</section>
