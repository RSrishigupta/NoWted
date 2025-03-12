import { NavLink } from "react-router-dom";
interface CardProps {
  id: string
  title: string;
  text: string;
  lastdate: string;
  folderId: string;
  folderName: string;
}



function Archivecard({ title, text, lastdate, id}: CardProps) {
  return (
    <NavLink to={`/Archive/title/${id}`}
      className="bg-newgray rounded-sm p-3 text-white cursor-pointer text-left ">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-400">
        {new Date(lastdate).toLocaleString()} &nbsp; {text.slice(0, 50) + "..."}
      </p>
    </NavLink>
  );
}

export default Archivecard
