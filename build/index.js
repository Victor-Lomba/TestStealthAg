"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jimp_1 = __importDefault(require("jimp"));
const red = { r: 255, g: 0, b: 0, a: 255 };
const white = { r: 255, g: 255, b: 255, a: 255 };
const blue = { r: 0, g: 0, b: 255, a: 255 };
const findSelectedColorPixels = (colorArray, color) => {
    return colorArray.filter(({ r, g, b, a }) => r == color.r && g == color.g && b == color.b && a == color.a);
};
const hasWaterPixelBelow = (pixel, waterPixels) => {
    let WaterPixelBellow = false;
    waterPixels.forEach(waterPixel => {
        if (pixel.x == waterPixel) {
            WaterPixelBellow = true;
        }
    });
    return WaterPixelBellow;
};
const readColorsFromImage = () => __awaiter(void 0, void 0, void 0, function* () {
    let colorArray = [];
    const image = yield jimp_1.default.read('./image/meteor_challenge_01.png');
    const width = image.getWidth(), height = image.getHeight();
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            colorArray.push(Object.assign({ x, y }, jimp_1.default.intToRGBA(image.getPixelColor(x, y))));
        }
    }
    return colorArray;
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const colorArray = yield readColorsFromImage();
    const stars = findSelectedColorPixels(colorArray, white);
    const meteors = findSelectedColorPixels(colorArray, red);
    const water = findSelectedColorPixels(colorArray, blue);
    let waterLocationArray = water.map(value => value.x);
    waterLocationArray = waterLocationArray.filter((value, index, array) => {
        return array.indexOf(value) === index;
    });
    let meteorsWithWaterBelow = [];
    meteors.forEach(meteor => {
        if (hasWaterPixelBelow(meteor, waterLocationArray)) {
            meteorsWithWaterBelow.push(meteor);
        }
    });
    console.log(`\n\nNumero de estrelas na foto: ${stars.length}\n\nNumero de meteoros na foto: ${meteors.length}\n\nNumero de meteoros que cairão na agua: ${meteorsWithWaterBelow.length}\n\n`);
});
main();
//# sourceMappingURL=index.js.map