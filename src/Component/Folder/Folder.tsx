import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "./card";
import { RenderContext } from "../../RenderContext";

interface DataTypes {
  id: string;
  folderId: string | undefined;
  title: string;
  preview: string;
  updatedAt: string;
  folder: {
    id: string;
    name: string;
  }
}
function Folder() {
  const { folderId} = useParams();
  const [notes, setNotes] = useState<DataTypes[]>([]);
  const [foldername,setfoldername] =useState<string>("");
  const { isRender, setIsRender } = useContext(RenderContext)



  useEffect(() => {
    const fetchFolderName = async () => {
      try {
        const response = await axios.get("https://nowted-server.remotestate.com/folders");
        const matchedFolder = response.data.folders.find((folder: { id: string }) => folder.id === folderId);
        if (matchedFolder) {
          setfoldername(matchedFolder.name);
        } else {
          setfoldername("No Folder selected");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (isRender) {
      setIsRender(false);
    }

    fetchFolderName();
  }, [folderId, isRender, setIsRender]);

  useEffect(() => {
    if (!folderId) return;

    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `https://nowted-server.remotestate.com/notes?archived=false&deleted=false&folderId=${folderId}`
        );
        setNotes(response.data.notes);

      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();

    if (isRender) {
      setIsRender(false);
    }
  }, [folderId, isRender, setIsRender]);

  return (
    <div className="flex flex-col bg-[#1C1C1C] w-1/5 min-w-[25vh] p-5">
      <h2 className="text-white text-lg font-semibold">{foldername}</h2>

      <div className="flex pr-1 flex-col h-[90vh] gap-4 overflow-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-500">
        {notes.length > 0 ? (
          notes.map((note) => (
            <Card
              key={note.id}
              id={note.id}
              title={note.title}
              text={note.preview}
              lastdate={note.updatedAt}
              folderId={folderId ?? ""}
              folderName={note.folder.name ?? ""}
            />
          ))
        ) : (
          <p className="text-gray-400">No Notes found.</p>
        )}
      </div>
    </div>
  );
}
export default Folder