<script context="module">
	export async function preload({ params }) {
		const res = await this.fetch(
			"https://velkadomu.pythonanywhere.com/clanek/" + params.slug
		);
		const json = await res.json();
		let clanek = json.clanek;

		let komentare = json.komentare;
		let dalsiClanky = json.dalsiClanky;

		let url =
			"https://ik.imagekit.io/velkadomu/tr:h-500,w-900" + clanek.obrazek;

		let jsonld = {
			"@context": "https://schema.org",
			"@type": "NewsArticle",
			headline: clanek.titulek,
			image: [
				"https://ik.imagekit.io/velkadomu/tr:h-500,w-900" +
					clanek.obrazek,
			],
			datePublished: clanek.datePublished,
		};
		jsonld = JSON.stringify(jsonld);
		let jsonldScript = `<script type="application/ld+json">${
			jsonld + "<"
		}/script>`;

		let nazevAnkety = clanek.nazevAnkety;
		let votes = clanek.votes;
		let hodnotyAnkety = clanek.hodnotyAnkety;

		let id = params.slug;

		return {
			clanek,
			komentare,
			dalsiClanky,
			url,
			nazevAnkety,
			votes,
			hodnotyAnkety,
			id,
			jsonldScript,
		};
	}
</script>

<script>
	import Nadpis from "../../../components/Nadpis.svelte";
	import Anketa from "../../../components/Anketa.svelte";
	import { onMount, afterUpdate } from "svelte";
	import { isAuthenticated, cookie, prezdivka } from "../../../store";
	import { fly } from "svelte/transition";
	import { getContext } from "svelte";

	const segment$ = getContext("segment");

	$: changeLogin = $segment$;

	onMount(() => {
		statsIncrease();
		getAnketa();
	});

	async function getAnketa() {
		let cookieStorage = localStorage.getItem("user_cookie");
		let prezdivkaStorage = localStorage.getItem("prezdivka");
		const res = await fetch(
			"https://velkadomu.pythonanywhere.com/clanek/" + id,
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					prezdivka: prezdivkaStorage,
					cookie: cookieStorage,
				}),
			}
		);
		const json = await res.json();

		userChosen = json.user_chosen;

		if (userChosen) {
			showAnketaResults = true;
		}
	}

	export let clanek;
	export let komentare;
	export let dalsiClanky;
	export let url;
	export let nazevAnkety;
	export let votes;
	export let hodnotyAnkety;
	export let id;
	export let jsonldScript;

	let userChosen;
	let showAnketaResults;

	async function statsIncrease() {
		let idStorage = localStorage.getItem(clanek.id);

		if (idStorage == null) {
			const res = await fetch(
				"https://velkadomu.pythonanywhere.com/add_clanek_stat/" + id
			);
			localStorage.setItem(clanek.id, "viewed");
		}
	}
	let novyKomentar = "";

	function pridatKomentar() {
		if (novyKomentar == "") {
			return;
		}
		fetch("https://velkadomu.pythonanywhere.com/pridat_komentar", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				cookie: $cookie,
				prezdivka: $prezdivka,

				clanek: clanek.id,
				novyKomentar: novyKomentar,
			}),
		});
		komentare.push({
			text: novyKomentar,
			autor: $prezdivka,
			datum: "10:09",
			odpovedi: [],
		});

		komentare = komentare;

		novyKomentar = "";
	}

	function pridatOdpoved(komentar) {
		fetch("https://velkadomu.pythonanywhere.com/pridat_odpoved", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				cookie: $cookie,
				prezdivka: $prezdivka,

				komentar: komentar.id,
				novyKomentar: komentar.novaOdpoved,
			}),
		});

		komentar.odpovedi.push({
			text: komentar.novaOdpoved,
			autor: $prezdivka,
			datum: "13:14",
		});
		komentare = komentare;
		komentar.novaOdpoved = "";

		komentar.showNovaOdpoved = false;
		komentar = komentar;
	}

	async function redirect() {
		let idStorage = localStorage.getItem(clanek.id.toString() + "_");

		if (idStorage == null) {
			await fetch(
				"https://velkadomu.pythonanywhere.com/add_redirect_stat/" + id
			);
			localStorage.setItem(clanek.id.toString() + "_", "redirected");
		}
		window.open(clanek.popisek, "_blank");
	}
</script>

