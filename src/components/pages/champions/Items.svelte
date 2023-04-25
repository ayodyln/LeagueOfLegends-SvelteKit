<script lang="ts">
	import { onMount } from 'svelte'
	import { recommendedItems } from '$lib/league-of-legends/champions'
	export let items: any, selectedChampion: any

	let filter = 'Boots'
	let filteredItems: any = []
	let suggestedItems: any[] = []

	const itemHandler = (e: any) => {
		const tag = e.target.dataset.tag

		if (filter === tag) {
			filter = ''
			filteredItems = []
			return
		}

		filter = tag
		filteredItems = items.filter((item: { tags: string | string[] }) => item.tags.includes(filter))
	}

	onMount(() => {
		filteredItems = items.filter((item: { tags: string | string[] }) => item.tags.includes(filter))
		suggestedItems = recommendedItems('Fighter')

		selectedChampion.tags.forEach((tag: any) => {
			suggestedItems = [...new Set([...suggestedItems, ...recommendedItems(tag)])]
		})

		console.log(items)
	})
</script>

<section id="items" class="flex gap-4">
	<!-- filter -->
	<ul class="menu bg-neutral w-56 h-fit gap-1">
		{#each suggestedItems as tag}
			<li>
				<button class:active={filter === tag} data-tag={tag} on:click={itemHandler} class="p-2"
					>{tag.split(/(?=[A-Z])/).join(' ')}</button>
			</li>
		{/each}
	</ul>
	<!-- Items -->
	<section class="w-full flex flex-wrap">
		{#if !filter}
			{#each items as item}
				<div>
					<div class="avatar">
						<div class="w-32 rounded">
							<img
								src="http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/{item.image.full}"
								alt={item.name}
								loading="lazy" />
						</div>
					</div>
					<p>{item.name.split(/(?=[A-Z])/).join(' ')}</p>
				</div>
			{/each}
		{:else}
			{#each filteredItems as item}
				<div class="flex">
					<div class="avatar">
						<div class="w-32 rounded">
							<img
								src="http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/{item.image.full}"
								alt={item.name}
								loading="lazy" />
						</div>
					</div>
					<p>{item.name.split(/(?=[A-Z])/).join(' ')}</p>
				</div>
			{/each}
		{/if}
	</section>
</section>
