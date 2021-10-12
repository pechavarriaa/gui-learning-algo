import { FC, useState } from 'react';
import {
    DefaultButton,
    FontWeights,
    Stack,
    Text,
    useTheme,
} from '@fluentui/react';
import Network from '../definitions/Network';
import { BooleanAlgebraRelations } from '../definitions/BooleanAlgebraRelations';
import { grammarQuestionForBAR } from '../definitions/BooleanAlgebraRelations';

export type QueriesProps = {
    network: Network;
    setNetwork: (network: Network) => void;
};

export const Queries: FC<QueriesProps> = ({ network, setNetwork }) => {
    const theme = useTheme();
    const stackItemStyles = { root: { margin: '5px' } };
    const buttonStyles = {
        root: {
            margin: '5px',
            padding: '2px',
            backgroundColor: theme.palette.blueLight,
        },
    };
    const [currentNetworkRelation, setCurrentNetworkRelation] =
        useState<number>(0);
    const [currentRelation, setCurrentRelation] = useState<number>(0);

    const getCurrentRelation = () => {
        return network.NetworkRelations[currentNetworkRelation].Relations[
            currentRelation
        ];
    };
    return (
        <Stack
            styles={{
                root: {
                    backgroundColor: theme.palette.neutralQuaternaryAlt,
                    borderRadius: '6px',
                    padding: '10px',
                },
            }}
        >
            <Stack>
                <Text
                    variant={'large'}
                    styles={{
                        root: {
                            fontWeight: FontWeights.semibold,
                        },
                    }}
                >
                    {`${grammarQuestionForBAR[getCurrentRelation()]} "${
                        network.NetworkRelations[currentNetworkRelation]
                            .FirstVar
                    }" ${BooleanAlgebraRelations[getCurrentRelation()]}
                    "${
                        network.NetworkRelations[currentNetworkRelation]
                            .SecondVar
                    }"?`}
                </Text>
            </Stack>
            <Stack horizontal>
                {' '}
                <Stack.Item styles={stackItemStyles}>
                    <DefaultButton
                        text="Yes"
                        styles={{
                            root: {
                                margin: '5px',
                                padding: '2px',
                                backgroundColor: theme.palette.green,
                            },
                        }}
                    />
                </Stack.Item>
                <Stack.Item styles={stackItemStyles}>
                    <DefaultButton
                        text="No"
                        styles={{
                            root: {
                                margin: '5px',
                                padding: '2px',
                                backgroundColor: theme.palette.red,
                            },
                        }}
                        onClick={() => {
                            setPropagatedNetwork(network, setNetwork);
                        }}
                    />
                </Stack.Item>
                <Stack.Item styles={stackItemStyles}>
                    <DefaultButton
                        text="Next Question"
                        styles={buttonStyles}
                        onClick={() =>
                            setNextQuestion(
                                false,
                                network,
                                currentRelation,
                                currentNetworkRelation,
                                setCurrentRelation,
                                setCurrentNetworkRelation
                            )
                        }
                    />
                </Stack.Item>
                <Stack.Item styles={stackItemStyles}>
                    <DefaultButton
                        text="Next Pair"
                        styles={buttonStyles}
                        onClick={() =>
                            setNextQuestion(
                                true,
                                network,
                                currentRelation,
                                currentNetworkRelation,
                                setCurrentRelation,
                                setCurrentNetworkRelation
                            )
                        }
                    />
                </Stack.Item>
            </Stack>
        </Stack>
    );
};

// const filterOnAnswer = () => {};

const setNextQuestion = (
    nextPair: boolean,
    network: Network,
    currentRelation: number,
    currentNetworkRelation: number,
    setCurrentRelation: (currentRelation: number) => void,
    setCurrentNetworkRelation: (currentNetworkRelation: number) => void
): void => {
    if (nextPair === true) {
        if (
            currentNetworkRelation + 1 ===
            network.NetworkRelations.length / 2
        ) {
            setCurrentNetworkRelation(0);
            setCurrentRelation(0);
        } else {
            setCurrentNetworkRelation(currentNetworkRelation + 1);
            setCurrentRelation(0);
        }
    } else {
        if (
            currentRelation + 1 ===
            network.NetworkRelations[currentNetworkRelation].Relations.length
        ) {
            if (
                currentNetworkRelation + 1 ===
                network.NetworkRelations.length / 2
            ) {
                setCurrentNetworkRelation(0);
                setCurrentRelation(0);
            } else {
                setCurrentNetworkRelation(currentNetworkRelation + 1);
                setCurrentRelation(0);
            }
        } else {
            setCurrentRelation(currentRelation + 1);
        }
    }
};

const setPropagatedNetwork = (
    network: Network,
    setNetwork: (network: Network) => void
): void => {
    const { Variables, NetworkRelations } = network;
    let propagatedNetwork: Network = network;
    fetch('https://localhost:5001/BooleanAlgebra/constraintNetwork', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Variables, NetworkRelations }),
    })
        .then((response) => response.json())
        .then((data) => (propagatedNetwork = data));

    setNetwork(propagatedNetwork);
};
