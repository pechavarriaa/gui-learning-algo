import { useTheme } from '@fluentui/react';
import { FC, useEffect, useMemo, useRef } from 'react';
import {
    DataSet,
    Network as VisualNetwork,
    Data,
} from 'vis-network/standalone/esm/vis-network';
import Network from '../definitions/Network';
import { enumOfBAR } from '../definitions/BooleanAlgebraRelations';
import Relationship from '../definitions/Relationship';

export type GraphProps = {
    network: Network;
};

export const Graph: FC<GraphProps> = ({ network }) => {
    // A reference to the div rendered by this component
    const domNode = useRef<HTMLDivElement>(null);

    // A reference to the vis network instance
    const visNetwork = useRef<VisualNetwork | null>(null);

    const nodesDataSet = network.Variables.map((nameOfVar, i) => {
        return {
            id: i,
            label: nameOfVar,
        };
    });

    type edge = {
        from: number;
        to: number;
        label: string;
    };

    const getLabelForRelation = (
        firstVar: string,
        secondVar: string,
        networkRelations: Array<Relationship>
    ) => {
        let enumString = '[';
        for (let x = 0; x < networkRelations.length; x++) {
            if (
                networkRelations[x].firstVar === firstVar &&
                networkRelations[x].secondVar === secondVar
            ) {
                for (let y = 0; y < networkRelations[x].relations.length; y++) {
                    enumString = `${enumString}${
                        enumOfBAR[networkRelations[x].relations[y]]
                    },`;
                }
            }
        }
        enumString = enumString.substr(0, enumString.lastIndexOf(',')) + ']';
        return enumString;
    };

    const edgesDataSet = useMemo((): DataSet => {
        let edgesDataTemp: Array<edge> = [];
        for (let x = 0; x < network.Variables.length; x++) {
            for (let y = x + 1; y < network.Variables.length; y++) {
                edgesDataTemp.push({
                    from: x,
                    to: y,
                    label: getLabelForRelation(
                        network.Variables[x],
                        network.Variables[y],
                        network.NetworkRelations
                    ),
                });
            }
        }
        return edgesDataTemp;
    }, [network]);

    const data = useMemo((): Data => {
        const nodes = new DataSet(nodesDataSet);
        const edges = new DataSet(edgesDataSet);
        return {
            nodes,
            edges,
        };
    }, [edgesDataSet, nodesDataSet]);

    useEffect(() => {
        var options = {
            autoResize: false,
            height: '100%',
            width: '100%',
            edges: {
                arrows: {
                    to: {
                        enabled: true,
                        imageHeight: undefined,
                        imageWidth: undefined,
                        scaleFactor: 1,
                        src: undefined,
                        type: 'arrow',
                    },
                },
                font: {
                    size: 4,
                },
            },
        };
        if (domNode.current) {
            visNetwork.current = new VisualNetwork(
                domNode.current,
                data,
                options
            );
        }
    }, [domNode, visNetwork, data]);

    return (
        <div
            style={{
                borderRadius: '10px',
                width: '800px',
                height: '500px',
                backgroundColor: useTheme().palette.neutralQuaternary,
            }}
            ref={domNode}
        />
    );
};
