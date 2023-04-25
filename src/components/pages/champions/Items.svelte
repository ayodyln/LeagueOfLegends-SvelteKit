<script lang="ts">
	import { onMount } from 'svelte'

	export let itemTags: any, items: any

	let filter = 'Boots'
	let filteredItems: any = []

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
	})
</script>

<section id="items" class="flex gap-4">
	<!-- filter -->
	<ul class="menu bg-base-100 w-56 h-fit">
		{#each itemTags as tag}
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