<svelte:head>
	{@html jsonldScript}
	<title>{clanek.titulek}</title>
	<meta name="description" content={clanek.podnadpis} />
	<script async src="https://platform.twitter.com/widgets.js" charset="utf-8">
	</script>

	<meta property="og:title" content={clanek.titulek} />
	<meta property="og:description" content={clanek.podnadpis} />
	<meta property="og:type" content="article" />
	<meta property="fb:app_id" content="711492256235520" />
	<meta
		property="og:image"
		content={"https://ik.imagekit.io/velkadomu/tr:h-500,w-900" +
			clanek.obrazek}
	/>
</svelte:head>

<article>
	<h1 class="clanek-titulek">{clanek.titulek}</h1>
	<div id="clanek-info">
		<div id="autor-info">
			{#if clanek.logo == "VelkaDomu"}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 54 53"
					fill="none"
				>
					<path
						d="M21.7099 1.84346C24.8643 -0.448336 29.1357 -0.448337 32.2901 1.84346L50.2416 14.886C53.396 17.1778 54.7159 21.2401 53.5111 24.9483L46.6542 46.0517C45.4493 49.7599 41.9937 52.2705 38.0947 52.2705H15.9053C12.0063 52.2705 8.55068 49.7599 7.34582 46.0517L0.48893 24.9483C-0.715938 21.2401 0.603984 17.1778 3.75837 14.886L21.7099 1.84346Z"
						fill="#FF8A00"
					/></svg
				>
			{:else}
				<img
					src={"https://ik.imagekit.io/velkadomu/tr:h-50,w-50" +
						clanek.logo}
					alt="Logo jiného portálu"
					width="42"
					height="42"
					class="logo"
				/>
			{/if}

			<div id="clanek-info-text">
				<a
					rel="prefetch"
					href={"/autor/" +
						clanek.autor.replace(" ", "-").replace(".", "|")}
				>
					<span id="clanek-autor">{clanek.autor}</span>
				</a>
				<span>{clanek.datum}</span>
			</div>
		</div>

		<div id="share">
			<a
				class="share-btn"
				href={"https://www.facebook.com/sharer/sharer.php?app_id=711492256235520&sdk=joey&u=https://velkadomu.cz/clanek/" +
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
					clanek.id +
					"&display=popup&ref=plugin&src=share_button"}
				onclick="return !window.open(this.href, 'Facebook', 'width=640,height=580')"
				style="margin-right: 5px;"
			>
				<img
					src="https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/facebook-512.png"
					alt="Facebook logo"
				/>
			</a>
			<!-- <a href="http://twitter.com/share?related=[your_twitter_account]&via=[your_twitter_account]&lang=[fr]&text=[hello%20world]&url=[www.google.com]">tweet</a>

				<img
					src="https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-512.png"
					alt="Twitter logo"
				/>
			</a> -->
		</div>
	</div>

	<hr />

	<p class="clanek-podnadpis">{clanek.podnadpis}</p>
	<img src={url} alt={clanek.titulek} class="clanek-obrazek" />
	{#if clanek.zdrojObrazku}
		<p id="zdroj-hlavniho-obrazku">{clanek.zdrojObrazku}</p>
	{/if}
	<script
		async
		src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
	<ins
		class="adsbygoogle"
		style="display:block; text-align:center;"
		data-ad-layout="in-article"
		data-ad-format="fluid"
		data-ad-client="ca-pub-4089328309096190"
		data-ad-slot="6833214460"
	/>
	<script>
		(adsbygoogle = window.adsbygoogle || []).push({});
	</script>
	<div class="clanek-body">
		{@html clanek.body}
	</div>

	{#if clanek.logo != "VelkaDomu"}
		<div class="separator">Konec náhledu článku</div>
		<p id="zbytek-clanku">
			Zbytek článku si můžeš přečíst na forcabarca.cz
		</p>
		<button on:click={redirect} id="link-clanek"
			>Přečíst zbytek článku</button
		>
	{/if}

	<!-- {@html clanek.dalsiStitky} -->
	<div class="clanek-stitky">
		{#each clanek.stitky as stitek, color}
			<a href="/archiv" rel="prefetch">
				<div class="clanek-stitek">
					<span style={"color: " + stitek[1]}>{stitek[0]}</span>
				</div>
			</a>
		{/each}
	</div>
	<script
		async
		src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
	<ins
		class="adsbygoogle"
		style="display:block; text-align:center;"
		data-ad-layout="in-article"
		data-ad-format="fluid"
		data-ad-client="ca-pub-4089328309096190"
		data-ad-slot="6833214460"
	/>
	<script>
		(adsbygoogle = window.adsbygoogle || []).push({});
	</script>

	<Anketa
		{nazevAnkety}
		{hodnotyAnkety}
		{userChosen}
		{votes}
		{showAnketaResults}
	/>

	<div id="komentar-nadpis">
		<Nadpis text="Komentáře" />
	</div>

	{#each komentare as komentar}
		<div class="komentar">
			<p class="komentar-autor">{komentar.autor}</p>
			<p class="komentar-text">{komentar.text}</p>
		</div>
		{#if komentar.odpovedi.length > 0}
			{#each komentar.odpovedi as odpoved, i}
				{#if i == 0}
					<div
						class="odpoved first"
						style={komentar.odpovedi.length == 1 &&
							"margin-bottom: 0px;"}
					>
						<p class="komentar-autor">{odpoved.autor}</p>
						<p class="komentar-text">{odpoved.text}</p>
					</div>
				{:else if i == komentar.odpovedi.length - 1}
					<div class="odpoved last">
						<p class="komentar-autor">{odpoved.autor}</p>
						<p class="komentar-text">{odpoved.text}</p>
					</div>
				{:else}
					<div class="odpoved not-last">
						<p class="komentar-autor">{odpoved.autor}</p>
						<p class="komentar-text">{odpoved.text}</p>
					</div>
				{/if}
			{/each}
			{#if !komentar.showNovaOdpoved && $isAuthenticated}
				<p
					class="odpovedet-odpovedi"
					on:click={() => {
						komentar.showNovaOdpoved = true;
					}}
				>
					Odpovědět
				</p>
			{/if}
		{:else if !komentar.showNovaOdpoved && $isAuthenticated}
			<p
				class="odpovedet-komentari"
				on:click={() => {
					komentar.showNovaOdpoved = true;
				}}
			>
				Odpovědět
			</p>
		{/if}
		{#if komentar.showNovaOdpoved}
			<div
				class="odpoved first"
				in:fly={{ x: -200, duration: 400 }}
				out:fly={{ duration: 0 }}
			>
				<p class="komentar-autor">{$prezdivka}</p>
				<span
					class="novy-komentar-close"
					on:click={() => {
						komentar.showNovaOdpoved = false;
					}}>X</span
				>
				<div class="novy-komentar-wrapper">
					<p
						class="komentar-text nova-odpoved"
						contenteditable
						bind:innerHTML={komentar.novaOdpoved}
					/>
					<svg
						id="login-logo-phone"
						xmlns="http://www.w3.org/2000/svg"
						width="82"
						height="82"
						viewBox="0 0 82 82"
						fill="none"
						on:click={() => {
							if (komentar.novaOdpoved != "") {
								pridatOdpoved(komentar);
							}
						}}
					>
						<path
							d="M32.1832 6.40577C37.4405 2.58611 44.5595 2.5861 49.8168 6.40576L71.1765 21.9245C76.4338 25.7442 78.6337 32.5147 76.6256 38.695L68.4669 63.8049C66.4588 69.9853 60.6995 74.1697 54.2011 74.1697H27.7989C21.3006 74.1697 15.5412 69.9853 13.5331 63.8049L5.3744 38.6951C3.36628 32.5147 5.56615 25.7442 10.8235 21.9245L32.1832 6.40577Z"
							fill="#FF8A00"
						/>
						<path
							d="M58.4142 42.4142C59.1953 41.6332 59.1953 40.3668 58.4142 39.5858L45.6863 26.8579C44.9052 26.0768 43.6389 26.0768 42.8579 26.8579C42.0768 27.6389 42.0768 28.9052 42.8579 29.6863L54.1716 41L42.8579 52.3137C42.0768 53.0948 42.0768 54.3611 42.8579 55.1421C43.6389 55.9232 44.9052 55.9232 45.6863 55.1421L58.4142 42.4142ZM24 43H57V39H24V43Z"
							fill="white"
						/>
					</svg>
				</div>
			</div>
		{/if}
	{:else}
		K tomuto článku se zatím nikdo nevyjádřil.
	{/each}
	<hr />
	<!-- {#if $isAuthenticated} -->
	<p id="new-comment-label">Přidat komentář</p>
	<div bind:innerHTML={novyKomentar} contenteditable id="new-comment" />
	{#if $isAuthenticated}
		<span id="new-comment-komentujes-jako"
			>Komentuješ jako:
			<span id="novy-komentar-prezdivka">{$prezdivka}</span></span
		>
	{/if}
	<button
		id="pridat-komentar"
		on:click={() => {
			$isAuthenticated ? pridatKomentar() : changeLogin();
		}}>Přidat</button
	>
	<!-- {:else}
		Pro komentování se musíš <u
			on:click={() => {
				login.changeLogin();
			}}>přihlásit</u
		>
	{/if} -->
	<div id="dalsi-clanky">
		<Nadpis text="Další články" />
		<div id="dalsi-clanky-wrapper">
			{#each dalsiClanky as dalsiClanek, index}
				<a
					rel="prefetch"
					href={"/clanek/" +
						dalsiClanek.titulek
							.replace(/\s+/g, "-")
							.replace(".", "")
							.replace(",", "")
							.replace('"', "")
							.replace("'", "")
							.replace(":", "")
							.replace("?", "")
							.toLowerCase() +
						"/" +
						dalsiClanek.id}
					class="dalsi-clanek"
					on:click={() => {
						clanek = {
							autor: "Načítání",
							body: "Načítání",
							datum: "Načítání",
							autor: "Načítání",
							stitky: ["Načítání"],
							podnadpis: "Načítání",
							titulek: "Načítání",
						};
						url =
							"https://ik.imagekit.io/velkadomu/tr:h-500,w-900/placeholder_OBwhc9BIH2pIr.png";
						id = dalsiClanek.id;
					}}
					on:mouseenter={() => {
						let els = document.getElementsByClassName("overlay");
						let elsT = document.getElementsByClassName(
							"titulek-dalsi-clanek"
						);
						for (let i = 0; i < els.length; i++) {
							if (i != index && screen.width > 680) {
								els[i].style.opacity = "0.5";
								elsT[i].style.color = "#949494";
							}
						}
					}}
					on:mouseleave={() => {
						let els = document.getElementsByClassName("overlay");
						let elsT = document.getElementsByClassName(
							"titulek-dalsi-clanek"
						);
						for (let i = 0; i < els.length; i++) {
							els[i].style.opacity = "0";
							elsT[i].style.color = "#333333";
						}
					}}
				>
					<div class="overlay" />
					<img
						src={"https://ik.imagekit.io/velkadomu/tr:h-200,w-350" +
							dalsiClanek.obrazek}
						alt={dalsiClanek.titulek}
						class="dalsi-clanek-obrazek"
					/>
					<p class="titulek-dalsi-clanek">{dalsiClanek.titulek}</p>
				</a>
			{/each}
			<div class="blank" />
			<div class="blank" />
		</div>
	</div>
</article>

<style>
	#zdroj-hlavniho-obrazku {
		text-align: right;
		font-size: 13px;
		margin-top: 0px;
		margin-bottom: 10px;
	}
	:global(.embedded-img) {
		width: 100%;
	}
	:global(.embedded-img img) {
		width: 100%;
		height: 500px;
		border-radius: 5px;
	}
	:global(.embedded-img p) {
		text-align: right;
		font-size: 13px;
		margin-top: 0px;
		margin-bottom: 10px;
	}
	/* Other portals */
	.separator {
		display: flex;
		align-items: center;
		text-align: center;

		font-size: 23px;
		font-weight: 700;
	}
	.separator::before,
	.separator::after {
		content: "";
		flex: 1;
		border-bottom: 3px solid #ff8a00;
	}
	.separator::before {
		margin-right: 0.6em;
	}
	.separator::after {
		margin-left: 0.6em;
	}

	#zbytek-clanku {
		font-weight: 500;
		font-size: 18px;
		text-align: center;
		margin-top: 5px;
	}

	#link-clanek {
		background-color: #ff8a00;
		color: #ffffff;
		border: 3px solid transparent;
		border-radius: 5px;

		margin-left: 50%;
		transform: translateX(-50%);

		margin-top: 10px;
		padding: 10px 30px;

		font-size: 20px;
		font-weight: 700;

		transition: 0.15s;
		cursor: pointer;
	}

	#link-clanek:hover {
		color: #ff8a00;
		background-color: #ffffff;
		border: 3px solid #ff8a00;
	}

	.logo {
		vertical-align: middle;
		display: inline-block;
		width: 42px;
		height: 42px;
		object-fit: scale-down;
		margin-top: 5px;
	}
	:global(.twitter-tweet) {
		margin-left: 50%;
		transform: translateX(-50%);
	}

	u {
		cursor: pointer;
		transition: 0.15s;
	}
	u:hover {
		color: #ff8a00;
	}
	:global(iframe) {
		margin-left: 50%;
		transform: translateX(-50%);
	}
	.titulek-dalsi-clanek {
		transition: 0.15s;
	}
	:global(iframe) {
		border-radius: 5px;
	}
	.overlay {
		width: 100%;
		height: 150px;
		position: absolute;
		background-color: #000000;
		opacity: 0;
		border-radius: 5px;
		transition: 0.15s;
	}

	.blank {
		width: 30%;
	}
	#dalsi-clanky {
		margin-top: 100px;
	}
	#dalsi-clanky-wrapper {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
	}

	.dalsi-clanek {
		width: 30%;
		position: relative;
		cursor: pointer;
	}
	.dalsi-clanek p {
		font-size: 18px;
		font-weight: 600;
	}
	.dalsi-clanek-obrazek {
		width: 100%;
		border-radius: 5px;
	}

	article {
		padding: 0px calc((100% - 55rem) / 2) 0px calc((100% - 55rem) / 2);
		margin: 0 auto;

		margin-top: 0px;
	}

	.clanek-stitky {
		display: flex;
		justify-content: flex-start;
		margin-top: 20px;
	}
	.clanek-stitek {
		margin-right: 10px;
		font-weight: 700;
		padding: 8px 12px;

		font-size: 16px;
		line-height: 18px;
		transition: 0.1s;

		background-color: #e4e4e4;
		border-radius: 5px;
	}
	.clanek-stitek:hover {
		background-color: #bfbfbf;
	}

	.clanek-titulek {
		/*font-size: 2.6vw;*/
		font-size: 44px;
		line-height: 1.3;
		margin-top: 100px;
		margin-bottom: 20px;
	}
	#clanek-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	#autor-info {
		display: flex;
	}
	#share {
		vertical-align: middle;
		display: inline-block;
	}
	#share img {
		width: 25px;
		vertical-align: middle;
		display: inline-block;
	}

	svg {
		vertical-align: middle;
		display: inline-block;

		width: 32px;
		height: 42px;
	}

	#clanek-info-text {
		vertical-align: middle;
		display: inline-block;

		display: flex;
		flex-direction: column;

		margin-left: 10px;

		font-size: 15px;
	}

	#clanek-autor {
		font-weight: 700;
		color: #ff8a00;
		transition: 0.15s;
	}
	#clanek-autor:hover {
		color: #333333;
	}

	hr {
		border-top: thin solid #d0d0d0;
	}
	.clanek-podnadpis {
		text-align: justify;
		font-weight: 600;
		font-size: 21px;
		margin-top: 40px;
	}
	.clanek-obrazek {
		width: 100%;
		/* height: 28vw; */
		height: 500px;

		margin-top: 15px;

		object-fit: cover;

		border-radius: 5px;
	}

	.clanek-body {
		font-size: 21px;
		text-align: justify;
		color: #333;
	}
	:global(h3) {
		font-size: 30px;
	}
	:global(h4) {
		font-size: 28px;
		font-weight: 600;
	}
	:global(h5) {
		font-size: 24px;
		font-weight: 600;
	}
	:global(.clanek-body p) {
		margin-bottom: 30px;
	}

	#new-comment-label {
		margin: 0;
		font-weight: 600;
		font-size: 20px;
		margin-top: 20px;
	}
	#new-comment-komentujes-jako {
		margin: 0;
		font-weight: 600;
		font-size: 16px;
	}
	#novy-komentar-prezdivka {
		margin-top: 0px;

		color: #ff8a00;
		font-size: 17px;
		font-weight: 600;
	}
	#new-comment {
		width: calc(100% - 20px);
		border: 1px solid #bfbfbf;
		border-radius: 5px;

		font-family: "Titillium Web", sans-serif;
		font-weight: 600;
		font-size: 16px;

		margin-bottom: 15px;

		padding: 10px;
	}

	#pridat-komentar {
		float: right;
		border: 0;

		background: #ff8a00;
		color: #ffffff;

		margin-top: 10px;
		height: 40px;
		line-height: 40px;

		padding-left: 20px;
		padding-right: 20px;

		font-size: 19px;
		font-weight: 600;

		cursor: pointer;
		transition: 0.15s;
	}

	#pridat-komentar:hover {
		color: #ff8a00;
		background-color: #ffffff;
	}

	#komentar-nadpis {
		margin-top: 100px;
	}

	.komentar {
		border: 1px solid #cccccc;
		border-top: 5px solid #ff8a00;

		padding-left: 10px;
		padding-right: 10px;
		position: relative;

		margin-top: 20px;
	}

	.odpoved {
		border: 1px solid #cccccc;
		border-top: 5px solid #cccccc;

		margin-bottom: 20px;

		padding-left: 10px;
		padding-right: 10px;
		margin-left: 30px;
		position: relative;
	}

	.last {
		margin-bottom: 0;
	}

	.first {
		margin-top: 20px;
	}
	.komentar-autor {
		margin-top: 5px;
		margin-bottom: 10px;

		font-size: 20px;
		font-weight: 600;
	}
	.komentar-text {
		font-size: 18px;
		margin-top: 0;
		margin-bottom: 10px;
	}

	.odpovedet-odpovedi {
		margin-left: 40px;
		margin-top: 5px;
		/* margin-bottom: 20px; */

		font-weight: 600;
		color: #ff8a00;

		cursor: pointer;
		transition: 0.15s;
	}
	.odpovedet-odpovedi:hover {
		color: #333333;
	}

	.odpovedet-komentari {
		margin-top: 5px;
		/* margin-bottom: 20px; */

		font-weight: 600;
		color: #ff8a00;

		margin-left: 10px;

		cursor: pointer;
		transition: 0.15s;
	}
	.odpovedet-komentari:hover {
		color: #333333;
	}
	.nova-odpoved {
		border: 1px solid #cccccc;
		padding: 5px;
		width: 80%;
	}
	.novy-komentar-wrapper {
		display: flex;
		justify-content: space-between;
	}
	.novy-komentar-wrapper svg {
		width: 50px;
		height: 40px;

		cursor: pointer;
	}
	.novy-komentar-close {
		position: absolute;
		padding-right: 10px;
		right: 0;
		top: 0;

		font-weight: 500;
		font-size: 20px;

		color: #333333;
		cursor: pointer;

		transition: 0.15s;
	}
	.novy-komentar-close:hover {
		color: #ff8a00;
	}

	:global(.clanek-body .close-together) {
		margin-top: 5px;
		margin-bottom: 0px;
	}

	:global(.callout) {
		background-color: #ff8a00;
		color: #ffffff;
		padding: 10px 15px;
		border-radius: 5px;

		margin-bottom: 30px;
	}
	:global(.citace) {
		padding: 0px;
		padding-left: 15px;
		font-style: italic;
		position: relative;
		margin-bottom: 30px;
	}
	:global(.citace::before) {
		content: "";
		position: absolute;
		left: 0px;

		width: 5px;
		height: 105%;
		background-color: #ff8a00;
	}
	:global(.odrazka) {
		padding-left: 30px;
		position: relative;
	}
	:global(.odrazka::before) {
		content: "";
		position: absolute;
		left: 15px;
		top: 50%;

		width: 5px;
		height: 5px;
		border-radius: 50%;
		background-color: #333333;
	}

	@media only screen and (max-width: 830px) {
		article {
			width: 100%;
			margin-top: 25px;
			padding: 0;
		}
		.clanek-stitky {
			display: none;
		}
		.clanek-titulek {
			font-size: 24px;
			font-weight: 600;
			margin-bottom: 40px;
			line-height: 1.5;
		}
		.clanek-obrazek {
			height: 50vw;
		}
		.clanek-podnadpis {
			margin-top: 20px;
		}
		.clanek-podnadpis {
			font-size: 18px;
		}
		.clanek-body {
			font-size: 18px;
		}
		.clanek-titulek {
			margin-top: 10px;
			margin-bottom: 10px;
		}

		#link-clanek {
			padding: 5px 10px;

			font-size: 15px;
			font-weight: 700;

			transition: 0.15s;
			cursor: pointer;
		}

		#komentar-nadpis {
			margin-top: 10px;
		}

		#dalsi-clanky-wrapper {
			flex-direction: column;
		}

		.dalsi-clanek {
			display: flex;
			width: 100%;
			margin-bottom: 10px;
		}

		.dalsi-clanek .titulek-dalsi-clanek {
			font-size: 14px;
			margin-top: 0px;
			margin-left: 10px;
		}
		.dalsi-clanek-obrazek {
			width: 40%;
		}
		.overlay {
			display: none;
		}
		.titulek-dalsi-clanek {
			color: #333333;
		}
		:global(.embedded-img img) {
			height: 50vw;
		}

		:global(iframe) {
			width: 100%;
			height: 50vw;
		}
	}
</style>
