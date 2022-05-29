import React, { useEffect, useMemo, useState } from "react";
import Head from '@/components/shared/Head';
import Select from "@/components/shared/Select";
import { Anime, Manga, Media } from "@/types";
import AnimeApi from "@/api/AnilistApi";
import { useRouter } from "next/router";
import AnimeBrowseList from "@/components/features/anime/AnimeBrowseList";
import { GetStaticProps, NextPage } from "next";

interface BrowseProps {
    dataBrowse: Anime[];
}
const Browse: NextPage<BrowseProps> = () => {
    
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
                const { datas }: any = await AnimeApi.getAnime({
                    type: 'ANIME',
                    sort: 'POPULARITY_DESC',
                })
                console.log(datas);
                console.log('success');
                setData(datas)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    
    return (
        <div className="py-20 px-4 md:px-12">
            <Head
                title="Tìm kiếm Anime - Akame"
            />
            <div>
                <input type="text" className="outline-none text-black" onChange={handleSearchText} />
            </div>
            <AnimeBrowseList type={type === 'anime' ? 'anime' : 'manga'} data={data} />
        </div>
    )
}


export default Browse;