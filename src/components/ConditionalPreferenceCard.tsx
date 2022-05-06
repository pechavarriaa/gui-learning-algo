import { FC } from 'react';
import {
    Modal,
    mergeStyleSets,
    getTheme,
    FontWeights,
    IconButton,
    PrimaryButton,
} from '@fluentui/react';
import Network from '../definitions/Network';
import { BooleanAlgebraRelations } from '../definitions/BooleanAlgebraRelations';
import { ConditionalPreference } from './ConditionalPreference';
import { ConditionalPreferencePreset } from './ConditionalPreferencePreset';
import { PairDisjointSet, PreferenceVariables } from './ConditionalPreferences';
import { PreferenceOrderByPair } from './ConditionalPreferences';

export type ConditionalPreferencesCardProps = {
    network: Network;
    editMode: boolean;
    isOpen: boolean;
    toggleHideDialog: () => void;
    preferenceVariables: PreferenceVariables;
    setPreferenceVariables: (varPairs: PreferenceVariables) => void;
    preferenceOrder: { [key: string]: string[] };
    setPreferenceOrder: (preferenceOrder: { [key: string]: string[] }) => void;
    pairDisjointSet: PairDisjointSet;
    preferenceOrders?: PreferenceOrderByPair[];
    setPairDisjointSet: (pairDisjointSet: PairDisjointSet) => void;
    setPreferenceOrders: (
        preferenceOrderByPair: PreferenceOrderByPair[]
    ) => void;
    resetConditionalPreferenceCard: () => void;
};

const theme = getTheme();
const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
    },
    header: [
        theme.fonts.large,
        {
            flex: '1 1 auto',
            borderTop: `4px solid ${theme.palette.themePrimary}`,
            color: theme.palette.neutralLight,
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            padding: '12px 12px 14px 24px',
        },
    ],
    body: {
        flex: '4 4 auto',
        padding: '0 24px 24px 24px',
        overflowY: 'hidden',
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
    },
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: '0px 0px 20px 10px',
    },
});

export const ConditionalPreferencesCard: FC<
    ConditionalPreferencesCardProps
