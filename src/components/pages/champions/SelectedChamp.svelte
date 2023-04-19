<script lang="ts">
	import { onMount } from 'svelte'

	export let selectedChampion: any

	onMount(() => {
		console.log(selectedChampion)
	})
</script>

<section id="champArt">
	<img
		src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${selectedChampion.id}_0.jpg`}
		alt={selectedChampion.name} />
</section>

<section class="p-2">
	<div>
		<h1 class="text-3xl">{selectedChampion.name}</h1>
	</div>

	<div class="divider m-0" />
</section>
