import { useParams } from "react-router-dom"
import Default from "../Main/Default"
import Menu from "../Menu/menu"
import Alltrash from "../trash/AllTrash"
import Restore from "../Restore/Restore"

function TrashPage() {
    const {notesId}=useParams();
    return (
        <>
        <Menu/>
        <Alltrash/>
        {notesId ? <Restore/> : <Default/>}
        </>
               
    )
}

export default TrashPage
