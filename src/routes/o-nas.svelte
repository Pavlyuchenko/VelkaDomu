<script>
	import Nadpis from "../components/Nadpis.svelte";
</script>

<svelte:head>
	<title>VelkáDomů.cz - O nás</title>
	<meta
		name="description"
		content="Projekt Velká Domů spatřil světlo světa 21.
	února 2021, kdy byl oficiálně spuštěn náš web, jakožto středobod
	ekosystému. Na český internet přicházíme s nápady, které v Česku a na
	Slovensku zkrátka nemají obdoby."
	/>
</svelte:head>

<section>
	<Nadpis
		text="Redakce VelkáDomů.cz srdečně zdraví všechny fotbalové fandy!"
	/>

	<p>
		Projekt <span class="yellow">Velká Domů</span> spatřil světlo světa 21.
		února 2021, kdy byl
		<span class="yellow">oficiálně spuštěn náš web</span>, jakožto středobod
		ekosystému. Na český internet přicházíme s nápady, které v Česku a na
		Slovensku <span class="yellow">zkrátka nemají obdoby</span>.
	</p>

	<p>
		Hlavním cílem našeho týmu je kromě zásobování čtenářů <span
			class="yellow">kvalitně zpracovanými příběhy</span
		>
		ze světa kopané také
		<span class="yellow">propojit obsah s rostoucí komunitou</span>. Mimo
		fotbalového kalendáře, v němž nabídneme tipy na utkání, která by vám
		<span class="yellow">neměla uniknout</span>, jsme si připravili
		<span class="yellow">množství anket a podobných soutěží</span>. Vše je
		uzpůsobeno tak, abychom s fanoušky mohli
		<span class="yellow">co nejlépe interagovat</span>. Na naší doméně by se
		tak mohli scházet příznivci různých lig i týmů a společně v chatovacím
		prostoru
		<span class="yellow">diskutovat o nejnovějších událostech</span>.
	</p>

	<p>
		Značným úspěchem pro nás bylo úspěšné <span class="yellow"
			>oslovení největšího oficiálního fanklubu</span
		>
		české scény - <span class="yellow">fcbarcelona.cz</span> - s žádostí o
		vzájemnou spolupráci. Přidala se rovněž stránka
		<span class="yellow">fcintermilano.com</span>, můžete se tedy těšit na
		kvalitní příspěvky přímo od autorů, kteří mají ke svým klubům nejblíže.
		Do budoucnosti pochopitelně plánujeme
		<span class="yellow">seznam partnerů dále rozšiřovat</span>.
	</p>

	<p>
		Velkou Domů můžete mimo jiné podpořit také na <span class="yellow"
			>Instagramu</span
		>
		nebo <span class="yellow">Facebooku</span>, kde budeme krom rychlých
		fotbalových zpráv zveřejňovat také
		<span class="yellow">bližší info okolo našich stránek</span>. Kdybyste
		pak chtěli
		<span class="yellow"
			>rozšířit řady našich redaktorů nebo správců sociálních sítí</span
		>, nebojte se obrátit na některou z uvedených komunikačních platforem,
		<span class="yellow">posílení týmu jistě oceníme</span>.
	</p>

	<h1>Přejeme příjemné čtení a mnoho společných zážitků!</h1>

	<div id="link"><a href="/">Začít číst</a></div>
</section>

<style>
	section {
		margin-top: 80px;

		padding: 0px calc((100% - 65rem) / 2) 0px calc((100% - 65rem) / 2);
	}

	p {
		font-size: 19px;
	}

	.yellow {
		font-weight: 700;
		color: #ff8a00;
	}

	h1 {
		text-align: center;
		font-size: 40px;
		font-weight: 700;
		color: #ff8a00;
		margin-bottom: 5px;
	}

	:global(#link a) {
		text-align: center;
		text-decoration: underline;
		transition: 0.15s;
	}

	:global(#link a:hover) {
		color: #ff8a00;
	}

	#link {
		text-align: center;
	}

	@media only screen and (max-width: 680px) {
		section {
			margin-top: 20px;
		}
		p {
			font-size: 16px;
		}
		h1 {
			font-size: 25px;
		}
	}
</style>
