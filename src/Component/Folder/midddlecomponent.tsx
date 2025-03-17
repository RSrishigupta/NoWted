import { useContext, useEffect, useState, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchAllFavorites, fetchAllArchivedNotes, fetchAllTrashNotes, fetchAllNotes } from "../Api/api";
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
    };
}

function Middlecomponent() {
    const URL = useLocation().pathname.split("/").filter(Boolean);
    const Mode = URL.length > 0 ? decodeURIComponent(URL[0]) : "";

    const [notes, setNotes] = useState<DataTypes[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const { folderId } = useParams<{ folderId?: string }>();
    const { isRender, setIsRender } = useContext(RenderContext);

    const fetchData = useCallback(async (pageNumber: number) => {
        if (!hasMore) return;

        try {
            let data: DataTypes[] = [];
            switch (Mode) {
                case "Favorites":
                    data = await fetchAllFavorites(pageNumber);
                    break;
                case "Archive":
                    data = await fetchAllArchivedNotes(pageNumber);
                    break;
                case "Trash":
                    data = await fetchAllTrashNotes(pageNumber);
                    break;
                default:
                    data = await fetchAllNotes(folderId, pageNumber);
            }

            if (data.length > 0) {
                setNotes((prevNotes) => [...prevNotes, ...data]);
                setPage(pageNumber + 1);
                if (isRender) {
                    setIsRender(false)
                }
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [Mode, folderId, hasMore,isRender,setIsRender]);

    useEffect(() => {
        setNotes([]);
        setPage(1);
        setHasMore(true);
        fetchData(1);
    }, [Mode, folderId, isRender, fetchData]);

    return (
        <div className="flex flex-col gap-2 bg-[#1C1C1C] w-1/5 min-w-[25vh] p-3">
            <h1 className="text-2xl">{Mode}</h1>

            <div className="flex pr-1 flex-col h-[87vh] gap-4 overflow-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-500">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <Card
                            key={note.id}
                            id={note.id}
                            title={note.title}
                            text={note.preview}
                            lastdate={note.updatedAt}
                            folderId={note.folder?.id ?? ""}
                            folderName={note.folder?.name ?? ""}
                            Mode={Mode}
                        />
                    ))
                ) : (
                    <p className="text-gray-400">No Notes found.</p>
                )}
            </div>

            {hasMore && (
                <button
                    onClick={() => fetchData(page)}
                    className="bg-blue-950 text-white rounded-md w-full hover:bg-blue-700 disabled:bg-gray-500"
                >
                    Load More
                </button>
            )}
        </div>
    );
}

export default Middlecomponent;
