import React from 'react';
import { Anime, Manga } from "@/types";
import List from './List';
import Card from './Card';
import ListSkeleton from '../skeletons/ListSkeleton';


interface BrowseListProps<T> {
   data: T extends "anime" ? Anime[] : Manga[];
   type: T;
   loading: boolean
}

const BrowseList = <T extends "anime" | "manga">({
   data,
   type,
   loading
}: BrowseListProps<T>) => {
   
   return (
      <React.Fragment>
         {
            loading ? <ListSkeleton />
            :   <List
                     data={data.map((anime: any) => anime)}
                  >
                     {(data) => <Card data={data} type={type} />}
                  </List>
         }
      </React.Fragment>
   )
}

export default React.memo(BrowseList)