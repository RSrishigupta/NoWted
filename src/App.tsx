import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Defaultpage from "./Component/pages/defaultpage";
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
            <Route path="/" element={<FolderPage />} />
            {/* <Route path="/" element={<Defaultpage />} /> */}

            <Route path="/:folderName/:folderId/" element={<FolderPage />} />
            <Route path="/:folderName/:folderId/notes/:notesId" element={<FolderPage />} />

            <Route path="/Favorites" element={<FolderPage />} />
            <Route path="/Favorites/:title/:notesId" element={<FolderPage />} />

            <Route path="/Archive" element={<FolderPage />} />
            <Route path="/Archive/:title/:notesId" element={<FolderPage />} />

            <Route path="/Trash" element={<FolderPage />} />
            <Route path="/Trash/:title/:notesId" element={<FolderPage />} />

          </Routes>
        </div>
      </Router>
    </RenderContext.Provider>
  );
}

export default App;   