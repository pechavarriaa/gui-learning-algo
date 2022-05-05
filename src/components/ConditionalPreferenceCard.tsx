import { FC, useState } from 'react';
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

export type ConditionalPreferencesCardProps = {
    network: Network;
    editMode: boolean;
    isOpen: boolean;
    toggleHideDialog: () => void;
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

export type PreferenceVariables = {
    firstVar: string;
    secondVar: string;
    thirdVar: string;
    fourthVar: string;
};

export const ConditionalPreferencesCard: FC<
    ConditionalPreferencesCardProps
> = ({ network, isOpen, editMode, toggleHideDialog }) => {
    const [preferenceVariables, setPreferenceVariables] =
        useState<PreferenceVariables>({
            firstVar: 'a',
            secondVar: 'b',
            thirdVar: 'c',
            fourthVar: 'd',
        });

    let initialPreferenceOrder: { [key: string]: string[] } = {};
    for (const rel of Object.keys(BooleanAlgebraRelations)) {
        initialPreferenceOrder[rel] = Object.keys(BooleanAlgebraRelations).map(
            (rel) => rel.toString()
        );
    }

    const [preferenceOrder, setPreferenceOrder] = useState(
        initialPreferenceOrder
    );

    const setOrderOfRelations = (rel: string, orderOfRelations: string[]) => {
        setPreferenceOrder({
            ...preferenceOrder,
            ...{ [rel]: orderOfRelations },
        });
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
                    rel === 'Precedes' ? (
                        <ConditionalPreference
                            networkVars={network.Variables}
                            setVariablePairs={setPreferenceVariables}
                            orderOfRelations={preferenceOrder[rel]}
                            setOrderOfRelations={setOrderOfRelations}
                        />
                    ) : (
                        <ConditionalPreferencePreset
                            varPairs={preferenceVariables}
                            relation={rel.toString()}
                            orderOfRelations={preferenceOrder[rel]}
                            setOrderOfRelations={setOrderOfRelations}
                        />
                    )
                )}
            </div>
            <div className={contentStyles.footer}>
                <PrimaryButton>Save changes</PrimaryButton>
            </div>
        </Modal>
    );
};
