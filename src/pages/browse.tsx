import { Media } from "@/anilist";
import AnimeApi from "@/api/AnilistApi";
import FormSeachAnime from "@/components/features/anime/FormSeachAnime";
import FormSearchManga from "@/components/features/manga/FormSearchManga";
import BrowseList from "@/components/shared/BrowseList";
import Head from "@/components/shared/Head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Browse: NextPage = () => {
    const [ search, setSearch ] = useState('');
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState<boolean>(false)

    const router = useRouter();

    const handleSearch = (e: any) => {
        setSearch(e.target.value)
    }
    const getType = (context: any) => {
        if(context === 'anime') {
            return 'ANIME'
        }
        if(context === 'manga') {
            return 'MANGA'
        }
    }
    useEffect(() => {
        const fetchDataSearch = async () => {
            try {      
                setLoading(true)          
                const datas: any = await AnimeApi.getAnime({
                    type: getType(router.query.type),
                    sort: 'POPULARITY_DESC',
                    search: search.length === 0 ? null : search,
                    genre: !router.query.genres ? null : router.query.genres
                })
                setData(datas.data.Page.media)
                setLoading(false)

            } catch (error) {
                console.log(error);
            }
        }
        fetchDataSearch()
    }, [search, router, router])

    return (
        <div className="py-20 px-4 md:px-12">
            <Head 
                title="Tìm kiếm Anime - Akame"
            />
            <div className="min-h-screen mt-10">
                {
                   router.query.type === 'anime' 
                   ? <FormSeachAnime 
                        handleSearch={handleSearch} 
                    /> 
                   : <FormSearchManga  handleSearch={handleSearch} />
                }
                <BrowseList 
                    type={router.query.type === 'anime' ? 'anime' : 'manga'}
                    data={data}
                    loading={loading}
                />
            </div>
        </div>
    )
}

export default Browse;