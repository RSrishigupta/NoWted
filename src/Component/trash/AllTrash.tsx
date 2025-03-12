import axios from "axios";
import { useEffect, useState } from "react";
import AlltrashCard from "./AllTrashCard";

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

function Alltrash() {
  const [notes, setNotes] = useState<DataTypes[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchAllNotes = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const API = `https://nowted-server.remotestate.com/notes?deleted=true&limit=25&page=${page}`;

    try {
      const response = await axios.get(API);
      const newNotes = response.data.notes;

      if (newNotes.length > 0) {
        setNotes((prevNotes) => [...prevNotes, ...newNotes]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  return (
    <>
      <div className="flex flex-col bg-[#1C1C1C] w-1/5 min-w-[25vh] p-3">
        <h2 className="text-white text-lg font-semibold">Trashed</h2>

        <div className="flex flex-col h-[90vh] gap-4 overflow-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-400">
          {notes.length > 0 ? (
            notes.map((note) => (
              <AlltrashCard
                key={note.id}
                id={note.id}
                title={note.title}
                text={note.preview}
                lastdate={note.updatedAt}
                folderId={note.folder?.id}
                folderName={note.folder?.name}
              />
            ))
          ) : (
            <p className="text-gray-400">No notes found.</p>
          )}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <button
            onClick={fetchAllNotes}
            disabled={loading}
            className=" bg-slate-800 text-white rounded-md hover:bg-blue-800 "
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </>
  );
}

export default Alltrash;
