import axiosClient from "./axiosClient";

interface VariablesType {
   [key: string]: any;
}

const query = `query (
      $page: Int, 
      $perPage: Int, 
      $id: Int, 
      $search: String, 
      $seasonYear: Int, 
      $type: MediaType, 
      $season: MediaSeason, 
      $sort: [MediaSort],
      $genre: String,
   ) {
   Page( page: $page, perPage: $perPage ) {
      pageInfo {
         total
         currentPage
         lastPage
         hasNextPage
         perPage
      }
      media( 
            type: $type, 
            sort: $sort, 
            season: $season, 
            seasonYear: $seasonYear, 
            search: $search, 
            id: $id,
            genre: $genre
         ) {
         description
         trailer {
            id
            site
         }
         id
         idMal
         title {
            romaji
            english
            native
            userPreferred
         }
         coverImage {
            extraLarge
            large
            medium
            color
         }
         startDate {
            year
            month
            day
         }
         endDate {
            day
            month
            year
         }
         trending
         popularity
         favourites
         bannerImage
         season
         seasonYear
         format
         status(version: 2)
         chapters
         episodes
         duration
         genres
         isAdult
         countryOfOrigin
         averageScore
         meanScore
         synonyms
         studios {
            edges {
               id
               isMain
               node {
                  id
                  name
                  isAnimationStudio
                  favourites
               }
            }
         }
         characters(sort: ROLE) {
            edges {
            id
            name
            role
            voiceActors {
               id
               name {
                  first
                  middle
                  last
                  full
                  native
                  userPreferred
               }
               primaryOccupations
               language: languageV2
               image {
                  large
                  medium
               }
               gender
               dateOfBirth {
                  year
                  month
                  day
               }
               dateOfDeath {
                  year
                  month
                  day
               }
               age
               yearsActive
               homeTown
               bloodType
               favourites
            }
            node {
               id
               name {
                  first
                  middle
                  last
                  full
                  native
                  userPreferred
               }
               image {
                  large
                  medium
               }
               gender
               dateOfBirth {
                  year
                  month
                  day
               }
               age
               favourites
               bloodType
            }
            }
         }
         relations {
            edges {
               relationType(version: 2)
               node {
                  id
                  averageScore
                  bannerImage
                  countryOfOrigin
                  coverImage {
                  color
                  medium
                  large
                  extraLarge
                  }
                  description
                  duration
                  favourites
                  format
                  genres
                  isAdult
                  popularity
                  season
                  seasonYear
                  status
                  title {
                  english
                  native
                  romaji
                  userPreferred
                  }
               }
            }
         }
         recommendations(sort: RATING_DESC) {
            nodes {
               mediaRecommendation {
                  id
                  averageScore
                  bannerImage
                  countryOfOrigin
                  coverImage {
                     color
                     medium
                     large
                     extraLarge
                  }
                  description
                  duration
                  favourites
                  format
                  genres
                  isAdult
                  popularity
                  season
                  seasonYear
                  status
                  title {
                  english
                  native
                  romaji
                  userPreferred
                  }
               }
            }
         }
         airingSchedule(notYetAired: true) {
            nodes {
               airingAt
               episode
               mediaId
               id
            }
         }
         tags {
            name
         }
      }
   }
}
`;

const AnimeApi = {
   getAnime: (variables: VariablesType) => { 
      return axiosClient.request({
         method: 'POST',
         data: {
            query: query,
            variables: variables
         }
      })
   }
}

export default AnimeApi;