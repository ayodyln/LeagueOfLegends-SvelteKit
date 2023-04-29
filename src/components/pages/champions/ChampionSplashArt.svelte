<script lang="ts">
	import { favorites } from '$lib/stores'
	import { onMount } from 'svelte'

	export let selectedChampion: any

	let favoritesArray: any = []

	const favHandler = () => {
		const favs = JSON.parse($favorites)
		console.log(favs)

		if (favs.includes(selectedChampion.id)) {
			$favorites = JSON.stringify([
				...new Set(favs.filter((fav: string) => fav !== selectedChampion.id))
			])
			favoritesArray = [...new Set(favs.filter((fav: string) => fav !== selectedChampion.id))]
			return
		}

		favoritesArray = [...favs, selectedChampion.id]
		$favorites = JSON.stringify([...favs, selectedChampion.id])
	}

	onMount(() => {
		favoritesArray = $favorites ? JSON.parse($favorites) : null
		if (!favoritesArray) {
			$favorites = JSON.stringify(favoritesArray)
		}
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
					src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${selectedChampion.id}_${skin.num}.jpg`}
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

	<button
		on:click={favHandler}
		class="w-8 absolute top-2 right-2 cursor-pointer hover:opacity-50 {favoritesArray.includes(
			selectedChampion.id
		)
			? 'fill-error'
			: 'fill-white'}">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class=" pointer-events-none">
			<!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
			<path
				d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
		</svg>
	</button>
</section>
