<script lang="ts">
	import '../../app.css';
	import { setAuthContext } from '@/auth/auth.svelte';
	import AuthButton from '@/auth/auth-button.svelte';

	import type { Snippet } from 'svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { RegisterSchema } from '@/auth/schema';
	import type { LayoutData } from './$types';

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
	<header>
		<nav class="flex items-center justify-between">
			<div>
				<a href="/">Home</a>
				<a href="/about">About</a>
			</div>
			<div>
				<AuthButton {auth} registerData={data.registerForm} />
			</div>
		</nav>
	</header>
	{@render children()}
{:else}
	<div>Loading...</div>
{/if}

<style></style>
