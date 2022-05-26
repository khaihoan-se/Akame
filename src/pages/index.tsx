import React, { useMemo } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { Anime } from '@/types'
import { getNextSeason, getSeason } from '@/utils'
import Head from '@/components/shared/Head'
import HomeBanner from '@/components/shared/HomeBanner'
import AnimeApi from '@/api/AnilistApi'
import ClientOnly from '@/components/shared/ClientOnly'
import Section from '@/components/shared/Section'
import ColumnSection from '@/components/shared/ColumnSection'
import Rantings from '@/components/shared/Rantings'

interface HomaPage {
   trendingAnime: Anime[];
   popularSeason: Anime[];
   popularAllTime: Anime[];
   favouriteAllTime: Anime[];
   animeNextSeason: Anime[];
   ratingAnime: Anime[];
}

const Home: NextPage<HomaPage> = ({
   trendingAnime,
   popularSeason,
   popularAllTime,
   favouriteAllTime,
   animeNextSeason,
   ratingAnime
}) => {
   const currentSeason = useMemo(getSeason, []);
   const nextSeason = useMemo(getNextSeason, [])
   return (
      <React.Fragment>

         <Head
            title="Akame - Anime"
         />

         <ClientOnly>
            <HomeBanner type='anime' data={trendingAnime} />

            <div className="space-y-8">
               <Section className="flex flex-col md:flex-row items-center md:space-between space-y-4 space-x-0 md:space-y-0 md:space-x-4">
                  <ColumnSection
                     title="POPULAR THIS SEASON"
                     type="anime"
                     data={popularSeason}
                     viewMoreHref={`/browse?sort=popularity&type=anime&season=${currentSeason.season}&seasonYear=${currentSeason.year}`}
                  />
                  <ColumnSection
                     title="ALL TIME POPULAR"
                     type="anime"
                     data={popularAllTime}
                     viewMoreHref="/browse?sort=popularity&type=anime"
                  />
                  <ColumnSection
                     title="All TIME FAVORITE"
                     type="anime"
                     data={favouriteAllTime}
                     viewMoreHref="/browse?sort=favourites&type=anime"
                  />
                  <ColumnSection
                     title="ANIME NEXT SEASON"
                     type="anime"
                     data={animeNextSeason}
                     viewMoreHref={`browse?type=anime&season=${nextSeason.season}&seasonYear=${nextSeason.year}&sort=popularity`}
                  />
               </Section>

               {/* <Rantings 
                  title='Top 50 Anime'
                  type='anime'
                  data={ratingAnime}
                  viewMoreHref='/browse?sort=score&type=anime'
               /> */}

               <Section>Lịch phát sóng</Section>
            </div>
         </ClientOnly>

      </React.Fragment>
   )
}

export const getServerSideProps: GetServerSideProps = async () => {
   const currentSeason = getSeason();
   const nextSeason = getNextSeason();
   const { data: trendingAnime } = await AnimeApi.getAnime({
      type: 'ANIME',
      perPage: 15,
      sort: 'TRENDING_DESC'
   })
   const { data: popularSeason } = await AnimeApi.getAnime({
      type: 'ANIME',
      seasonYear: currentSeason.year,
      sort: 'POPULARITY_DESC',
      season: currentSeason.season,
      perPage: 5,
   })
   const { data: popularAllTime } = await AnimeApi.getAnime({
      type: 'ANIME',
      sort: 'POPULARITY_DESC',
      perPage: 5,
   })
   const { data: favouriteAllTime } = await AnimeApi.getAnime({
      type: 'ANIME',
      sort: 'FAVOURITES_DESC',
      perPage: 5,
   })
   const { data: animeNextSeason } = await AnimeApi.getAnime({
      type: 'ANIME',
      sort: 'POPULARITY_DESC',
      season: nextSeason.season,
      seasonYear: 2022,
      perPage: 5,
   })
   const { data: ratingAnime } = await AnimeApi.getAnime({
      type: 'ANIME',
      // perPage: 15,
      sort: 'SCORE_DESC',
   })
   return {
      props: {
         trendingAnime: trendingAnime.Page.media,
         popularSeason: popularSeason.Page.media,
         popularAllTime: popularAllTime.Page.media,
         favouriteAllTime: favouriteAllTime.Page.media,
         animeNextSeason: animeNextSeason.Page.media,
         ratingAnime: ratingAnime.Page.media
      }
   }
}

export default Home;
