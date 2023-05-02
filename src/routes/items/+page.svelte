<script lang="ts">
	import { leagueChampions, mythicItems, legendaryItems } from '$lib/league-of-legends/champions'
	import { onMount } from 'svelte'
	import { build } from '$lib/stores'

	let leagueItems: any = []
	let filter = 'Boots'
	let filteredItems: any = []
	let itemTags: any = []
	let modal: any

	const itemHandler = (tag: any) => {
		window.scrollTo({ top: 0, behavior: 'smooth' })

		filteredItems = []

		if (filter === tag) {
			filter = ''
			filteredItems = leagueItems.filter((item: any) => item.tags.includes(filter))
			return
		}

		filter = tag

		filteredItems = leagueItems.filter(
			(item: any) =>
				item.tags.includes(filter) &&
				item.name !== 'Boots' &&
				item.name !== 'The Golden Spatula' &&
				item.name !== 'Scarecrow Effigy' &&
				item.name !== `Kalista's Black Spear`
		)
	}

	const singleItemHandler = (item: any) => {
		const myBuild = JSON.parse($build)

		if (item.tags.includes('Boots')) {
			const checkBootState = myBuild.boots

			if (checkBootState.name) {
				myBuild.boots = item
				$build = JSON.stringify(myBuild)
				return
			}

			myBuild.boots = item
			$build = JSON.stringify(myBuild)
			return
		}

		if (mythicItems.includes(item.name)) {
			const mythics = myBuild.items.map((i) => {
				if (mythicItems.includes(i.name) && i.name !== item.name) {
					return i.name
				}
			})
			myBuild.items = myBuild.items.filter((i: any) => !mythics.includes(i.name))
		}

		if (myBuild.items.some((i: any) => i.name === item.name)) {
			myBuild.items = myBuild.items.filter((i: any) => i.name !== item.name)
			$build = JSON.stringify(myBuild)
		} else {
			myBuild.items = [...myBuild.items, item]
			$build = JSON.stringify(myBuild)
		}
	}

	onMount(async () => {
		const { items } = await leagueChampions()
		leagueItems = Object.values(items.data)
			.map((item) => item)
			.filter(
				(i: any) =>
					mythicItems.includes(i.name) ||
					legendaryItems.includes(i.name) ||
					i.tags.includes('Boots') ||
					i.tags.includes('Jungle')
			)

		filteredItems = leagueItems.filter(
			(item: any) =>
				item.tags.includes(filter) &&
				item.name !== 'Boots' &&
				item.name !== 'The Golden Spatula' &&
				item.name !== 'Scarecrow Effigy' &&
				item.name !== `Kalista's Black Spear`
		)
		itemTags = [...new Set(leagueItems.map((item: any) => item.tags).flat())]
	})
</script>

<main class="w-full max-w-6xl p-4 text-white mx-auto flex gap-2 h-full">
	<ul class="menu bg-neutral w-56 h-fit gap-1">
		{#each itemTags as item}
			<li>
				<button class:active={filter === item} on:click={() => itemHandler(item)} class="p-[6px]">
					{item.split(/(?=[A-Z])/).join(' ')}
				</button>
			</li>
		{/each}
	</ul>

	<section class="w-full flex flex-wrap h-fit p-2 gap-2 justify-center">
		{#if !filter}
			{#each leagueItems as item}
				<div class="w-[15%] flex flex-col items-center justify-between gap-1">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<button
						on:click={(e) => {
							singleItemHandler(item)
						}}
						class="flex flex-col w-full bg-neutral text-neutral-content p-2 rounded-lg gap-2 items-center hover:bg-neutral-focus h-56">
						<div class="avatar w-full pointer-events-none p-2">
							<div class="w-full rounded border border-primary">
								<img
									src="https://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/{item.image.full}"
									alt={item.name}
									loading="lazy" />
							</div>
						</div>
						<p class="text-xs pointer-events-none">{item.name.split(/(?=[A-Z])/).join(' ')}</p>

						{#if mythicItems.includes(item.name)}
							<div class="badge badge-outline badge-accent">Mythic</div>
						{:else if legendaryItems.includes(item.name)}
							<div class="badge badge-outline badge-warning">Legendary</div>
						{:else if item.tags.includes('Boots')}
							<div class="badge badge-outline badge-info">Boots</div>
						{:else}
							<div class="badge badge-outline badge-ghost">General</div>
						{/if}
					</button>

					<button
						type="button"
						on:click={(e) => {
							e.preventDefault()
							console.log(item)
							modal = item
						}}
						class="btn btn-ghost btn-sm text-xs z-3">Item Info</button>
				</div>
			{/each}
		{:else}
			{#each filteredItems as item}
				{#if !item.hasOwnProperty('inStore')}
					<div class="w-[15%] flex flex-col items-center justify-between gap-1">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<button
							on:click={(e) => {
								singleItemHandler(item)
							}}
							class:ring={JSON.parse($build).items.some((i) => i.name === item.name) ||
								JSON.parse($build).boots.name === item.name}
							class="flex flex-col w-full bg-neutral text-neutral-content p-2 rounded-lg gap-2 items-center hover:bg-neutral-focus h-56">
							<div class="avatar w-full pointer-events-none p-2">
								<div class="w-full rounded border border-primary">
									<img
										src="https://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/{item.image.full}"
										alt={item.name}
										loading="lazy" />
								</div>
							</div>
							<p class="text-xs pointer-events-none">{item.name.split(/(?=[A-Z])/).join(' ')}</p>

							{#if mythicItems.includes(item.name)}
								<div class="badge badge-outline badge-accent">Mythic</div>
							{:else if legendaryItems.includes(item.name)}
								<div class="badge badge-outline badge-warning">Legendary</div>
							{:else if item.tags.includes('Boots')}
								<div class="badge badge-outline badge-info">Boots</div>
							{:else}
								<div class="badge badge-outline badge-ghost">General</div>
							{/if}
						</button>

						<button
							type="button"
							on:click={(e) => {
								e.preventDefault()
								console.log(item)
								modal = item
							}}
							class="btn btn-ghost btn-sm text-xs z-3">Item Info</button>
					</div>
				{/if}
			{/each}
		{/if}
	</section>
</main>

{#if modal}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<label on:click={() => (modal = false)} for="my-modal-4" class="modal modal-open cursor-pointer">
		<label class="modal-box relative cursor-pointer" for="">
			<h3 class="text-lg font-bold">{modal.name}</h3>
			<p class="py-4">
				{modal.plaintext}
			</p>

			<div class="flex items-center gap-2">
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-current w-5">
						<!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<path
							d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z" /></svg>
				</span>
				{modal.gold.base}
			</div>

			<div class="flex gap-2 mt-2">
				{#each modal.tags as tag}
					<div class="badge badge-lg">{tag}</div>
				{/each}
			</div>
		</label>
	</label>
{/if}
