<script lang="ts">
	import type { TT3PublicChallengeDefinition } from '../../../types/tt3/challenge';
	import type { TT3DashboardPassthroughInfo } from '../../../types/tt3/map';
	import ChallengeBtns from '../challengeBtns/challengeBtns.svelte';

	import MapDest from './mapDest.svelte';
	import MapLine from './mapLine.svelte';

	export let dashboardInfo: TT3DashboardPassthroughInfo;
	export let openCallback: (c: TT3PublicChallengeDefinition) => void;

	const inlineProps = { t: 'inline' as const, openCallback };
</script>

<section>
	<div style="grid-row: 1; grid-column: 2;"><MapDest title="Northgate" /></div>

	<div style="grid-row: 2; grid-column: 1;">
		<MapLine dir="arcleft" mapPos={1} mapInfo={inlineProps} {dashboardInfo} />
	</div>
	<div style="grid-row: 2; grid-column: 3;">
		<MapLine dir="arcright" mapPos={1.5} mapInfo={inlineProps} {dashboardInfo} />
	</div>

	<div style="grid-row: 3; grid-column: 2;"><MapDest title="Roosevelt" /></div>

	<div style="grid-row: 4; grid-column: 2;">
		<MapLine dir="short" mapPos={2} mapInfo={{ t: 'before' }} {dashboardInfo} />
	</div>
	<div style="grid-row: 5; grid-column: 2;" class="btnWrap">
		<ChallengeBtns {dashboardInfo} {openCallback} mapPos={2} />
	</div>

	<div style="grid-row: 6; grid-column: 1;">
		<MapLine dir="left" mapPos={2} mapInfo={{ t: 'after' }} {dashboardInfo} />
	</div>
	<div style="grid-row: 7; grid-column: 1;"><MapDest title="Seattle Center" /></div>
	<div style="grid-row: 8; grid-column: 1;">
		<MapLine dir="vert" mapPos={5} mapInfo={inlineProps} {dashboardInfo} />
	</div>
	<div style="grid-row: 9; grid-column: 1;">
		<MapLine dir="dot" mapPos={5} mapInfo={{ t: 'after' }} {dashboardInfo} />
	</div>
	<div style="grid-row: 10; grid-column: 2;">
		<MapLine dir="right" mapPos={5} mapInfo={{ t: 'after' }} {dashboardInfo} />
	</div>

	<div style="grid-row: 6; grid-column: 3;">
		<MapLine dir="right" mapPos={2} mapInfo={{ t: 'after' }} {dashboardInfo} />
	</div>
	<div style="grid-row: 7; grid-column: 3;"><MapDest title="University District" /></div>
	<div style="grid-row: 8; grid-column: 3;">
		<MapLine dir="vert" mapPos={3} mapInfo={inlineProps} {dashboardInfo} />
	</div>
	<div style="grid-row: 9; grid-column: 3;"><MapDest title="UW" /></div>
	<div style="grid-row: 10; grid-column: 2;">
		<MapLine dir="left" mapPos={4} mapInfo={inlineProps} {dashboardInfo} />
	</div>

	<div style="grid-row: 11; grid-column: 2;"><MapDest title="Capitol Hill" /></div>

	<div style="grid-row: 12; grid-column: 1;">
		<MapLine dir="left" mapPos={7} mapInfo={inlineProps} {dashboardInfo} />
	</div>
	<div style="grid-row: 13; grid-column: 1;"><MapDest title="University Street" /></div>
	<div style="grid-row: 14; grid-column: 2;">
		<MapLine dir="right" mapPos={8} mapInfo={inlineProps} {dashboardInfo} />
	</div>

	<div style="grid-row: 12; grid-column: 3;">
		<MapLine dir="right" mapPos={6} mapInfo={inlineProps} {dashboardInfo} />
	</div>
	<div style="grid-row: 13; grid-column: 3;">
		<MapLine dir="dot" mapPos={6} mapInfo={{ t: 'after' }} {dashboardInfo} />
	</div>
	<div style="grid-row: 14; grid-column: 2;">
		<MapLine dir="left" mapPos={6} mapInfo={{ t: 'after' }} {dashboardInfo} />
	</div>

	<div style="grid-row: 15; grid-column: 2;"><MapDest title="Pioneer Square" /></div>
	<div style="grid-row: 16; grid-column: 2;">
		<MapLine dir="vert" mapPos={9} mapInfo={inlineProps} {dashboardInfo} />
	</div>
	<div style="grid-row: 17; grid-column: 2;"><MapDest title="Chinatown" /></div>
	<div style="grid-row: 18; grid-column: 2;">
		<MapLine dir="vert" mapPos={10} mapInfo={inlineProps} {dashboardInfo} />
	</div>
	<div style="grid-row: 19; grid-column: 2;"><MapDest title="Hing Hay Park" /></div>
</section>

<style>
	section {
		width: 300px;

		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 30px 100px 30px 30px;
		grid-auto-rows: 30px 100px;
		margin-top: 10px;
		margin-bottom: 50px;
	}

	.btnWrap {
		position: relative;
		left: -35px;
		top: -10px;
		z-index: 2;
	}
</style>
