import { FC, useState } from 'react';
import {
    FontWeights,
    Stack,
    StackItem,
    Text,
    DefaultButton,
    useTheme,
    Link,
} from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import Network from '../definitions/Network';
import { ConditionalPreferencesCard } from './ConditionalPreferenceCard';
import { BooleanAlgebraRelations } from '../definitions/BooleanAlgebraRelations';
import { PreferenceOrderByPair, PreferenceVariables } from './Preferences';
import Relationship from '../definitions/Relationship';

export type ConditionalPreferencesProps = {
    network: Network;
    preferenceOrders: PreferenceOrderByPair[];
    setPreferenceOrders: (preferenceOrders: PreferenceOrderByPair[]) => void;
    singlePreferenceRelations: Relationship[];
    setSinglePreferenceRelations: (
        singlePreferenceRelations: Relationship[]
    ) => void;
};

export type PairDisjointSet = {
    [key: string]: string;
};

export const ConditionalPreferences: FC<ConditionalPreferencesProps> = ({
    network,
    preferenceOrders,
    setPreferenceOrders,
    singlePreferenceRelations,
    setSinglePreferenceRelations
}) => {
    let initialPairsDisjointSet: PairDisjointSet = {};
    for (let x = 0; x < network.Variables.length; x++) {
        for (let y = x + 1; y < network.Variables.length; y++) {
            initialPairsDisjointSet[
                `${network.Variables[x]}-${network.Variables[y]}`
            ] = `${network.Variables[x]}-${network.Variables[y]}`;
        }
    }

    const [pairDisjointSet, setPairDisjointSet] = useState<PairDisjointSet>(
        initialPairsDisjointSet
    );

    let initialPreferenceOrder: { [key: string]: string[] } = {};
    for (const rel of Object.keys(BooleanAlgebraRelations)) {
        initialPreferenceOrder[rel] = Object.keys(BooleanAlgebraRelations).map(
            (rel) => rel.toString()
        );
    }
    const [preferenceOrder, setPreferenceOrder] = useState<{
        [key: string]: string[];
    }>(initialPreferenceOrder);

    const [editMode, setEditMode] = useState(false);

    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(false);

    const initialPreferenceVariables = {
        firstVar: '',
        secondVar: '',
        thirdVar: '',
        fourthVar: '',
    };

    const [preferenceVariables, setPreferenceVariables] =
        useState<PreferenceVariables>(initialPreferenceVariables);

    const resetConditionalPreferenceCard = () => {
        setPreferenceOrder(initialPreferenceOrder);
        setPreferenceVariables(initialPreferenceVariables);
    };

    const setEditModeVariables = (
        preferenceOrderByPair: PreferenceOrderByPair
    ) => {
        setPreferenceOrder(preferenceOrderByPair.PreferenceOrder);
        setPreferenceVariables(preferenceOrderByPair.PreferenceVariables);
        setEditMode(true);
        toggleHideDialog();
    };

    return (
        <Stack
            horizontalAlign="start"
            gap={'5px'}
            styles={{ root: { marginBottom: '10px' } }}
        >
            <StackItem>
                <Text
                    variant="mediumPlus"
                    styles={{
                        root: {
                            fontWeight: FontWeights.semibold,
                        },
                    }}
                >
                    Conditional Preferences
                </Text>
            </StackItem>
            <StackItem>
                <Stack>
                    <Stack horizontal>
                        <StackItem
                            align="start"
                            styles={{ root: { marginBottom: '10px' } }}
                        >
                            <DefaultButton
                                styles={{
                                    root: {
                                        margin: '5px',
                                        padding: '2px 30px',
                                        backgroundColor:
                                            useTheme().palette.tealLight,
                                    },
                                }}
                                onClick={() => {
                                    if (editMode) {
                                        resetConditionalPreferenceCard();
                                    }
                                    setEditMode(false);
                                    toggleHideDialog();
                                }}
                            >
                                Add new
                            </DefaultButton>
                        </StackItem>
                    </Stack>
                    <StackItem>
                        <ConditionalPreferencesCard 
                            pairDisjointSet={pairDisjointSet}
                            setPairDisjointSet={setPairDisjointSet}
                            preferenceOrders={preferenceOrders}
                            setPreferenceOrders={setPreferenceOrders}
                            network={network}
                            isOpen={hideDialog}
                            editMode={editMode}
                            toggleHideDialog={toggleHideDialog}
                            preferenceVariables={preferenceVariables}
                            setPreferenceVariables={setPreferenceVariables}
                            preferenceOrder={preferenceOrder}
                            setPreferenceOrder={setPreferenceOrder}
                            resetConditionalPreferenceCard={
                                resetConditionalPreferenceCard
                            }
                            singlePreferenceRelations={singlePreferenceRelations}
                            setSinglePreferenceRelations={setSinglePreferenceRelations}
                        />
                    </StackItem>
                    <StackItem>
                        {preferenceOrders?.map((preferenceOrderByPair) => (
                            <h5>
                                <Link
                                    onClick={() =>
                                        setEditModeVariables(
                                            preferenceOrderByPair
                                        )
                                    }
                                >
                                    Edit
                                </Link>{' '}
                                Preference between pairs (
                                {
                                    preferenceOrderByPair.PreferenceVariables
                                        .firstVar
                                }
                                ,
                                {
                                    preferenceOrderByPair.PreferenceVariables
                                        .secondVar
                                }
                                ) and (
                                {
                                    preferenceOrderByPair.PreferenceVariables
                                        .thirdVar
                                }
                                ,
                                {
                                    preferenceOrderByPair.PreferenceVariables
                                        .fourthVar
                                }
                                )
                            </h5>
                        ))}
                    </StackItem>
                </Stack>
            </StackItem>
        </Stack>
    );
};
