<script context="module">
	export async function preload() {
		const res = await this.fetch(
			"https://velkadomu.pythonanywhere.com/get_rychlovky"
		);
		const json = await res.json();

		let rychlovky = json.rychlovky;

		return { rychlovky };
	}
</script>

<script>
	import Nadpis from "../components/Nadpis.svelte";

	export let rychlovky;
</script>

<svelte:head>
	<title>VelkáDomů.cz - Rychlovky</title>
	<meta
		name="description"
		content="Všechny expresní zprávy zveřejněné na stránce VelkáDomů.cz"
	/>
</svelte:head>

<section>
	<Nadpis text="Rychlovky" />

	<div id="rychlovky">
		{#each rychlovky as rychlovka}
			<div class="rychlovka">
				<span id="datum">{rychlovka.datum}</span>
				<span id="titulek">{rychlovka.titulek}</span>
				<p>{rychlovka.body}</p>
				<hr />
			</div>
		{/each}
	</div>
</section>

<style>
	section {
		margin-top: 50px;
	}

	#rychlovky {
		padding: 0px calc((100% - 85rem) / 2) 0px calc((100% - 85rem) / 2);
	}

	.rychlovka {
		margin-top: 30px;
	}

	#datum {
		font-size: 18px;
		font-weight: 600;
	}

	#titulek {
		font-size: 20px;
		font-weight: 600;
		margin-left: 10px;
	}

	p {
		font-size: 17px;
	}

	hr {
		border-top: thin solid #ff8a00;
		margin-top: 30px;
	}
</style>
