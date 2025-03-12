import axios from "axios";
import { useParams } from "react-router-dom";
import { RenderContext } from "../../RenderContext";
import { useContext } from "react";

const API = "https://nowted-server.remotestate.com/notes";
function CreateNote() {
  const { folderId } = useParams();
  const { isRender, setIsRender } = useContext(RenderContext);
  const addNote = async () => {
    if (!folderId) {
      alert("Select a folder first");
      return;
    }

    try {
      const noteData = {
        folderId: folderId,
        title: "New Note",
        content: "",
        isFavorite: false,
        isArchived: false
      };
      await axios.post(API, noteData);
      setIsRender(!isRender);
      alert("Note created successfully");

    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div className="px-2">
      <button
        onClick={addNote}
        className="bg-gray-500 text-white text-base rounded-sm border border-gray-700 w-full p-2 hover:bg-slate-800">
        + New Note
      </button>
    </div>
  );
}

export default CreateNote;