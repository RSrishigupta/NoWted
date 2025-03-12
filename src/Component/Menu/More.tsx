import archive from "../../assets/archive.svg"
import fav from "../../assets/fav.svg"
import del from "../../assets/del.svg"
import { NavLink } from "react-router-dom"
function More() {

    return (
        <>
            <h1 className="text-slate-300 px-2">More    </h1>
            <div>
                <NavLink to={"/Favorites"} className="flex  hover:bg-blue-800 gap-4 p-2 w-full"> <img src={fav} /> Favorites</NavLink>
                <NavLink to={"/Archive"} className="flex  gap-4 p-2 hover:bg-blue-900 w-full"> <img src={archive} /> Archived Notes</NavLink>
                <NavLink to={"/trash"} className="flex  gap-4 p-2 hover:bg-red-500 w-full"> <img src={del} /> Trash</NavLink>
            </div>
        </>

    )
}

export default More
