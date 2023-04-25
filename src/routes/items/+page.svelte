<script lang="ts">
	import { leagueChampions } from '$lib/league-of-legends/champions'
	import { onMount } from 'svelte'

	let leagueItems: any = []
	let filter = 'Boots'
	let filteredItems: any = []
	let itemTags: any = []

	const itemHandler = (tag) => {
		filteredItems = []

		if (filter === tag) {
			filter = ''
			filteredItems = leagueItems.filter((item: any) => item.tags.includes(filter))
			return
		}

		filter = tag

		filteredItems = leagueItems.filter((item: any) => {
			console.log(item)
			return item.tags.includes(filter)
		})
	}

	const singleItemHandler = (item: any) => {
		console.log(item)
	}

	onMount(async () => {
		const { items } = await leagueChampions()
		leagueItems = Object.values(items.data).map((item) => item)
		// console.log(leagueItems)

		filteredItems = leagueItems.filter((item: any) => item.tags.includes(filter))

		itemTags = [...new Set(leagueItems.map((item: any) => item.tags).flat())]
	})
</script>

<main class="w-full max-w-6xl p-4 text-white mx-auto flex gap-2 h-full">
	<ul class="menu bg-neutral w-56 h-fit gap-1 p-1">
		{#each itemTags as item}
			<li>
				<button class:active={filter === item.name} on:click={() => itemHandler(item)} class="p-[6px]"
					>{item.split(/(?=[A-Z])/).join(' ')}</button>
			</li>
		{/each}
	</ul>

	<section class="w-full flex flex-wrap h-fit p-2 gap-2 justify-center">
		{#if !filter}
			{#each leagueItems as item}
				<button
					on:click={() => singleItemHandler(item)}
					class="flex flex-col w-[13%] bg-neutral text-neutral-content p-2 rounded-lg gap-2 items-center hover:bg-neutral-focus">
					<div class="avatar w-full pointer-events-none">
						<div class="w-full rounded border border-primary">
							<img
								src="http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/{item.image.full}"
								alt={item.name}
								loading="lazy" />
						</div>
					</div>
					<p class="text-xs pointer-events-none">{item.name.split(/(?=[A-Z])/).join(' ')}</p>
				</button>
			{/each}
		{:else}
			{#each filteredItems as item}
				<button
					on:click={() => singleItemHandler(item)}
					class="flex flex-col w-[13%] bg-neutral text-neutral-content p-2 rounded-lg gap-2 items-center hover:bg-neutral-focus">
					<div class="avatar w-full pointer-events-none">
						<div class="w-full rounded border border-primary">
							<img
								src="http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/{item.image.full}"
								alt={item.name}
								loading="lazy" />
						</div>
					</div>
					<p class="text-xs pointer-events-none">{item.name.split(/(?=[A-Z])/).join(' ')}</p>
				</button>
			{/each}
		{/if}
	</section>
</main>
