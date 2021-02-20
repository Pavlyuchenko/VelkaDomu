<script context="module">
	export async function preload({ params }) {
		let jmeno = params.slug;

		const res = await this.fetch(
			"https://velkadomu.pythonanywhere.com/autor",
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					jmeno: jmeno.replace("|", ".").replace("-", " "),
				}),
			}
		);
		const json = await res.json();
		let clanky = json.clanky;
		let pagesCount = json.pages_count;

		return { clanky, pagesCount, jmeno };
	}
</script>

<script>
	import Nadpis from "../../components/Nadpis.svelte";
	import { onMount } from "svelte";
	import { goto } from "@sapper/app";

	export let jmeno;

	onMount(() => {});

	export let clanky = [];
	export let pagesCount;

	$: url = "https://ik.imagekit.io/velkadomu/tr:h-200,w-320";
</script>

<svelte:head>
	<title>Články autora {jmeno.replace("-", " ").replace("|", ".")}</title>
	<meta
		name="description"
		content={"Všechny články publikované autorem " +
			jmeno.replace("-", " ").replace("|", ".")}
	/>
</svelte:head>

<section>
	<Nadpis
		text={"Články autora " + jmeno.replace("-", " ").replace("|", ".")}
	/>

	<section id="vsechny-clanky">
		{#if clanky}
			{#each clanky as clanek, i}
				<a
					href={"/clanek/" +
						clanek.titulek
							.replace(/\s+/g, "-")
							.replace(".", "")
							.replace(",", "")
							.replace('"', "")
							.replace("'", "")
							.replace(":", "")
							.replace("?", "")
							.toLowerCase() +
						"/" +
						clanek.id}
					rel="prefetch"
				>
					<div id="image-wrapper">
						<img
							src={url + clanek.obrazek}
							alt={clanek.titulek}
							loading="lazy"
							class="image"
						/>
					</div>
					<span style={"color: " + clanek.stitekColor} id="stitek"
						>{clanek.stitek}</span
					>
					<h2>{clanek.titulek}</h2>
					<div id="autor-div">
						{#if clanek.logo == "VelkaDomu"}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="23"
								height="23"
								viewBox="0 0 54 53"
								fill="none"
								id="header__logo-svg"
							>
								<path
									d="M21.7099 1.84346C24.8643 -0.448336 29.1357 -0.448337 32.2901 1.84346L50.2416 14.886C53.396 17.1778 54.7159 21.2401 53.5111 24.9483L46.6542 46.0517C45.4493 49.7599 41.9937 52.2705 38.0947 52.2705H15.9053C12.0063 52.2705 8.55068 49.7599 7.34582 46.0517L0.48893 24.9483C-0.715938 21.2401 0.603984 17.1778 3.75837 14.886L21.7099 1.84346Z"
									fill="#FF8A00"
								/>
							</svg>
						{:else if clanek.logo}
							<img
								src={"https://ik.imagekit.io/velkadomu/tr:h-23,w-23" +
									clanek.logo}
								alt="Logo jiného portálu"
								class="logo"
							/>
						{/if}
						<span id="autor">&nbsp;&nbsp;{clanek.autor}</span>
					</div>
					<span
						itemprop="datePublished"
						datetime="2015-11-30T12:00:00Z"
						id="datum">{clanek.datum}</span
					>
				</a>
			{/each}
			<div class="fill" />
			<div class="fill" />
			<div class="fill" />
		{/if}
	</section>
</section>

<style>
	/* :global(html) {
		scroll-behavior: smooth;
	} */
	#pagination {
		width: 40%;
		margin-left: 50%;
		transform: translateX(-50%);

		display: flex;
		justify-content: center;
	}
	.page {
		width: 35px;
		height: 35px;
		border-radius: 5px;

		margin-left: 10px;
		margin-right: 10px;

		font-size: 22px;
		font-weight: 700;

		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;

		color: #333333;

		cursor: pointer;
	}
	#chosen {
		color: #ffffff;
		background-color: #ff8a00;
	}
	section {
		padding: 0px calc((100% - 85rem) / 2) 0px calc((100% - 85rem) / 2);
		padding-bottom: 20px;
		margin-top: 50px;

		transition: 0.2s;
	}
	#stitky {
		display: flex;
		width: 100%;
		justify-content: center;
	}
	.stitky-item {
		border: 2px solid transparent;
		padding-left: 10px;
		padding-right: 10px;

		margin-left: 40px;
		font-size: 20px;
		font-weight: 600;
		color: #7e7e7e;

		cursor: pointer;
	}
	svg {
		vertical-align: middle;
		display: inline-block;
	}

	#selected {
		border: 2px solid #7e7e7e;

		border-radius: 5px;
	}

	.hidden {
		position: absolute;
		font-size: 18px;
		border: thin solid #7e7e7e;
		padding: 5px 10px 5px 10px;
		background-color: #ffffff;

		border-radius: 5px;
		z-index: 1;
	}
	.hidden p {
		margin: 0;
	}
	.hidden img {
		width: 20px;
		overflow: hidden;

		margin: 0;
		vertical-align: middle;
		display: inline-block;
	}
	.hidden hr {
		border-top: thin solid #7e7e7e;
	}

	#vsechny-clanky {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		margin-top: 40px;
	}

	a {
		width: 23%;
		margin-bottom: 60px;
		position: relative;
		padding-bottom: 30px;

		cursor: pointer;
	}
	#image-wrapper {
		overflow: hidden;
		border-radius: 5px;
		height: 200px;
	}
	a:hover .image {
		transform: scale(1.075);
	}
	h2:hover {
		text-decoration: underline;
	}

	a img {
		width: 100%;
		height: 200px;
		object-fit: cover;
		border-radius: 5px;
		transition: 0.15s;
	}
	svg {
		vertical-align: middle;
		display: inline-block;
	}
	span {
		vertical-align: middle;
		display: inline-block;
	}
	.logo {
		vertical-align: middle;
		display: inline-block;
		width: 23px;
		height: 23px;
		object-fit: scale-down;
	}
	#stitek {
		font-weight: 700;
		margin-top: 15px;
		font-size: 14px;
	}
	h2 {
		margin-top: 5px;
		font-weight: 600;
		font-size: 20px;
	}
	#autor-div {
		position: absolute;
		left: 0;
		bottom: 0;
	}
	#datum {
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.fill {
		width: 25%;
		height: 0;
	}
	@media (max-width: 1400px) {
		a {
			width: 32%;
		}
		.fill {
			width: 32%;
		}
	}
	@media (max-width: 900px) {
		a {
			width: 48%;
		}
		.fill {
			width: 48%;
		}
	}

	@media (max-width: 680px) {
		#stitky {
			display: none;
		}

		section {
			flex-direction: column;
		}
		a {
			width: 100%;
		}
		a img {
			height: 15%;
		}
		#image-wrapper {
			height: auto;
		}
	}
</style>
