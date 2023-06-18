export function Spinner({ size }: { size?: string }) {
  return (
    <p className="text-center text-white w-full">
      <i className={`bx bx-loader-alt ${size} animate-spin`}></i>
    </p>   
  )
}