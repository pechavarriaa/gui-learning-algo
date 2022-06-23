import { FC, useState } from 'react';
import {
    DefaultButton,
    FontWeights,
    Stack,
    Text,
    useTheme,
} from '@fluentui/react';
import Network from '../definitions/Network';
import {
    BooleanAlgebraRelations,
    grammarQuestionForBAR,
    InverseBAR,
} from '../definitions/BooleanAlgebraRelations';
import Relationship from '../definitions/Relationship';

export type QueriesProps = {
    network: Network;
    setNetwork: (network: Network) => void;
    setIsNetworkConstrained: (isNetworkConstrained: boolean) => void;
};

export const Queries: FC<QueriesProps> = ({
    network,
    setNetwork,
    setIsNetworkConstrained,
}) => {
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
    const [atLeastTwoPairs, setAtLeastTwoPairs] = useState<boolean>(true);

    const getCurrentRelation = () => {
        return network.NetworkRelations[currentNetworkRelation].relations[
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
                            .firstVar
                    }" ${BooleanAlgebraRelations[getCurrentRelation()]}
                    "${
                        network.NetworkRelations[currentNetworkRelation]
                            .secondVar
                    }"?`}
                </Text>
            </Stack>
            <Stack horizontal>
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
                        onClick={() => {
                            filterNetworkRelations(
                                true,
                                currentRelation,
                                currentNetworkRelation,
                                network,
                                setNetwork,
                                setCurrentRelation,
                                setCurrentNetworkRelation,
                                setIsNetworkConstrained,
                                setAtLeastTwoPairs
                            );
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
                            filterNetworkRelations(
                                false,
                                currentRelation,
                                currentNetworkRelation,
                                network,
                                setNetwork,
                                setCurrentRelation,
                                setCurrentNetworkRelation,
                                setIsNetworkConstrained,
                                setAtLeastTwoPairs
                            );
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
                                setCurrentNetworkRelation,
                                setIsNetworkConstrained,
                                setAtLeastTwoPairs
                            )
                        }
                    />
                </Stack.Item>
                {atLeastTwoPairs && (
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
                                    setCurrentNetworkRelation,
                                    setIsNetworkConstrained,
                                    setAtLeastTwoPairs
                                )
                            }
                        />
                    </Stack.Item>
                )}
            </Stack>
        </Stack>
    );
};

const setNextQuestion = (
    nextPair: boolean,
    network: Network,
    currentRelation: number,
    currentNetworkRelation: number,
    setCurrentRelation: (currentRelation: number) => void,
    setCurrentNetworkRelation: (currentNetworkRelation: number) => void,
    setIsNetworkConstrained: (isNetworkConstrained: boolean) => void,
    setAtLeastTwoPairs: (atLeastTwoPairs: boolean) => void
) => {
    let numberOfConstrainedRelations = 0;
    for (let x = 0; x < network.NetworkRelations.length / 2; x++) {
        if (network.NetworkRelations[x].relations.length === 1) {
            numberOfConstrainedRelations++;
        }
    }
    if (numberOfConstrainedRelations === network.NetworkRelations.length / 2) {
        setIsNetworkConstrained(true);
        return;
    }
    if (
        numberOfConstrainedRelations + 1 ===
        network.NetworkRelations.length / 2
    ) {
        setAtLeastTwoPairs(false);
    }

    const getNextPair = (netRelations: Array<Relationship>): number => {
        let x = 1;
        while (
            netRelations[
                (x + currentNetworkRelation) % (netRelations.length / 2)
            ].relations.length === 1
        ) {
            x++;
        }
        return (x + currentNetworkRelation) % (netRelations.length / 2);
    };

    if (
        nextPair === true ||
        currentRelation + 1 ===
            network.NetworkRelations[currentNetworkRelation].relations.length
    ) {
        const nextPairOfVars = getNextPair(network.NetworkRelations);
        setCurrentNetworkRelation(nextPairOfVars);
        setCurrentRelation(0);
    } else {
        setCurrentRelation(currentRelation + 1);
    }
};

const filterNetworkRelations = (
    positiveAnswer: boolean,
    currentRelation: number,
    currentNetworkRelation: number,
    network: Network,
    setNetwork: (network: Network) => void,
    setCurrentRelation: (currentRelation: number) => void,
    setCurrentNetworkRelation: (currentNetworkRelation: number) => void,
    setIsNetworkConstrained: (isNetworkConstrained: boolean) => void,
    setAtLeastTwoPairs: (atLeastTwoPairs: boolean) => void
) => {
    const indexOfInverseRelation =
        currentNetworkRelation + network.NetworkRelations.length / 2;
    let filteredNetworkRelations: Array<Relationship> = [];
    for (let x = 0; x < network.NetworkRelations.length; x++) {
        if (x !== currentNetworkRelation && x !== indexOfInverseRelation) {
            filteredNetworkRelations.push(network.NetworkRelations[x]);
        } else {
            const allenKey =
                x === currentNetworkRelation
                    ? network.NetworkRelations[x].relations[currentRelation]
                    : InverseBAR[
                          network.NetworkRelations[x].relations[currentRelation]
                      ];
            let newRelationsForTuple: Relationship = {
                firstVar: network.NetworkRelations[x].firstVar,
                secondVar: network.NetworkRelations[x].secondVar,
                relations: network.NetworkRelations[x].relations.filter((rel) =>
                    positiveAnswer ? rel === allenKey : rel !== allenKey
                ),
            };
            filteredNetworkRelations.push(newRelationsForTuple);
        }
    }
    let propagatedNetworkRelations: Array<Relationship> = [];
    let requestFailed = false;
    fetch('http://localhost:5000/BooleanAlgebra/constraintNetwork', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Variables: network.Variables,
            NetworkRelations: filteredNetworkRelations,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            propagatedNetworkRelations = data.networkRelations;
        })
        .catch(() => (requestFailed = true))
        .finally(() => {
            if (!requestFailed) {
                const propagatedNetwork = setPropagatedNetwork(
                    propagatedNetworkRelations,
                    network.NetworkRelations,
                    network.Variables
                );
                setNetwork(propagatedNetwork);
                setNextQuestion(
                    true,
                    propagatedNetwork,
                    currentRelation,
                    currentNetworkRelation,
                    setCurrentRelation,
                    setCurrentNetworkRelation,
                    setIsNetworkConstrained,
                    setAtLeastTwoPairs
                );
            }
        });
};

export const setPropagatedNetwork = (
    propagatedRelations: Array<Relationship>,
    networkRelations: Array<Relationship>,
    variables: Array<string>
): Network => {
    let finalNetworkRelations: Array<Relationship> = [];
    for (let x = 0; x < networkRelations.length; x++) {
        for (let y = 0; y < propagatedRelations.length; y++) {
            if (
                networkRelations[x].firstVar ===
                    propagatedRelations[y].firstVar &&
                networkRelations[x].secondVar ===
                    propagatedRelations[y].secondVar
            ) {
                finalNetworkRelations.push({
                    firstVar: networkRelations[x].firstVar,
                    secondVar: networkRelations[x].secondVar,
                    relations: propagatedRelations[y].relations,
                });
                break;
            }
        }
    }
    return {
        Variables: variables,
        NetworkRelations: finalNetworkRelations,
    };
};