> = ({
    network,
    isOpen,
    editMode,
    toggleHideDialog,
    preferenceVariables,
    setPreferenceVariables,
    preferenceOrder,
    setPreferenceOrder,
    pairDisjointSet,
    setPairDisjointSet,
    preferenceOrders,
    setPreferenceOrders,
    resetConditionalPreferenceCard,
}) => {
    const setOrderOfRelations = (rel: string, orderOfRelations: string[]) => {
        setPreferenceOrder({
            ...preferenceOrder,
            ...{ [rel]: orderOfRelations },
        });
    };

    const varsAreDefined = () => {
        const { firstVar, secondVar, thirdVar, fourthVar } =
            preferenceVariables;
        return (
            firstVar !== '' &&
            secondVar !== '' &&
            thirdVar !== '' &&
            fourthVar !== ''
        );
    };

    const conditionalPreference = (rel: string) => {
        return editMode ? (
            <ConditionalPreferencePreset
                varPairs={preferenceVariables}
                relation={rel.toString()}
                orderOfRelations={preferenceOrder[rel]}
                setOrderOfRelations={setOrderOfRelations}
            />
        ) : (
            <ConditionalPreference
                varPairs={preferenceVariables}
                networkVars={network.Variables}
                setPreferenceVariables={setPreferenceVariables}
                orderOfRelations={preferenceOrder[rel]}
                setOrderOfRelations={setOrderOfRelations}
            />
        );
    };

    const conditionalPreferencePreset = (rel: string) => {
        return varsAreDefined() ? (
            <ConditionalPreferencePreset
                varPairs={preferenceVariables}
                relation={rel.toString()}
                orderOfRelations={preferenceOrder[rel]}
                setOrderOfRelations={setOrderOfRelations}
            />
        ) : null;
    };

    const find = (varPair: string): string => {
        if (pairDisjointSet[varPair] === varPair) {
            return varPair;
        }
        let tempPair = find(pairDisjointSet[varPair]);
        setPairDisjointSet({
            ...pairDisjointSet,
            ...{
                [pairDisjointSet[pairDisjointSet[varPair]]]: tempPair,
            },
        });
        return tempPair;
    };

    const merge = (firstPair: string, secondPair: string) => {
        let firstPairParent = find(firstPair);
        let secondPairParent = find(secondPair);
        setPairDisjointSet({
            ...pairDisjointSet,
            ...{
                [pairDisjointSet[secondPairParent]]: firstPairParent,
            },
        });
    };

    const saveChanges = () => {
        if (!varsAreDefined()) {
            alert('Variables must be set first');
            return;
        }
        const { firstVar, secondVar, thirdVar, fourthVar } =
            preferenceVariables;
        if (firstVar === thirdVar && secondVar === fourthVar) {
            alert('Pairs variables must be different');
            return;
        }
        if (editMode) {
            let newPreferenceOrders = [];
            for (let x = 0; x < preferenceOrders!.length; x++) {
                if (
                    firstVar ===
                        preferenceOrders![x].PreferenceVariables.firstVar &&
                    secondVar ===
                        preferenceOrders![x].PreferenceVariables.secondVar &&
                    thirdVar ===
                        preferenceOrders![x].PreferenceVariables.thirdVar &&
                    fourthVar ===
                        preferenceOrders![x].PreferenceVariables.fourthVar
                ) {
                    newPreferenceOrders.push({
                        PreferenceVariables: preferenceVariables,
                        PreferenceOrder: preferenceOrder,
                    });
                } else {
                    newPreferenceOrders.push(preferenceOrders![x]);
                }
            }
            setPreferenceOrders(newPreferenceOrders);
            resetConditionalPreferenceCard();
        } else {
            const firstPair = `${firstVar}-${secondVar}`;
            const secondPair = `${thirdVar}-${fourthVar}`;
            if (pairDisjointSet[secondPair] !== secondPair) {
                alert('Second pair already has a dependecy on another pair');
                return;
            }

            if (find(secondPair) === find(firstPair)) {
                alert('Adding this pairs would form a cycle');
                return;
            }

            merge(firstPair, secondPair);

            const preferenceOrderByPair: PreferenceOrderByPair = {
                PreferenceVariables: preferenceVariables,
                PreferenceOrder: preferenceOrder,
            };
            const prevOrders =
                preferenceOrders !== undefined ? preferenceOrders : [];
            setPreferenceOrders([...prevOrders, preferenceOrderByPair]);
            resetConditionalPreferenceCard();
        }
        toggleHideDialog();
    };

    return (
        <Modal
            isOpen={isOpen}
            onDismiss={toggleHideDialog}
            isBlocking={false}
            containerClassName={contentStyles.container}
        >
            <div className={contentStyles.header}>
                <span>{editMode ? 'Edit' : 'New'} Conditional Preference</span>
                <IconButton
                    styles={{
                        root: {
                            color: theme.palette.neutralPrimary,
                            marginLeft: 'auto',
                            marginTop: '4px',
                            marginRight: '2px',
                        },
                        rootHovered: {
                            color: theme.palette.neutralDark,
                        },
                    }}
                    iconProps={{ iconName: 'Cancel' }}
                    ariaLabel="Close popup modal"
                    onClick={toggleHideDialog}
                />
            </div>
            <div className={contentStyles.body}>
                {Object.keys(BooleanAlgebraRelations).map((rel) =>
                    rel === 'Precedes'
                        ? conditionalPreference(rel)
                        : conditionalPreferencePreset(rel)
                )}
            </div>
            <div className={contentStyles.footer}>
                <PrimaryButton onClick={saveChanges}>
                    Save changes
                </PrimaryButton>
            </div>
        </Modal>
    );
};
