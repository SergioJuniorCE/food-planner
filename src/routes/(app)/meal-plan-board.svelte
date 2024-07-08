<script lang="ts">
	// This is done in a single file for clarity. A more factored version here: https://svelte.dev/repl/288f827275db4054b23c437a572234f6?version=3.38.2
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { pb } from '@/pocketbase';
	import { onMount } from 'svelte';

	onMount(async () => {
		const records = await pb.collection('meals').getFullList({
			sort: '-created'
		});
		console.log(records);
	});

	let columnItems = $state([
		{
			id: 1,
			name: 'TODO',
			items: [
				{ id: 41, name: 'item41' },
				{ id: 42, name: 'item42' },
				{ id: 43, name: 'item43' },
				{ id: 44, name: 'item44' },
				{ id: 45, name: 'item45' },
				{ id: 46, name: 'item46' },
				{ id: 47, name: 'item47' },
				{ id: 48, name: 'item48' },
				{ id: 49, name: 'item49' }
			]
		},
		{
			id: 2,
			name: 'DOING',
			items: []
		},
		{
			id: 3,
			name: 'DONE',
			items: []
		}
	]);

	const flipDurationMs = 200;
	function handleDndConsiderColumns(e: any) {
		columnItems = e.detail.items;
	}
	function handleDndFinalizeColumns(e: any) {
		columnItems = e.detail.items;
	}
	function handleDndConsiderCards(cid: number, e: any) {
		const colIdx = columnItems.findIndex((c) => c.id === cid);
		columnItems[colIdx].items = e.detail.items;
		columnItems = [...columnItems];
	}
	function handleDndFinalizeCards(cid: number, e: any) {
		const colIdx = columnItems.findIndex((c) => c.id === cid);
		columnItems[colIdx].items = e.detail.items;
		columnItems = [...columnItems];
	}
	function handleClick(e: any) {
		alert('dragabble elements are still clickable :)');
	}
</script>

<section
	class="mb-10 h-[80vh] w-full grid-cols-5 gap-3"
	use:dndzone={{ items: columnItems, flipDurationMs, type: 'columns' }}
	onconsider={handleDndConsiderColumns}
	onfinalize={handleDndFinalizeColumns}
>
	{#each columnItems as column (column.id)}
		<div
			class="float-left h-full w-full min-w-64 max-w-64 flex-grow overflow-y-hidden border-[1px] border-gray-400 p-2"
			animate:flip={{ duration: flipDurationMs }}
		>
			<div class="column-title">{column.name}</div>
			<div
				class="column-content"
				use:dndzone={{ items: column.items, flipDurationMs }}
				onconsider={(e) => handleDndConsiderCards(column.id, e)}
				onfinalize={(e) => handleDndFinalizeCards(column.id, e)}
			>
				{#each column.items as item (item.id)}
					<button class="card" animate:flip={{ duration: flipDurationMs }} onclick={handleClick}>
						{item.name}
					</button>
				{/each}
			</div>
		</div>
	{/each}
</section>

<style>
	.column-content {
		height: 100%;
		/* Notice that the scroll container needs to be the dndzone if you want dragging near the edge to trigger scrolling */
		overflow-y: scroll;
	}
	.column-title {
		margin-bottom: 1em;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.card {
		height: 15%;
		width: 100%;
		margin: 0.4em 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #dddddd;
		border: 1px solid #333333;
	}
</style>
