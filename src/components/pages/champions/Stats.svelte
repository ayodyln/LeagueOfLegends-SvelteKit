<script lang="ts">
	export let selectedChampion: any
	//
</script>

<div class="stats shadow w-full">
	<div class="stat w-10">
		<div class="stat-title flex items-center gap-2">
			<span class="text-md">HP</span>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 fill-success">
				<!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
				<path
					d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
			</svg>
		</div>
		<div class="text-2xl">{selectedChampion.stats.hp}</div>
	</div>

	<div class="stat w-10">
		<div class="stat-title flex items-center gap-2">
			<span class="text-md">Armor</span>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 fill-info">
				<!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
				<path
					d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z" />
			</svg>
		</div>
		<div class="text-2xl">{selectedChampion.stats.armor}</div>
	</div>

	<div class="stat w-10">
		<div class="stat-title flex items-center gap-2">
			<span class="text-md">MR</span>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 fill-primary">
				<!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
				<path
					d="M37.6 4.2C28-2.3 15.2-1.1 7 7s-9.4 21-2.8 30.5l112 163.3L16.6 233.2C6.7 236.4 0 245.6 0 256s6.7 19.6 16.6 22.8l103.1 33.4L66.8 412.8c-4.9 9.3-3.2 20.7 4.3 28.1s18.8 9.2 28.1 4.3l100.6-52.9 33.4 103.1c3.2 9.9 12.4 16.6 22.8 16.6s19.6-6.7 22.8-16.6l33.4-103.1 100.6 52.9c9.3 4.9 20.7 3.2 28.1-4.3s9.2-18.8 4.3-28.1L392.3 312.2l103.1-33.4c9.9-3.2 16.6-12.4 16.6-22.8s-6.7-19.6-16.6-22.8L388.9 198.7l25.7-70.4c3.2-8.8 1-18.6-5.6-25.2s-16.4-8.8-25.2-5.6l-70.4 25.7L278.8 16.6C275.6 6.7 266.4 0 256 0s-19.6 6.7-22.8 16.6l-32.3 99.6L37.6 4.2z" />
			</svg>
		</div>
		<div class="text-2xl">{selectedChampion.stats.spellblock}</div>
	</div>

	<div class="stat w-10">
		<div class="stat-title flex items-center gap-2">
			<span class="text-md">MP</span>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-6 fill-accent">
				<!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
				<path
					d="M499.6 11.3c6.7-10.7 20.5-14.5 31.7-8.5s15.8 19.5 10.6 31L404.8 338.6c2.2 2.3 4.3 4.7 6.3 7.1l97.2-54.7c10.5-5.9 23.6-3.1 30.9 6.4s6.3 23-2.2 31.5l-87 87H378.5c-13.2-37.3-48.7-64-90.5-64s-77.4 26.7-90.5 64H117.8L42.3 363.7c-9.7-6.7-13.1-19.6-7.9-30.3s17.4-15.9 28.7-12.4l97.2 30.4c3-3.9 6.1-7.7 9.4-11.3L107.4 236.3c-6.1-10.1-3.9-23.1 5.1-30.7s22.2-7.5 31.1 .1L246 293.6c1.5-.4 3-.8 4.5-1.1l13.6-142.7c1.2-12.3 11.5-21.7 23.9-21.7s22.7 9.4 23.9 21.7l13.5 141.9L499.6 11.3zM64 448v0H512v0h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64zM288 0c13.3 0 24 10.7 24 24V72c0 13.3-10.7 24-24 24s-24-10.7-24-24V24c0-13.3 10.7-24 24-24z" />
			</svg>
		</div>
		<div class="text-2xl">{selectedChampion.stats.mp}</div>
	</div>

	<div class="stat w-10">
		<div class="stat-title flex items-center gap-2">
			<span class="text-md">ATK</span>
			<svg
				id="a"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 560 560.02"
				class="w-6 fill-error">
				<!-- Created by Deemark Daksina from Noun Project -->
				<path
					d="m204.79,523.76l25.37-27.18L61.62,328.04l-25.37,27.18,70.68,70.68L0,532.83l27.18,27.18,105.11-106.93,72.5,70.68Zm-83.37-154.05l68.87,68.87L550.94,115.99,560,0l-115.99,9.06L121.42,369.71Z"
					style="fill-rule:evenodd;" />
			</svg>
		</div>
		<div class="text-2xl">{selectedChampion.stats.attackdamage}</div>
	</div>
</div>
