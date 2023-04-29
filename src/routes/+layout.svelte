<script lang="ts">
	import { onMount } from 'svelte'
	import '../app.css'
	import Footer from '../components/layout/Footer.svelte'
	import { build, buildChampion, builds } from '$lib/stores'

	import NavigationBar from '../components/layout/NavigationBar.svelte'

	onMount(() => {
		const buildModel = $build ? JSON.parse($build) : null
		if (!buildModel || !buildModel.hasOwnProperty('champion')) {
			$build = JSON.stringify(buildChampion)
		}
		const mybuilds = $builds ? JSON.parse($builds) : null
		if (!mybuilds) {
			$builds = JSON.stringify([])
		}
	})
</script>

<div class="flex h-full min-h-screen max-height-auto flex-col">
	<NavigationBar />
	<div class="flex-grow">
		<slot />
	</div>
	<Footer />
</div>
