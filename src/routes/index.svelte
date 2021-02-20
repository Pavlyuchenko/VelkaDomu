<script context="module">
	export async function preload() {
		let prezdivkaStorage = "asd"; /* localStorage.getItem("prezdivka"); */
		const res = await this.fetch(
			"https://velkadomu.pythonanywhere.com/main-desktop",
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					prezdivka: prezdivkaStorage,
				}),
			}
		);
		const json = await res.json();
		let clanky;
		let hlavniClanek;
		let sekundarniClanky;
		let velkeClanky;
		let rychlovky;
		let zapasy;
		let ankety;
		let userChosen;
		if (json.clanky) {
			clanky = json.clanky;
		}
		if (json.sekundarni_clanky[0]) {
			hlavniClanek = json.sekundarni_clanky[0];
		}
		if (json.sekundarni_clanky.slice(1, 4)) {
			sekundarniClanky = json.sekundarni_clanky.slice(1, 4);
		}
		if (json.sekundarni_clanky) {
			velkeClanky = json.sekundarni_clanky;
		}
		if (json.rychlovky) {
			rychlovky = json.rychlovky;
		}
		if (json.zapasy) {
			zapasy = json.zapasy;
		}

		ankety = json.ankety;
		userChosen = json.user_chosen;

		return {
			clanky,
			hlavniClanek,
			sekundarniClanky,
			velkeClanky,
			rychlovky,
			zapasy,
			ankety,
			userChosen,
		};
	}
</script>

<script>
	import Nadpis from "../components/Nadpis.svelte";

	import HlavniClanek from "../components/HlavniClanek.svelte";
	import SekundarniClanky from "../components/SekundarniClanky.svelte";
	import VsechnyClanky from "../components/VsechnyClanky.svelte";

	import BigClanek from "../components/BigClanek.svelte";
	import SmallClanek from "../components/SmallClanek.svelte";

	import { onMount } from "svelte";
	import { range } from "../range";

	export let clanky;
	export let hlavniClanek;
	export let sekundarniClanky;
	export let velkeClanky;
	export let rychlovky;
	export let zapasy;
	export let ankety;
	export let userChosen;

	import { stores } from "@sapper/app";
	import UAParser from "ua-parser-js";

	// session is passed in server.js
	const { session } = stores();
	var parser = new UAParser();
	parser.setUA($session["user-agent"]);

	let mobileView = parser.getResult().device["type"] == "mobile";

	// $: mobileView = false;

	let dny = [];
	let mql;
	let max;
	let min;
	let width;
	onMount(() => {
		mql = window.matchMedia("(max-width: 680px)");
		// mobileView = mql.matches;
		max = window.matchMedia("(max-width: 1400px)").matches;
		min = window.matchMedia("(min-width: 900px)").matches;

		if (!mobileView) {
			createDays();
		}

		window.onresize = function () {
			mql = window.matchMedia("(max-width: 680px)");
			max = window.matchMedia("(max-width: 1400px)").matches;
			min = window.matchMedia("(min-width: 900px)").matches;
			mobileView = mql.matches;

			if (!mobileView) {
				width = document.getElementsByClassName("kalendar-day")[0]
					.offsetWidth;

				kalendarDayHeight = width;
			}
		};
	});

	let kalendarDayHeight;

	function getPreviousMonday() {
		var date = new Date();
		var day = date.getDay();
		var prevMonday = new Date();
		if (date.getDay() == 0) {
			prevMonday.setDate(date.getDate() - 6);
		} else {
			prevMonday.setDate(date.getDate() - (day - 1));
		}

		return prevMonday;
	}

	function createDays() {
		let currentDay = getPreviousMonday();
		for (let i = 0; i < 7; i++) {
			dny.push(currentDay.getDate());
			currentDay = new Date(currentDay);
			currentDay.setDate(currentDay.getDate() + 1);
		}
		dny = dny;

		width = document.getElementsByClassName("kalendar-day")[0].offsetWidth;

		kalendarDayHeight = width;
	}
</script>

<svelte:head>
	<title>VelkáDomů.cz - Sjednocujeme fotbalové fanoušky</title>

	<meta name="description" content="" />
</svelte:head>

