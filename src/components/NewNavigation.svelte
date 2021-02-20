<script>
	import { fly } from "svelte/transition";
	import { onMount } from "svelte";

	import { cookie, isAuthenticated, prezdivka } from "../store";

	let showLogin = false;
	let showRegister = false;
	let showCode = false;
	let showForgot = false;

	let showNav = false;
	let showPrihlaseni = false;
	let showRegistrace = false;
	let showKod = false;
	let showZapomenuteHeslo = false;
	let showSendEmail = false;

	let email = "";
	let password = "";

	let emailReg = "";
	let prezdivkaReg = "";
	let passwordReg = "";

	let fiveDigit = "";

	export function changeLogin() {
		if (window.innerWidth > 680) {
			showLogin = true;
		} else {
			showPrihlaseni = true;
		}
	}

	onMount(() => {
		check_cookie();
	});

	async function check_cookie() {
		let cookieStorage = localStorage.getItem("user_cookie");
		let prezdivkaStorage = localStorage.getItem("prezdivka");

		if (
			cookieStorage != "null" &&
			prezdivkaStorage != "null" &&
			cookieStorage != null &&
			prezdivkaStorage != null
		) {
			const res = await fetch(
				"https://velkadomu.pythonanywhere.com/check_cookie",
				{
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({
						cookie: cookieStorage,
						prezdivka: prezdivkaStorage,
					}),
				}
			);
			if (res.status == 200) {
				const json = await res.json();

				cookie.set(cookieStorage);
				isAuthenticated.set(true);
				prezdivka.set(prezdivkaStorage);
			} else {
				localStorage.user_cookie = null;
				localStorage.prezdivka = null;
			}
		}
	}

	let error = "";
	let success = "";
	let registerError = "";
	async function login() {
		const res = await fetch("https://velkadomu.pythonanywhere.com/login", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				heslo: password,
			}),
		});

		if (res.status == 200) {
			const json = await res.json();

			localStorage.user_cookie = json.user_cookie;
			localStorage.prezdivka = json.prezdivka;

			cookie.set(json.user_cookie);
			isAuthenticated.set(true);
			prezdivka.set(json.prezdivka);

			showLogin = false;
			showRegister = false;
			showPrihlaseni = false;
			showRegistrace = false;
			email = "";
			password = "";

			emailReg = "";
			prezdivkaReg = "";
			passwordReg = "";
		} else {
			let data = await res.json();
			error = data.error;
		}
	}

	async function register() {
		if (passwordReg.length > 4) {
			const res = await fetch(
				"https://velkadomu.pythonanywhere.com/register",
				{
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({
						email: emailReg,
						prezdivka: prezdivkaReg,
						heslo: passwordReg,
					}),
				}
			);
			if (res.status == 200) {
				showCode = true;
				showRegister = false;
			} else {
				let data = await res.json();
				registerError = data.error;
			}
		} else {
			registerError = "Heslo musí obsahovat nejméně pět znaků";
		}
	}

	async function forgotPassword() {
		const res = await fetch(
			"https://velkadomu.pythonanywhere.com/forgot_password",
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					email: email,
				}),
			}
		);

		if (res.status == 200) {
			success = "Poslali jsme email na tvou emailovou adresu.";
		} else {
			let data = await res.json();
			error = data.error;
		}
	}

	async function confirmEmail() {
		const res = await fetch(
			"https://velkadomu.pythonanywhere.com/confirm_email",
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					prezdivka: prezdivkaReg,
					fiveDigit: fiveDigit,
				}),
			}
		);
		if (res.status == 200) {
			const json = await res.json();

			showCode = false;
			showKod = false;

			localStorage.user_cookie = json.user_cookie;
			localStorage.prezdivka = json.prezdivka;

			cookie.set(json.user_cookie);
			isAuthenticated.set(true);
			prezdivka.set(json.prezdivka);

			showLogin = false;
			showRegister = false;
			email = "";
			password = "";

			emailReg = "";
			passwordReg = "";
		}
	}

	async function registerMobile() {
		const res = await fetch(
			"https://velkadomu.pythonanywhere.com/register_mobile",
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					email: emailReg,
					prezdivka: prezdivkaReg,
					heslo: passwordReg,
				}),
			}
		);
		if (res.status == 200) {
			const json = await res.json();

			localStorage.user_cookie = json.user_cookie;
			localStorage.prezdivka = json.prezdivka;

			cookie.set(json.user_cookie);
			isAuthenticated.set(true);
			prezdivka.set(json.prezdivka);

			showLogin = false;
			showRegister = false;
			email = "";
			password = "";

			emailReg = "";
			passwordReg = "";

			showKod = true;
			showRegistrace = false;
		} else {
			let data = await res.json();
			registerError = data.error;
		}
	}

	function logout() {
		cookie.set(null);
		isAuthenticated.set(false);
		prezdivka.set(null);

		localStorage.user_cookie = null;
		localStorage.prezdivka = null;
	}

	function validateEmail(email) {
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	/* history.pushState = new Proxy(history.pushState, {
			apply(target, thisArg, argumentsList) {
				scrollTo(0, 0);
				Reflect.apply(target, thisArg, argumentsList);
			},
		}); */
</script>

<header id="header">
	<a href="/" rel="prefetch">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="54"
			height="53"
			viewBox="0 0 54 53"
			fill="none"
			id="header__logo-svg"
		>
			<path
				d="M21.7099 1.84346C24.8643 -0.448336 29.1357 -0.448337 32.2901 1.84346L50.2416 14.886C53.396 17.1778 54.7159 21.2401 53.5111 24.9483L46.6542 46.0517C45.4493 49.7599 41.9937 52.2705 38.0947 52.2705H15.9053C12.0063 52.2705 8.55068 49.7599 7.34582 46.0517L0.48893 24.9483C-0.715938 21.2401 0.603984 17.1778 3.75837 14.886L21.7099 1.84346Z"
				fill="#FF8A00"
			/>
		</svg>
		<span id="header__logo-text">VelkáDomů.cz</span>
	</a>
	<nav id="header__navigation">
		<div id="domu">
			<a href="/" rel="prefetch"><span>Domů</span></a>
		</div>
		<div>
			<a href="/kalendar" rel="prefetch"><span>Kalendář</span></a>
		</div>
		<div>
			<a href="/o-nas"><span>O nás</span></a>
		</div>
		<div>
			<a href="/kontakt"><span>Kontakt</span></a>
		</div>
		{#if !$isAuthenticated}
			<div
				id="login"
				on:click={() => {
					showLogin = !showLogin;
					showRegister = false;
				}}
			>
				<span class="login">Přihlásit se</span>
			</div>
			<div
				id="registrace"
				on:click={() => {
					showRegister = !showRegister;
					showLogin = false;
				}}
			>
				<span class="login">Registrace</span>
			</div>
		{:else}
			<div id="login"><span class="login">{$prezdivka}</span></div>
			<div id="registrace" on:click={logout}>
				<span class="login">Odhlásit se</span>
			</div>
		{/if}
	</nav>
</header>
<hr />
{#if showLogin}
	<div
		id="loginDiv"
		in:fly={{ y: -600, duration: 350 }}
		out:fly={{ y: -200, duration: 200 }}
	>
		{#if error != ""}
			<div id="error">{error}</div>
		{/if}
		<h2>Přihlášení</h2>
		<span
			id="zavrit-prihlaseni"
			on:click={() => {
				showLogin = false;
			}}>X</span
		>
		<p id="create_account">
			nebo
			<u
				on:click={() => {
					showLogin = false;
					showRegister = true;
				}}>vytvoř účet</u
			>
		</p>

		<p class="label">Email nebo přezdívka</p>
		<input type="text" id="email" bind:value={email} />
		<p class="label">Heslo</p>
		<div id="login-heslo">
			<input type="password" id="password" bind:value={password} />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="26"
				height="15"
				viewBox="0 0 26 15"
				fill="none"
				style="cursor: pointer"
				on:click={() => {
					if (
						document.getElementById("password").type == "password"
					) {
						document.getElementById("password").type = "text";
					} else {
						document.getElementById("password").type = "password";
					}
				}}
			>
				<path
					d="M1 7C7.91761 16.6462 18.0038 16.0151 25 7"
					stroke="#FF8A00"
					stroke-width="2"
				/>
				<path
					d="M25 8C18.0824 -1.6462 7.99622 -1.01513 1 8"
					stroke="#FF8A00"
					stroke-width="2"
				/>
				<circle
					cx="13"
					cy="7.5"
					r="3"
					stroke="#FF8A00"
					stroke-width="2"
				/>
			</svg>
		</div>

		<u
			id="login-forgot"
			on:click={() => {
				showLogin = false;
				showForgot = true;
			}}>Zapomenuté heslo</u
		>
		<svg
			id="login-logo"
			xmlns="http://www.w3.org/2000/svg"
			width="82"
			height="82"
			viewBox="0 0 82 82"
			fill="none"
			on:click={login}
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
{/if}
{#if showRegister}
	<div
		id="registerDiv"
		in:fly={{ y: -600, duration: 350 }}
		out:fly={{ y: -200, duration: 200 }}
	>
		{#if registerError != ""}
			<div id="error">{registerError}</div>
		{/if}
		<h2>Registrace</h2>
		<span
			id="zavrit-prihlaseni"
			on:click={() => {
				showRegister = false;
			}}>X</span
		>
		<p id="create_account">
			nebo
			<u
				on:click={() => {
					showLogin = true;
					showRegister = false;
				}}>přihlásit se</u
			>
		</p>

		<p class="label">Email</p>
		<input type="text" id="email" bind:value={emailReg} />
		<p class="label">Přezdívka</p>
		<input type="text" id="prezdivka" bind:value={prezdivkaReg} />

		<p class="label">Heslo</p>
		<div id="register-heslo">
			<input type="password" id="passwordReg" bind:value={passwordReg} />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="26"
				height="15"
				viewBox="0 0 26 15"
				fill="none"
				on:click={() => {
					if (
						document.getElementById("passwordReg").type ==
						"password"
					) {
						document.getElementById("passwordReg").type = "text";
					} else {
						document.getElementById("passwordReg").type =
							"password";
					}
				}}
			>
				<path
					d="M1 7C7.91761 16.6462 18.0038 16.0151 25 7"
					stroke="#FF8A00"
					stroke-width="2"
				/>
				<path
					d="M25 8C18.0824 -1.6462 7.99622 -1.01513 1 8"
					stroke="#FF8A00"
					stroke-width="2"
				/>
				<circle
					cx="13"
					cy="7.5"
					r="3"
					stroke="#FF8A00"
					stroke-width="2"
				/>
			</svg>
		</div>

		<svg
			id="login-logo"
			xmlns="http://www.w3.org/2000/svg"
			width="82"
			height="82"
			viewBox="0 0 82 82"
			fill="none"
			on:click={() => {
				register();
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
{/if}
{#if showCode}
	<div
		id="codeDiv"
		in:fly={{ y: -600, duration: 350 }}
		out:fly={{ y: -200, duration: 200 }}
	>
		<h2>Ověření emailové adresy</h2>
		<p id="code-info">
			Poslali jsme ověřovací kód na tvou emailovou adresu, abychom se
			ujistili, že patří opravdu tobě.
		</p>
		<h3>Ověřovací kód</h3>
		<div id="input-code">
			<input
				type="text"
				id="code"
				bind:value={fiveDigit}
				placeholder="- - - - -"
				maxlength="5"
			/>
			<p id="acknowledgement">
				Může trvat až pět minut, než přijde ověřovací email. Pokud email
				přesto nepřijde, zkontroluj také spam.
			</p>
		</div>

		<svg
			id="login-logo"
			xmlns="http://www.w3.org/2000/svg"
			width="82"
			height="82"
			viewBox="0 0 82 82"
			fill="none"
			on:click={confirmEmail}
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
{/if}
{#if showForgot}
	<div
		id="loginDiv"
		in:fly={{ y: -600, duration: 350 }}
		out:fly={{ y: -200, duration: 200 }}
	>
		{#if error != ""}
			<div id="error">{error}</div>
		{/if}
		{#if success != ""}
			<div id="success">{success}</div>
		{/if}
		<h2>Zapomenuté heslo</h2>
		<span
			id="zavrit-prihlaseni"
			on:click={() => {
				showForgot = false;
			}}>X</span
		>

		<p class="label">Email nebo přezdívka</p>
		<input type="text" id="email" bind:value={email} />
		(Pokud Ti mail nepřišel, podívej se také do spamu. A pokud tam objevíš náš
		mail, musíš jej ze spamu vyjmout, abys mohl kliknout na odkaz.)

		<svg
			id="login-logo"
			xmlns="http://www.w3.org/2000/svg"
			width="82"
			height="82"
			viewBox="0 0 82 82"
			fill="none"
			on:click={forgotPassword}
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
{/if}

{#if showRegister || showLogin || showCode || showForgot}
	<div
		id="darkener"
		on:click={() => {
			showRegister = false;
			showLogin = false;
			showCode = false;
		}}
	/>
{/if}

<!-- PHONE NAV -->

<svg
	xmlns="http://www.w3.org/2000/svg"
	width="107"
	height="107"
	viewBox="0 0 107 107"
	fill="none"
	id="nav"
	on:click={() => {
		showNav = !showNav;
		showRegistrace = false;
		showPrihlaseni = false;
	}}
	style={showNav && "left: 50%; transform: translateX(-50%);bottom: 60px;"}
>
	<path
		d="M44.6832 6.40576C49.9405 2.5861 57.0595 2.5861 62.3168 6.40576L95.5648 30.5618C100.822 34.3815 103.022 41.152 101.014 47.3323L88.3142 86.4177C86.3061 92.598 80.5468 96.7824 74.0484 96.7824H32.9516C26.4532 96.7824 20.6939 92.598 18.6858 86.4177L5.98618 47.3323C3.97807 41.152 6.17794 34.3815 11.4353 30.5618L44.6832 6.40576Z"
		fill="#FF8A00"
	/>
	<path d="M35 43H71M35 54H71M35 65H71" stroke="white" stroke-width="3" />
</svg>
{#if showNav}
	<div
		id="mobile-nav"
		style={showNav &&
			"left: 50%; transform: translateX(-50%);bottom: 60px; animation: .3s appear;"}
	>
		<div>
			<a href="/kalendar" rel="prefetch">
				<span
					id="nav-text-1"
					on:click={() => {
						showNav = false;
					}}>Kalendář</span
				>
			</a>{#if !$isAuthenticated}
				<span
					id="nav-text-2"
					on:click={() => {
						showRegistrace = true;
						showNav = false;
					}}>Registrace</span
				>
			{:else}
				<span id="nav-text-2" on:click={logout}>Odhlásit&nbsp;se</span>
			{/if}
			<a href="/kontakt"
				><span
					id="nav-text-3"
					on:click={() => {
						showNav = false;
					}}>Kontakt</span
				></a
			>
			<a href="/o-nas" rel="preload"
				><span
					id="nav-text-4"
					on:click={() => {
						showNav = false;
					}}>O nás</span
				></a
			>
			{#if !$isAuthenticated}
				<span
					id="nav-text-5"
					on:click={() => {
						showPrihlaseni = true;
						showNav = false;
					}}>Přihlášení</span
				>
			{:else}<span id="nav-text-5">{$prezdivka}</span>{/if}
		</div>
	</div>
{/if}
{#if showPrihlaseni}
	<div id="login-phone" transition:fly={{ x: 500, duration: 500 }}>
		{#if error != ""}
			<div id="error">{error}</div>
		{/if}
		<h2>Přihlášení</h2>
		<span
			id="zavrit-prihlaseni-phone"
			on:click={() => {
				showPrihlaseni = false;
			}}>X</span
		>
		<p id="create_account-phone">
			nebo
			<u
				on:click={() => {
					showPrihlaseni = false;
					showRegistrace = true;
				}}>vytvoř účet</u
			>
		</p>

		<p class="label">Email</p>
		<input type="text" id="email" bind:value={email} />
		<p class="label">Heslo</p>
		<div id="login-heslo">
			<input type="password" id="password" bind:value={password} />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="26"
				height="15"
				viewBox="0 0 26 15"
				fill="none"
				style="cursor: pointer"
				on:click={() => {
					if (
						document.getElementById("password").type == "password"
					) {
						document.getElementById("password").type = "text";
					} else {
						document.getElementById("password").type = "password";
					}
				}}
			>
				<path
					d="M1 7C7.91761 16.6462 18.0038 16.0151 25 7"
					stroke="#FF8A00"
					stroke-width="2"
				/>
				<path
					d="M25 8C18.0824 -1.6462 7.99622 -1.01513 1 8"
					stroke="#FF8A00"
					stroke-width="2"
				/>
				<circle
					cx="13"
					cy="7.5"
					r="3"
					stroke="#FF8A00"
					stroke-width="2"
				/>
			</svg>
		</div>

		<u
			id="login-forgot-phone"
			on:click={() => {
				showZapomenuteHeslo = true;
				showPrihlaseni = false;
			}}>Zapomenuté heslo</u
		>
		<svg
			id="login-logo-phone"
			xmlns="http://www.w3.org/2000/svg"
			width="82"
			height="82"
			viewBox="0 0 82 82"
			fill="none"
			on:click={() => {
				login();
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
{/if}

{#if showRegistrace}
	<div id="registrace-phone" transition:fly={{ x: 500, duration: 500 }}>
		{#if registerError != ""}
			<div id="error">{registerError}</div>
		{/if}
		<h2>Registrace</h2>
		<span
			id="zavrit-prihlaseni-phone"
			on:click={() => {
				showRegistrace = false;
			}}>X</span
		>
		<p id="create_account">
			nebo
			<u
				on:click={() => {
					showPrihlaseni = true;
					showRegistrace = false;
				}}>přihlásit se</u
			>
		</p>

		<p class="label">Email</p>
		<input type="text" id="email" bind:value={emailReg} />
		<p class="label">Přezdívka</p>
		<input type="text" id="prezdivka" bind:value={prezdivkaReg} />

		<p class="label">Heslo</p>
		<div id="register-heslo">
			<input type="password" id="passwordReg" bind:value={passwordReg} />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="26"
				height="15"
				viewBox="0 0 26 15"
				fill="none"
				on:click={() => {
					if (
						document.getElementById("passwordReg").type ==
						"password"
					) {
						document.getElementById("passwordReg").type = "text";
					} else {
						document.getElementById("passwordReg").type =
							"password";
					}
				}}
			>
				<path
					d="M1 7C7.91761 16.6462 18.0038 16.0151 25 7"
					stroke="#FF8A00"
					stroke-width="2"
				/>
				<path
					d="M25 8C18.0824 -1.6462 7.99622 -1.01513 1 8"
					stroke="#FF8A00"
					stroke-width="2"
				/>
				<circle
					cx="13"
					cy="7.5"
					r="3"
					stroke="#FF8A00"
					stroke-width="2"
				/>
			</svg>
		</div>

		<svg
			id="login-logo-phone"
			xmlns="http://www.w3.org/2000/svg"
			width="82"
			height="82"
			viewBox="0 0 82 82"
			fill="none"
			on:click={() => {
				registerMobile();
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
{/if}

{#if showKod}
	<div id="login-phone" transition:fly={{ x: 500, duration: 500 }}>
		<h2>Jsi úspěšně přihlášen</h2>
		<span
			id="zavrit-prihlaseni-phone"
			on:click={() => {
				showKod = false;
			}}>X</span
		>

		<p id="code-info">
			Poslali jsme ověřovací kód na tvou emailovou adresu, abychom se
			ujistili, že patří opravdu tobě. Co nejdříve prosím klikni na odkaz
			uvedený v mailu.
		</p>

		<svg
			id="login-logo-phone"
			xmlns="http://www.w3.org/2000/svg"
			width="82"
			height="82"
			viewBox="0 0 82 82"
			fill="none"
			on:click={() => {
				showKod = false;
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
{/if}

{#if showZapomenuteHeslo}
	<div id="login-phone" transition:fly={{ x: 500, duration: 500 }}>
		<h2>Zapomenuté heslo</h2>
		<span
			id="zavrit-prihlaseni-phone"
			on:click={() => {
				showZapomenuteHeslo = false;
			}}>X</span
		>
		<p class="label">Email</p>
		<input type="text" id="email" bind:value={email} />
		(Pokud Ti mail nepřišel, podívej se také do spamu. A pokud tam objevíš náš
		mail, musíš jej ze spamu vyjmout, abys mohl kliknout na odkaz.)
		{#if showSendEmail}
			Poslali jsme mail na tvou emailovou adresu.
		{/if}

		<svg
			id="login-logo-phone"
			xmlns="http://www.w3.org/2000/svg"
			width="82"
			height="82"
			viewBox="0 0 82 82"
			fill="none"
			on:click={() => {
				showSendEmail = true;
				forgotPassword();
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
{/if}

{#if showNav || showPrihlaseni || showRegistrace || showKod || showZapomenuteHeslo}
	<div
		id="nav-bg"
		on:scroll={() => {
			showNav = false;
			showPrihlaseni = false;
			showRegistrace = false;
		}}
		on:click={() => {
			showNav = false;
			showPrihlaseni = false;
			showRegistrace = false;
			showKod = false;
		}}
	/>
{/if}

<style>
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		-webkit-box-shadow: 0 0 0 30px #ff8a00 inset !important;
		box-shadow: 0 0 0 30px #ff8a00 inset !important;
	}
	#header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}

	#header__logo-text {
		color: #333333;

		font-size: 30px;
		font-weight: 700;
		margin-left: 10px;

		vertical-align: middle;
		display: inline-block;
	}

	#header__logo-svg {
		vertical-align: middle;
		display: inline-block;
	}

	#header__navigation {
		color: #333333;
		font-size: 18px;
		font-weight: 500;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	#header__navigation span {
		transition: 0.1s;
		margin-left: 50px;
	}

	#header__navigation span:hover {
		color: #ff8a00;
	}

	hr {
		position: absolute;
		left: 0;
		top: 75px;
		border-right: 0;
		border-left: 0;
		width: 100%;
		border-top: thin solid #e4e4e4;
	}

	#login {
		cursor: pointer;
		transition: 0.15s;
	}
	#login span:hover {
		color: #333333;
	}

	#login span {
		color: #ff8a00;
		font-weight: 600;
		transition: 0.15s;
	}

	#registrace {
		width: 120px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		text-align: center;
		background-color: #ff8a00;
		margin-left: 50px;

		cursor: pointer;
		transition: 0.15s;

		border-radius: 5px;
	}
	#registrace:hover span {
		color: #ff8a00;
	}
	#registrace:hover {
		background-color: #ffffff;
	}

	#registrace span {
		margin-left: 0;
		color: #ffffff;
		font-weight: 600;
		font-size: 20px;
		transition: 0.15s;
	}

	#darkener {
		width: 100%;
		height: 100%;
		background: #333;
		opacity: 0.8;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
	}

	#error {
		position: absolute;
		top: 0;
		left: 0;
		width: calc(100% - 10px);
		background-color: #ff0f0f;
		color: #ffffff;
		padding-left: 10px;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;

		font-size: 18px;
		font-weight: 600;
	}

	#success {
		position: absolute;
		top: 0;
		left: 0;
		width: calc(100% - 10px);
		background-color: #5cb85c;
		color: #ffffff;
		padding-left: 10px;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;

		font-size: 18px;
		font-weight: 600;
	}

	#loginDiv {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);

		width: 30%;
		min-width: 340px;
		height: 45%;
		min-height: 400px;

		background-color: #ffffff;
		border: 0px solid #333333;
		border-radius: 5px;
		z-index: 10;

		padding: 50px;
		padding-right: 50px;
		padding-top: 40px;
	}

	#registerDiv {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);

		width: 30%;
		min-width: 340px;
		height: 55%;
		min-height: 500px;

		background-color: #ffffff;
		border: 0px solid #333333;
		border-radius: 5px;
		z-index: 10;

		padding: 50px;
		padding-right: 50px;
		padding-top: 40px;
	}

	h2 {
		color: #ff8a00;
		font-size: 38px;
		margin: 0;
	}

	#create_account {
		margin: 0;
		font-weight: 600;
		padding: 0;
		margin-bottom: 20px;
	}

	.label {
		font-size: 24px;
		font-weight: 600;
		margin-bottom: 5px;
	}

	input {
		width: calc(100% - 4px - 20px);
		border: 2px solid #ff8a00;
		border-radius: 5px;
		height: 30px;
		font-size: 16px;
		padding: 5px;
		padding-left: 10px;
	}

	u {
		cursor: pointer;
		transition: 0.15s;
	}
	u:hover {
		color: #ff8a00;
	}

	#login-logo {
		position: absolute;
		bottom: 40px;
		right: 50px;

		cursor: pointer;
	}
	#login-forgot {
		position: absolute;
		bottom: 40px;
		left: 50px;
	}

	#login-heslo {
		position: relative;
	}

	#login-heslo svg {
		position: absolute;
		right: 15px;
		top: 50%;
		transform: translateY(-50%);
	}

	#register-heslo {
		position: relative;
	}

	#register-heslo svg {
		position: absolute;
		right: 15px;
		top: 50%;
		transform: translateY(-50%);
	}

	#codeDiv {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);

		width: 30%;
		height: 40%;

		background-color: #ffffff;
		border: 0px solid #333333;
		border-radius: 5px;
		z-index: 10;

		padding: 50px;
		padding-right: 50px;
		padding-top: 40px;
	}

	#code-info {
		font-weight: 600;
		font-size: 18px;
		margin-top: 10px;
	}

	h3 {
		text-align: center;
		color: #333333;
		font-weight: 600;
		font-size: 24px;
	}

	#input-code {
		width: 50%;
		margin-left: 50%;
		transform: translateX(-50%);
	}

	#code {
		text-align: center;
		font-size: 35px;
		letter-spacing: 10px;
	}

	#acknowledgement {
		font-weight: 600;
		font-size: 12px;
		text-align: justify;
	}
	#zavrit-prihlaseni {
		position: absolute;
		right: 50px;
		top: 45px;

		color: #ff8a00;
		font-size: 30px;
		font-weight: 700;

		cursor: pointer;
	}

	/* Phone */

	#nav {
		display: none;

		position: fixed;
		padding: 10px;
		left: 10px;
		bottom: 0;

		z-index: 11;

		width: 65px;
		height: 65px;

		transition: 0.3s ease-in-out;

		cursor: pointer;
	}

	#nav-bg {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;

		z-index: 7;

		background: #333333;
		opacity: 0.95;

		animation: show 0.3s;
	}

	@keyframes show {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 0.95;
		}
	}
	#mobile-nav {
		width: 65px;
		position: fixed;
		padding: 10px;

		height: 65px;
		z-index: 10;
	}

	#mobile-nav div {
		position: relative;

		width: 100%;
		height: 100%;

		color: #ffffff;

		font-size: 24px;
		font-weight: 600;
	}

	#nav-text-1 {
		position: absolute;
		top: -50px;
		transform: translateX(-50%);
		left: 50%;
		color: #ffffff;
	}
	#nav-text-2 {
		position: absolute;
		left: 80px;
		top: 0px;
		color: #ffffff;
		word-wrap: none;
	}
	#nav-text-3 {
		position: absolute;
		bottom: -30px;
		right: -80px;
		color: #ffffff;
	}
	#nav-text-4 {
		position: absolute;
		bottom: -30px;
		left: -60px;
		color: #ffffff;
	}
	#nav-text-5 {
		position: absolute;
		top: 0px;
		right: 80px;
		color: #ffffff;
	}

	@keyframes appear {
		0% {
			opacity: 0;
		}
		99% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	/* prihlaseni*/

	#login-phone {
		position: fixed;
		width: 85%;
		height: 50%;
		min-height: 440px;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		z-index: 11;

		border-radius: 5px;
		transition: 0.15s;
		background-color: #ffffff;

		padding-left: 20px;
		padding-right: 20px;
		padding-top: 10px;
	}

	#registrace-phone {
		position: fixed;
		width: 85%;
		height: 50%;
		min-height: 530px;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		z-index: 11;

		border-radius: 5px;
		transition: 0.15s;
		background-color: #ffffff;

		padding-left: 20px;
		padding-right: 20px;
		padding-top: 10px;
	}

	#create_account-phone {
		margin: 0;
		font-weight: 600;
		padding: 0;
		margin-bottom: 20px;
	}

	#login-logo-phone {
		position: absolute;
		bottom: 10px;
		right: 10px;

		width: 70px;
		padding: 10px;

		cursor: pointer;
	}
	#login-forgot-phone {
		position: absolute;
		bottom: 40px;
		left: 20px;
	}

	#zavrit-prihlaseni-phone {
		position: absolute;
		right: 20px;
		top: 10px;

		color: #ff8a00;
		font-size: 30px;
		font-weight: 700;
	}

	@media (max-width: 1450px) {
		#header__navigation {
			font-size: 1.4vw;
		}
		#registrace {
			width: 120px;
			height: 40px;
			margin-left: 35px;
			line-height: 40px;
		}
		#header__navigation #registrace span {
			font-size: 20px;
			margin-left: 0px;
		}
		#logo-text-wrapper {
			min-width: 280px;
		}

		#header__navigation span {
			margin-left: 35px;
		}
	}
	@media (max-width: 1000px) {
		#header__navigation {
			font-size: 1.4vw;
		}
		#header__navigation #registrace span {
			font-size: 1.6vw;
		}
		#registrace {
			width: 80px;
			height: 30px;
			margin-left: 20px;
			line-height: 30px;
		}
		#domu {
			display: none;
		}
		#header__navigation span {
			margin-left: 20px;
		}
	}
	@media only screen and (max-width: 680px) {
		#header {
			justify-content: center;
			margin-left: 0px;
			margin-right: 0px;
			margin-bottom: 0px;
			margin-top: 5px;
		}
		#header__navigation {
			display: none !important;
		}
		svg {
			width: 38px;
		}
		#header__logo-text {
			font-size: 26px;
		}
		hr {
			position: absolute;
			left: 0;
			top: auto;
			width: 100%;
			display: inline;
			border-top: thin solid #e0e0e0;
			border-right: 0;
			border-left: 0;
		}

		#nav {
			display: inline;
		}
	}
	#login-phone #input-code {
		width: 100%;
	}
</style>
