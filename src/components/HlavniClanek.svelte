<script>
	import AutorDatum from "./AutorDatum.svelte";
	import { fly } from "svelte/transition";
	import { create_in_transition } from "svelte/internal";

	export let id;
	export let stitek;
	export let stitekColor;
	export let titulek;
	export let obrazek;
	export let popisek;
	export let autor;
	export let datum;

	$: url = "https://ik.imagekit.io/velkadomu/tr:h-400,w-700" + obrazek;
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
>
	<article
		in:fly={{ x: -300, duration: 500 }}
		out:fly={{ y: 0, duration: 1 }}
		class="news"
	>
		<div id="image-wrapper">
			<img src={url} alt={titulek} loading="lazy" />
		</div>
		<div id="main-text">
			<div id="vertical-align">
				<header>
					<div id="stitek" style={"color: " + stitekColor}>
						{stitek}
					</div>

					<h1>{titulek}</h1>
				</header>
				<p id="popisek">{popisek}</p>
				<footer id="autor-datum">
					<AutorDatum jmeno={autor} {datum} {id} />
				</footer>
			</div>
		</div>
	</article>
</a>

<style>
	article {
		width: 100%;
		margin-top: 100px;
		box-shadow: inset 0px 0px 0px 1px #cfcfcf;

		display: flex;
		border-radius: 5px;

		transition: 0.15s;
	}
	article:hover {
		box-shadow: inset 0px 0px 0px 1px #ff8a00;
	}
	article:hover img {
		transform: scale(1.05);
	}
	#image-wrapper {
		width: 120%;
		height: 400px;
		overflow: hidden;
		border-radius: 5px 0 0 5px;
	}
	article img {
		width: 100%;
		height: 400px;
		object-fit: cover;

		transition: 0.15s;
	}
	article #main-text {
		margin-left: 40px;
		margin-right: 40px;
		width: 100%;

		position: relative;
	}
	article #vertical-align {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	#stitek {
		font-weight: 700;
		font-size: 14px;
	}

	h1 {
		margin-top: 0px;
		font-weight: 600;
		font-size: 28px;
	}
	h1:hover {
		text-decoration: underline;
	}

	#popisek {
		font-size: 17px;
		color: #636363;
	}

	footer {
		display: flex;
	}
	@media (max-width: 1400px) {
		article {
			margin-top: 50px;
		}
		#image-wrapper {
			height: 20vw;
			width: 80%;
		}
		article img {
			height: 22vw;
		}
		#stitek {
			font-size: 1.2vw;
		}
		h1 {
			font-size: 1.9vw;
		}
		#popisek {
			font-size: 1.2vw;
		}
	}
</style>
