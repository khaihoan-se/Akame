import Image from "@/components/shared/Image";
import { Anime, CharacterEdge, Manga } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface CharacterCardProps<T> {
  characterConnection: CharacterEdge<T extends "anime" ? Anime : Manga>;
  type: T;
}

const CharacterConnectionCard = <T extends "anime" | "manga">({
  characterConnection,
  type: T,
}: CharacterCardProps<T>) => {
  return (
    <Link href={`/characters/details/${characterConnection.node.id}`}>
      <a>
        <div className="text-gray-300 space-x-4 col-span-1 flex w-full h-24 bg-background-900 hover:bg-white/20 transtion duration-300">
          <div className="relative h-full w-16">
            <Image
              src={characterConnection.node.image.large}
              layout="fill"
              objectFit="cover"
              alt={`${characterConnection.node.name.full}`}
            />
          </div>

          <div className="py-2 flex flex-col justify-between">
            <p className="font-semibold">
              {characterConnection.node.name.full}
            </p>

            <p>
              {characterConnection.role}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default React.memo(
  CharacterConnectionCard
) as typeof CharacterConnectionCard;
