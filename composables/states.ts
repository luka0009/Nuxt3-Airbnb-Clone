export const useRegisterModal = () =>
	useState<boolean>("registerModal", () => false);

export const useLoginModal = () => useState<boolean>("loginModal", () => false);

export const useRentModal = () => useState<boolean>("rentModal", () => false);
