<template>
	<div :class="{ 'text-center': center, 'text-start': !center }">
		<div class="text-2xl font-bold">{{ title }}</div>
		<div class="text-gray-600 mt-2">{{ subtitle }}</div>
	</div>
</template>

<script setup lang="ts">
	const { title, subtitle, center } = defineProps<{
		title: string;
		subtitle: string;
		center?: boolean;
	}>();
</script>

<style scoped></style>
