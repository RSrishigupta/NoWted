import { useParams } from "react-router-dom"
import Folder from "../Folder/Folder"
import Main from "../Main/Maincontent"
import Menu from "../Menu/menu"
import Default from "../Main/Default";

function FolderPage() {
    const { notesId } = useParams();
    return (
        <>
            <Menu />
            <Folder />
            {notesId ? <Main /> :<Default />}
        </>

    )
}

export default FolderPage
