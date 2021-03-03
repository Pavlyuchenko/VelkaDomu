<script>
	import { fly } from "svelte/transition";
	import { goto } from "@sapper/app";

	export let id;
	export let obrazek;
	export let stitek;
	export let stitekColor;
	export let titulek;
	export let autor;
	export let datum;
	export let logo = "/placeholder_OBwhc9BIH2pIr.png";

	$: url = "https://ik.imagekit.io/velkadomu/tr:h-260,w-420" + obrazek;
</script>

<a
	href={"/clanek/" +
		titulek
			.replace(/\s+/g, "-")
			.replace(".", "")
			.replace(",", "")
			.replace('"', "")
			.replace("'", "")
			.replace(":", "")
			.replace("?", "")
			.replace("/", "")
			.toLowerCase() +
		"/" +
		id}
	rel="prefetch"
	in:fly={{ y: -300, duration: 500 }}
	out:fly={{ y: 0, duration: 1 }}
	class="news"
>
	<div id="image-wrapper">
		<img src={url} alt="titulek" id="obrazek" loading="lazy" />
	</div>
	<div id="informace">
		<header>
			<div id="stitek" style={"color: " + stitekColor}>{stitek}</div>

			<h2>{titulek}</h2>
		</header>
		<footer>
			{#if logo == "VelkaDomu"}
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
			{:else}
				<img
					src={"https://ik.imagekit.io/velkadomu/tr:h-23,w-23" + logo}
					alt="Logo jiného portálu"
					width="23"
					height="23"
					class="logo"
				/>
			{/if}
			<span id="autor">{autor}</span>
		</footer>
		<div id="datumDiv">
			<time itemprop="datePublished" datetime="2015-11-30T12:00:00Z"
				>{datum}</time
			>
		</div>
	</div>
</a>

<style>
	a {
		width: 31%;

		box-shadow: inset 0px 0px 0px 1px #cfcfcf;
		border-radius: 5px;

		position: relative;
		padding-bottom: 60px;
		cursor: pointer;

		transition: 0.15s;
	}
	a:hover {
		box-shadow: inset 0px 0px 0px 1px #ff8a00;
	}
	a:hover #obrazek {
		transform: scale(1.05);
	}
	#image-wrapper {
		overflow: hidden;
		height: 250px;
		border-radius: 5px 5px 0 0;
	}
	a img {
		width: 100%;
		height: 250px;
		object-fit: cover;
		transition: 0.15s;
	}

	#informace {
		padding: 10px;
		padding-left: 25px;
		padding-right: 25px;
	}

	a #stitek {
		font-weight: 700;
		font-size: 14px;
	}
	a h2 {
		margin-top: 5px;

		font-size: 21px;
		font-weight: 700;
	}
	a h2:hover {
		text-decoration: underline;
	}

	footer {
		position: absolute;
		left: 25px;
		bottom: 15px;
	}
	svg {
		vertical-align: middle;
		display: inline-block;
	}
	.logo {
		vertical-align: middle;
		display: inline-block;
		width: 23px;
		height: 23px;
	}
	#autor {
		vertical-align: middle;
		display: inline-block;

		margin-left: 5px;
		font-size: 15px;
	}

	#datumDiv {
		position: absolute;
		right: 25px;
		bottom: 15px;

		color: #666666;
	}
	@media (max-width: 1400px) {
		#image-wrapper {
			height: 17vw;
		}
		a img {
			height: 17vw;
		}
		a #stitek {
			font-size: 1vw;
		}
		a h2 {
			font-size: 1.55vw;
		}
		svg,
		.logo {
			width: 1.8vw;
			height: 1.8vw;
		}
		#autor {
			font-size: 1vw;
		}
		#datumDiv {
			font-size: 1vw;
		}
	}
</style>
