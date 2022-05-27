import AnimeApi from "@/api/AnilistApi";
import { Anime } from "@/types";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import Image from '@/components/shared/Image'
import { AnimatePresence, motion } from "framer-motion";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "@/components/shared/Head";
import YouTube from "react-youtube";
import classNames from "classnames";
import PlainCard from '@/components/shared/PlainCard'
import withRedirect from '@/hocs/withRedirect'
import InfoItem from "@/components/shared/InfoItem";
import Link from "next/link";
import dayjs from "@/lib/dayjs";
import DotList from "@/components/shared/DotList";
import MediaDescription from "@/components/shared/MediaDescription";


const bannerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
interface DetailsProps {
  animeDetail: Anime[];
}
const DetailsPage: React.FC<DetailsProps> = ({
  animeDetail
}) => {
  const data = animeDetail[0]
  console.log(data);
  
  const title = data?.title.english
  const description = data?.description

  const nextAiringSchedule = useMemo(
    () =>
      data?.airingSchedule.nodes
        ?.sort((a, b) => a.episode - b.episode)
        .find((schedule) => dayjs.unix(schedule.airingAt).isAfter(dayjs())),
    [data?.airingSchedule]
  );

  const nextAiringScheduleTime = useMemo(() => {
    if (!nextAiringSchedule?.airingAt) return null;

    return dayjs.unix(nextAiringSchedule.airingAt).fromNow();
  }, [nextAiringSchedule?.airingAt]);

  const [showTrailer, setShowTrailer] = useState(false);
  const [player, setPlayer] =
    useState<ReturnType<YouTube["getInternalPlayer"]>>();
  const [isMuted, setIsMuted] = useState(true);
  const isRanOnce = useRef(false);

  const mute = useCallback(() => {
    if (!player) return;

    player.mute();

    setIsMuted(true);
  }, [player]);

  const unMute = useCallback(() => {
    if (!player) return;

    player.unMute();

    setIsMuted(false);
  }, [player]);

  useEffect(() => {
    setShowTrailer(false);
  }, [data]);

  return (
    <>
      <Head
        title={`${title} - Akame`}
        description={description}
        image={data.bannerImage}
      />

      <div className="pb-8">
        {/* Banner */}
        <div className="group relative w-full h-[450px] overflow-hidden">
          <AnimatePresence>
            {
              data.bannerImage && !showTrailer && (
                <motion.div
                  variants={bannerVariants}
                  animate="animate"
                  exit="exit"
                  initial="initial"
                  className="w-full h-0"
                  key={title}
                >
                  <Image
                    src={data.bannerImage}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="50% 35%"
                    alt={data.bannerImage}
                  />
                </motion.div>
              )
            }
            {
              (data as Anime)?.trailer && (
                <YouTube
                  videoId={(data as Anime)?.trailer?.id}
                  onReady={({ target }) => {
                    setPlayer(target);
                  }}
                  onPlay={({ target }) => {
                    setShowTrailer(true);

                    if (!isRanOnce.current) {
                      setIsMuted(true);
                    } else if (!isMuted) {
                      setIsMuted(false);

                      target.unMute();
                    }

                    isRanOnce.current = true;
                  }}
                  onEnd={() => {
                    setShowTrailer(false);
                  }}
                  onError={() => {
                    setShowTrailer(false);
                  }}
                  containerClassName={classNames(
                    "relative w-full overflow-hidden aspect-w-16 aspect-h-9 h-[300%] -top-[100%]",
                    !showTrailer && "hidden"
                  )}
                  className="absolute inset-0 w-full h-full"
                  opts={{
                    playerVars: {
                      autoplay: 1,
                      modestbranding: 1,
                      controls: 0,
                      mute: 1,
                      origin: "https://kaguya.live",
                    },
                  }}
                />
              )
            }
          </AnimatePresence>
          <div className="absolute inset-0 flex flex-col justify-center px-4 banner__overlay md:px-12"></div>
        </div>
        {/* D */}
        <div className="relative px-4 pb-4 sm:px-12 bg-background-900">
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="shrink-0 relative left-1/2 -translate-x-1/2 md:static md:left-0 md:-translate-x-0 w-[186px] -mt-20 space-y-6">
              <PlainCard src={data.coverImage.extraLarge} alt={data.coverImage.extraLarge} />

              <div className="flex items-center space-x-1">
                <button>Add to List</button>
                <button>icons</button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between py-4 mt-4 text-center md:text-left md:items-start md:-mt-16 space-y-4">
              <div className="flex flex-col md:items-start items-center space-y-4">
                <div className="flex items-center flex-wrap gap-2 mb-16">
                 
                </div>
                <p className="mb-2 text-3xl font-semibold">{title}</p>

                <DotList>
                  {data.genres.map((genre: any) => (
                    <span key={genre}>
                      {genre}
                    </span>
                  ))}
                </DotList>

                <MediaDescription
                  description={description}
                  containerClassName="mt-4 mb-8"
                  className="text-gray-300 hover:text-gray-100 transition duration-300"
                />
              </div>

              <div className="flex space-x-8 overflow-x-auto snap-x snap-mandatory md:space-x-16">
                <InfoItem
                  title="Country"
                  value={data.countryOfOrigin}
                />
                <InfoItem
                  title='Total episodes'
                  value={data.totalEpisodes}
                />

                {data.duration && (
                  <InfoItem
                    title='Duration'
                    value={`${data.duration} minutes`}
                  />
                )}

                <InfoItem
                  title="Status"
                  value={data.status}
                />
                <InfoItem
                  title="age_rated"
                  value={data.isAdult ? "18+" : ""}
                />

                {nextAiringSchedule && (
                  <InfoItem
                    className="!text-primary-300"
                    title='Next episode'
                    value={`Episode ${
                      nextAiringSchedule.episode
                    }: ${nextAiringScheduleTime}`}
                  />
                )}
              </div>
            </div>
          </div>       
        </div>

        <div className="w-full min-h-screen gap-8 px-4 mt-8 space-y-8 md:space-y-0 md:grid md:grid-cols-10 sm:px-12">
          <div className="md:col-span-2 xl:h-[max-content] space-y-4">
            <div className="bg-background-900 rounded-md p-4 space-y-4">
              <InfoItem
                title="Format"
                value={data.format}
              />
              <InfoItem title="English" value={data.title.english} />
              <InfoItem title="Native" value={data.title.native} />
              <InfoItem title="Romanji" value={data.title.romaji} />
              <InfoItem
                title='Popular'
                value={data.popularity}
              />
              <InfoItem
                title="Favorite"
                value={data.favourites}
              />
              <InfoItem
                title="Trending"
                value={data.trending}
              />

              {/* <InfoItem
                title="Studio"
                value={data.studios.map((studio) => (
                  <p key={studio.studioId}>
                    <Link href={`/studios/${studio.studioId}`}>
                      <a className="hover:text-primary-300 transition duration-300">
                        {studio.studio.name}
                      </a>
                    </Link>
                  </p>
                ))}
              /> */}

              <InfoItem
                title="Season"
                value={`${data.season} ${
                  data.seasonYear
                }`}
              />
              <InfoItem
                title="Synonyms"
                value={data.synonyms.join("\n")}
              />
            </div>

            {/* <div className="space-y-2 text-gray-400">
              <h1 className="font-semibold">Tags</h1>

              <ul className="space-y-2">
                {data.tags.map((tag) => (
                  <Link
                    href={{
                      pathname: "/browse",
                      query: { type: "anime", tags: tag },
                    }}
                    key={tag}
                  >
                    <a className="block">
                      <li className="p-2 rounded-md bg-background-900 hover:text-primary-300 transition duration-300">
                        {tag}
                      </li>
                    </a>
                  </Link>
                ))}
              </ul>
            </div> */}
          </div>
          {/* <div className="space-y-12 md:col-span-8">
            <DetailsSection
              title={t("episodes_section")}
              className="overflow-hidden"
            >
              {isLoading ? (
                <div className="h-full w-full flex items-center justify-center">
                  <Spinner />
                </div>
              ) : (
                <LocaleEpisodeSelector mediaId={anime.id} episodes={episodes} />
              )}
            </DetailsSection>

            {!!anime?.characters?.length && (
              <DetailsSection
                title={t("characters_section")}
                className="grid w-full grid-cols-1 gap-4 md:grid-cols-2"
              >
                {anime.characters.map((character, index) => (
                  <CharacterConnectionCard
                    characterConnection={character}
                    key={index}
                    type="anime"
                  />
                ))}
              </DetailsSection>
            )}

            {!!anime?.relations?.length && (
              <DetailsSection title={t("relations_section")}>
                <List data={anime.relations.map((relation) => relation.media)}>
                  {(anime) => <Card type="anime" data={anime} />}
                </List>
              </DetailsSection>
            )}

            {!!anime?.recommendations?.length && (
              <DetailsSection title={t("recommendations_section")}>
                <List
                  data={anime.recommendations.map(
                    (recommendation) => recommendation.media
                  )}
                >
                  {(anime) => <Card type="anime" data={anime} />}
                </List>
              </DetailsSection>
            )}

            <DetailsSection title={t("comments_section")}>
              <CommentsSection anime_id={anime.id} />
            </DetailsSection>
          </div> */}
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params: { params }
}: any) => {
  const { data: animeDetail } = await AnimeApi.getAnime({
    type: 'ANIME',
    id: Number(params[0])
  })
  return {
    props: {
      animeDetail: animeDetail.Page.media
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await AnimeApi.getAnime({
    type: 'ANIME',
    perPage: 5,
    sort: 'TRENDING_DESC'
  })
  const paths = data.Page.media.map((anime: Anime) => ({
    params: { params: [anime.id.toString()] },
  }));
  return { paths, fallback: "blocking" };
}
export default withRedirect(DetailsPage, (router, props) => {
  const { params } = router.query;
  const [id, slug] = params as string[];
  const title = props.animeDetail[0].title.english

  if (slug) return null;

  return {
    url: `/anime/details/${id}/${title}`,
    options: {
      shallow: true,
    },
  };
});
