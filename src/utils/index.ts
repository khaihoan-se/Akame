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