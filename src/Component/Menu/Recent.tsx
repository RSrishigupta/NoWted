import axios from "axios";
import { useEffect, useState } from "react";
import doc from "../../assets/doc.svg"
import { NavLink } from "react-router-dom";


interface datatypes {
    id: string;
    folderId: string;
    title: string;
    folder: {
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
      };
}

function Recent() {
    const RecentApi = "https://nowted-server.remotestate.com/notes/recent";
    const [temp, settemp] = useState<datatypes[]>([]);
    const recentdata = async () => {
        try {
            const response = await axios.get(RecentApi);
            const data = response.data.recentNotes

            settemp(data)
        } catch (error) {

            console.log("error is ",error);
        }
    }

    useEffect(() => {
        recentdata();
    },[]);
    return (
        <>
            <div className="flex flex-col gap-3 ">
                <p className="text-base text-slate-300 pl-3 pt-2.5">Recents</p>
                <ul className=" w-full h-3/12">
                    {
                        temp.map((e) => {
                            return (
                                <NavLink to={`/${e.folder.name}/${e.folder.id}/notes/${e.id}`} key={e.id} 
                                className="flex gap-3 py-2 hover:bg-blue-800 px-3">  
                                <img src={doc}  className="h-5"/>
                                {e.title}
                                </NavLink>
                            );
                        })
                    }
                </ul>
            </div>

        </>
    )
}

export default Recent
