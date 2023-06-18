import { Header } from "../layouts/Header";

export function BaseRouter({ children }: { children: JSX.Element }) {
  return (
    <>
      <Header />
      { children }
    </>
  )
}