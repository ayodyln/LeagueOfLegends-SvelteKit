<script lang="ts">
	export let recents: any = []
</script>

<div id="RecentChampions" class="flex gap-2">
	{#if recents.length === 0}
		{#each Array(6) as _}
			<div
				class="animate-pulste bg-neutral card w-56 h-[300px] rounded-xl overflow-hidden drop-shadow-lg">
				<img class="rounded-xl" src="" alt="" />

				<div class="absolute bottom-0 left-0 bg-neutral w-full p-2 bg-opacity-75">
					<h3 class="text-xl">{''}</h3>
				</div>
			</div>
		{/each}
	{:else}
		{#each recents as champ}
			<div class="card w-56 rounded-xl overflow-hidden drop-shadow-lg h-[300px]">
				<img
					class="rounded-xl h-full"
					src="http://ddragon.leagueoflegends.com/cdn/img/{champ.image
						.group}/loading/{champ.id}_0.jpg"
					alt="{champ.name} loading screen art." />

				<div class="absolute bottom-0 left-0 bg-neutral w-full p-2 bg-opacity-75">
					<h3 class="text-2xl text-center font-bold text-[#CAA65D]">{champ.name}</h3>
				</div>
			</div>
		{/each}
	{/if}
</div>
