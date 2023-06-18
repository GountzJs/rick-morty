import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function Header() {
  const [show, setShow] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();

  const hasRoute = (path: string) => {
    return location.pathname === path ? 'text-sky-500' : '';
  }

  const redirect = (path: string) => {
    setShow(false);
    navigate(path);
  }

  return (
    <header 
      className="text-white fixed flex items-center justify-between shadow-sm shadow-white top-0 left-0 z-10"
    >
      <button 
        type="button"
        className={`
          bg-gray-900 border border-gray-600 rounded-full fixed flex items-center justify-center 
          top-[2%] left-[50px] hover:bg-gray-950 h-[55px] w-[55px]
        `}
        onClick={() => setShow(!show)}
      >
        <i className='bx bx-menu text-4xl'></i>
      </button>
      <button 
        type="button" 
        className={`
          bg-gray-900 border border-gray-600 rounded-full fixed flex items-center justify-center 
          top-[2%] left-[130px] hover:bg-gray-950 h-[55px] w-[55px] ${hasRoute('/')}
        `}
        onClick={() => redirect('/')}
      >
        <i className='bx bx-home text-3xl'></i>
      </button>
      <div 
        className={`bg-gray-900 flex flex-col h-screen w-[300px] ${show ? 'flex' : 'hidden'}`}
      >
        <nav className="flex flex-col items-center justify-evenly px-14 h-full">
          <button 
            type="button"
            className={`font-extrabold hover:opacity-70 text-2xl  ${hasRoute('/characters')}`}
            onClick={() => redirect('/characters')}
          >
            Characters
          </button>
          <button 
            type="button"
            className={`font-extrabold hover:opacity-70 text-2xl ${hasRoute('/locations')}`}
            onClick={() => redirect('/locations')}
          >
            Locations
          </button>
          <button 
            type="button"
            className={`font-extrabold hover:opacity-70 text-2xl ${hasRoute('/episodes')}`}
            onClick={() => redirect('/episodes')}
          >
            Episodes
          </button>
        </nav>
      </div>
    </header>  
  )
}