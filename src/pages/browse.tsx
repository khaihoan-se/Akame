import React, { useEffect, useMemo, useState } from "react";
import Head from '@/components/shared/Head';
import Select from "@/components/shared/Select";
import { Anime, Manga } from "@/types";
import AnimeApi from "@/api/AnilistApi";
import { useRouter } from "next/router";
import AnimeBrowseList from "@/components/features/anime/AnimeBrowseList";

const Browse: React.FC = () => {
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ fiter, setFiter ] = useState('')
    const router = useRouter()
    const type = router.query.type;
    
    const handleSearchText = (e: any) => {
        setFiter(e.target.value)
        if(fiter.length > 0) {
            router.query.search = fiter
            router.push(router)
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await AnimeApi.getAnime({
                    type: type === 'anime' ? 'ANIME' : 'MANGA',
                    search: fiter.length < 1 ? null : fiter,
                    sort: 'POPULARITY_DESC',
                })
                setData(res.data.Page.media)
                setLoading(false)
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
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
                <input type="text" className="outline-none text-black" onChange={handleSearchText} />
            </div>
           { loading ? <h1>Loading...</h1> : <AnimeBrowseList type={type === 'anime' ? 'anime' : 'manga'} data={data}  /> }
        </div>
    )
}

export default Browse;