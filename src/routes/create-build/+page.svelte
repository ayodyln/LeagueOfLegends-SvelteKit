<script lang="ts">
	import { onMount } from 'svelte'
	import { build } from '$lib/stores'
	import { colorBadgeHandler } from '$lib/league-of-legends/champions'
	import Stats from '../../components/pages/champions/Stats.svelte'

	let myBuild: any

	const removeItemHandler = (item: any) => {
		console.log(item)

		if (item.tags.includes('Boots')) {
			myBuild.boots = {}
			$build = JSON.stringify(myBuild)
		} else {
			myBuild.items = myBuild.items.filter((i: any) => i.name !== item.name)
			$build = JSON.stringify(myBuild)
		}
	}

	onMount(() => {
		console.log(JSON.parse($build))
		myBuild = JSON.parse($build)
		console.log(myBuild)
	})
</script>

<main class="w-full max-w-5xl m-auto flex-grow p-4 flex gap-4">
	{#if myBuild}
		<div class="rounded-lg overflow-hidden w-96 h-fit flex flex-col gap-6">
			<img
				src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/{myBuild.champion
					.id}_0.jpg"
				alt={myBuild.champion.name}
				class="shadow-xl rounded-lg" />

			<button class="btn btn-error w-full">Remove Champ</button>
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
			<div class="flex flex-col gap-2">
				<section class="flex gap-4">
					{#each myBuild.items as item}
						<div
							class="flex flex-col justify-between w-[15%] bg-neutral text-neutral-content p-2 rounded-lg gap-2 items-center hover:bg-neutral-focus">
							<div class="avatar w-full pointer-events-none">
								<div class="w-full rounded border border-primary">
									<img
										src="http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/{item.image.full}"
										alt={item.name}
										loading="lazy" />
								</div>
							</div>
							<p class="text-xs pointer-events-none text-center">
								{item.name.split(/(?=[A-Z])/).join(' ')}
							</p>

							<button on:click={() => removeItemHandler(item)} class="btn btn-xs hover:text-error"
								>Remove</button>
						</div>
					{/each}
				</section>

				<div class="divider m-0" />

				{#if myBuild.boots.name}
					<div
						class="flex flex-col w-[15%] bg-neutral text-neutral-content p-2 rounded-lg gap-2 items-center hover:bg-neutral-focus">
						<div class="avatar w-full pointer-events-none">
							<div class="w-full rounded border border-primary">
								<img
									src="http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/{myBuild.boots.image
										.full}"
									alt={myBuild.boots.name}
									loading="lazy" />
							</div>
						</div>
						<p class="text-xs pointer-events-none text-center">{myBuild.boots.name}</p>

						<button
							on:click={() => removeItemHandler(myBuild.boots)}
							class="btn btn-xs hover:text-error">Remove</button>
					</div>
				{/if}
			</div>

			<!-- Summoner -->
		</section>
	{/if}
</main>
