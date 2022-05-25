import React from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import Head from '@/components/shared/Head'
import HomeBanner from '@/components/shared/HomeBanner'
import { Anime } from '@/types'
import AnimeApi from '@/api/AnilistApi'
import ClientOnly from '@/components/shared/ClientOnly'

interface HomaPage {
   trendingAnime: Anime[];
   popularSeason: Anime[];
}

const Home: NextPage<HomaPage> = ({
   trendingAnime,
   popularSeason
}) => {
   return (
      <React.Fragment>

         <Head />

         <ClientOnly>
            <HomeBanner type='anime' data={trendingAnime} />

            <div className="space-y-8">
               Home Secction
            </div>
         </ClientOnly>

      </React.Fragment>
   )
}

export const getServerSideProps: GetServerSideProps = async () => {
   const { data: trendingAnime } = await AnimeApi.getAnime({
      type: 'ANIME',
      perPage: 15,
      sort: 'TRENDING_DESC'
   })
   const { data: popularSeason } = await AnimeApi.getAnime({
      type: 'ANIME',
      seasonYear: 2022,
      sort: 'POPULARITY_DESC',
      season: 'SPRING'
   })
   return {
      props: {
         trendingAnime: trendingAnime.Page.media,
         popularSeason: popularSeason.Page.media
      }
   }
}

export default Home;
