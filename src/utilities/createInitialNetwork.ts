import {
    BAR,
    BooleanAlgebraRelations,
} from '../definitions/BooleanAlgebraRelations';
import Network from '../definitions/Network';
import Relationship from '../definitions/Relationship';

export const createInitialNetworkRelations = (
    variables: Array<string>
): Network => {
    let initialNetworkRelations: Array<Relationship> = [];
    let inverseNetworkRelations: Array<Relationship> = [];
    const bars = Object.keys(BooleanAlgebraRelations) as BAR[];
    for (let x = 0; x < variables.length; x++) {
        for (let y = x + 1; y < variables.length; y++) {
            initialNetworkRelations.push({
                FirstVar: variables[x],
                SecondVar: variables[y],
                Relations: bars,
            });
            inverseNetworkRelations.push({
                FirstVar: variables[y],
                SecondVar: variables[x],
                Relations: bars,
            });
        }
    }
    return {
        Variables: variables,
        NetworkRelations: [
            ...initialNetworkRelations,
            ...inverseNetworkRelations,
        ],
    };
};
