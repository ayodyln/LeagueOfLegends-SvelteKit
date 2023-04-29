<script lang="ts">
	import { onMount } from 'svelte'
	import RecentChamp from '../components/RecentChamp.svelte'
	import { build, buildChampion, builds } from '$lib/stores'
	import { leagueChampions, recentChampions } from '$lib/league-of-legends/champions'
	let newChampions: any = {}
	let localBuilds: any = []
	let searchValue = ''
	let searchResult: any = []

	let selectedChampion: any

	const searchHandler = () => {
		console.log('seraching...')
		console.log(searchValue)
	}

	onMount(async () => {
		const leagueAPI = await leagueChampions()
		newChampions = await recentChampions(leagueAPI.champions)
		localBuilds = JSON.parse($builds)
	})
</script>

<svelte:head>
	<title>LoL SvelteKit App</title>
</svelte:head>

<main class="w-full max-w-5xl m-auto flex-grow p-4">
	<section class="font-sans h-full">
		<RecentChamp recents={newChampions.recents} />
		<div class="divider m-0 mt-3 mb-4" />

		<div class="flex flex-col gap-2">
			<div class="flex justify-between">
				<div class="flex flex-col gap-2">
					<h2 class="text-2xl font-bold mb-4">Recent Builds</h2>
					<div class="form-control w-96">
						<label class="input-group input-group-lg w-full">
							<button on:click={searchHandler} class="btn">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
									class="fill-current w-5">
									<!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
									<path
										d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
								</svg>
							</button>

							<input
								on:change={searchHandler}
								bind:value={searchValue}
								type="text"
								placeholder="Search Champion Name..."
								class="input input-bordered input-md w-full" />
						</label>
					</div>
				</div>
				<section>
					<button class="btn btn-sm">Edit Build</button>
					<button class="btn btn-sm">Delete Build</button>
				</section>
			</div>

			<div class="overflow-x-hidden w-full border rounded-lg border-base-200 shadow-xl flex-grow">
				<table class="table table-zebra w-full">
					<!-- head -->
					<thead>
						<tr>
							<th>
								<label>
									<input type="checkbox" class="checkbox" />
								</label>
							</th>
							<th class="w-[33%]">Champion</th>
							<th class="w-[33%]">Items</th>
							<th class="w-[33%]">Summoners</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{#if searchValue === ''}
							{#each localBuilds as build, i}
								<tr>
									<th>
										<label>
											<input type="checkbox" class="checkbox" />
										</label>
									</th>

									<td>
										<div class="flex items-center space-x-3">
											<div class="avatar">
												<div class="w-12 h-12 rounded shadow">
													<img
														src="https://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/{build
															.champion.id}.png"
														alt={build.champion.name} />
												</div>
											</div>
											<div>
												<div class="font-bold">{build.champion.name}</div>
												<div class="text-sm opacity-50">{build.champion.title}</div>
											</div>
										</div>
									</td>

									<td>
										<div class="flex">
											{#each build.items as item}
												<div class="w-10 h-10 rounded shadow">
													<img
														src="https://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/{item.image
															.full}"
														alt={build.champion.name} />
												</div>
											{/each}
										</div>
									</td>

									<td>
										<div class="flex">
											{#each build.summoners as summoner}
												<div class="w-10 h-10 rounded shadow">
													<img
														src="https://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/{summoner
															.image.full}"
														alt={build.champion.name} />
												</div>
											{/each}
										</div>
									</td>

									<th>
										<button class="btn btn-ghost btn-xs">details</button>
									</th>
								</tr>
							{/each}
						{:else}
							{#each localBuilds as build, i}
								{#if build.champion.name.toLowerCase().includes(searchValue.toLowerCase())}
									<tr>
										<th>
											<label>
												<input type="checkbox" class="checkbox" />
											</label>
										</th>

										<td>
											<div class="flex items-center space-x-3">
												<div class="avatar">
													<div class="w-12 h-12 rounded shadow">
														<img
															src="https://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/{build
																.champion.id}.png"
															alt={build.champion.name} />
													</div>
												</div>
												<div>
													<div class="font-bold">{build.champion.name}</div>
													<div class="text-sm opacity-50">{build.champion.title}</div>
												</div>
											</div>
										</td>

										<td>
											<div class="flex">
												{#each build.items as item}
													<div class="w-10 h-10 rounded shadow">
														<img
															src="https://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/{item
																.image.full}"
															alt={build.champion.name} />
													</div>
												{/each}
											</div>
										</td>

										<td>
											<div class="flex">
												{#each build.summoners as summoner}
													<div class="w-10 h-10 rounded shadow">
														<img
															src="https://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/{summoner
																.image.full}"
															alt={build.champion.name} />
													</div>
												{/each}
											</div>
										</td>

										<th>
											<button class="btn btn-ghost btn-xs">details</button>
										</th>
									</tr>
								{/if}
							{/each}
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	</section>
</main>
