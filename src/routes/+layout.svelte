<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';

	const { children } = $props();
</script>

<Toaster />
<ModeWatcher />
{@render children()}
