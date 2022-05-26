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

export function luminance(r: number, g: number, b: number) {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function contrast(rgb1: number[], rgb2: number[]) {
  var lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  var lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
export function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}

export const isColorVisible = (
  textColor: string,
  backgroundColor: string = "#000000",
  ratio: number = 3.2
) => {
  const textColorRgb: any = hexToRgb(textColor);
  const backgroundColorRgb: any = hexToRgb(backgroundColor);

  return contrast(textColorRgb, backgroundColorRgb) >= ratio;
};

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
