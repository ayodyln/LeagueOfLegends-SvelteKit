<script lang="ts">
	import { onMount } from 'svelte'
	import { build } from '$lib/stores'

	let myBuild: any

	onMount(() => {
		console.log(JSON.parse($build))
		myBuild = JSON.parse($build)
		console.log(myBuild)
	})
</script>

<main class="w-full max-w-5xl m-auto flex-grow p-4">
	{#if myBuild}
		<section>
			<!-- Champion -->
			<div>
				<h1>{myBuild.champion.name}</h1>
			</div>
			<!-- Items -->
			<div>
				{#each myBuild.items as item}
					<p>{item.name}</p>
				{/each}
			</div>

			<!-- Summoner -->
		</section>
	{/if}
</main>
