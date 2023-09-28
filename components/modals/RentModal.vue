<template>
	<div>
		<UModal v-model="isOpen">
			<UButton
				color="gray"
				variant="ghost"
				icon="i-heroicons-x-mark-20-solid"
				class="m-1"
				@click="closeModal"
			/>

			<div class="">
				<UForm :schema="schema" :state="state" @submit="submit">
					<div
						v-if="currentStep === STEPS.CATEGORY"
						class="p-6 flex flex-col gap-4"
					>
						<Heading
							title="Which of these best describes your place?"
							subtitle="Pick a category"
						/>
						<p class="text-red-500 font-bold"> {{ customError && 'Choosing a Cateogry for your property is mandatory' }} </p>
						<div
							class="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto"
						>
							<div
								v-for="item in categories"
								class="col-span-1"
								:key="item.label"
							>
								<span @click="setCurrentCat(item.label)">
									<CategoryInput
										:selected="currentCat === item.label"
										:label="item.label"
										iconName="ph:mountains"
										:onClick="(value) => console.log(value)"
									/>
								</span>
							</div>
						</div>
						<div class="flex justify-center items-center gap-3 w-full p-2">
							<span @click="onNext()">
								<UButton type="button" class="p-2 w-full mt-5 text-md">
									Continue
								</UButton>
							</span>
						</div>
					</div>
					<div
						v-else-if="currentStep === STEPS.LOCATION"
						class="p-6 flex flex-col gap-4"
					>
						<Heading
							title="Where is your place located?"
							subtitle="Help guests find you!"
						/>
						<UFormGroup label="Location" name="location">
							<UInput v-model="state.location" size="xl" class="py-1" />
						</UFormGroup>

						<div class="flex justify-center items-center gap-3 w-full p-2">
							<span @click="onBack()">
								<UButton
									type="button"
									color="indigo"
									variant="solid"
									class="p-2 w-full mt-5 pl text-md"
								>
									Back
								</UButton>
							</span>
							<span @click="onNext()">
								<UButton type="button" class="p-2 w-full mt-5 text-md">
									Continue
								</UButton>
							</span>
						</div>
					</div>
					<div
						v-else-if="currentStep === STEPS.INFO"
						class="p-6 flex flex-col gap-4"
					>
						<Heading
							title="Where is your place located?"
							subtitle="Help guests find you!"
						/>
						<UFormGroup label="Guest Count" name="guestCount">
							<UInput v-model="state.guestCount" size="xl" class="py-1" />
						</UFormGroup>

						<UFormGroup label="Rooms Count" name="roomCount">
							<UInput v-model="state.roomCount" size="xl" class="py-1" />
						</UFormGroup>

						<UFormGroup label="Bathroom Count" name="bathroomCount">
							<UInput v-model="state.bathroomCount" size="xl" class="py-1" />
						</UFormGroup>

						<div class="flex justify-center items-center gap-3 w-full p-2">
							<span @click="onBack()">
								<UButton
									type="button"
									color="indigo"
									variant="solid"
									class="p-2 w-full mt-5 text-md"
								>
									Back
								</UButton>
							</span>
							<span @click="onNext()">
								<UButton type="button" class="p-2 w-full mt-5 text-md">
									Continue
								</UButton>
							</span>
						</div>
					</div>
					<div
						v-else-if="currentStep === STEPS.IMAGES"
						class="p-6 flex flex-col gap-4"
					>
						<Heading
							title="Add a photo of your place"
							subtitle="Show guests what your place looks like"
						/>
						<UFormGroup label="Image" name="imageSrc">
							<UInput v-model="state.imageSrc" size="xl" class="py-1" />
						</UFormGroup>

						<div class="flex justify-center items-center gap-3 w-full p-2">
							<span @click="onBack()">
								<UButton
									type="button"
									color="indigo"
									variant="solid"
									class="p-2 w-full mt-5 text-md"
								>
									Back
								</UButton>
							</span>
							<span @click="onNext()">
								<UButton type="button" class="p-2 w-full mt-5 text-md">
									Continue
								</UButton>
							</span>
						</div>
					</div>

					<div
						v-else-if="currentStep === STEPS.DESCRIPTION"
						class="p-6 flex flex-col gap-4"
					>
						<Heading
							title="How would you describe your place?"
							subtitle="Short and sweet works best!"
						/>
						<UFormGroup label="Title" name="title">
							<UInput v-model="state.title" size="xl" class="py-1" />
						</UFormGroup>
						<UFormGroup label="Description" name="description">
							<UInput v-model="state.description" size="xl" class="py-1" />
						</UFormGroup>

						<div class="flex justify-center items-center gap-3 w-full p-2">
							<span @click="onBack()">
								<UButton
									type="button"
									color="indigo"
									variant="solid"
									class="p-2 w-full mt-5 text-md"
								>
									Back
								</UButton>
							</span>
							<span @click="onNext()">
								<UButton type="button" class="p-2 w-full mt-5 text-md">
									Continue
								</UButton>
							</span>
						</div>
					</div>

					<div
						v-else-if="currentStep === STEPS.PRICE"
						class="p-6 flex flex-col gap-4"
					>
						<Heading
							title="Now, set your price"
							subtitle="How much do you charge per night?"
						/>
						<UFormGroup label="Price" name="price">
							<UInput v-model="state.price" size="xl" class="py-1" />
						</UFormGroup>
					</div>
					<div
						v-if="currentStep === STEPS.PRICE"
						class="flex justify-center items-center gap-3 w-full p-2"
					>
						<span @click="onBack()">
							<UButton
								type="button"
								color="indigo"
								variant="solid"
								class="p-2 w-full mt-5 text-md"
							>
								Back
							</UButton>
						</span>
						<UButton
							v-if="currentStep === STEPS.PRICE"
							type="submit"
							class="p-2 mt-5 text-md"
						>
							{{ isLoading ? "Loading..." : "Submit" }}
						</UButton>
					</div>
				</UForm>
			</div>
		</UModal>
	</div>
