<script lang="ts">
	import { onMount } from 'svelte'
	import { recommendedItems } from '$lib/league-of-legends/champions'
	export let items: any, selectedChampion: any

	let filter = 'Boots'
	let filteredItems: any = []
	let suggestedItems: any[] = []

	const itemHandler = (e: any) => {
		const tag = e.target.dataset.tag
		console.log(tag)

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
			console.log(tag)
			suggestedItems = [...new Set([...suggestedItems, ...recommendedItems(tag)])]
		})

		console.log(suggestedItems)
	})
</script>

<section id="items" class="flex gap-4">
	<!-- filter -->
	<ul class="menu bg-base-100 w-56 h-fit">
		{#each suggestedItems as tag}
			<li>
				<button class:active={filter === tag} data-tag={tag} on:click={itemHandler} class="p-1"
					>{tag}</button>
			</li>
		{/each}
	</ul>
	<!-- Items -->
	<section class="w-full">
		{#if !filter}
			{#each items as item}
				<p>{item.name}</p>
			{/each}
		{:else}
			{#each filteredItems as item}
				<p>{item.name}</p>
			{/each}
		{/if}
	</section>
</section>
