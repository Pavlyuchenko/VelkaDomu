<script>
	export let clanek;
</script>

{#if clanek}
	<article>
		<a
			href={"/clanek/" +
				clanek.titulek
					.replace(/\s+/g, "-")
					.replace(".", "")
					.replace(",", "")
					.replace('"', "")
					.replace("'", "")
					.replace(":", "")
					.replace("?", "")
					.replace("/", "")
					.replace("?", "")
					.toLowerCase() +
				"/" +
				clanek.id}
		>
			<div class="article__image-container">
				<img
					src={"https://ik.imagekit.io/velkadomu/tr:h-300,w-550" +
						clanek.obrazek}
					alt={clanek.titulek}
					class="article__image"
				/>
				<div class="article__linear-gradient" />
				<h2 class="aritcle__titulek">{clanek.titulek}</h2>
				<div class="article__autor">
					{#if clanek.logo == "VelkaDomu"}
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
							src={"https://ik.imagekit.io/velkadomu/tr:h-50,w-50" +
								clanek.logo}
							alt="Logo jiného portálu"
							class="logo"
						/>
					{/if}
					<span>&nbsp;{clanek.autor}</span>
				</div>
				<div class="article__datum"><span>{clanek.datum}</span></div>
			</div>
		</a>
	</article>
{/if}

<style>
	article {
		width: 100%;
		margin-top: 10px;
	}
	article:nth-child(1) {
		margin-top: 30px;
	}
	.article__image-container {
		position: relative;
		transition: 0.3s;
	}
	.article__image {
		object-fit: cover;
		width: 100%;
		height: 50vw;
		min-height: 100px;

		border-radius: 5px;
	}

	.article__linear-gradient {
		background: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0) 0%,
			rgba(39, 39, 39, 1) 100%
		);
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 50vw;
		min-height: 100px;
		border-radius: 5px;
	}

	.aritcle__titulek {
		position: absolute;
		bottom: 45px;
		left: calc(1vw + 10px);
		right: calc(1vw + 10px);

		color: #ffffff;
		font-size: calc(1vw + 8px);
		font-weight: 700;

		z-index: 2;

		margin: 0;
		padding: 0;
		font-size: 5vw;
	}
	.article__autor {
		position: absolute;
		bottom: 15px;
		left: calc(1vw + 10px);
	}
	svg {
		vertical-align: middle;
		display: inline-block;
	}
	.logo {
		vertical-align: middle;
		display: inline-block;
		width: 23px;
	}
	span {
		color: #ffffff;
		vertical-align: middle;
		display: inline-block;
		font-weight: 600;
		font-size: 14px;
	}
	.article__datum span {
		position: absolute;
		bottom: 15px;
		right: calc(1vw + 10px);
		font-weight: 400;
	}
</style>
