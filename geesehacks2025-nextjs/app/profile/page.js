"use server"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { getSession, getUserById } from "../db/queries"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { redirect } from "next/navigation"
import Chart from "./chart"


const ProfilePage = async () => {
    const session = await getSession();

    if(!session){
        redirect("/api/auth/signin");
    }

    const user = (session) ? await getUserById(session?.user.id) : null;

    const name = user ? user.name : "";
    const img = user ? user.image : "";
    const pastTotalPerformances = user.pastTotalPerformances;

    return (

        <div className="h-auto bg-gray-100 min-h-screen">
            <div className="bg-gradient-to-br from-gray-800 to-gray-950 pt-20 flex flex-col items-center justify-center min-h-screen text-center">
                <Image alt={name + "'s profile picture"} src={img} width={196} height={196} className="mb-4 rounded-3xl"/>
                <h1 className="text-5xl font-extrabold mb-8 text-white tracking-tight">
                {name + "'s Profile"}
                </h1>
                <div className="mt-12">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">Past Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Chart pastTotalPerformances={pastTotalPerformances} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
