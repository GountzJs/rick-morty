import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center text-white h-full max-w-screen">
      <h2 className="text-6xl font-black text-center">Rick and Morty</h2>
      <p className="text-center text-3xl text-gray-300 mt-10 font-semibold">
        Welcome to the Rick and Morty application, <br /> 
        where you can access information about the characters, <br /> 
        their locations, and the episodes of the series.
      </p>
      <div className="flex flex-wrap items-center justify-center px-6 mt-14">
        <Link
          to={'/characters'}
          className="font-extrabold hover:opacity-80 text-2xl text-orange-500 mb-4 mr-6"
        >
          Characters
        </Link>
        <Link 
          to={'/locations'}
          className="font-extrabold hover:opacity-80 text-2xl text-orange-500 mb-4 mr-6"
        >
          Locations
        </Link>
        <Link 
          to={'/episodes'}
          className="font-extrabold hover:opacity-80 text-2xl text-orange-500 mb-4"
        >
          Episodes
        </Link>
      </div>
    </section>  
  )
}
