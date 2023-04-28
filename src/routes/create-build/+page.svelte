<script lang="ts">
	import { onMount } from 'svelte'
	import { build } from '$lib/stores'

	onMount(() => {
		$build = JSON.stringify({
			name: 'Aatrox'
		})
		console.log(JSON.parse($build))
	})
</script>

<main class="w-full max-w-5xl m-auto flex-grow p-4">
	<section>
		<!-- Champion -->

		<!-- Items -->

		<!-- Summoner -->
	</section>
</main>
