<template>
	<div>
		<UContainer v-if="isMainPage">
			<div
				class="pt-4 pr-4 flex flex-row items-center justify-between overflow-x-auto"
			>
				<!-- <UButton @click="removeFilters">No Filters</UButton> -->
				<CategoryBox
					v-for="item in categories"
					:key="item.label"
					:label="item.label"
					:iconName="item.iconName"
					:selected="category === item.label"
				/>
			</div>
		</UContainer>
	</div>
</template>

<script setup>
	const route = useRoute();
	const query = route.query;
	const pathname = route.path;
	const category = ref(query.category);
	const isMainPage = pathname === "/";

	const removeFilters = () => {
		console.log("clicked");
		const query = useRoute().query;
		const path = useRoute().fullPath;
		console.log("query", query);
		const urlWithoutQueryParams = path.split("?")[0];

		return navigateTo(urlWithoutQueryParams);
	};

	const categories = [
		{
			label: "Beachfront",
			iconName: "ph:mountains",
			description: "This property is close to the beach!",
		},
		{
			label: "Windmills",
			iconName: "ph:mountains",
			description: "This property is has windmills!",
		},
		{
			label: "Design",
			iconName: "ph:mountains",
			description: "This property is modern design!",
		},
		{
			label: "Countryside",
			iconName: "ph:mountains",
			description: "This property is in the countryside!",
		},
		{
			label: "Pools",
			iconName: "ph:mountains",
			description: "This is property has a beautiful pool!",
		},
		{
			label: "Islands",
			iconName: "ph:mountains",
			description: "This property is on an island!",
		},
		{
			label: "Lake",
			iconName: "ph:mountains",
			description: "This property is near a lake!",
		},
		{
			label: "Skiing",
			iconName: "ph:mountains",
			description: "This property has skiing activies!",
		},
		{
			label: "Castles",
			iconName: "ph:mountains",
			description: "This property is an ancient castle!",
		},
		{
			label: "Caves",
			iconName: "ph:mountains",
			description: "This property is in a spooky cave!",
		},
		{
			label: "Camping",
			iconName: "ph:mountains",
			description: "This property offers camping activities!",
		},
		{
			label: "Arctic",
			iconName: "ph:mountains",
			description: "This property is in arctic environment!",
		},
		{
			label: "Desert",
			iconName: "ph:mountains",
			description: "This property is in the desert!",
		},
		// {
		// 	label: "Barns",
		// 	iconName: GiBarn,
		// 	description: "This property is in a barn!",
		// },
		// {
		// 	label: "Lux",
		// 	iconName: IoDiamond,
		// 	description: "This property is brand new and luxurious!",
		// },
	];
</script>

<style lang="scss" scoped></style>
