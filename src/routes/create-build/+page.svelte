<script lang="ts">
	import { onMount } from 'svelte'
	import { build, buildChampion, builds } from '$lib/stores'
	import { colorBadgeHandler } from '$lib/league-of-legends/champions'
	import Stats from '../../components/pages/champions/Stats.svelte'

	let myBuild: any = buildChampion

	const removeItemHandler = (item: any) => {
		if (item.tags.includes('Boots')) {
			myBuild.boots = {}
			$build = JSON.stringify(myBuild)
		} else {
			myBuild.items = myBuild.items.filter((i: any) => i.name !== item.name)
			$build = JSON.stringify(myBuild)
		}
	}

	const removeChamp = () => {
		myBuild = buildChampion
		$build = JSON.stringify(myBuild)
	}

	const saveBuildHandler = () => {
		let localBuilds = JSON.parse($builds)
		if (!localBuilds) $builds = JSON.stringify([])
		$builds = JSON.stringify([
			...localBuilds,
			{
				id: localBuilds.length,
				...myBuild
			}
		])

		myBuild = buildChampion
		$build = JSON.stringify(buildChampion)
	}

	const summonerBuildHandler = (summoner: any) => {
		myBuild.summoners = myBuild.summoners.filter((spell: any) => spell.name !== summoner.name)
		$build = JSON.stringify(myBuild)
	}

	onMount(() => {
		myBuild = JSON.parse($build)
	})
</script>

<main class="w-full max-w-5xl m-auto flex-grow p-4 flex gap-4">
	{#if myBuild.champion.name}
		<div class="rounded-lg overflow-hidden w-96 h-fit flex flex-col gap-6">
			<img
				src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/{myBuild.champion
					.id}_0.jpg"
				alt={myBuild.champion.name}
				class="shadow-xl rounded-lg" />

			<button on:click={() => removeChamp()} class="btn btn-error w-full">Remove Champ</button>
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

			<div class="divider m-0" />

			<div class="flex gap-2 w-full">
				{#each myBuild.summoners as summoner}
					<div class="card bg-neutral text-neutral-content w-1/2 h-full bg-base-100 shadow-xl">
						<div class="card-body p-2">
							<div class="flex gap-2">
								<figure class="">
									<img
										src="https://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/{summoner.image
											.full}"
										class="rounded-xl w-20"
										alt={summoner.name} />
								</figure>

								<section>
									<h2 class="card-title">{summoner.name}</h2>
									<span class="text-sm">{summoner.cooldown} cooldown | {summoner.range} range</span>
								</section>
							</div>

							<p class="text-sm">{summoner.description}</p>

							<div class="card-actions">
								<button on:click={() => summonerBuildHandler(summoner)} class="btn btn-error"
									>Remove from Build</button>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<div class="mt-10">
				<button on:click={saveBuildHandler} class="btn btn-success">Save Build</button>
			</div>
		</section>
	{:else}
		<section class="flex justify-center items-center flex-col w-full h-full gap-4">
			<h1 class="text-xl font-bold">Please go choose a Champion to start a Build!</h1>
			<a class="btn btn-success w-96" href="/champions">See Champions</a>
			<a class="btn w-96" href="/">See Builds</a>
		</section>
	{/if}
</main>
