export function SelectInput({ name, label, options, onChange }: any) {
  return (
    <select 
      className="bg-gray-900 placeholder:font-extrabold text-white rounded-md py-2 px-6 my-2 mx-4 w-[200px]" 
      name={name} 
      onChange={onChange}
    >
      <option value={''}>{label}</option>
      {
        options.map((opt: any, index: number) => <option key={index} value={opt.value} label={opt.label} />)
      }
    </select>
  )
}