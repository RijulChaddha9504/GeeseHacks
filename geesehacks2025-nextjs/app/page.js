export default function Home() {
  return (
    <div className="text-center bg-gradient-to-br from-gray-900 to-gray-950 w-full h-screen">

      <div className="h-[50vh] w-full flex flex-col justify-center items-center">
        <h1 className="text-9xl font-bold mb-4 text-white">GeeseTalk</h1>
        <p className="text-xl mb-8 text-white">Improve your speaking skills with Mr. Goose</p>
        <a
          href="/learn"
          className="bg-gray-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Start Learning →
        </a>
      </div>

    </div>
  )
}
