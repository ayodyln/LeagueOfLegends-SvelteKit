<script>
	import '../app.css'
	import Footer from '../components/layout/Footer.svelte'
	import NavigationBar from '../components/layout/NavigationBar.svelte'
</script>

<div class="flex h-full min-h-screen max-height-auto flex-col">
	<NavigationBar />
	<div class="flex-grow">
		<slot />
	</div>
	<Footer />
</div>
