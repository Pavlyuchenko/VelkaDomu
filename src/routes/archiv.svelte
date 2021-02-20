<script context="module">
	export async function preload() {
		const res = await this.fetch(
			"https://velkadomu.pythonanywhere.com/archiv/1",
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					stitek: "",
				}),
			}
		);
		const json = await res.json();
		let clanky = json.clanky;
		let pagesCount = json.pages_count;

		/* window.scrollTo(0, 0); */
		return { clanky, pagesCount };
	}
</script>

<script>
	import Nadpis from "../components/Nadpis.svelte";
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";
	import { range } from "../range.js";
	import { goto } from "@sapper/app";

	export let page = 1;

	onMount(() => {});

	async function getClanky() {
		/* smoothScroll("header"); */
		const res = await fetch(
			"https://velkadomu.pythonanywhere.com/archiv/" + page,
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					stitek: curStitek,
				}),
			}
		);
		const json = await res.json();
		clanky = json.clanky;
		pagesCount = json.pages_count;

		window.scrollTo(0, 0);
	}

	export let clanky;
	export let pagesCount;

	$: url = "https://ik.imagekit.io/velkadomu/tr:h-200,w-320";
	let selected = 1;
	let ligove = true;
	let evropske = true;
	let mezinarodni = true;
	export let curStitek = "";
	function changeStitek(novy) {
		curStitek = novy;
	}
</script>

<svelte:head>
	<title>VelkáDomů.cz - Archiv článků</title>
	<meta
		name="description"
		content="Archiv všech článků publikovaných na stránce VelkáDomů.cz"
	/>
</svelte:head>

