<script lang="ts">
	import {
		iterateEtt1Categories,
		ett1ChallengeCategoryNames,
		type ETT1ChallengeType,
	} from '../../../../../types/ett1/challenge';
	import type { PageData } from './$types';

	export let data: PageData;
	const { challenge } = data;

	let title = challenge?.title ?? '';
	let description = challenge?.desc ?? '';
	let points = challenge?.points ?? 0;
	let category = challenge?.category ?? 'selfie';
	let privateNotes = challenge?.privateNotes ?? '';

	let bonusEnabled = (challenge?.bonus ?? 0) > 0;
	let bonusAmount = challenge?.bonus ?? 1;

	let type: ETT1ChallengeType = challenge?.type ?? 'single';

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

	let deleteString = '';
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
		Points Awarded for Completion (can be negative):
		<input type="number" bind:value={points} name="points" step="any" />
	</p>

	<p>
		Bonus:
		<input type="checkbox" bind:checked={bonusEnabled} name="bonusEnabled" />
	</p>

	{#if bonusEnabled}
		<p>
			Bonus Amount:
			<input type="number" bind:value={bonusAmount} name="bonusAmount" step="any" />
		</p>
	{/if}

	<p>
		Challenge Category:
		<select bind:value={category} name="category">
			{#each iterateEtt1Categories(ett1ChallengeCategoryNames) as categoryName}
				<option value={categoryName}>{ett1ChallengeCategoryNames[categoryName]}</option>
			{/each}
		</select>
	</p>

	<p>
		Private Notes:
		<textarea bind:value={privateNotes} name="privateNotes"></textarea>
	</p>

	<p>
		Completion Type:
		<select bind:value={type} name="type">
			<option value="single">Single (one and done)</option>
			<option value="multi">Multi-Part</option>
			<option value="repeat">Unlimited Repeat</option>
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

	<button>Save</button>
</form>

<a href="/admin/ett1/challenges">Discard and Return</a>

<div>
	<h2>Danger Zone</h2>
	<p>
		Delete this challenge by typing the first five characters of the ID in the box: <code
			>{challenge?.id.substring(0, 5)}</code
		>
	</p>
	<form action="/admin/ett1/challenges/edit/deleteDanger" method="POST">
		<input type="hidden" value={challenge?.id ?? ''} name="id" />
		<p><input type="text" bind:value={deleteString} maxlength="5" name="sanityString" /></p>
		<p>
			<button disabled={deleteString !== (challenge?.id.substring(0, 5) ?? '99999')}>DELETE</button>
		</p>
	</form>
</div>

<style>
	textarea {
		min-width: 400px;
		min-height: 10em;
	}
</style>
