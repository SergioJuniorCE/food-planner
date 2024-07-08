<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { getAuthContext } from '@/auth/auth.svelte';
	import { Button } from '../components/ui/button';
	import * as Tabs from '$lib/components/ui/tabs';

	import RegisterForm from './register-form.svelte';
	import { User } from 'lucide-svelte';
	import LoginForm from './login-form.svelte';

	let {
		auth
	}: {
		auth: ReturnType<typeof getAuthContext>;
	} = $props();

</script>

<DropdownMenu.Root>
	{#if auth.user}
		<DropdownMenu.Trigger><User /></DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.Label>My Account</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>Profile</DropdownMenu.Item>
				<DropdownMenu.Item>Billing</DropdownMenu.Item>
				<DropdownMenu.Item>Team</DropdownMenu.Item>
				<DropdownMenu.Item>Subscription</DropdownMenu.Item>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	{:else}
		<DropdownMenu.Trigger>
			<Button>Sign In</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<Tabs.Root value="login" class="w-[400px]">
				<Tabs.List>
					<Tabs.Trigger value="login">Login</Tabs.Trigger>
					<Tabs.Trigger value="register">Register</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="login">
					<DropdownMenu.Group class="flex flex-col gap-2 px-2 pb-2">
						<DropdownMenu.Label>Login</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<LoginForm />
					</DropdownMenu.Group>
				</Tabs.Content>
				<Tabs.Content value="register">
					<DropdownMenu.Group class="flex flex-col gap-2 px-2 pb-2">
						<DropdownMenu.Separator />
						<RegisterForm />
					</DropdownMenu.Group>
				</Tabs.Content>
			</Tabs.Root>
		</DropdownMenu.Content>
	{/if}
</DropdownMenu.Root>
