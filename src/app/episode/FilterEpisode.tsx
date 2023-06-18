import { InputText } from "../shared/forms/InputText";
import { IFormFilters } from "./models/interfaces/formFilters.interface";

interface IFilterEpisode { 
  action: () => void, 
  filters: IFormFilters,
  setFilters: React.Dispatch<React.SetStateAction<IFormFilters>>,
  loading: boolean
}

export function FilterEpisode({ action, filters, setFilters, loading }: IFilterEpisode) {
  const handleForm = (e: any) => setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <form className="flex flex-wrap pl-8 mb-4 w-full">
      <InputText
        type="text" 
        name="name" 
        value={filters.name} 
        placeholder="Name" 
        onChange={handleForm} 
      />
      <InputText 
        type="text" 
        name="episode" 
        value={filters.episode} 
        placeholder="Episode: (format 'S01E01')" 
        onChange={handleForm} 
      />
      <button 
        type="button"
        disabled={loading}
        className="bg-sky-500 hover:bg-sky-600 ml-10 rounded-md text-white font-extrabold mt-2 py-2 px-10"
        onClick={action}
      >
        Filtrar
      </button>
    </form>
  )
}