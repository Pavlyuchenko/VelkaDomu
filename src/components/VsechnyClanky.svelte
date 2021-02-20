<script>
	import Nadpis from "./Nadpis.svelte";
	import Anketa from "./AnketaMain.svelte";
	import { fly } from "svelte/transition";

	export let clanky;
	export let ankety;
	export let min;
	export let max;
	export let userChosen;

	let selected = 1;

	let ligove = true;
	let evropske = true;
	let mezinarodni = true;

	$: url = "https://ik.imagekit.io/velkadomu/tr:h-200,w-320";

	async function getClanky(stitek) {
		const res = await fetch(
			"https://velkadomu.pythonanywhere.com/archiv/1",
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					stitek: stitek,
				}),
			}
		);
		const json = await res.json();
		clanky = json.clanky;
	}

	let evropskePohary = {
		text: "Evropské poháry",
		logo: "",
		color: "#7e7e7e",
	};
	let ligoveObj = {
		text: "Ligové",
		logo: "",
		color: "#7e7e7e",
	};
	let mezinarodniObj = {
		text: "Ligové",
		logo: "",
		color: "#7e7e7e",
	};
</script>

<section>
	<Nadpis text="Nejnovější články" />
	<div id="stitky">
		<span
			class="stitky-item"
			id={selected == 1 && "selected"}
			on:click={() => {
				selected = 1;
				getClanky("");
			}}>Vše</span
		>

		<span
			class="stitky-item"
			id={selected == 2 && "selected"}
			on:click={() => {
				selected = 2;
				getClanky("Legendy");
			}}>Legendy</span
		>

		<div
			class="stitky-item"
			on:click={() => {
				evropske = !evropske;
				ligove = true;
				mezinarodni = true;
			}}
			style={selected == 3 && "color: " + evropskePohary.color}
		>
			{#if selected == 3}
				{evropskePohary.text}&nbsp;&nbsp;
			{:else}
				Evropské poháry&nbsp;&nbsp;
			{/if}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="10"
				height="6"
				viewBox="0 0 10 6"
				fill="none"
			>
				<path
					d="M10 0H0L5 6L10 0Z"
					fill={selected == 3 ? evropskePohary.color : "#7e7e7e"}
				/>
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
							getClanky("Liga mistrů");
							selected = 3;
							evropskePohary.text = "Liga mistrů";
							evropskePohary.color = "#2940F0";
							evropskePohary = evropskePohary;
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
							getClanky("Evropská liga");
							selected = 3;
							evropskePohary.text = "Evropská Liga";
							evropskePohary.color = "#EE8A00";
							evropskePohary = evropskePohary;
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
			style={selected == 4 && "color: " + ligoveObj.color}
		>
			{#if selected == 4}
				{ligoveObj.text}&nbsp;&nbsp;
			{:else}
				Ligové&nbsp;&nbsp;
			{/if}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="10"
				height="6"
				viewBox="0 0 10 6"
				fill="none"
			>
				<path
					d="M10 0H0L5 6L10 0Z"
					fill={selected == 4 ? ligoveObj.color : "#7e7e7e"}
				/>
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
							getClanky("Premier League");
							selected = 4;
							ligoveObj.text = "Premier League";
							ligoveObj.color = "#3D1150";
							ligoveObj = ligoveObj;
						}}
					>
						<img
							src="https://ik.imagekit.io/velkadomu/tr:h-23,w-23/premierleaguelogo_DXASR5PNB.png"
							alt="Premier League logo"
						/>&nbsp; Premier League
					</p>
					<hr />
					<p
						style="color: #F28800"
						on:click={() => {
							getClanky("La Liga");
							selected = 4;
							ligoveObj.text = "La Liga";
							ligoveObj.color = "#F28800";
							ligoveObj = ligoveObj;
						}}
					>
						<img
							src="https://ik.imagekit.io/velkadomu/tr:h-23,w-23/LaLiga_28xfYuJVC.png"
							alt="La Liga logo"
						/>&nbsp; La Liga
					</p>
					<hr />
					<p
						style="color: #A4C612"
						on:click={() => {
							getClanky("Ligue 1");
							selected = 4;
							ligoveObj.text = "Ligue 1";
							ligoveObj.color = "#A4C612";
							ligoveObj = ligoveObj;
						}}
					>
						<img
							src="https://ik.imagekit.io/velkadomu/tr:h-23,w-23/ligueerloog_BHWwFroin.png"
							alt="Ligue 1 logo"
						/>&nbsp; Ligue 1
					</p>
					<hr />
					<p
						style="color: #008FD7"
						on:click={() => {
							getClanky("Serie A");
							selected = 4;
							ligoveObj.text = "Serie A";
							ligoveObj.color = "#008FD7";
							ligoveObj = ligoveObj;
						}}
					>
						<img
							src="https://ik.imagekit.io/velkadomu/tr:h-23,w-23/seriealogo_CL8v0RW5SDlg.png"
							alt="Serie A logo"
						/>&nbsp; Serie A
					</p>
					<hr />
					<p
						style="color: #D3010C"
						on:click={() => {
							getClanky("Bundesliga");
							selected = 4;
							ligoveObj.text = "Bundesliga";
							ligoveObj.color = "#D3010C";
							ligoveObj = ligoveObj;
						}}
					>
						<img
							src="https://ik.imagekit.io/velkadomu/tr:h-23,w-26/bundesligalogo_oAiQ9J943D_W.png"
							alt="Bundesliga logo"
						/>&nbsp; Bundesliga
					</p>
					<hr />
					<p
						style="color: #EEBE14"
						on:click={() => {
							getClanky("FORTUNA:LIGA");
							selected = 4;
							ligoveObj.text = "FORTUNA:LIGA";
							ligoveObj.color = "#EEBE14";
							ligoveObj = ligoveObj;
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
			style={selected == 5 && "color: " + mezinarodniObj.color}
		>
			{#if selected == 5}
				{mezinarodniObj.text}&nbsp;&nbsp;
			{:else}
				Mezinárodní&nbsp;&nbsp;{/if}<svg
				xmlns="http://www.w3.org/2000/svg"
				width="10"
				height="6"
				viewBox="0 0 10 6"
				fill="none"
			>
				<path
					d="M10 0H0L5 6L10 0Z"
					fill={selected == 5 ? mezinarodniObj.color : "#7E7E7E"}
				/>
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
							getClanky("Reprezentace");
							selected = 5;
							mezinarodniObj.text = "Reprezentace";
							mezinarodniObj.color = "#EB1A2A";
							mezinarodniObj = mezinarodniObj;
						}}
					>
						<img
							src="https://ik.imagekit.io/velkadomu/tr:h-41,w-30/facr_TjnekK72eJjS.png"
							alt="Reprezentace logo"
						/>&nbsp; Reprezentace
					</p>
					<hr />
					<p
						style="color: #46BFC8"
						on:click={() => {
							getClanky("Euro");
							selected = 5;
							mezinarodniObj.text = "Euro";
							mezinarodniObj.color = "#46BFC8";
							mezinarodniObj = mezinarodniObj;
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
				{#if i == 8 && (!min || !max)}
					<hr />
					<div id="ankety-nadpis">
						<Nadpis text="Ankety" />
					</div>
					<div id="ankety-div">
						{#each ankety as anketa, j}
							{#if userChosen[j] != null}
								<Anketa
									nazevAnkety={anketa.nazevAnkety}
									hodnotyAnkety={anketa.hodnotyAnkety}
									userChosen={userChosen[j]}
									votes={anketa.votes}
									showAnketaResults={true}
									clanekId={anketa.clanek}
									clanekTitulek={clanek.titulek}
								/>{:else}
								<Anketa
									nazevAnkety={anketa.nazevAnkety}
									hodnotyAnkety={anketa.hodnotyAnkety}
									userChosen={userChosen[j]}
									votes={anketa.votes}
									showAnketaResults={false}
									clanekId={anketa.clanek}
									clanekTitulek={clanek.titulek}
								/>
							{/if}
						{/each}
					</div>
					<hr />
				{:else if i == 9 && min && max}
					<hr />
					<div id="ankety-nadpis">
						<Nadpis text="Ankety" />
					</div>
					<div id="ankety-div">
						{#each ankety as anketa, j}
							{#if userChosen[j] != null}
								<Anketa
									nazevAnkety={anketa.nazevAnkety}
									hodnotyAnkety={anketa.hodnotyAnkety}
									userChosen={userChosen[j]}
									votes={anketa.votes}
									showAnketaResults={true}
									clanekId={anketa.clanek}
									clanekTitulek={clanek.titulek}
								/>{:else}
								<Anketa
									nazevAnkety={anketa.nazevAnkety}
									hodnotyAnkety={anketa.hodnotyAnkety}
									userChosen={userChosen[j]}
									votes={anketa.votes}
									showAnketaResults={false}
									clanekId={anketa.clanek}
									clanekTitulek={clanek.titulek}
								/>
							{/if}
						{/each}
					</div>
					<hr />
				{/if}
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
					transition:fly={{ duration: 400, y: -200 }}
					class="news"
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
	#stitky hr {
		margin-bottom: 5px;
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

	hr {
		width: 100%;
		margin-bottom: 50px;
	}

	#ankety-div {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 40px;
	}

	#ankety-nadpis {
		margin-left: 50%;
		transform: translateX(-50%);
	}
</style>
