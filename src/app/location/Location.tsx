import { Link } from "react-router-dom";
import { ILocationSchema } from "../shared/schemas/location.schema";

export function Location({ item }: { item: ILocationSchema }) {
 return (
    <div className="bg-gray-700 flex flex-col items-center justify-center rounded-md py-4 px-6 my-2 mx-4 w-[300px]">
      <p className="text-white text-md text-center font-extrabold">
        Name: <Link to={`/location/${item.id}`} className="ml-2 font-semibold hover:text-orange-500">
          {item.name}
        </Link>
      </p>
      <p className="text-white text-md text-center font-extrabold mt-4">
        Type: <span className="font-semibold">{item.type}</span>
      </p>
      <p className="text-white text-md text-center font-extrabold mt-4">
        Dimension: <span className="font-semibold">{item.dimension}</span>
      </p>
    </div>
  )
}