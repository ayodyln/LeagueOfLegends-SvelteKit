<script lang="ts">
	export let filterHandler: any, filter: string
</script>

<div class="flex h-fit flex-wrap w-full gap-[1%]">
	<button
		data-type="Fighter"
		on:click={filterHandler}
		class:ring={filter === 'Fighter'}
		class="btn btn-sm tooltip w-[32%] my-1 flex items-center"
		data-tip="Fighter">
		<img src="/Fighter_icon.webp" alt="Fighter" class="w-5 pointer-events-none" />
	</button>
	<button
		data-type="Tank"
		on:click={filterHandler}
		class:ring={filter === 'Tank'}
		class="btn btn-sm tooltip w-[32%] my-1 flex items-center"
		data-tip="Tank">
		<img src="/Tank_icon.webp" alt="Tank" class="w-5 pointer-events-none" />
	</button>
	<button
		data-type="Mage"
		on:click={filterHandler}
		class:ring={filter === 'Mage'}
		class="btn btn-sm tooltip w-[32%] my-1 flex items-center"
		data-tip="Mage">
		<img src="/Mage_icon.webp" alt="Mage" class="w-5 pointer-events-none" />
	</button>
	<button
		data-type="Assassin"
		on:click={filterHandler}
		class:ring={filter === 'Assassin'}
		class="btn btn-sm tooltip w-[32%] my-1 flex items-center"
		data-tip="Assassin">
		<img src="/Slayer_icon.webp" alt="Assassin" class="w-5 pointer-events-none" />
	</button>
	<button
		data-type="Marksman"
		on:click={filterHandler}
		class:ring={filter === 'Marksman'}
		class="btn btn-sm tooltip w-[32%] my-1 flex items-center"
		data-tip="Marksman">
		<img src="/Marksman_icon.webp" alt="Marksman" class="w-5 pointer-events-none" />
	</button>
	<button
		data-type="Support"
		on:click={filterHandler}
		class:ring={filter === 'Support'}
		class="btn btn-sm tooltip w-[32%] my-1 flex items-center"
		data-tip="Support">
		<img src="/Support_icon.webp" alt="Support" class="w-5 pointer-events-none" />
	</button>
</div>
