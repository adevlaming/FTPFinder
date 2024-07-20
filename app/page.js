import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-center text-orange-500">
      <h1 className="text-4xl mb-4">Game Finder</h1>
      <Link href="./finder">
        <button className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300">
          Let's Play!
        </button>
      </Link>
    </main>
  );
}

/*
https://www.freetogame.com/api-doc
*/

