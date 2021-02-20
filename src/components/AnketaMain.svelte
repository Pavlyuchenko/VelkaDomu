<script>
	import { isAuthenticated, cookie, prezdivka } from "../store";
	import { getContext } from "svelte";

	const segment$ = getContext("segment");

	$: changeLogin = $segment$;

	export let nazevAnkety;
	export let hodnotyAnkety;
	export let userChosen;
	export let votes;
	export let showAnketaResults;
	export let clanekTitulek;
	export let clanekId;

	function chooseBod(bod) {
		fetch("https://velkadomu.pythonanywhere.com/vote_anketa", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				cookie: $cookie,
				prezdivka: $prezdivka,

				nazevAnkety: nazevAnkety,
				bod: bod,
			}),
		});

		showAnketaResults = true;
		if (userChosen) {
			var result = hodnotyAnkety.find((obj) => {
				return obj.nazev === userChosen;
			});

			result.votes--;
			hodnotyAnkety = hodnotyAnkety;
		} else {
			votes++;
			votes = votes;
		}

		if (userChosen != bod.nazev) {
			userChosen = bod.nazev;
			bod.votes++;
			bod = bod;
		} else {
			userChosen = null;

			votes--;
			votes = votes;
		}
	}
</script>

<div id="anketa">
	{#if nazevAnkety}
		<div id="anketa-wrapper">
			<a
				rel="prefetch"
				href={"/clanek/" +
					clanekTitulek
						.replace(/\s+/g, "-")
						.replace(".", "")
						.replace(",", "")
						.replace('"', "")
						.replace("'", "")
						.replace(":", "")
						.replace("?", "")
						.toLowerCase() +
					"/" +
					clanekId}><h4>{nazevAnkety}</h4></a
			>
			{#each hodnotyAnkety as bod}
				<div
					class="anketa-bod"
					on:click={() => {
						if ($isAuthenticated) {
							if (!showAnketaResults) {
								let animations = document.getElementsByClassName(
									"anketa-animation"
								);

								for (var i = 0; i < animations.length; i++) {
									animations[i].classList.add(
										"anketa-play-animation"
									);
								}
							}
							chooseBod(bod);
						} else {
							changeLogin();
						}
					}}
				>
					<div class="anketa-animation">
						<div
							class={showAnketaResults && "anketa-votes"}
							style={userChosen == bod.nazev
								? "width: " +
								  (bod.votes / votes) * 100 +
								  "%;transition: .2s; background-color: #ff8a00;"
								: "transition: .2s; width: " +
								  (bod.votes / votes) * 100 +
								  "%;"}
						/>
					</div>
					<p>{bod.nazev}</p>
					{#if showAnketaResults}
						<span class="anketa-percentage"
							>{Math.round((bod.votes / votes) * 100)}
							%</span
						>
					{/if}
				</div>
			{/each}
			{#if !showAnketaResults}
				<p
					id="anketa-vysledky"
					on:click={() => {
						if ($isAuthenticated) {
							showAnketaResults = true;

							let animations = document.getElementsByClassName(
								"anketa-animation"
							);

							for (var i = 0; i < animations.length; i++) {
								animations[i].classList.add(
									"anketa-play-animation"
								);
							}
						} else {
							changeLogin();
						}
					}}
				>
					Zobrazit výsledky
				</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	#anketa {
		margin-top: 20px;
		width: 30%;
	}

	#anketa-wrapper {
		width: 100%;
		margin: 0 auto;
	}
	#anketa-wrapper h4 {
		text-align: center;
		font-size: 20px;
		margin-top: -30px;
		text-decoration: underline #ff8a00;
		transition: 0.15s;
	}
	#anketa-wrapper h4:hover {
		color: #ff8a00;
	}
	#anketa-vysledky {
		text-align: center;
		cursor: pointer;
		transition: 0.15s;
	}
	#anketa-vysledky:hover {
		color: #ff8a00;
	}
	.anketa-bod {
		height: 40px;
		border: 1px solid #333333;
		margin-bottom: 10px;
		line-height: 40px;
		padding-left: 15px;

		border-radius: 5px;

		transition: 0.25s;
		cursor: pointer;

		position: relative;
	}
	.anketa-bod:hover {
		background-color: #cccccc;
	}

	.anketa-bod p {
		margin: 0;
		font-size: 18px;
		font-weight: 600;
		z-index: 1;
		position: relative;

		-webkit-user-select: none; /* Safari */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* IE10+/Edge */
		user-select: none; /* Standard */
	}

	.anketa-votes {
		content: "";
		z-index: 1;
		background-color: #bfbfbf;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		height: 40px;
	}

	.anketa-animation {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 40px;
		overflow: hidden;
	}

	.anketa-percentage {
		position: absolute;
		right: 10px;
		top: 0;
	}

	.anketa-play-animation {
		animation: rollRight 0.5s ease-out;
	}
	@keyframes rollRight {
		0% {
			width: 0%;
		}
		100% {
			width: 100%;
		}
	}
	@media (max-width: 950px) {
		#anketa #anketa-wrapper {
			width: 100%;
		}
	}
</style>
