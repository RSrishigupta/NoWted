import axios from "axios"
import { useContext, useEffect, useState } from "react";
import Allcard from "./allfavcard";
import { RenderContext } from "../../RenderContext";
interface DataTypes {
    id: string;
    folderId: string | undefined;
    title: string;
    preview: string;
    updatedAt: string;
    foldlerId: string;
    folderName: string;
}

function AllFav() {
    const [notes, setNotes] = useState<DataTypes[]>([]);
    const context = useContext(RenderContext);
    const { isRender, setIsRender } = context
      const API = "https://nowted-server.remotestate.com/notes?archived=false&favorite=true&deleted=false&limit=20"

    const fetchAllNotes = async () => {
        try {
            const response = await axios.get(API);
            setNotes(response.data.notes)

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllNotes();
         if (isRender) {
      setIsRender(false);
    }
    }, [isRender, setIsRender]);


    return (
        <>
            <div className="flex flex-col bg-[#1C1C1C] w-1/5 min-w-[25vh] p-5">
                <h2 className="text-white text-lg font-semibold">Favorites</h2>

                <div className="flex flex-col h-[90vh] gap-4 overflow-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-400">
                    {notes.length > 0 ? (
                        notes.map((note) => (
                            <Allcard
                                key={note.id}
                                id={note.id}
                                title={note.title}
                                text={note.preview}
                                lastdate={note.updatedAt}
                                folderId={note.folderId || ""}
                                folderName={note.folderName}
                            />
                        ))
                    ) : (
                        <p className="text-gray-400">No notes found.</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default AllFav
