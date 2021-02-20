<script context="module">
	export async function preload() {
		const res = await this.fetch(
			"https://velkadomu.pythonanywhere.com/get_zapasy"
		);
		const json = await res.json();
		let zapasy = json.zapasy;
		let newStitek;
		let stitky = [];
		for (let i = 0; i < zapasy.length; i++) {
			newStitek = {
				color: zapasy[i].liga.color,
				nazev: zapasy[i].liga.nazev,
			};
			var contains = stitky.some((elem) => {
				return (
					JSON.stringify(newStitek.color) ===
					JSON.stringify(elem.color)
				);
			});
			if (!contains) {
				stitky.push(newStitek);
			}
		}

		stitky = stitky;

		return { stitky, zapasy };
	}
</script>

<script>
	import Nadpis from "../components/Nadpis.svelte";
	import { onMount } from "svelte";
	import { range } from "../range.js";

	onMount(() => {
		createDays();
	});

	export let zapasy;
	export let stitky;

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

	let dny = [];
	function createDays() {
		let currentDay = getPreviousMonday();
		for (let i = 0; i < 28; i++) {
			dny.push(currentDay.getDate());
			currentDay = new Date(currentDay);
			currentDay.setDate(currentDay.getDate() + 1);
		}
		dny = dny;
	}
</script>

<div id="info">
	<Nadpis text="Kalendář fotbalových zápasů" />
	<p>
		Zde najdeš nejzajímavější nadcházející zápasy s komentářem a tipem na
		vítěze
	</p>
</div>
<svelte:head>
	<title>VelkáDomů.cz - Kalendář nadcházejících zápasů</title>
	<meta
		name="description"
		content="Kalendář nejatraktivnějších zápasů podle redakce VelkáDomů.cz"
	/>
</svelte:head>

