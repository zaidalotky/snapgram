import { Link, useLocation } from "react-router-dom"
import { INavLink } from "../../types";
import { bottombarLinks } from "../../constants";
const Bottombar = () => {

  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
       {bottombarLinks.map((link: INavLink) => {
              const isActive = pathname === link.route
              return (
                
                <Link 
                to={link.route}
                 key={link.label} className={`${isActive && "bg-primary-500 rounded-[10px]"} flex-center flex-col gap-1 p-2 transition`}
                >
                  <img 
                  width={16}
                  height={16}
                  src={link.imgURL}
                  alt={link.label}
                  className={` ${isActive && 'invert-white'}`}
                  />                  
                  <p className="tiny-medium text-light-2">{link.label}</p>
                </Link>
              )
            })}
    </section>
  )
}

export default Bottombar