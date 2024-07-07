<script lang="ts">
	import '../../app.css';
	import { setAuthContext } from '@/auth/auth.svelte';
	import AuthButton from '@/auth/auth-button.svelte';

	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import Navbar from './navbar.svelte';

	const {
		children,
		data,
	}: {
		children: Snippet<[]>;
		data: LayoutData;
	} = $props();


	const auth = setAuthContext();
</script>

{#if auth.isSynced}
	<Navbar />
	{@render children()}
{:else}
	<div>Loading...</div>
{/if}

<style></style>
