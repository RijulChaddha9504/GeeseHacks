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
      <div className="bg-gradient-to-br from-gray-800 to-gray-950 pt-20 flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center">
        <h1 className="text-7xl font-extrabold mb-4 text-white tracking-tight">
          GeeseTalk
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">
          Improve your speaking skills with Mr. Goose
        </p>
        <a
          href="/learn"
          className="inline-block bg-gray-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Start Learning →
        </a>
      </div>

      <div className="py-16 px-6 lg:px-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
          How GeeseTalk Works
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Follow these steps to start improving your speaking skills.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <img
                src="/"
                alt="Choose Speaking Type"
                className="rounded-t-lg w-full object-cover h-40"
              />
              <CardTitle>Step 1: Choose a Speaking Type</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Select the type of speaking skill you want to practice, such as casual talk, public speaking, or interviews.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <img
                src="/"
                alt="Follow the Roadmap"
                className="rounded-t-lg w-full object-cover h-40"
              />
              <CardTitle>Step 2: Follow the Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Use our structured roadmap to practice step-by-step and track your progress.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <img
                src="/"
                alt="Get Feedback"
                className="rounded-t-lg w-full object-cover h-40"
              />
              <CardTitle>Step 3: Get Feedback</CardTitle>
            </CardHeader>
            <CardContent>
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
