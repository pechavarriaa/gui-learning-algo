import { BAR } from "./BooleanAlgebraRelations";

export default interface Relationship {
    FirstVar: string;
    SecondVar: string;
    Relations: Array<BAR>;
}
