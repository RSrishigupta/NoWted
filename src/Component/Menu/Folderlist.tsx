import axios from "axios";
import { useContext, useEffect, useState } from "react";
import addfolder from "../../assets/addfolder.svg";
import folderimg from "../../assets/folder.svg";
import delimg from "../../assets/del.svg";
import { useNavigate, NavLink } from "react-router-dom";
import { RenderContext } from "../../RenderContext";

interface datatypes {
  id: string;
  name: string;
}

function Folderlist() {
  const API = "https://nowted-server.remotestate.com/folders";
  const [folders, setFolders] = useState<datatypes[]>([]);
  const [editingId, setEditingId] = useState<string>("");
  const [editValue, setEditValue] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("");
  const navigate = useNavigate();
  const {setIsRender}= useContext(RenderContext)
  

  const fetchFolders = async () => {
    try {
      const response = await axios.get(API);
      setFolders(response.data.folders);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const handleClick = (id: string, name: string) => {
    setEditingId(id);
    setEditValue(name);
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleBlur = async () => {
    if (editingId) {
      try {
        await axios.patch(`${API}/${editingId}`, { name: editValue });
        setFolders((prevFolders) =>
          prevFolders.map((folder) =>
            folder.id === editingId ? { ...folder, name: editValue } : folder
          )
        );
        setEditingId("");
        setIsRender(true);
        
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };


  const delfolder = async () => {
    const delApi = `https://nowted-server.remotestate.com/folders/${selectedId}`
    try {
      await axios.delete(delApi);
      alert(`Folder deleted.`)
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }

  const addfolders = async () => {
    try {
      const response = await axios.post(API, { name: " New Folder" });
      setFolders([...folders, response.data]);
      fetchFolders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center px-3">
        <p className="text-base text-slate-300">Folders</p>
        <button onClick={addfolders}>
          <img src={addfolder} alt="add folder" className="h-5" />
        </button>
      </div>
      <ul >
        {folders.map((folder) => (
          <NavLink to={`/${folder.name}/${folder.id}`}
            key={folder.id}
            className={`flex justify-between py-2 w-full px-3 cursor-pointer 
            ${selectedId === folder.id ? "bg-blue-600 text-white" : "hover:bg-blue-800"}`}
            onClick={() => handleSelect(folder.id)}
            onDoubleClick={() => handleClick(folder.id, folder.name)}
          >
            <div className="flex gap-3">
              <img src={folderimg} className="w-5 pb-1" />
              {editingId === folder.id ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={(e) => e.key === "Enter" && handleBlur()}
                  autoFocus
                  className="bg-transparent outline-none border-b w-full border-gray-400 text-white"
                />
              ) : (
                folder.name
              )}
            </div>
            <button onClick={delfolder}> <img src={delimg} className="w-5 pb-1" /></button>
          </NavLink>
        ))}
      </ul> 
    </div>
  );
}

export default Folderlist;
