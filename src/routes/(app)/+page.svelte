<script lang="ts">
	import { Button } from '@/components/ui/button';
	import type { PageData } from './$types';

	import MealPlanBoard from './meal-plan-board.svelte';
	import { Input } from '@/components/ui/input';
	export let data: PageData;

</script>

<main class="flex flex-row gap-4">
	<section>
		<p>Fridge</p>
		<ul>
			<li>Milk</li>
			<li>Eggs</li>
			<li>Bread</li>
			<li>Pasta</li>
		</ul>
	</section>
	<section>
		<div class="flex flex-row gap-4">
			<p>Weekly meal plan</p>
			<Button>Add meal</Button>
			<Input placeholder="Search..." />
		</div>
		<MealPlanBoard />
	</section>
</main>
