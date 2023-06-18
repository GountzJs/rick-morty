export function InputText({ type, name, value, placeholder, onChange }: any) {
  return (
    <input 
      type={type}
      className="bg-gray-900 placeholder:font-extrabold text-white rounded-md py-2 px-6 my-2 mx-4 w-[250px]"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />  
  )
}