import AnimeApi from "@/api/AnilistApi";
import { Manga } from "@/types";
import React from "react";
import Image from '@/components/shared/Image'
import { AnimatePresence, motion } from "framer-motion";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "@/components/shared/Head";
import PlainCard from '@/components/shared/PlainCard'
import InfoItem from "@/components/shared/InfoItem";
import Link from "next/link";
import DotList from "@/components/shared/DotList";
import MediaDescription from "@/components/shared/MediaDescription";
import DetailsSection from "@/components/shared/DetailsSection";
import Card from "@/components/shared/Card";
import List from "@/components/shared/List";
import { getDataText } from "@/utils";

const bannerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};
interface DetailsPageProps {
    mangaDetail: Manga[]
}
const DetailsPage: React.FC<DetailsPageProps> = ({
    mangaDetail
}) => {
    const data = mangaDetail[0];
    const title = data?.title.english;
    const description = data?.description;
    console.log(data);
    return (
        <>
            <Head
                title={`${title} - Kaguya`}
                description={description}
                image={data.bannerImage}
            />
            <div className="pb-8">
                {/* Banner */}
                <div className="group relative w-full h-[450px] overflow-hidden">
                    <AnimatePresence>
                        {
                            data.bannerImage && (
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
                                title="Status"
                                value={data.status}
                                />
                                <InfoItem
                                title="age_rated"
                                value={data.isAdult ? "18+" : ""}
                                />
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
                        <InfoItem
                            title="Episodes"
                            value={data.episodes}
                        />
                        <InfoItem
                            title="Episode Duration"
                            value={`${data.episodes} mins`}
                        />
                        <InfoItem
                            title="Status"
                            value={data.status}
                        />
                        <InfoItem
                            title="Start Date"
                            value={`${getDataText(data.startDate.month)} ${data.startDate.day}, ${data.startDate.year}`}
                        />
                        <InfoItem
                            title="End Date"
                            value={`${getDataText(data.endDate.month)} ${data.endDate.day}, ${data.endDate.year}`}
                        />
                        <InfoItem
                            title="Average Score"
                            value={`${data.averageScore}%`}
                        />
                        <InfoItem
                            title="Mean Score"
                            value={`${data.meanScore}%`}
                        />
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
                        <InfoItem title="English" value={data.title.english} />
                        <InfoItem title="Native" value={data.title.native} />
                        <InfoItem title="Romanji" value={data.title.romaji} />

                        <InfoItem
                            title="Synonyms"
                            value={data.synonyms.join("\n")}
                        />
                        </div>

                        <div className="space-y-2 text-gray-400">
                            <h1 className="font-semibold">Tags</h1>

                            <ul className="space-y-2">
                                {data.tags.map((tag) => (
                                <Link
                                    href={{
                                    pathname: "/browse",
                                    query: { type: "manga", tags: tag },
                                    }}
                                    key={tag}
                                >
                                    <a className="block">
                                    <li className="p-2 rounded-md bg-background-900 hover:text-primary-300 transition duration-300">
                                        {tag.name}
                                    </li>
                                    </a>
                                </Link>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-12 md:col-span-8">
                    {/* {!!data?.characters?.edges.length && (
                    <DetailsSection
                        title="Characters"
                        className="grid w-full grid-cols-1 gap-4 md:grid-cols-2"
                    >
                        {data.characters.edges.map((character, index) => (
                        <CharacterConnectionCard
                            characterConnection={character}
                            key={index}
                            type="anime"
                        />
                        ))}
                    </DetailsSection>
                    )} */}
                    {!!data?.recommendations?.nodes.length && (
                    <DetailsSection title="Recommendations">
                        <List
                        data={data.recommendations.nodes.map(
                            (recommendation) => recommendation.mediaRecommendation
                        )}
                        >
                        {(data: any) => <Card type="anime" data={data} />}
                        </List>
                    </DetailsSection>
                    )}
                    </div>
                </div>
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ({
    params: { params }
}: any) => {
    const { data: mangaDetail } = await AnimeApi.getAnime({
        type: 'MANGA',
        id: Number(params[0])
    })
    return {
        props: {
            mangaDetail: mangaDetail.Page.media
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await AnimeApi.getAnime({
        type: 'MANGA',
        perPage: 5,
        sort: 'TRENDING_DESC'
    })
    const paths = data.Page.media.map((anime: Manga) => ({
        params: { params: [anime.id.toString()] },
    }));
    return { paths, fallback: "blocking" };
}

export default DetailsPage