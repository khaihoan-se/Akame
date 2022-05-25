import dayjs from '@/lib/dayjs'

export const getSeason = () => {
    const month = dayjs().month();
    const year = dayjs().year();
    let season = "WINTER";
  
    if (3 <= month && month <= 5) {
      season = "SPRING";
    }
  
    if (6 <= month && month <= 8) {
      season = "SUMMER";
    }
  
    if (9 <= month && month <= 11) {
      season = "FALL";
    }
  
    return {
      season,
      year,
    };
};

export const getNextSeason = () => {
  const month = dayjs().month();
  const year = dayjs().year();
  let season = "SPRING"; /* SPRING */
  
  if (3 <= month && month <= 5) {
    season = "SUMMER"; /* SUMMER */
  }

  if (6 <= month && month <= 8) {
    season = "FALL"; /* FALL */
  }

  if (9 <= month && month <= 11) {
    season = "WINTER"; /* WINTER */
  }

  return {
    season,
    year
  }
}