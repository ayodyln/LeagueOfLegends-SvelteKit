<script lang="ts">
	import { onMount } from 'svelte'
	import { recommendedItems } from '$lib/league-of-legends/champions'
	import { build, buildChampion } from '$lib/stores'
	export let items: any, selectedChampion: any

	let filter = 'Boots'
	let filteredItems: any = []
	let suggestedItems: any[] = []
	let buildStore: any

	const itemHandler = (e: any) => {
		const tag = e.target.dataset.tag
		filteredItems = []
		if (filter === tag) {
			filter = ''
			filteredItems = []
			return
		}

		filter = tag
		// console.log(items)
		filteredItems = items.filter((item: any) => {
			if (
				item.tags.includes(filter) &&
				item.name !== 'Boots' &&
				item.name !== 'The Golden Spatula' &&
				item.name !== 'Scarecrow Effigy' &&
				item.name !== `Kalista's Black Spear`
			) {
				return item
			}
		})
	}

	const singleItemHandler = (item: any) => {
		console.log(item)
		const myBuild = JSON.parse($build)

		if (item.tags.includes('Boots')) {
			const checkBootState = myBuild.boots

			if (checkBootState.name) {
				myBuild.boots = item
				buildStore = myBuild
				$build = JSON.stringify(myBuild)
				return
			}

			myBuild.boots = item
			buildStore = myBuild
			$build = JSON.stringify(myBuild)
			return
		}

		if (myBuild.items.some((i: any) => i.name === item.name)) {
			myBuild.items = myBuild.items.filter((i: any) => i.name !== item.name)
			buildStore = myBuild
			$build = JSON.stringify(myBuild)
		} else {
			myBuild.items = [...myBuild.items, item]
			buildStore = myBuild
			$build = JSON.stringify(myBuild)
		}
	}

	const activeItemHandler = () => {
		// buildStore.items.some((i) => i.name === item.name) ||
		// 	buildStore.boots.name === item.name
		if (buildStore || buildStore.hasOwnProperty('Boots') || buildStore.hasOwnProperty('Items')) {
		}
	}

	onMount(() => {
		filteredItems = items.filter(
			(item: { tags: string | string[]; name: string }) =>
				item.tags.includes(filter) &&
				item.name !== 'Boots' &&
				item.name !== 'The Golden Spatula' &&
				item.name !== 'Scarecrow Effigy' &&
				item.name !== `Kalista's Black Spear`
		)

		//! make dynamic
		suggestedItems = recommendedItems(selectedChampion.tags)

		selectedChampion.tags.forEach((tag: any) => {
			suggestedItems = [...new Set([...suggestedItems, ...recommendedItems(tag)])]
		})

		buildStore = $build ? JSON.parse($build) : null
		if (!buildStore || !buildStore.hasOwnProperty('champion')) {
			$build = JSON.stringify(buildChampion)
		}
	})
</script>

<section id="items" class="flex gap-4 h-full">
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
	<section class="w-full flex h-full flex-wrap gap-[12px]">
		{#if !filter}
			{#each items as item}
				<button
					on:click={() => singleItemHandler(item)}
					class="flex flex-col w-[15%] bg-neutral text-neutral-content p-2 rounded-lg gap-2 items-center hover:bg-neutral-focus">
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
				{#if !item.hasOwnProperty('inStore')}
					<button
						class:ring={buildStore.items.some((i) => i.name === item.name) ||
							buildStore.boots.name === item.name}
						on:click={() => singleItemHandler(item)}
						class="flex flex-col w-[15%] bg-neutral text-neutral-content p-2 rounded-lg gap-2 items-center hover:bg-neutral-focus">
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
				{/if}
			{/each}
		{/if}
	</section>
</section>
