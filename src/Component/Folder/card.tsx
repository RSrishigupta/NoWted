import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface CardProps {
  id: string;
  title: string;
  text: string;
  lastdate: string;
  folderId: string;
  folderName: string;
  Mode: string;
}

function Card({ title, text, lastdate, id, folderId, folderName, Mode }: CardProps) {
  const [Url, setUrl] = useState("");
  useEffect(() => {
    if (Mode === "Favorites" || Mode === "Archive" || Mode === "Trash") {
      setUrl(`${Mode}/${title}/${id}`);      
    } else {
      setUrl(`${folderName}/${folderId}/Notes/${id}`);
    }
  }, [Mode, folderName, folderId,id,title]); 
 

  return (
    <NavLink
      to={`/${Url}`}
      className={({ isActive }) =>
        `bg-newgray rounded-sm p-3 text-white cursor-pointer text-left hover:bg-blue-800 ${
          isActive ? "border-2 border-blue-500" : ""
        }`
      }
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-400">
        {new Date(lastdate).toLocaleString()} &nbsp; {text.slice(0, 50) + "..."}
      </p>
    </NavLink>
  );
}

export default Card;
