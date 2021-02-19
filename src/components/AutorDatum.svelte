<script>
	export let jmeno;
	export let datum;
</script>

<div>
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
	<span id="autor">{jmeno}</span>
	<span itemprop="datePublished" datetime="2015-11-30T12:00:00Z" id="datum"
		>{datum}</span
	>
</div>

<style>
	svg {
		vertical-align: middle;
		display: inline-block;
	}
	span {
		vertical-align: middle;
		display: inline-block;
	}
	#autor {
		margin-left: 5px;
		transition: 0.15s;
	}
	#datum {
		margin-left: 15px;
		color: #666666;
	}
	@media (max-width: 1350px) {
		svg {
			width: 1.6vw;
		}
		#autor {
			font-size: 1.2vw;
		}
		#datum {
			font-size: 1vw;
		}
	}
</style>
