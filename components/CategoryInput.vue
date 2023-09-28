<template>
	<div
		@click="onClick(label)"
		:class="[
			'rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer',
			selected ? 'border-black' : 'border-neutral-200',
		]"
	>
		<Icon :name="iconName" size="18" />
		<div class="font-semibold">
			{{ label }}
		</div>
	</div>
</template>

<script setup lang="ts">
	const { label, iconName, selected, onClick } = defineProps<{
		iconName: string;
		label: string;
		selected?: boolean;
		onClick: (value: string) => void;
	}>();
</script>

<style scoped></style>
