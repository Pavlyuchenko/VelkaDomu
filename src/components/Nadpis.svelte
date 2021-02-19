<script>
	export let text;
</script>

<div class="nadpis">
	<h2>{text}</h2>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="28"
		height="3"
		viewBox="0 0 28 3"
		fill="none"
	>
		<rect width="28" height="3" fill="#FF8A00" />
	</svg>
</div>

<style>
	.nadpis {
		text-align: center;
		margin-bottom: 40px;
		margin-top: 0;
	}

	h2 {
		margin-top: 0;
		margin-bottom: -15px;
		padding: 0;

		font-size: 32px;
	}

	@media only screen and (max-width: 680px) {
		h2 {
			font-size: 22px;
		}
		.nadpis {
			margin-bottom: 20px;
		}
	}
</style>
