<script context="module">
	export async function preload(page) {
		let slug = page.path.split("/");
		let prezdivka = slug[2];
		let code = slug[3];
		const res = await this.fetch(
			"https://velkadomu.pythonanywhere.com/verify_email",
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					prezdivka: prezdivka,
					code: code,
				}),
			}
		);
		let message = "";
		if (res.status == 200) {
			message =
				"Tvůj email byl úspěšně ověřen. Nyní se můžeš vrátit na hlavní stránku a příhlásit se:";
		}

		return { message };
	}
</script>

<script>
	export let message;
</script>

{message}
{#if message != ""}
	<p>
		<a href="/" rel="prefetch">Hlavní stránka</a>
	</p>
{/if}

<style>
	p {
		text-decoration: underline;
	}
</style>
