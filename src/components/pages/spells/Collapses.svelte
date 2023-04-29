<script lang="ts">
	export let spell: any, localSummoners: any, spellBuildHandler: any

	let collapese = false
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
	tabindex="0"
	class="collapse {collapese
		? 'collapse-open'
		: ''} border border-base-300 bg-neutral max-w-[400px] w-full rounded-box">
	<button on:click={() => (collapese = !collapese)} class="collapse-title">
		<div class="flex gap-2">
			<figure class="">
				<img
					src="http://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/{spell.image.full}"
					class="rounded-xl w-20"
					alt={spell.name} />
			</figure>

			<section>
				<h2 class="card-title">{spell.name}</h2>
				<span class="text-sm">{spell.cooldown} cooldown | {spell.range} range</span>
			</section>
		</div>
	</button>
	<div class="collapse-content h-fit flex flex-col gap-2">
		<p class="text-sm">{spell.description}</p>

		<div class="card-actions self-end">
			{#if localSummoners.some((s) => s.name === spell.name)}
				<button
					on:click={(e) => {
						e.stopPropagation()
						spellBuildHandler(spell)
					}}
					class="btn btn-error">Remove from Build</button>
			{:else if localSummoners.length === 2 && localSummoners.some((s) => s.name !== spell.name)}
				<button class="btn btn-disabled" />
			{:else}
				<button
					on:click={(e) => {
						e.stopPropagation()
						spellBuildHandler(spell)
					}}
					class="btn btn-primary">Add to Build</button>
			{/if}
		</div>
	</div>
</div>
