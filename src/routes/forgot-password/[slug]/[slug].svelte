<script>
	import { goto } from "@sapper/app";
	import { stores } from "@sapper/app";

	const { page } = stores();
	const slug = $page.path.split("/");
	const email = slug[2];
	const cookie = slug[3];

	let error = "";
	let password = "";

	async function send() {
		const res = await fetch(
			"https://velkadomu.pythonanywhere.com/change_password",
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					cookie: cookie,
					heslo: password,
				}),
			}
		);
		if (res.status == 200) {
			goto("/");
		} else {
			let data = await res.json();
			error = data.error;
		}
	}
</script>

<section>
	<h1>Zadej nové heslo</h1>
	<input type="password" bind:value={password} />
	<button on:click={send}>Potvrdit</button>
	{error}
</section>

<style>
	section {
		margin-top: 50px;
		height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	h1 {
		color: #ff8a00;
	}

	input {
		border: 2px solid #ff8a00;
		height: 30px;
		border-radius: 5px;
		width: 400px;
	}

	button {
		margin-top: 20px;
		background-color: #ff8a00;
		color: #ffffff;
		width: 150px;
		height: 30px;
		font-size: 22px;
		font-weight: 600;
		border: 0;
		border-radius: 5px;

		cursor: pointer;
		transition: 0.15s;
	}

	button:hover {
		background-color: #ffffff;
		color: #ff8a00;
	}
</style>
