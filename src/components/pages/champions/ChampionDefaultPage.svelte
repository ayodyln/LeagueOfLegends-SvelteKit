<script lang="ts">
	import { getRandomIconImage } from '$lib/league-of-legends/champions'
	import { onMount } from 'svelte'

	let randomIcon: string

	onMount(async () => {
		const icon: any = await getRandomIconImage()
		randomIcon = `http://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/${icon.image.full}`
	})
</script>

<div class="w-full h-full flex flex-col justify-center items-center gap-2">
	{#if !randomIcon}
		<div class="w-56 h-56 flex justify-center items-center bg-base-300 rounded-lg">
			<svg
				class="animate-spin h-5 w-5 text-white"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
			</svg>
		</div>
	{:else}
		<div class="avatar bg-base-300">
			<div class="w-56 rounded-lg">
				<img src={randomIcon} alt="icon" />
			</div>
		</div>
	{/if}

	<p class="text-3xl">Pick a Champion Summoner!</p>
</div>
