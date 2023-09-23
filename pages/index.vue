<template>
	<div>
		<ModalsRegisterModal />
		<ModalsLoginModal />
		<div class="w-16 h-16 m-12">
			<button @click="removeFilters">No Filters</button>
			<CategoryBox label="Mountains" iconName="ph:mountains" />
			<CategoryBox label="GiorgioByMoroder" iconName="ph:mountains" />
		</div>
	</div>
</template>

<script setup lang="ts">
const removeFilters = () => {
		const query = useRoute().query;
		const path = useRoute().fullPath;
		console.log("query", query);
		const urlWithoutQueryParams = path.split("?")[0];

		return navigateTo(urlWithoutQueryParams);
	};
</script>
