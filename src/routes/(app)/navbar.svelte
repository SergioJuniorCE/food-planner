<script lang="ts">
	import AuthButton from '@/auth/auth-button.svelte';
	import { getAuthContext } from '@/auth/auth.svelte';
	import LightSwitch from '@/components/light-switch.svelte';

	const auth = getAuthContext();
</script>

<header>
	<nav class="flex items-center justify-between p-2">
		<div>
			<a href="/" class="underline">Home</a>
			<a href="/about" class="underline">About</a>
		</div>
		<div>
			<AuthButton {auth} />
      <LightSwitch />
		</div>
	</nav>
</header>
