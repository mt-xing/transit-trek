<script lang="ts">
	import type { PublicChallengeDefinition } from '../../types/challenge';
	import type { ChallengeProgress } from '../../types/team';

	import ChallengeBtns from '../challengeBtns/challengeBtns.svelte';
	import MapDest from './mapDest.svelte';
	import MapLine from './mapLine.svelte';

	export let allChallenges: PublicChallengeDefinition[];
	export let challengeProgress: ChallengeProgress;
	export let openCallback: (c: PublicChallengeDefinition) => void;

	const inlineProps = { t: 'inline' as const, allChallenges, challengeProgress, openCallback };
</script>

<section>
	<div style="grid-row: 1; grid-column: 2;"><MapDest title="Northgate" /></div>
	<div style="grid-row: 2; grid-column: 2;">
		<MapLine dir="vert" mapPos={1} mapInfo={inlineProps} />
	</div>
	<div style="grid-row: 3; grid-column: 2;"><MapDest title="Roosevelt" /></div>
	<div style="grid-row: 4; grid-column: 2;">
		<MapLine dir="vert" mapPos={2} mapInfo={inlineProps} />
	</div>

	<div style="grid-row: 6; grid-column: 1;">
		<MapLine dir="left" mapPos={2} mapInfo={{ t: 'after' }} />
	</div>
	<div style="grid-row: 7; grid-column: 1;"><MapDest title="Seattle Center" /></div>
	<div style="grid-row: 8; grid-column: 1;">
		<MapLine dir="vert" mapPos={5} mapInfo={inlineProps} />
	</div>
	<div style="grid-row: 10; grid-column: 2;">
		<MapLine dir="right" mapPos={5} mapInfo={{ t: 'after' }} />
	</div>

	<div style="grid-row: 6; grid-column: 3;">
		<MapLine dir="right" mapPos={2} mapInfo={{ t: 'after' }} />
	</div>
	<div style="grid-row: 7; grid-column: 3;"><MapDest title="University District" /></div>
	<div style="grid-row: 8; grid-column: 3;">
		<MapLine dir="vert" mapPos={3} mapInfo={inlineProps} />
	</div>
	<div style="grid-row: 9; grid-column: 3;"><MapDest title="UW" /></div>
	<div style="grid-row: 10; grid-column: 2;">
		<MapLine dir="left" mapPos={4} mapInfo={inlineProps} />
	</div>

	<div style="grid-row: 11; grid-column: 2;"><MapDest title="Capitol Hill" /></div>

	<div style="grid-row: 12; grid-column: 1;">
		<MapLine dir="left" mapPos={7} mapInfo={inlineProps} />
	</div>
	<div style="grid-row: 13; grid-column: 1;"><MapDest title="University Street" /></div>
	<div style="grid-row: 14; grid-column: 2;">
		<MapLine dir="right" mapPos={8} mapInfo={inlineProps} />
	</div>

	<div style="grid-row: 12; grid-column: 3;">
		<MapLine dir="right" mapPos={6} mapInfo={inlineProps} />
	</div>
	<div style="grid-row: 14; grid-column: 2;">
		<MapLine dir="left" mapPos={6} mapInfo={{ t: 'after' }} />
	</div>

	<div style="grid-row: 15; grid-column: 2;"><MapDest title="Pioneer Square" /></div>
	<div style="grid-row: 16; grid-column: 2;">
		<MapLine dir="vert" mapPos={9} mapInfo={inlineProps} />
	</div>
	<div style="grid-row: 17; grid-column: 2;"><MapDest title="Chinatown" /></div>
	<div style="grid-row: 18; grid-column: 2;">
		<MapLine dir="vert" mapPos={10} mapInfo={inlineProps} />
	</div>
	<div style="grid-row: 19; grid-column: 2;"><MapDest title="Hing Hay Park" /></div>
</section>

<ChallengeBtns {allChallenges} {challengeProgress} {openCallback} mapPos={99} />

<style>
	section {
		width: 300px;

		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-auto-rows: 30px 100px;
	}
</style>
