import React, {useCallback} from 'react';
import PlainCard from '@/components/shared/PlainCard';
import DotList from '@/components/shared/DotList';
import TextIcon from '@/components/shared/TextIcon';
import { MdTagFaces } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { removeFavorite } from '@/redux/actions/favoriteAction';

interface Props {
    data: any
}

const ModuleFavorite: React.FC<Props> = ({ data }) => {
    const dispatch = useDispatch();
    
    console.log(data);
    
    return (
        <div className="absolute min-w-[450px] overflow-hidden right-0 top-14  p-4 bg-background rounded-md after:w-4 after:h-4 after:bg-black after:inline-block after:absolute after:top-[-7px] after:right-[10px] after:rotate-45">
            <div className="flex items-center justify-between">
                <p className='text-md'>Favorite</p>
                <p className='text-xs'>View All</p>
            </div>
            <div className="no-scroll mt-4 max-h-[500px] overflow-auto">
                {
                    data.map((item: any) => (
                        // <Link href={`/anime/details/${item.id}`} key={item.id}>
                            <div className="flex hover:bg-background-600 px-4 py-2 rounded-md cursor-pointer w-full" key={item.id}>
                                <div className="relative max-w-[70px] min-w-[70px] h-22">
                                    <PlainCard src={item.coverImage.large} className="w-full h-full object-cover rounded-md" />
                                </div>
                                <div className="ml-4 w-full">
                                    <p>{item.title.english || item.title.native}</p>
                                    <DotList>
                                        {item.genres.map((genre: any) => (
                                            <span key={genre}>
                                            {genre}
                                            </span>
                                        ))}
                                    </DotList>
                                    <div className="mt-1 flex items-center">
                                        {item.averageScore && (
                                            <TextIcon LeftIcon={MdTagFaces} iconClassName="text-green-300">
                                                <p>{item.averageScore}%</p>
                                            </TextIcon>
                                        )}
                                        <TextIcon LeftIcon={AiFillHeart} iconClassName="text-red-400" className="ml-4">
                                            <p>{item.favourites}</p>
                                        </TextIcon>
                                    </div>
                                    <button className="w-full px-2 py-2 bg-primary-500 hover:bg-primary-700 rounded-md mt-2"
                                        onClick={() => dispatch(removeFavorite(item.id))}
                                    >
                                        Remove 
                                    </button>
                                </div>
                            </div>
                        // </Link>
                    ))
                }
            </div>
        </div>
    );
}


export default ModuleFavorite;
