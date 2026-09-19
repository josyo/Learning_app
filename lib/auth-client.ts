import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export async function signOutUser() {
  const result = await authClient.signOut();
  if (result.error) {
    throw result.error;
  }
}
