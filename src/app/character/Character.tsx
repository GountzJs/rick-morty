import { Link } from "react-router-dom";
import { ICharacterSchema } from "../shared/schemas/character.schema";

export function Character({ item }: { item: ICharacterSchema }) {
  const getStatusClass = () => {
    if(item.status === 'Alive') return 'text-green-500';
    else if(item.status === 'Dead') return 'text-red-500';
    return 'text-gray-300'
  }
  
  const goToLocation = (url: string)=> {
    const partUrl = url.split('/');
    const id = partUrl[partUrl.length - 1];
    return `/location/${id}`;
  }

  return (
    <div className="bg-gray-600 flex flex-wrap items-center rounded-md justify-center my-4 mx-2 min-h-[230px] w-[600px]">
      <div className="flex items-center justify-center rounded-l-md h-[229px] w-[230px]">
        <img src={item.image} className="bg-cover bg-center rounded-l-md" alt="" />
      </div>
      <div className="flex flex-col text-white pl-4 pt-2 h-[200px] w-[370px]">
        <h2 className="font-black text-2xl w-full">
          <Link
            to={`/character/${item.id}`}
            className="hover:text-orange-500"
          >
            {item.name}
          </Link>
        </h2>
        <p className="text-sm">
          <i className={`bx bxs-circle text-xs mr-2 ${getStatusClass()}`}></i>
          {item.status} - {item.species}
        </p>
        <div className="flex flex-col">
          <h2 className="mt-4 text-gray-400 text-sm font-semibold">Last known location:</h2>
          {
            item.location.url
            ? <Link 
                to={goToLocation(item.location.url)} 
                className="hover:text-orange-500"
              >
                {item.location.name}
              </Link>
            : <p>{item.location.name}</p>
          }
        </div>
        <div className="flex flex-col">
          <h2 className="mt-4 text-gray-400 text-sm font-semibold">First seen in:</h2>
          {
            item.origin.url
            ? <Link 
                to={goToLocation(item.origin.url)} 
                className="hover:text-orange-500"
              >
                {item.origin.name}
              </Link>
            : <p>{item.origin.name}</p>
          }
        </div>
      </div>
    </div>
  )
}