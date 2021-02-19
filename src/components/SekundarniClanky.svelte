<script>
	import SekundarniClanek from "./SekundarniClanek.svelte";

	export let clanky;
</script>

<section>
	{#each clanky as clanek}
		<SekundarniClanek
			id={clanek.id}
			obrazek={clanek.obrazek}
			stitek={clanek.stitek}
			stitekColor={clanek.stitekColor}
			titulek={clanek.titulek}
			autor={clanek.autor}
			datum={clanek.datum}
			logo={clanek.logo}
		/>
	{/each}
</section>

<style>
	section {
		display: flex;
		justify-content: space-between;

		margin-top: 80px;
		height: auto;
	}
	@media (max-width: 1400px) {
		section {
			margin-top: 40px;
		}
	}
</style>
