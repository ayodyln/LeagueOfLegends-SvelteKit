<script lang="ts">
	import { onMount } from 'svelte'

	export let champ: any, buttonHndlr: any, selectedChampion: any

	onMount(() => {})
</script>

<button
	data-id={champ.id}
	class:ring={selectedChampion ? selectedChampion.name === champ.name : false}
	on:click={buttonHndlr}
	class="avatar w-[19%] h-fit hover:ring hover:ring-2 rounded-xl overflow-hidden">
	<div class="w-full pointer-events-none">
		<img
			src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${champ.id}.png`}
			alt={champ.name}
			loading="lazy" />
	</div>
</button>
