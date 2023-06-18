import imageNotFound from '../../../assets/not-found.png';

interface IParamsNotFound {
  title: string;
  description: string;
}


export function NotFound({ title, description }: IParamsNotFound) {
  return (
    <div className="flex flex-col items-center justify-center text-white w-[300px]">
      <img src={imageNotFound} height={350} width={350} alt="" />
      <h2 className="text-2xl font-black">{title}</h2>
      <p className="mt-4 text-gray-300 text-lg text-center font-medium">{description}</p>
    </div>  
  )
}