<section>
	<Nadpis text="Archiv" />
	<div id="stitky">
		<span
			class="stitky-item"
			id={selected == 1 && "selected"}
			on:click={() => {
				selected = 1;
				curStitek = "";
				page = 1;
				changeStitek("");
				getClanky();
			}}>Vše</span
		>

		<span
			class="stitky-item"
			id={selected == 2 && "selected"}
			on:click={() => {
				selected = 2;
				curStitek = "Legendy";
				page = 1;
				changeStitek("Legendy");
				getClanky();
			}}>Legendy</span
		>

		<div
			class="stitky-item"
			on:click={() => {
				evropske = !evropske;
				ligove = true;
				mezinarodni = true;
			}}
		>
			Evropské poháry&nbsp;&nbsp;<svg
				xmlns="http://www.w3.org/2000/svg"
				width="10"
				height="6"
				viewBox="0 0 10 6"
				fill="none"
			>
				<path d="M10 0H0L5 6L10 0Z" fill="#7E7E7E" />
			</svg>
			{#if !evropske}
				<div
					class="hidden"
					in:fly={{ y: -100, duration: 250 }}
					out:fly={{ y: -50, duration: 100 }}
				>
					<p
						style="color: #2940F0"
						on:click={() => {
							curStitek = "Liga mistrů";
							page = 1;
							changeStitek("Liga mistrů");
							getClanky();
						}}
					>
						<img
							src="https://ik.imagekit.io/velkadomu/tr:h-23,w-23/championsleaguelogo_CyGRVI5Ud.png"
							alt="Liga mistrů logo"
						/>
						&nbsp;Liga Mistrů
					</p>
					<hr />
					<p
						style="color: #FAA710"
						on:click={() => {
							curStitek = "Evropská liga";
							page = 1;
							changeStitek("Evropská liga");
							getClanky();
						}}
					>
						<img
							src="https://ik.imagekit.io/velkadomu/tr:h-23,w-23/europaleaguelogo_rY28ZZLa0vvxz.png"
							alt="Evropská liga logo"
						/>&nbsp; Evropská Liga
					</p>
				</div>
			{/if}
		</div>

		<div
			class="stitky-item"
			on:click={() => {
				ligove = !ligove;
				evropske = true;
				mezinarodni = true;
			}}
		>
			Ligové&nbsp;&nbsp;<svg
				xmlns="http://www.w3.org/2000/svg"
				width="10"
				height="6"
				viewBox="0 0 10 6"
				fill="none"
			>
				<path d="M10 0H0L5 6L10 0Z" fill="#7E7E7E" />
			</svg>
			{#if !ligove}
				<div
					class="hidden"
					in:fly={{ y: -100, duration: 250 }}
					out:fly={{ y: -50, duration: 100 }}
				>
					<p
						style="color: #3D1150"
						on:click={() => {
							curStitek = "Premier League";
							page = 1;
							changeStitek("Premier League");
							getClanky();
						}}
					>
						<img
							src="https://ik.imagekit.io/velkadomu/tr:h-23,w-23/premierleaguelogo_DXASR5PNB.png"
							alt="Premier League logo"
						/>&nbsp; Premier League
					</p>
					<hr />
					<p
						style="color: #E40613"
						on:click={() => {
							curStitek = "La Liga";
							page = 1;
							changeStitek("La Liga");
							getClanky();
						}}
					>
						<img
							src="https://ik.imagekit.io/velkadomu/tr:h-23,w-23/LaLiga_28xfYuJVC.png"
							alt="La Liga logo"
						/>&nbsp; La Liga
					</p>
					<hr />
					<p
						style="color: #E40613"
						on:click={() => {
							curStitek = "Ligue 1";
							page = 1;
							changeStitek("Ligue 1");
							getClanky();
						}}
					>
						<img
							src="https://ik.imagekit.io/velkadomu/tr:h-23,w-23/ligueerloog_BHWwFroin.png"
							alt="Ligue 1 logo"
						/>&nbsp; Ligue 1
					</p>
					<hr />
					<p
						style="color: #E40613"
						on:click={() => {
							curStitek = "Serie A";
							page = 1;
							changeStitek("Serie A");
							getClanky();
						}}
					>
						<img
							src="https://ik.imagekit.io/velkadomu/tr:h-23,w-23/seriealogo_CL8v0RW5SDlg.png"
							alt="Serie A logo"
						/>&nbsp; Serie A
					</p>
					<hr />
					<p
						style="color: #E40613"
						on:click={() => {
							curStitek = "Bundesliga";
							page = 1;
							changeStitek("Bundesliga");
							getClanky();
						}}
					>
						<img
							src="https://ik.imagekit.io/velkadomu/tr:h-23,w-23/bundesligalogo_oAiQ9J943D_W.png"
							alt="Bundesliga logo"
						/>&nbsp; Bundesliga
					</p>
					<hr />
					<p
						style="color: #E40613"
						on:click={() => {
							curStitek = "FORTUNA:LIGA";
							page = 1;
							changeStitek("FORTUNA:LIGA");
							getClanky();
						}}
					>
						<img
							src="https://ik.imagekit.io/velkadomu/tr:h-23,w-23/fortunaligalogo_86efXzJp-.png"
							alt="FORTUNA:LIGA logo"
						/>&nbsp; FORTUNA:LIGA
					</p>
				</div>
			{/if}
		</div>

		<div
			class="stitky-item"
			on:click={() => {
				mezinarodni = !mezinarodni;
				ligove = true;
				evropske = true;
			}}
		>
			Mezinárodní&nbsp;&nbsp;<svg
				xmlns="http://www.w3.org/2000/svg"
				width="10"
				height="6"
				viewBox="0 0 10 6"
				fill="none"
			>
				<path d="M10 0H0L5 6L10 0Z" fill="#7E7E7E" />
			</svg>
			{#if !mezinarodni}
				<div
					class="hidden"
					in:fly={{ y: -100, duration: 250 }}
					out:fly={{ y: -50, duration: 100 }}
				>
					<p
						style="color: #EB1A2A"
						on:click={() => {
							curStitek = "Reprezentace";
							page = 1;
							changeStitek("Reprezentace");
							getClanky();
						}}
					>
						<img
							src="https://ik.imagekit.io/velkadomu/tr:h-41,w-30/facr_TjnekK72eJjS.png"
							alt="Reprezentace logo"
						/>&nbsp; Reprezentace
					</p>
					<hr />
					<p
						style="color: #5E1530"
						on:click={() => {
							curStitek = "Euro";
							page = 1;
							changeStitek("Euro");
							getClanky();
						}}
					>
						Euro
					</p>
				</div>
			{/if}
		</div>
	</div>

	<section id="vsechny-clanky">
		{#if clanky}
			{#each clanky as clanek, i}
				<a
					rel="prefetch"
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
	<div id="pagination">
		<div
			class="page"
			on:click={() => {
				if (page > 1) {
					page = page - 1;
					getClanky();
				}
			}}
		>
			&lt;
		</div>
		{#if pagesCount <= 3}
			{#each range(pagesCount) as i}
				<div
					class="page"
					id={i + 1 == page ? "chosen" : ""}
					on:click={() => {
						page = i + 1;
						getClanky();
					}}
				>
					{i + 1}
				</div>
			{/each}
		{:else if page == 1}
			<div class="page" id="chosen">1</div>
			<div
				class="page"
				on:click={() => {
					page = 2;
					getClanky();
				}}
			>
				2
			</div>
			<div class="page">...</div>
			<div
				class="page"
				on:click={() => {
					page = pagesCount;
					getClanky();
				}}
			>
				{pagesCount}
			</div>
		{:else if page == 1}
			<div class="page" id="chosen">1</div>
			<div
				class="page"
				on:click={() => {
					page = 2;
					getClanky();
				}}
			>
				2
			</div>
			<div class="page">...</div>
			<div
				class="page"
				on:click={() => {
					page = pagesCount;
					getClanky();
				}}
			>
				{pagesCount}
			</div>
		{:else if page == 2}
			<div
				class="page"
				on:click={() => {
					page = 1;
					getClanky();
				}}
			>
				1
			</div>
			<div class="page" id="chosen">2</div>
			<div
				class="page"
				on:click={() => {
					page = 3;
					getClanky();
				}}
			>
				3
			</div>
			{#if pagesCount > 4}
				<div class="page">...</div>
			{/if}
			<div
				class="page"
				on:click={() => {
					page = pagesCount;
					getClanky();
				}}
			>
				{pagesCount}
			</div>
		{:else if page == pagesCount}
			<div
				class="page"
				on:click={() => {
					page = 1;
					getClanky();
				}}
			>
				1
			</div>
			<div class="page">...</div>
			<div
				class="page"
				on:click={() => {
					page = pagesCount - 1;
					getClanky();
				}}
			>
				{pagesCount - 1}
			</div>

			<div class="page" id="chosen">{pagesCount}</div>
		{:else if page == pagesCount - 1}
			<div
				class="page"
				on:click={() => {
					page = 1;
					getClanky();
				}}
			>
				1
			</div>

			{#if page - 2 != 1}
				<div class="page">...</div>
			{/if}
			<div
				class="page"
				on:click={() => {
					page = pagesCount - 2;
					getClanky();
				}}
			>
				{pagesCount - 2}
			</div>
			<div class="page" id="chosen">{pagesCount - 1}</div>
			<div
				class="page"
				on:click={() => {
					page = pagesCount;
					getClanky();
				}}
			>
				{pagesCount}
			</div>
		{:else}
			<div
				class="page"
				on:click={() => {
					page = 1;
					getClanky();
				}}
			>
				1
			</div>

			{#if page - 2 != 1}
				<div class="page">...</div>
			{/if}
			{#each range(page - 2, page + 1) as i}
				<div
					class="page"
					id={i + 1 == page ? "chosen" : ""}
					on:click={() => {
						page = i + 1;
						getClanky();
					}}
				>
					{i + 1}
				</div>
			{/each}
			{#if page + 2 != pagesCount}
				<div class="page">...</div>
			{/if}
			<div
				class="page"
				on:click={() => {
					page = pagesCount;
					getClanky();
				}}
			>
				{pagesCount}
			</div>
		{/if}

		<div
			class="page"
			on:click={() => {
				if (page < pagesCount) {
					page = page + 1;
					getClanky();
				}
			}}
		>
			&gt;
		</div>
	</div>
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
