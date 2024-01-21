<script lang="ts">
	import type { ChallengeType } from '../../../types/challenge';
	import type { PageData } from './$types';
	
	export let data: PageData;
    const challenge = data.challenge;
    
    let title = challenge?.title ?? "";
    let description = challenge?.desc ?? "";

    let type: ChallengeType = challenge?.type ?? 'single';

    let multiNum = challenge?.type === 'multi' ? challenge.num : 2;
</script>

<h1>Edit: <em>{title || "Untitled Challenge"}</em></h1>

Title:
<input type="text" bind:value={title} />

Description:
<textarea bind:value={description}></textarea>

Completion Type:
<select bind:value={type}>
    <option value="single">Single (one and done)</option>
    <option value="multi">Multi-Part</option>
    <option value="unlimited">Unlimited (no upper bound)</option>
</select>

{#if type === "multi"}
<p>Number of Parts: <input bind:value={multiNum} type="number" min="2" step="1" /></p>
{/if}

<button>Save</button>
