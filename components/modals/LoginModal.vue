<template>
	<UModal v-model="isOpen">
		<UButton
			color="gray"
			variant="ghost"
			icon="i-heroicons-x-mark-20-solid"
			class="m-1"
			@click="closeModal"
		/>

		<div class="p-6 flex flex-col gap-4">
			<Heading title="Welcome to Airbnb" subtitle="Create an account!" />
			<UForm :schema="schema" :state="state" @submit="submit">
				<UFormGroup label="Email" name="email">
					<UInput v-model="state.email" size="xl" class="py-1" />
				</UFormGroup>

				<UFormGroup label="Password" name="password">
					<UInput
						v-model="state.password"
						type="password"
						size="xl"
						class="py-1"
					/>
				</UFormGroup>

				<UButton type="submit" class="p-2 w-full mt-5 pl-[41%] text-md">
					Submit
				</UButton>
			</UForm>

			<div className="flex flex-col gap-4 mt-3">
				<UButton color="white" class="pl-[23%] md:pl-[33%] py-2">
					<Icon name="devicon:google" />
					Continue with Google</UButton
				>
				<UButton color="white" class="pl-[23%] md:pl-[33%] py-2">
					<Icon name="devicon:github" />
					Continue with Github</UButton
				>
				<div
					className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
				>
					<p>
						Already have an account?
						<span
							@click="closeModal"
							className=" text-neutral-800 cursor-pointer hover:underline"
						>
							Log in</span
						>
					</p>
				</div>
			</div>
		</div>
	</UModal>
</template>

<script setup lang="ts">
	const { signIn } = useAuth();
	import { object, string, InferType } from "yup";
	import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";

	const toast = useToast();
	const isLoading = ref(false);
	const loginModal = useLoginModal();
	const isOpen = ref(false);
	watch(loginModal, () => {
		isOpen.value = loginModal.value;
	});

	const closeModal = () => {
		loginModal.value = false;
	};

	const schema = object({
		email: string().email("Invalid email").required("Required"),
		password: string()
			.min(8, "Must be at least 8 characters")
			.required("Required"),
	});

	type Schema = InferType<typeof schema>;

	const state = ref({
		email: undefined,
		password: undefined,
	});

	async function submit(event: FormSubmitEvent<Schema>) {
		// console.log(event.data);
		try {
			isLoading.value = true;

			const result = await signIn("credentials", {
				password: state.value.password,
				email: state.value.email,
				redirect: false,
			});

			if (result?.ok && !result.error) {
				console.log("Successfully LoggedIn");
				toast.add({
					title: "Successfully Logged In",
				});
				// await refreshNuxtData();
				window.location.reload();
			} else {
				console.log("Something Went Wrong");
				toast.add({
					title: "Error",
					timeout: 3400,
					description: result.error,
					color: "red",
				});
			}
		} catch (error) {
		} finally {
			isLoading.value = false;
			loginModal.value = false;
		}
	}
</script>

<style scoped></style>
