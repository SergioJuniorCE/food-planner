<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { getAuthContext } from '@/auth/auth.svelte';
	import { Button } from '../components/ui/button';
	import * as Tabs from '$lib/components/ui/tabs';

	import RegisterForm from './register-form.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { RegisterSchema } from './schema';

	let {
		auth,
		registerData
	}: {
		auth: ReturnType<typeof getAuthContext>;
		registerData: SuperValidated<Infer<RegisterSchema>>;
	} = $props();
</script>

<!-- {#if auth.user}
	<Button variant="ghost" on:click={auth.logout}>Logout</Button>
{:else}
	<Button variant="ghost" on:click={() => goto('/login')}>Login</Button>
{/if} -->

{#if auth.user}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>Account</DropdownMenu.Trigger>
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
	</DropdownMenu.Root>
{:else}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button>Login</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<Tabs.Root value="login" class="w-[400px]">
				<Tabs.List>
					<Tabs.Trigger value="login">Login</Tabs.Trigger>
					<Tabs.Trigger value="register">Register</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="login">
					<DropdownMenu.Group>
						<DropdownMenu.Label>Login</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Email</DropdownMenu.Item>
						<DropdownMenu.Item>Password</DropdownMenu.Item>
						<DropdownMenu.Item>Login with Discord</DropdownMenu.Item>
						<DropdownMenu.Item>Login with Github</DropdownMenu.Item>
					</DropdownMenu.Group>
				</Tabs.Content>
				<Tabs.Content value="register">
					<DropdownMenu.Group class="flex flex-col gap-2 px-2 pb-2">
						<DropdownMenu.Separator />
						<RegisterForm data={registerData} />
						<DropdownMenu.Item>Register with Discord</DropdownMenu.Item>
						<DropdownMenu.Item>Register with Github</DropdownMenu.Item>
					</DropdownMenu.Group>
				</Tabs.Content>
			</Tabs.Root>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
