import { Anime, Manga } from "@/types";
import React from "react";

interface ModuleSearch {
    data: Anime[] | Manga[];
}
const ModuleSearch: React.FC = (data) => {
    return (
        <div className="absolute min-w-[700px] min-h-[300px] bg-background-900 top-[70px] right-32 rounded-md p-4 after:w-[18px] after:h-[18px] after:inline-block after:absolute after:top-[-8px] after:left-80 after:rotate-45 after:bg-background-900">
            
        </div>
    )
}

export default ModuleSearch;