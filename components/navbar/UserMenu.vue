<template>
	<div class="relative">
		<div class="flex flex-row items-center gap-3">
			<div
				@click=""
				class="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
			>
				Airbnb your home
			</div>
			<div
				@click="toggleOpen"
				class="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
			>
				<Icon name="lucide:menu" size="20" />
				<div class="hidden md:block">
					<Avatar />
				</div>
			</div>
		</div>
		<div
			v-if="isOpen"
			class="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"
		>
			<div class="flex flex-col cursor-pointer">
				<div v-if="session?.user">
					<MenuItem @click="() => signOut()" label="Log Out" />
					<hr class="border border-b-[1px] border-black"/>
					<MenuItem @click="toggleRentModal" label="Airbnb Your Home" />
				</div>
				<div v-else>
					<MenuItem @click="toggleLoginModal" label="Log in" />
					<MenuItem @click="toggleRegisterModal" label="Sign up" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRegisterModal, useRentModal } from "~/composables/states";
	import MenuItem from "./MenuItem.vue";
	const { getSession, signOut } = useAuth();

	const session = await getSession();
	console.log("session: ", session);

	const isOpen = ref(false);
	const toggleOpen = () => {
		isOpen.value = !isOpen.value;
	};

	const registerModal = useRegisterModal();
	const toggleRegisterModal = () => {
		registerModal.value = !registerModal.value;
		console.log("clicked: ", registerModal.value);
	};

	const loginModal = useLoginModal();
	const toggleLoginModal = () => {
		loginModal.value = !loginModal.value;
		console.log("Login Modal Value: ", loginModal.value);
	};

	const rentModal = useRentModal();
	const toggleRentModal = () => {
		rentModal.value = !rentModal.value;
		console.log("Rent Modal Value: ", rentModal.value);
	};
</script>

<style scoped></style>
