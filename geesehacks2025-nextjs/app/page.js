export default function Home() {
  return (
    <div className="text-center bg-gray-950 w-full h-screen">

      <div className="h-[50vh] w-full flex flex-col justify-center items-center">
        <h1 className="text-9xl font-bold mb-4 text-white">GeeseTalk</h1>
        <p className="text-xl mb-8 text-white">Improve your speaking skills with Mr. Goose</p>
        <a
          href="/learn"
          className="bg-gray-700 text-white px-6 py-3 rounded-lg text-lg"
        >
          Start Learning
        </a>
      </div>

    </div>
  )
}
