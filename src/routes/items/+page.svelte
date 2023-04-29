<script lang="ts">
	import { leagueChampions } from '$lib/league-of-legends/champions'
	import { onMount } from 'svelte'
	import { build } from '$lib/stores'

	let leagueItems: any = []
	let filter = 'Boots'
	let filteredItems: any = []
	let itemTags: any = []
	let modal: any

	const itemHandler = (tag: any) => {
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
		console.log(item)
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
			.filter((item: any) => !item.hasOwnProperty('inStore'))

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
				<div class="w-[15%] flex flex-col items-center gap-1">
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
					<div class="w-[15%] flex flex-col items-center gap-1">
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
		</label>
	</label>
{/if}
