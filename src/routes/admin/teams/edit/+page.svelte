<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { team } = data;

	if (!team) {
		throw new Error();
	}

	let { teamNum, name } = team;
	const { secret, id } = team;

	let rotateString = '';
	let deleteString = '';
</script>

<h1>Edit: <em>Team {teamNum} - {name || 'Untitled Team'}</em></h1>

<form method="POST">
	<p>
		Name:
		<input type="text" bind:value={name} name="name" />
	</p>

	<p>
		Team Num:
		<input type="number" bind:value={teamNum} name="teamNum" step="1" />
	</p>

	<p>
		Secret GUID (<strong>not</strong> the ID):
		<code>{secret}</code>
	</p>

	<button>Save</button>
</form>

<a href="/admin/teams">Discard and Return</a>

<div>
	<h2>Rotate Secret</h2>
	<p>
		Rotate this team's secret by typing the first three characters of the ID in the box: <code
			>{id.substring(0, 3)}</code
		>
	</p>
	<form action="/admin/teams/edit/rotateSecret" method="POST">
		<input type="hidden" value={id} name="id" />
		<p><input type="text" bind:value={rotateString} maxlength="3" name="sanityString" /></p>
		<p>
			<button disabled={rotateString !== (id.substring(0, 3) ?? '9999999999')}>ROTATE</button>
		</p>
	</form>
</div>
<div style="background: red; margin-top: 100px; color: white;">
	<h2>DANGER ZONE: Delete</h2>
	<p>
		Delete this team by typing the first five characters of the ID in the box: <code
			>{id.substring(0, 5)}</code
		>
	</p>
	<form action="/admin/teams/edit/deleteDanger" method="POST">
		<input type="hidden" value={id} name="id" />
		<p><input type="text" bind:value={deleteString} maxlength="5" name="sanityString" /></p>
		<p>
			<button disabled={deleteString !== (id.substring(0, 5) ?? '99999')}>DELETE</button>
		</p>
	</form>
</div>