</template>

<script setup lang="ts">
	import { useRentModal } from "~/composables/states";
	import { object, string, InferType, number } from "yup";
	import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
	import { categories } from "../../helpers/categories";
	import CategoryInput from "../CategoryInput.vue";

	enum STEPS {
		CATEGORY = 0,
		LOCATION = 1,
		INFO = 2,
		IMAGES = 3,
		DESCRIPTION = 4,
		PRICE = 5,
	}
	const step = ref(STEPS.CATEGORY);
	const currentStep = computed(() => step.value);
	const isLoading = ref(false);

	const myCat = ref<string>("");
	const customError = ref<string | null>(null);
	const currentCat = computed(() => myCat.value);
	const setCurrentCat = (value: string) => {
		myCat.value = value;
	}

	const toast = useToast();

	const rentModal = useRentModal();
	const isOpen = ref(false);

	watch(rentModal, () => {
		isOpen.value = rentModal.value;
	});

	const closeModal = () => {
		rentModal.value = false;
	};

	const onBack = () => {
		step.value = step.value - 1;
	};

	const onNext = () => {
		if(myCat.value === '') {
			customError.value = 'Category is Required'
			return;
		}
		step.value = step.value + 1;
	};

	const schema = object({
		location: string().required("Required"),
		guestCount: number().required("Required"),
		roomCount: number().required("Required"),
		bathroomCount: number().required("Required"),
		imageSrc: string().required("Required"),
		title: string().required("Required"),
		description: string().required("Required"),
		price: number().required("Required"),
	});

	type Schema = InferType<typeof schema>;

	const state = ref({
		location: undefined,
		guestCount: undefined,
		roomCount: undefined,
		bathroomCount: undefined,
		imageSrc: undefined,
		title: undefined,
		description: undefined,
		price: undefined,
	});

	async function submit(event: FormSubmitEvent<Schema>) {
		if (step.value !== STEPS.PRICE) {
			return onNext();
		} else {
			try {
				isLoading.value = true;

				//axios call
				console.log(myCat, event.data);
				console.log(
					'cat:', myCat.value,
					'location: ', event.data.location 
				)
			} catch (error) {
			} finally {
				isLoading.value = false;
				rentModal.value = false;
			}
		}
	}
</script>

<style scoped></style>
