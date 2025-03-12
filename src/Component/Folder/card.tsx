import { NavLink } from "react-router-dom";

interface CardProps {
  id: string;
  title: string;
  text: string;
  lastdate: string;
  folderId: string;
  folderName: string;
}

function Card({ title, text, lastdate, id, folderId, folderName }: CardProps) {
  return (
    <NavLink
      to={`/${folderName}/${folderId}/Notes/${id}`}
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