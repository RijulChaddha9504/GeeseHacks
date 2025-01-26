"use server"

import { getSession, getUserById } from "../db/queries"
import LearnPage from "./lessonDisplay"

export default async function Lessons() {
    const session = await getSession();
    const user = (session) ? await getUserById(session?.user.id) : null;

    return <LearnPage completedNodes={user.completednodes}></LearnPage>
}
