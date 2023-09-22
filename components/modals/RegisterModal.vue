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
				<UFormGroup label="Name" name="name">
					<UInput v-model="state.name" size="xl" class="py-1" />
				</UFormGroup>

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
					{{ isLoading ? "Loading..." : "Submit" }}
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
	import { ref } from "vue";
	import { object, string, InferType } from "yup";
	import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
	import { useRegisterModal } from "~/composables/states";

	const toast = useToast();

	const isLoading = ref(false);
	const registerModal = useRegisterModal();
	const isOpen = ref(false);
	watch(registerModal, () => {
		isOpen.value = registerModal.value;
	});

	const closeModal = () => {
		registerModal.value = false;
	};

	console.log("REGISTER MODAL IS OPEN/FALSE: ", isOpen);

	const schema = object({
		name: string().required("Name is Required"),
		email: string().email("Invalid email").required("Required"),
		password: string()
			.min(8, "Must be at least 8 characters")
			.required("Required"),
	});

	type Schema = InferType<typeof schema>;

	const state = ref({
		name: undefined,
		email: undefined,
		password: undefined,
	});

	async function submit(event: FormSubmitEvent<Schema>) {
		// Do something with event.data
		console.log(event.data);
		try {
			isLoading.value = true;

			const { data, error } = await useFetch("/api/register", {
				method: "POST",
				body: {
					name: state.value.name,
					email: state.value.email,
					password: state.value.password,
				},
			});
			if (error.value) {
				console.log(error.value);
				toast.add({
					title: "Error",
					timeout: 3400,
					description: "Something went wrong",
					color: "red",
				});
			}
			if (data && data.value) {
				console.log("Successfully Registered");
				toast.add({ title: "Successfully Registered!", timeout: 3400 });
				registerModal.value = false;
			}
		} catch (error) {
			console.log(error);
		} finally {
			isLoading.value = false;
			registerModal.value = false
		}
	}
</script>
