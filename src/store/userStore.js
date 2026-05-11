import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import MOCK_USERS from "../mockdata/mock_users";

const mapUserShape = (user) => ({
  uid: String(user.id ?? Date.now()),
  displayName: user.name,
  name: user.name,
  email: user.email,
  cellphone: user.cellphone ?? "",
  address: user.address ?? "",
  emailVerified: true,
});

const useUserStore = create(
  persist(
    (set, get) => ({
      currentUser: null,
      registeredUsers: [],

      loginUser: async (email, password) => {
        const { registeredUsers } = get();
        const allUsers = [...MOCK_USERS, ...registeredUsers];
        const foundUser = allUsers.find(
          (user) => user.email === email && user.password === password
        );

        if (!foundUser) {
          return { success: false, error: "Correo o contraseña incorrectos" };
        }

        const normalizedUser = mapUserShape(foundUser);
        set({ currentUser: normalizedUser });
        return { success: true, user: normalizedUser };
      },

      registerFullUser: async (userData) => {
        const { registeredUsers } = get();
        const allUsers = [...MOCK_USERS, ...registeredUsers];
        const emailExists = allUsers.some(
          (user) => user.email.toLowerCase() === userData.email.toLowerCase()
        );

        if (emailExists) {
          return { success: false, error: "El email ya está registrado." };
        }

        const newUser = {
          id: Date.now(),
          name: userData.name,
          email: userData.email,
          cellphone: userData.cellphone ?? "",
          address: userData.address ?? "",
          password: userData.password,
        };

        set({ registeredUsers: [...registeredUsers, newUser] });
        return { success: true, user: mapUserShape(newUser) };
      },

      logoutUser: async () => {
        set({ currentUser: null });
        return { success: true };
      },
    }),
    {
      name: "template-user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