<section>
	<div class="calendar-label">
		<div class="calendar-label-day">Po</div>
		<div class="calendar-label-day">Út</div>
		<div class="calendar-label-day">St</div>
		<div class="calendar-label-day">Čt</div>
		<div class="calendar-label-day">Pá</div>
		<div class="calendar-label-day">So</div>
		<div class="calendar-label-day">Ne</div>
	</div>
	{#if zapasy}
		{#each range(4) as j}
			<div class="calendar-week">
				{#each range(7) as i}
					{#if zapasy.filter((e) => parseInt(e.den) === dny[i + j * 7])[0]}
						<div
							on:click={() => {
								zapasy.filter(
									(e) => parseInt(e.den) === dny[i + j * 7]
								)[0].showDetails = true;
								zapasy[0] = zapasy[0];
								zapasy;
							}}
							class="calendar-day matchday"
							style={"background-color: " +
								zapasy.filter(
									(e) => parseInt(e.den) === dny[i + j * 7]
								)[0].liga.color +
								"; border: 2px solid " +
								zapasy.filter(
									(e) => parseInt(e.den) === dny[i + j * 7]
								)[0].liga.color}
						>
							<p
								id="text"
								style={zapasy.filter(
									(e) => parseInt(e.den) === dny[i + j * 7]
								)[0].liga.color == "#CEFB0A" &&
									"color: #333333"}
							>
								{dny[i + j * 7]}
							</p>
							<div class="klub-images-div">
								<div class="image-name-holder">
									<img
										src={"https://ik.imagekit.io/velkadomu/tr:h-100,w-100" +
											zapasy.filter(
												(e) =>
													parseInt(e.den) ===
													dny[i + j * 7]
											)[0].domaci.logo}
										alt="Logo domácího klubu"
										class="klub-image"
									/>
									<span
										style={zapasy.filter(
											(e) =>
												parseInt(e.den) ===
												dny[i + j * 7]
										)[0].liga.color == "#CEFB0A" &&
											"color: #333333"}
										>{zapasy.filter(
											(e) =>
												parseInt(e.den) ===
												dny[i + j * 7]
										)[0].domaci.nazev}</span
									>
								</div>
								<div class="image-name-holder">
									<img
										src={"https://ik.imagekit.io/velkadomu/tr:h-100,w-100" +
											zapasy.filter(
												(e) =>
													parseInt(e.den) ===
													dny[i + j * 7]
											)[0].hoste.logo}
										alt="Logo hostujícího klubu"
										class="klub-image"
									/>
									<span
										style={zapasy.filter(
											(e) =>
												parseInt(e.den) ===
												dny[i + j * 7]
										)[0].liga.color == "#CEFB0A" &&
											"color: #333333"}
										>{zapasy.filter(
											(e) =>
												parseInt(e.den) ===
												dny[i + j * 7]
										)[0].hoste.nazev}</span
									>
								</div>
							</div>
							<p
								class="time"
								style={zapasy.filter(
									(e) => parseInt(e.den) === dny[i + j * 7]
								)[0].liga.color == "#CEFB0A" &&
									"color: #333333"}
							>
								{zapasy.filter(
									(e) => parseInt(e.den) === dny[i + j * 7]
								)[0].cas}
							</p>
						</div>
					{:else if new Date().getDate() == parseInt(dny[i + j * 7])}
						<div
							class="calendar-day"
							style="color: #FF8A00; border: 2px solid #FF8A00; z-index: 1;"
						>
							{dny[i + j * 7]}
						</div>
					{:else}
						<div class="calendar-day">{dny[i + j * 7]}</div>
					{/if}
				{/each}
			</div>
		{/each}
	{/if}
	{#if stitky}
		<div id="stitky">
			{#each stitky as stitek}
				<span id="circle" style={"background: " + stitek.color} />
				<span id="circle-label">{stitek.nazev}</span>
			{/each}
		</div>
	{/if}
</section>

<style>
	#stitky {
		margin-top: 5px;
	}
	#circle {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		display: inline-block;
	}
	#circle-label {
		margin-right: 12px;
		margin-left: 2px;
	}
	#info {
		text-align: center;
		margin-top: 50px;
	}
	#info p {
		margin-top: -30px;
		margin-bottom: 40px;
		font-size: 18px;
	}
	.calendar-week .matchday {
		transform: scaleY(1);
		border-radius: 5px;
		border: none;
		color: #ffffff;
		transition: 0.15s;

		z-index: 2;
	}
	.time {
		font-size: 16px;
		position: absolute;
		bottom: -15px;
		left: 50%;
		transform: translateX(-50%);
	}
	.image-name-holder {
		display: flex;
		width: 100%;
		flex-direction: column;
		font-size: 18px;
		font-weight: 600;
		text-align: center;
	}
	.klub-images-div {
		display: flex;
		justify-content: space-between;
	}
	.klub-image {
		height: 60%;
		max-width: 89%;
		margin-left: auto;
		margin-right: auto;
	}

	section {
		padding: 0px calc((100% - 85rem) / 2) 0px calc((100% - 85rem) / 2);
	}
	.calendar-label {
		display: flex;
		margin-bottom: 10px;
		font-size: 20px;
	}
	.calendar-label-day {
		width: 14%;
		text-align: center;
		margin-right: 2px;
	}

	.calendar-week {
		display: flex;
		margin-bottom: -2px;
	}
	.calendar-day {
		width: 14%;
		text-align: center;
		border: 2px solid #cecece;
		height: 175px;
		margin-right: -2px;

		font-size: 30px;
		font-weight: 700;

		color: #777777;
	}
	#text {
		margin-top: 0;
		margin-bottom: 5px;
	}
	@media (max-width: 1250px) {
		.calendar-day {
			height: 150px;
		}
		.klub-image {
			max-width: 100%;
		}
		.image-name-holder span {
			display: none;
		}
	}
	@media (max-width: 1000px) {
		.calendar-day {
			height: 120px;
		}
		.klub-image {
			max-width: 100%;
		}
	}
	@media (max-width: 800px) {
		.calendar-day {
			height: 100px;
			font-size: 14px;
		}
		.klub-image {
			height: 100%;
			margin-left: 0;
			margin-right: 0;
		}
		.image-name-holder {
			width: 50%;
		}
	}
	@media (max-width: 680px) {
		#info {
			margin-top: 25px;
		}
		#info p {
			margin-top: -10px;
		}
	}
	@media (max-width: 600px) {
		.calendar-day {
			height: 70px;
			font-size: 14px;
		}
		.klub-image {
			height: 90%;

			margin-left: 0;
			margin-right: 0;
		}
		.image-name-holder {
			width: 50%;
		}
		.image-name-holder span {
			display: none;
		}
		.time {
			font-size: 12px;
		}
	}
</style>
