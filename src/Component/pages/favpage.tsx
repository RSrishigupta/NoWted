import { useParams } from "react-router-dom"
import AllFav from "../Favorite/allFav"
import Main from "../Main/Maincontent"
import Menu from "../Menu/menu"
import Default from "../Main/Default";
function FavPage() {
const {notesId}=useParams();
    return (
            <>
                <Menu/>
                <AllFav/>
                {notesId?<Main/>:<Default/>}
            </>        
    )
}

export default FavPage
