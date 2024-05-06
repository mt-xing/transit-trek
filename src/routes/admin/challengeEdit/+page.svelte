<script lang="ts">
	import type { ChallengeType } from '../../../types/challenge';
	import type { PageData } from './$types';

	export let data: PageData;
	const { challenge } = data;

	let title = challenge?.title ?? '';
	let description = challenge?.desc ?? '';
	let rewardDescription = challenge?.rewardDesc ?? '';
	let privateNotes = challenge?.privateNotes ?? '';

	let mapPos = challenge?.mapPos ?? 0;

	let unlockMapPos = challenge?.unlockMapPos ? challenge.unlockMapPos.join(',') : undefined;
	function handleChangeGate() {
		if (unlockMapPos === undefined) {
			unlockMapPos = '0';
		} else {
			unlockMapPos = undefined;
		}
	}

	let type: ChallengeType = challenge?.type ?? 'single';

	let multiPartDescs = challenge?.type === 'multi' ? challenge.partDescs : ['', ''];
	function changeMultiParts(event: Event) {
		if (type !== 'multi') {
			return;
		}
		const num = parseInt((event.target as HTMLInputElement).value, 10);
		if (num < multiPartDescs.length) {
			multiPartDescs.length = num;
		} else {
			for (let i = multiPartDescs.length; i < num; i++) {
				multiPartDescs.push('');
				multiPartDescs = multiPartDescs;
			}
		}
	}

	let subtaskMapPos = challenge?.type === 'subtask' ? challenge.subtaskInfo.mapPos : 0;
	let subtaskMin = challenge?.type === 'subtask' ? challenge.subtaskInfo.minRequired : 0;
</script>

<h1>Edit: <em>{title || 'Untitled Challenge'}</em></h1>

<form method="POST">
	<p>
		Title:
		<input type="text" bind:value={title} name="title" />
	</p>

	<p>
		Description:
		<textarea bind:value={description} name="desc"></textarea>
	</p>

	<p>
		Reward Description:
		<textarea bind:value={rewardDescription} name="rewardDesc"></textarea>
	</p>

	<p>
		Private Notes:
		<textarea bind:value={privateNotes} name="privateNotes"></textarea>
	</p>

	<p>
		Map Position (multiple challenges can have the same position):
		<input type="number" bind:value={mapPos} name="mapPos" step="any" />
	</p>

	<p>
		<label>
			Is this challenge gated behind another?
			<input
				type="checkbox"
				checked={unlockMapPos !== undefined}
				on:click={handleChangeGate}
				name="unlockMapPosActive"
			/>
		</label>
	</p>
	{#if unlockMapPos !== undefined}
		<p>
			Map Position of previous challenge (comma separated if more than one): <input
				bind:value={unlockMapPos}
				type="text"
				name="unlockMapPos"
			/>
		</p>
	{/if}

	<p>
		Completion Type:
		<select bind:value={type} name="type">
			<option value="single">Single (one and done)</option>
			<option value="multi">Multi-Part</option>
			<option value="unlimited">Unlimited (no upper bound)</option>
			<option value="subtask">Subtasks</option>
		</select>
	</p>

	{#if type === 'multi'}
		<p>
			Number of Parts: <input
				value={multiPartDescs.length}
				on:change={changeMultiParts}
				type="number"
				min="2"
				step="1"
				name="partDescsLength"
			/>
		</p>
		<ol>
			{#each multiPartDescs as _desc, i}
				<li><input type="text" bind:value={multiPartDescs[i]} name={`partDescs${i}`} /></li>
			{/each}
		</ol>
	{/if}

	{#if type === 'subtask'}
		<p>
			Subtasks map position: <input
				bind:value={subtaskMapPos}
				type="number"
				name="subtaskMapPos"
				step="any"
			/>
		</p>
		<p>
			Number of subtasks required for completion: <input
				bind:value={subtaskMin}
				type="number"
				min="1"
				step="1"
				name="subtaskMinRequired"
			/>
		</p>
	{/if}

	<button>Save</button>
</form>

<a href="/admin/challenges">Discard and Return</a>

<style>
	textarea {
		min-width: 400px;
		min-height: 10em;
	}
</style>
