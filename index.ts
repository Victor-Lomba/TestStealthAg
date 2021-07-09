import Jimp from 'jimp'

type Pixel = RGBA &{
  x: number,
  y: number,
  hasWaterBelow?:boolean
}

type RGBA = {
  r: number,
  g: number,
  b: number,
  a: number,
}

const red = {r:255, g:0, b:0, a:255}
const white = {r:255, g:255, b:255, a:255}
const blue = {r:0, g:0, b:255, a:255}

const findSelectedColorPixels = (colorArray: Pixel[], color: RGBA):Pixel[] => {
  return colorArray.filter(({r, g, b, a}) => r == color.r && g == color.g && b == color.b && a == color.a)
}

const hasWaterPixelBelow = (pixel:Pixel, waterPixels:number[]):boolean => {
  let WaterPixelBellow = false;
  waterPixels.forEach(waterPixel => {
    if(pixel.x == waterPixel){
      WaterPixelBellow = true
      
    }
  })
  return WaterPixelBellow;
}

const readColorsFromImage = async ():Promise<Pixel[]> => {
  let colorArray = [] as Pixel[];

  const image = await Jimp.read('./image/meteor_challenge_01.png');
  const width = image.getWidth(), height = image.getHeight();

  for(let x = 0; x < width; x++){
    for(let y = 0; y < height; y++){
      colorArray.push( {x,y,...Jimp.intToRGBA(image.getPixelColor(x,y) )} as Pixel);
    }
  }
  return colorArray;
}


const main = async () => {
  const colorArray = await readColorsFromImage();

  const stars = findSelectedColorPixels(colorArray,white)
  const meteors = findSelectedColorPixels(colorArray,red)
  const water = findSelectedColorPixels(colorArray,blue)

  let waterLocationArray = water.map(value => value.x)
  waterLocationArray = waterLocationArray.filter((value,index,array) => {
    return array.indexOf(value) === index
  })



  let meteorsWithWaterBelow = [] as Pixel[];
  meteors.forEach(meteor => {
    if(hasWaterPixelBelow(meteor, waterLocationArray)){
      meteorsWithWaterBelow.push(meteor)
    }
  })
  
  console.log(`\n\nNumero de estrelas na foto: ${stars.length}\n\nNumero de meteoros na foto: ${meteors.length}\n\nNumero de meteoros que cairão na agua: ${meteorsWithWaterBelow.length}\n\n`)
}

main()