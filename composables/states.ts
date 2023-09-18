export const useRegisterModal = () =>
	useState<boolean>("registerModal", () => false);

export const useLoginModal = () => useState<boolean>("loginModal", () => false);
