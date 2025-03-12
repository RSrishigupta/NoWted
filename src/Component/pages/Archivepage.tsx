import { useParams } from "react-router-dom"
import AllArchive from "../Archivefolder/allArchive"
import Main from "../Main/Maincontent"
import Menu from "../Menu/menu"
import Default from "../Main/Default";

function ArchivePage() {
const {notesId}=useParams();
    return (
        <>
        <Menu/>
        <AllArchive/>
        {notesId?<Main/>:<Default/>}
        </>
               
    )
}

export default ArchivePage
