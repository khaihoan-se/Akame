import React from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import Head from '@/components/shared/Head'
import HomeBanner from '@/components/shared/HomeBanner'
import { Manga } from '@/types'
import AnimeApi from '@/api/AnilistApi'
import ClientOnly from '@/components/shared/ClientOnly'
import Section from '@/components/shared/Section'
import ColumnSection from '@/components/shared/ColumnSection'

interface HomaPage {
   trendingManga: Manga[];
   popularAllTime: Manga[];
   favouriteAllTime: Manga[];
}

const Manga: NextPage<HomaPage> = ({
   trendingManga,
   popularAllTime,
   favouriteAllTime
}) => {
   return (
      <div>
         <Head
            title="Akame - Manga"
         />
         
         <ClientOnly>
            <HomeBanner type='manga' data={trendingManga} />

            <div className='scale-y-8'>
               <Section className="flex flex-col md:flex-row items-center md:space-between space-y-4 space-x-0 md:space-y-0 md:space-x-4">
                  <ColumnSection
                     title='ALL TIME POPULAR'
                     type='manga'
                     data={popularAllTime}
                     viewMoreHref='/browse?sort=popularity&type=manga'
                  />
                  <ColumnSection
                     title='All TIME FAVORITE'
                     type='manga'
                     data={favouriteAllTime}
                     viewMoreHref='browse?sort=favourites&type=manga'
                  />
               </Section>
            </div>
         </ClientOnly>
      </div>
   )
}

export const getServerSideProps: GetServerSideProps = async () => {
   const { data: trendingManga } = await AnimeApi.getAnime({
      type: 'MANGA',
      perPage: 15,
      sort: 'TRENDING_DESC'
   })
   const { data: popularAllTime } = await AnimeApi.getAnime({
      type: 'MANGA',
      perPage: 5,
      sort: 'POPULARITY_DESC'
   })
   const { data: favouriteAllTime } = await AnimeApi.getAnime({
      type: 'MANGA',
      perPage: 5,
      sort: 'FAVOURITES_DESC'
   })
   return {
      props: {
         trendingManga: trendingManga.Page.media,
         popularAllTime: popularAllTime.Page.media,
         favouriteAllTime: favouriteAllTime.Page.media
      }
   }
}

export default Manga;
