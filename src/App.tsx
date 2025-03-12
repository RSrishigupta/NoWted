import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Defaultpage from "./Component/pages/defaultpage";
import FavPage from "./Component/pages/favpage";
import ArchivePage from "./Component/pages/Archivepage";
import TrashPage from "./Component/pages/trashpage";
import FolderPage from "./Component/pages/folderpage";
import { RenderContext } from "./RenderContext";
import { useState } from "react";

function App() {
  const [isRender, setIsRender] = useState<boolean>(false);
  const [MainRender, setMainRender] = useState<boolean>(false);
  return (
    <RenderContext.Provider value={{ isRender, setIsRender,MainRender,setMainRender }}>
      <Router>
        <div className="flex">
          <Routes>
            <Route path="/" element={<Defaultpage />} />

            <Route path="/:folderName/:folderId/" element={<FolderPage />} />
            <Route path="/:folderName/:folderId/notes/:notesId" element={<FolderPage />} />

            <Route path="/Favorites" element={<FavPage />} />
            <Route path="/Favorites/title/:notesId" element={<FavPage />} />

            <Route path="/Archive" element={<ArchivePage />} />
            <Route path="/Archive/title/:notesId" element={<ArchivePage />} />

            <Route path="/trash" element={<TrashPage />} />
            <Route path="/trash/:title/:notesId" element={<TrashPage />} />

          </Routes>
        </div>
      </Router>
    </RenderContext.Provider>
  );
}

export default App;   