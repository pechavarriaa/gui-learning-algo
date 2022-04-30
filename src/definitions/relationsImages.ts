import { BooleanAlgebraRelations } from './BooleanAlgebraRelations';

export type relImagesDict = {
    [key: string]: string;
};

export let relationImages: relImagesDict = {};

for (const relation in BooleanAlgebraRelations) { 
    relationImages[relation] = require(`../assets/images/${relation}.png`).default;
}
