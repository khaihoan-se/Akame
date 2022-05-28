import React, { useEffect, useMemo, useState } from "react";
import Head from '@/components/shared/Head';
import Select from "@/components/shared/Select";
import { Anime, Manga } from "@/types";
import AnimeApi from "@/api/AnilistApi";
import { useRouter } from "next/router";

const Browse: React.FC = () => {
    const [ data, setData ] = useState([])
    const { query } = useRouter()
    const [ fiter, setFiter ] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await AnimeApi.getAnime({
                    type: query.type,
                    search: fiter,
                    perPage: 5
                })
                console.log(res);
                
            } catch (error) {
                console.log(error)
            }
        }
    }, [fiter])
    
    return (
        <div className="py-20 px-4 md:px-12">
            <Head
                title="Tìm kiếm Anime - Akame"
            />
            {/* <div className="mb-8 flex items-center space-x-2">
                <p className="text-4xl font-semibold text-center md:text-left">Search</p>
                <Select />
            </div> */}
            <div>
                <input type="text" className="outline-none text-black" onChange={(e) => setFiter(e.target.value)} />
            </div>
        </div>
    )
}

export default Browse;