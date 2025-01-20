"use server";

import { cookies } from "next/headers";

export async function setCookie(userId: string) {
  const cookieStore = await cookies();

  cookieStore.set("userId", userId);
}
