<script lang="ts">
	export let filterHandler: any
	//
</script>

<div class="flex h-fit flex-wrap w-full gap-[2px]">
	<button
		data-type="Fighter"
		on:click={filterHandler}
		class="btn btn-sm tooltip w-[16%]"
		data-tip="Fighter">
		<img src="/Fighter_icon.webp" alt="Fighter" class="w-5 pointer-events-none" />
	</button>
	<button
		data-type="Tank"
		on:click={filterHandler}
		class="btn btn-sm tooltip w-[16%]"
		data-tip="Tank">
		<img src="/Tank_icon.webp" alt="Tank" class="w-5 pointer-events-none" />
	</button>
	<button
		data-type="Mage"
		on:click={filterHandler}
		class="btn btn-sm tooltip w-[16%]"
		data-tip="Mage">
		<img src="/Mage_icon.webp" alt="Mage" class="w-5 pointer-events-none" />
	</button>
	<button
		data-type="Assassin"
		on:click={filterHandler}
		class="btn btn-sm tooltip w-[16%]"
		data-tip="Assassin">
		<img src="/Slayer_icon.webp" alt="Assassin" class="w-5 pointer-events-none" />
	</button>
	<button
		data-type="Marksman"
		on:click={filterHandler}
		class="btn btn-sm tooltip w-[16%]"
		data-tip="Marksman">
		<img src="/Marksman_icon.webp" alt="Marksman" class="w-5 pointer-events-none" />
	</button>
	<button
		data-type="Support"
		on:click={filterHandler}
		class="btn btn-sm tooltip w-[16%]"
		data-tip="Support">
		<img src="/Support_icon.webp" alt="Support" class="w-5 pointer-events-none" />
	</button>
</div>
