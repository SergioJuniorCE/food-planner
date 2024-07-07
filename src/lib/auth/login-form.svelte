<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '@/components/ui/label';
	import { Button } from '@/components/ui/button';
	import { getAuthContext } from './auth.svelte';
	import { toast } from 'svelte-sonner';
	import type { ButtonEventHandler } from 'bits-ui';

	const auth = getAuthContext();

	let email = $state('');
	let password = $state('');

	async function handleSubmit(event: SubmitEvent | ButtonEventHandler<MouseEvent>) {
		event.preventDefault();
		try {
			await auth.loginWithEmailAndPassword({
				email: email,
				password: password,
			});
			toast.success('Successfully registered');
		} catch (error: any) {
			toast.error(error.message);
		}
	}
</script>

<form class="flex flex-col gap-2" onsubmit={handleSubmit}>
	<div>
		<Label>Email</Label>
		<Input name="email" placeholder="Email" bind:value={email} />
	</div>
	<div>
		<Label>Password</Label>
		<Input name="password" placeholder="Password" type="password" bind:value={password} />
	</div>
	<Button type="submit" on:click={handleSubmit}>Submit</Button>
</form>
