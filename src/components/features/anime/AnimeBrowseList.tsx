import { Anime, Manga } from '@/types';
import React from 'react';
import List from '@/components/shared/List'
import Card from '@/components/shared/Card';

interface AnimeBrowseListProps<T> {
    data: T extends "anime" ? Anime[] : Manga[];
    type: T;
}
const AnimeBrowseList = <T extends "anime" | "manga">({
    data,
    type
}: AnimeBrowseListProps<T>) => {
    return (
        <div className="mt-8">
            {/* <List data={data}>
                {(data) => <Card data={data} type="anime" />}
            </List> */}
        </div>
    );
}

export default AnimeBrowseList;
