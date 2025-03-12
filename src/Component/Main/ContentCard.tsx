import { useState, useEffect, useContext } from "react";
import date from "../../assets/date.svg";
import folderimage from "../../assets/folder.svg";
import Option from "./option";
import axios from "axios";
import { RenderContext } from "../../RenderContext";

interface CardProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  isArchived: boolean;
  isFavorite: boolean;
  namefolder: string;
  folderid: string;
}

function ContentCard({
  id,
  title,
  createdAt,
  namefolder,
  folderid,
  content,
  isArchived,
  isFavorite,
}: CardProps) {
  const [editVal, setEditVal] = useState<string>(title);
  const [editContent, setEditContent] = useState<string>(content);
  const [editModeTitle, setEditModeTitle] = useState<boolean>(false);
  const [editModeContent, setEditModeContent] = useState<boolean>(false);
  const [titleTimer, setTitleTimer] = useState<number | null>(null);
  const [contentTimer, setContentTimer] = useState<number | null>(null);

  const context = useContext(RenderContext);
  const { isRender, setIsRender } = context;

  useEffect(() => {
    setEditVal(title);
    setEditContent(content);
    setEditModeTitle(false);
    setEditModeContent(false);
  }, [id, title, content]);

  const handleTitleChange = (newTitle: string) => {
    setEditVal(newTitle);
    if (titleTimer) clearTimeout(titleTimer);

    const timer = setTimeout(async () => {
      if (newTitle.trim() !== "" && newTitle !== title) {
        try {
          await axios.patch(`https://nowted-server.remotestate.com/notes/${id}`, {
            title: newTitle,
          });
          setIsRender(!isRender);
        } catch (error) {
          console.error("Error updating title:", error);
        }
      }
    }, 2000); 

    setTitleTimer(timer);
  };

  const handleContentChange = (newContent: string) => {
    setEditContent(newContent);
    if (contentTimer) clearTimeout(contentTimer);

    const timer = setTimeout(async () => {
      if (newContent.trim() !== "" && newContent !== content) {
        try {
          await axios.patch(`https://nowted-server.remotestate.com/notes/${id}`, {
            content: newContent,
          });
        } catch (error) {
          console.error("Error updating content:", error);
        }
      }
    }, 2000); 

    setContentTimer(timer);
  };

  return (
    <div className="p-12 flex flex-col gap-4">
      <div className="flex justify-between w-full">
        {editModeTitle ? (
          <input
            type="text"
            value={editVal}
            onChange={(e) => handleTitleChange(e.target.value)}
            onBlur={() => setEditModeTitle(false)}
            className="text-3xl border-b border-gray-400 outline-none bg-transparent"
            autoFocus
            placeholder="Enter title..."
          />
        ) : (
          <span
            className="text-3xl cursor-pointer"
            onDoubleClick={() => setEditModeTitle(true)}
          >
            {editVal.trim() ? editVal : <span className="text-gray-400">Click to add a title</span>}
          </span>
        )}
      </div>

      <Option
        id={id}
        isFavorite={isFavorite}
        isArchived={isArchived}
        folderid={folderid}
        foldername={namefolder}
        title={title}
      />

      <div className="text-sm flex flex-row gap-5 items-center">
        <button>
          <img src={date} className="pb-1" />
        </button>
        <p>Date :</p>
        <p className="font-bold underline">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>

      <hr className="text-newgray" />

      <div className="text-sm flex flex-row gap-5 items-center">
        <img src={folderimage} className="pb-1" />
        <p>Folder :</p>
        <p className="font-bold underline">{namefolder}</p>
      </div>

      <div>
      {/* <button 
          onClick={() => setEditModeContent(!editModeContent)}
          className="self-start px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          {editModeContent ? "Save" : "Edit"}
        </button> */}
        {editModeContent ? (
          <textarea
            value={editContent ?? ""}
            onChange={(e) => handleContentChange(e.target.value)}
            onBlur={() => setEditModeContent(false)}
            className="cursor-pointer  break-words whitespace-pre-wrap overflow-y-hidden
            outline-none w-full h-screen bg-gray-950 caret-white"
            autoFocus
          />
        ) : (
          <p
            className="cursor-pointer whitespace-pre-wrap break-words overflow-hidden w-full"
            onDoubleClick={() => setEditModeContent(true)}
          >
            {editContent.trim() ? editContent : <span className="text-gray-400">Double-click to add content</span>}
          </p>
        )}
      </div>
    </div>
  );
}

export default ContentCard;
