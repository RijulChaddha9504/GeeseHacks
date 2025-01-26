"use server"

import { redirect } from "next/navigation"
import Image from "next/image"

import { getSession, getUserById } from "../db/queries"
import { Progress } from "@/components/ui/progress"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import Chart from "./chart"

const ProfilePage = async () => {
    const session = await getSession()
    if (!session) redirect("/api/auth/signin")

    const user = await getUserById(session.user.id)
    
    const name = user?.name || "User"
    const img = user?.image || "/default-avatar.png"
    const pastTotalPerformances = user?.pastTotalPerformances || []
    const numTasksCompleted = user?.numTasksCompleted ?? 0

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="bg-gradient-to-br from-gray-800 to-gray-950 pb-32 pt-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-6 text-center">
                        <div className="relative h-48 w-48">
                            <Image
                                alt={`${name}'s profile picture`}
                                src={img}
                                fill
                                className="rounded-full object-cover shadow-lg ring-4 ring-white/10 transition-all hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 192px"
                            />
                        </div>
                        
                        <div className="space-y-3">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                                {name}'s Profile
                            </h1>
                            <p className="text-lg text-gray-200">
                                {numTasksCompleted > 0 
                                    ? `${name} has completed ${numTasksCompleted} tasks`
                                    : `No previous activity from ${name}`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto -mt-16 max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                <div className="rounded-xl bg-white shadow-xl ring-1 ring-black/5">
                    <Card className="border-0">
                        <CardHeader className="px-8 pt-6">
                            <CardTitle className="text-2xl font-semibold">
                                Performance Overview
                            </CardTitle>
                            <CardDescription className="text-base">
                                Historical task completion trends
                            </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="px-8 pb-6">
                            <div className="">
                                <Chart pastTotalPerformances={pastTotalPerformances} />
                            </div>
                            
                            <div className="mt-6 space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Current Progress
                                    </span>
                                    <span className="font-medium">
                                        75% {/* temporary, make this out of all nodes */}
                                    </span>
                                </div>
                                <Progress value={75} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage