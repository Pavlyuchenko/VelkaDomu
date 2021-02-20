<script>
	import Nadpis from "../components/Nadpis.svelte";
</script>

<svelte:head>
	<title>VelkáDomů.cz - Kontakt</title>
	<meta
		name="description"
		content="V případě nabídek spolupráce, připomínek nebo tipů pro zlepšení či
			cokoliv jiného nás kontaktujte na emailové adrese: admin@velkadomu.cz"
	/>
</svelte:head>

<section>
	<Nadpis text="Kontakt" />
	<p>
		V případě nabídek spolupráce, připomínek nebo tipů pro zlepšení či
		cokoliv jiného nás kontaktujte na emailové adrese:
	</p>

	<a
		href="https://mail.google.com/mail/?view=cm&fs=1&to=admin@velkadomu.cz"
		target="_blank"><h1>admin@velkadomu.cz</h1></a
	>

	<p>
		Pokud se Vám do dvou pracovních dní nepovede spojit skrz email, můžete
		nás kontaktovat na telefonním čísle <b>602444572</b>.
	</p>
</section>

<style>
	section {
		margin-top: 30vh;
		transform: translateY(-50%);
	}
	p {
		font-size: 18px;
		text-align: center;
	}
	h1 {
		font-size: 40px;
		font-weight: 700;
		color: #ff8a00;
		text-align: center;
	}

	@media (max-width: 680px) {
		h1 {
			font-size: 25px;
		}
		p {
			font-size: 16px;
		}
	}
</style>
