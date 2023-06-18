import { InputText } from "../shared/forms/InputText";
import { SelectInput } from "../shared/forms/SelectInput";
import { Gender } from "./models/enums/gender.enum";
import { IFormFilters } from "./models/interfaces/formFilters.interface";

interface IParamsFilterCharacter { 
  action: () => void, 
  filters: IFormFilters, 
  setFilters: React.Dispatch<React.SetStateAction<IFormFilters>>
}

export function FilterCharacter({ action, filters, setFilters }: IParamsFilterCharacter) {

  const handleForm = (e: any) => setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <form className="flex flex-wrap pl-8 mb-4 w-full">
      <InputText type="text" name="name" value={filters.name} placeholder="Name" onChange={handleForm} />
      <SelectInput 
        name="status"
        label="Select status"
        value={filters.status} 
        options={[{value: 'alive', label: 'Alive'}, {value: 'dead', label: 'Dead'}, {value: 'unknown', label: 'Unknown'}]}
        onChange={handleForm}
      />
      <InputText type="text" name="species" value={filters.species} placeholder="Specie" onChange={handleForm} />
      <SelectInput 
        name="gender"
        label="Select gender"
        value={filters.gender} 
        options={[
          {value: Gender.Female, label: 'Female'}, 
          {value: Gender.Male, label: 'Male'},
          {value: Gender.Genderless, label: 'Genderless'}, 
          {value: Gender.Unknown, label: 'Unknown'}
        ]}
        onChange={handleForm}
      />
      <button 
        type="button" 
        className="bg-sky-500 hover:bg-sky-600 ml-10 rounded-md text-white font-extrabold mt-2 py-2 px-10"
        onClick={action}
      >
        Filtrar
      </button>
    </form>
  )
}