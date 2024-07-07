<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '@/components/ui/label';
	import { Button } from '@/components/ui/button';
	import { getAuthContext } from './auth.svelte';
	import { toast } from 'svelte-sonner';

	const auth = getAuthContext();

	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');

	async function handleSubmit() {
		try {
			await auth.register({
				email: email,
				password: password,
				confirmPassword: confirmPassword
			});
			toast.success('Successfully registered');
		} catch (error: any) {
			toast.error(error.message);
		}
	}
</script>

<form class="flex flex-col gap-2">
	<div>
		<Label>Email</Label>
		<Input name="email" placeholder="Email" bind:value={email} />
	</div>
	<div>
		<Label>Password</Label>
		<Input name="password" placeholder="Password" type="password" bind:value={password} />
	</div>
	<div>
		<Label>Confirm Password</Label>
		<Input name="confirmPassword" placeholder="Confirm Password" type="password" bind:value={confirmPassword} />
	</div>
	<Button type="submit" on:click={handleSubmit}>Submit</Button>
</form>
