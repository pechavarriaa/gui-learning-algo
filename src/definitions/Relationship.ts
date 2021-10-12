import { BAR } from "./BooleanAlgebraRelations";

export default interface Relationship {
    firstVar: string;
    secondVar: string;
    relations: Array<BAR>;
}