{#if !mobileView}
	<div id="desktop">
		<HlavniClanek
			id={hlavniClanek.id}
			titulek={hlavniClanek.titulek}
			popisek={hlavniClanek.popisek}
			stitek={hlavniClanek.stitek}
			stitekColor={hlavniClanek.stitekColor}
			obrazek={hlavniClanek.obrazek}
			autor={hlavniClanek.autor}
			datum={hlavniClanek.datum}
		/>
		<SekundarniClanky clanky={sekundarniClanky} />
		<hr />
		<section>
			<div id="widget-nadpisy">
				<div id="widget-rychlovky-nadpis">
					<Nadpis text="Rychlovky" />
				</div>

				<div id="widget-kalendar-nadpis">
					<Nadpis text="Tipy na sledování" />
				</div>
			</div>
			<div id="widgets">
				<div id="rychlovky">
					{#each rychlovky as rychlovka, i}
						<div
							class="rychlovka"
							on:click={() => {
								if (rychlovka.showBody) {
									document.getElementById(
										"rychlovka-hidden" + i
									).style.height = "0";
								} else {
									document.getElementById(
										"rychlovka-hidden" + i
									).style.height = "auto";
								}
								rychlovka.showBody = !rychlovka.showBody;
							}}
						>
							<div class="rychlovka-visible">
								{rychlovka.datum}
								<div class="rychlovka-titulek">
									{rychlovka.titulek}
								</div>
								<div id="arrow" />
							</div>

							<div
								class="rychlovka-hidden"
								id={"rychlovka-hidden" + i}
							>
								{rychlovka.body}
							</div>
						</div>
					{/each}
					<div id="kalendar-link">
						<a href="/rychlovky">Zobrazit další rychlovky</a>
					</div>
				</div>
				<div id="kalendar">
					{#if zapasy}
						{#each range(7) as i}
							{#if zapasy.filter((e) => parseInt(e.den) === dny[i])[0]}
								<div
									class="kalendar-day"
									id={"kalendar-day" + i}
									style={zapasy.filter(
										(e) => parseInt(e.den) === dny[i]
									)[0].liga.color != "#CEFB0A"
										? "background-color: " +
										  zapasy.filter(
												(e) =>
													parseInt(e.den) === dny[i]
										  )[0].liga.color +
										  "; height: " +
										  kalendarDayHeight +
										  "px; " +
										  "color: #ffffff;"
										: "background-color: " +
										  zapasy.filter(
												(e) =>
													parseInt(e.den) === dny[i]
										  )[0].liga.color +
										  "; height: " +
										  kalendarDayHeight +
										  "px; "}
								>
									{dny[i]}
									<div
										class="kalendar-day-hidden"
										style={"background-color: " +
											zapasy.filter(
												(e) =>
													parseInt(e.den) === dny[i]
											)[0].liga.color}
									>
										<div class="kalendar-logos">
											<img
												src={"https://ik.imagekit.io/velkadomu/tr:h-70,w-70" +
													zapasy.filter(
														(e) =>
															parseInt(e.den) ===
															dny[i]
													)[0].domaci.logo}
												alt="Domácí"
												style="margin-right: 15px;"
											/>
											<img
												src={"https://ik.imagekit.io/velkadomu/tr:h-70,w-70" +
													zapasy.filter(
														(e) =>
															parseInt(e.den) ===
															dny[i]
													)[0].hoste.logo}
												alt="Hosté"
											/>
										</div>
										<div class="kalendar-nazvy-tymu">
											<span
												>{zapasy.filter(
													(e) =>
														parseInt(e.den) ===
														dny[i]
												)[0].domaci.nazev}</span
											><span
												>{zapasy.filter(
													(e) =>
														parseInt(e.den) ===
														dny[i]
												)[0].hoste.nazev}</span
											>
										</div>
										<p class="kalendar-day-cas">
											{zapasy.filter(
												(e) =>
													parseInt(e.den) === dny[i]
											)[0].cas}
										</p>
									</div>
									<span class="kalendar-day-nazev"
										>{i == 0
											? "Po"
											: i == 1
											? "Út"
											: i == 2
											? "St"
											: i == 3
											? "Čt"
											: i == 4
											? "Pá"
											: i == 5
											? "So"
											: "Ne"}</span
									>
								</div>
							{:else}
								<div
									class="kalendar-day"
									id={"kalendar-day" + i}
									style={"height: " +
										kalendarDayHeight +
										"px;"}
								>
									{dny[i]}
									<span class="kalendar-day-nazev"
										>{i == 0
											? "Po"
											: i == 1
											? "Út"
											: i == 2
											? "St"
											: i == 3
											? "Čt"
											: i == 4
											? "Pá"
											: i == 5
											? "So"
											: "Ne"}</span
									>
								</div>
							{/if}
						{/each}
					{/if}
					<div
						id="kalendar-link"
						style={"top: " + kalendarDayHeight * 1.8 + "px;"}
					>
						<a href="/kalendar" rel="prefetch"
							>Zobrazit celý kalendář</a
						>
					</div>
				</div>
			</div>
		</section>
		<hr />
		<VsechnyClanky {clanky} {min} {max} {ankety} {userChosen} />
	</div>
{:else}
	<main>
		{#each velkeClanky as clanek}
			<BigClanek {clanek} />
		{/each}
	</main>
	<div id="rychlovky">
		<Nadpis text="Rychlovky" />
		{#each rychlovky as rychlovka, i}
			<div
				class="rychlovka"
				on:click={() => {
					if (rychlovka.showBody) {
						document.getElementById(
							"rychlovka-hidden" + i
						).style.height = "0";
					} else {
						document.getElementById(
							"rychlovka-hidden" + i
						).style.height = "auto";
					}
					rychlovka.showBody = !rychlovka.showBody;
				}}
			>
				<div class="rychlovka-visible">
					{rychlovka.datum}
					<div class="rychlovka-titulek">
						{rychlovka.titulek}
					</div>
					<div id="arrow" />
				</div>

				<div class="rychlovka-hidden" id={"rychlovka-hidden" + i}>
					{rychlovka.body}
				</div>
			</div>
		{/each}
		<div id="kalendar-link">
			<a href="/rychlovky">Zobrazit další rychlovky</a>
		</div>
	</div>
	<main class="flex-container">
		<section>
			<Nadpis text="Aktuální články" />
			{#if clanky}
				{#each clanky as clanek}
					<SmallClanek {clanek} />
				{/each}
			{/if}
		</section>
	</main>
{/if}
<span id="archiv"><a href="/archiv">Zobrazit všechny články...</a></span>

<style>
	:global(#kalendar-link:hover a) {
		color: #ff8a00;
	}
	#kalendar-link {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		text-decoration: underline;
		transition: 0.15s;
		cursor: pointer;
	}
	#widget-kalendar-nadpis {
		margin-right: calc(25% - 8px);
		transform: translateX(50%);
	}
	#widget-rychlovky-nadpis {
		margin-left: calc(25% - 8px);
		transform: translateX(-50%);
	}
	#widget-nadpisy {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	.kalendar-day-cas {
		font-size: 18px;
		width: 100%;
		text-align: center;
		margin: 0;
	}
	.kalendar-logos {
		display: flex;
		justify-content: space-between;
	}
	.kalendar-nazvy-tymu {
		display: flex;
		justify-content: space-between;
		font-size: 17px;
		text-align: center;
	}
	.kalendar-nazvy-tymu span {
		width: calc(50% - 7.5px);
	}
	.kalendar-day-nazev {
		position: absolute;
		width: 100%;
		text-align: center;
		font-size: 19px;
		font-weight: 500;
		top: 100%;
		padding-top: 10%;
		color: #7e7e7e;
	}
	.kalendar-day-hidden {
		padding: 15px;
		padding-bottom: 5px;

		display: none;
		position: absolute;
		top: 120%;

		width: auto;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 5px;

		z-index: 20;
		animation: show 0.2s;
	}
	@keyframes show {
		0% {
			top: 70%;
			opacity: 0.5;
		}
		100% {
			top: 120%;
			opacity: 1;
		}
	}
	.kalendar-day:hover .kalendar-day-hidden {
		display: inline;
	}
	.kalendar-day {
		cursor: pointer;
		position: relative;
		width: 11%;
		background-color: #d8d6d6;
		border-radius: 10px;

		display: flex;
		align-items: center;
		justify-content: center;

		color: #333333;
		font-size: 32px;
		font-weight: 700;
	}
	#kalendar {
		width: 50%;
		margin-left: 20px;
		display: flex;
		justify-content: space-between;

		position: relative;
	}

	.rychlovka-hidden {
		height: 0;
		overflow: hidden;
	}

	.rychlovka {
		border: 1px solid #cfcfcf;
		height: auto;
		border-radius: 5px;

		padding: 5px;
		padding-left: 10px;
		padding-right: 10px;

		margin-bottom: 10px;

		cursor: pointer;
	}
	.rychlovka:hover {
		border: 1px solid #ff8a00;
	}
	.rychlovka-titulek {
		flex: 50;
		margin-left: 10px;
	}
	.rychlovka-visible {
		display: flex;
		align-items: center;
		font-size: 20px;
		font-weight: 600;
	}
	#arrow {
		height: 0;
		width: 0;
		border-top: 6px solid #333333;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
	}
	#widgets {
		display: flex;
		justify-content: space-between;
	}
	#rychlovky {
		width: 50%;
		margin-right: 20px;
		position: relative;
	}

	@media (max-width: 680px) {
		#rychlovky {
			width: 100%;
			margin-top: 30px;
			margin-bottom: 70px;
		}
		.rychlovka-visible {
			font-size: 15px;
		}

		.rychlovka-titulek {
			margin-left: 5px;
		}

		#arrow {
			border-top: 4px solid #333333;
			border-left: 4px solid transparent;
			border-right: 4px solid transparent;
		}

		.rychlovka-hidden {
			font-size: 14px;
		}

		#kalendar-link {
			text-decoration: underline;
			color: #333;
			margin-bottom: 0px;
		}
	}

	#archiv {
		display: block;
		text-align: center;
		margin-left: 50%;
		transform: translateX(-50%);

		font-size: 18px;
		font-weight: 600;

		text-decoration: underline;
		margin-top: -20px;
	}

	:global(#archiv a) {
		transition: 0.15s;
	}
	:global(#archiv a:hover) {
		color: #ff8a00;
	}
	#desktop {
		padding: 0px calc((100% - 85rem) / 2) 0px calc((100% - 85rem) / 2);

		transition: 0.2s;
	}

	hr {
		border-top: thin solid #cfcfcf;
		margin-top: 80px;
		margin-bottom: 80px;
	}

	section {
		margin-top: 30px;
	}
</style>
