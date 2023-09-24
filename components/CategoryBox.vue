<template>
	<div
		@click="handleClick"
		:class="[
			'flex',
			'flex-col',
			'items-center',
			'justify-center',
			'gap-2',
			'p-3',
			'border-b-2',
			'hover:text-neutral-800',
			'transition',
			'cursor-pointer',
			selected ? 'border-b-neutral-800' : 'border-transparent',
			selected ? 'text-neutral-800' : 'text-neutral-500',
		]"
	>
		<Icon :name="iconName" size="18" />
		<div className="font-medium text-sm">{{ label }}</div>
	</div>
</template>
/

<script setup lang="ts">
	import qs from "query-string";

	const { label, iconName, selected } = defineProps<{
		iconName: string;
		label: string;
		selected?: boolean;
	}>();

	const route = useRoute();
	const query = route.query;

	const handleClick = async () => {
		console.log("clicked");

		// let currentQuery: { category: string | null } | null = { category: label };
		let currentQuery = { ...query };
		if (currentQuery.category === label) {
			delete currentQuery.category;
		} else {
			currentQuery.category = label;
		}

		const url = qs.stringifyUrl(
			{
				url: "/",
				//@ts-ignore
				query: currentQuery,
			},
			{ skipNull: true }
		);

		await navigateTo(url);
		window.location.reload();
	};
</script>

<style scoped></style>
