'use server'

import { cookies } from "next/headers"

export async function DeleteCookie() {
    const cookieStore = await cookies();
   cookieStore.set('userId', '');
}