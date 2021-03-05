<script>
	export let clanek = {
		logo: "/placeholder_OBwhc9BIH2pIr.png",
	};
</script>

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
		<img
			class="article__image"
			src={"https://ik.imagekit.io/velkadomu/tr:h-75,w-150" +
				clanek.obrazek}
			alt={clanek.titulek}
		/>
	</a>

	<div class="article__info-container">
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
			<h3 class="article__info-title">{clanek.titulek}</h3>
		</a>
		<span class="article__info-info"
			>{#if clanek.logo == "VelkaDomu"}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
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
					src={"https://ik.imagekit.io/velkadomu/tr:h-23,w-23" +
						clanek.logo}
					alt="Logo jiného portálu"
					class="logo"
				/>
			{/if}
			<span class="autor">&nbsp;{clanek.autor}</span>
			&nbsp;
		</span>
		<span class="datum"> {clanek.datum} </span>
	</div>
</article>

<style>
	article {
		display: flex;
		margin-bottom: 30px;
	}

	.article__image {
		object-fit: cover;
		border-radius: 3px;
		width: 130px;
		height: 75px;
		margin-right: 10px;
	}
	.article__info-container {
		position: relative;
	}
	.article__info-title {
		margin: 0;
		font-weight: 700;
		text-align: justify;
		font-size: calc(2vw + 6px);
		line-height: 4vw;
	}

	.article__info-info {
		position: absolute;
		bottom: 0;
		font-size: 12px;
	}

	.article__info-stitek {
		font-weight: 700;
		cursor: pointer;
		vertical-align: middle;
		display: inline-block;
	}

	svg {
		vertical-align: middle;
		display: inline-block;
	}
	.logo {
		vertical-align: middle;
		display: inline-block;
		width: 18px;
	}
	.autor {
		vertical-align: middle;
		display: inline-block;
	}
	.datum {
		position: absolute;
		right: 0;
		bottom: 0;
		vertical-align: middle;
		display: inline-block;
		font-size: 12px;
	}
</style>
