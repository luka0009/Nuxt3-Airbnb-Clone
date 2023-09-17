<template>
	<div
		@click="onClick"
		class="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
	>
		{{ label }}
	</div>
</template>

<script setup lang="ts">
	const { onClick, label } = defineProps({
		onClick: {
			type: Function as PropType<(event: MouseEvent) => void>,
			required: true,
		},
		label: String,
	});
</script>

<style scoped></style>
