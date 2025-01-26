import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="h-auto bg-gray-100">
      <div className="bg-gradient-to-br from-gray-800 to-gray-950 pt-20 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center">
        <h1 className="text-4xl md:text-6xl lg:text-[8rem] font-extrabold mb-4 text-white tracking-tight">
          GeeseTalk
        </h1>
        <p className="text-lg md:text-2xl lg:text-3xl mb-8 text-gray-300">
          Improve your speaking skills with Mr. Goose
        </p>
        <a
          href="/learn"
          className="inline-block bg-indigo-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-indigo-500 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Start Learning →
        </a>
      </div>

      <div className="py-16 px-4 sm:px-6 lg:px-16 bg-gray-100 text-center">
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800 mb-6">
          How GeeseTalk Works
        </h2>
        <p className="text-sm md:text-lg text-gray-600 mb-12">
          Follow these steps to start improving your speaking skills.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col shadow-2xl">
            <CardHeader className="p-0 overflow-hidden rounded-t-lg">
              <div className="relative aspect-video w-full">
                <img
                  src="/SpeakType.png"
                  alt="Choose Speaking Type"
                  className="object-cover w-full h-full"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 px-4 py-4">
              <CardTitle className="px-4 py-4">Step 1: Choose a Speaking Type</CardTitle>
              <CardDescription>
                Select the type of speaking skill you want to practice, such as casual talk, public speaking, or interviews.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="flex flex-col shadow-2xl">
            <CardHeader className="p-0 overflow-hidden rounded-t-lg">
              <div className="relative aspect-video w-full">
                <img
                  src="/Roadmap.png"
                  alt="Follow the Roadmap"
                  className="object-cover w-full h-full"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 px-4 py-4">
              <CardTitle className="px-4 py-4">Step 2: Follow the Roadmap</CardTitle>
              <CardDescription>
                Use our structured roadmap to practice step-by-step and track your progress.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="flex flex-col shadow-2xl">
            <CardHeader className="p-0 overflow-hidden rounded-t-lg">
              <div className="relative aspect-video w-full bg-gray-200">
                <img
                  src="/Feedback.png"
                  alt="Get Feedback"
                  className="object-cover w-full h-full"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 px-4 py-4">
              <CardTitle className="px-4 py-4">Step 3: Get Feedback</CardTitle>
              <CardDescription>
                Receive real-time feedback on your speaking performance from Mr. Goose.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
