"use server"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { getSession, getUserById } from "../db/queries"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"

const ProfilePage = async () => {
    const session = await getSession();
    const user = (session) ? await getUserById(session?.user.id) : null;

    return (
        <div className="h-auto bg-gray-100 min-h-screen">
            <div className="bg-gradient-to-br from-gray-800 to-gray-950 pt-20 flex flex-col items-center justify-center h-[calc(100vh-20rem)] text-center">
                <Image alt={user.name + "'s profile picture"} src={user.image} width={196} height={196} className="mb-4 rounded-3xl"/>
                <h1 className="text-5xl font-extrabold mb-8 text-white tracking-tight">
                {user.name + "'s Profile"}
                </h1>
            </div>
            <div className="mt-8 px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Placeholder</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Progress value={40}/>
                    </CardContent>
                </Card>
        
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Placeholder</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Progress value={40}/>
                    </CardContent>
                </Card>
        
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Placeholder</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Progress value={40}/>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Placeholder</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Progress value={40}/>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ProfilePage
