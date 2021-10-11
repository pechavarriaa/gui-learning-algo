import Relationship from "./Relationship";

export default interface Network {
    Variables: Array<string>;
    NetworkRelations: Array<Relationship>;
}
