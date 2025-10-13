"use server";

import { cookies } from 'next/headers';

export const getStreakCookie = async (): Promise<number> => {
    const cookieStore = await cookies();
    const streakCookie = cookieStore.get("streak");
    return streakCookie ? parseInt(streakCookie.value) : 0;
};

export const setStreakCookie = async (newStreak: number): Promise<void> => {
    const cookieStore = await cookies();
    cookieStore.set("streak", newStreak.toString());
};

export const handleWin = async (): Promise<void> => {
    const cookieStore = await cookies();
    cookieStore.set("streak", ((await getStreakCookie()) + 1).toString());
};