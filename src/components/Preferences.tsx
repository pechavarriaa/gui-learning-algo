import {
    DefaultButton,
    Stack,
    useTheme,
    Text,
    FontWeights,
} from '@fluentui/react';
import { FC, useState } from 'react';
import Network from '../definitions/Network';
import Relationship from '../definitions/Relationship';
import { SinglePreferences } from './SinglePreferences';
import { ConditionalPreferences } from './ConditionalPreferences';
import { solveNetwork } from '../utilities/solveNetwork';

export type PreferencesProps = {
    network: Network;
    setNetwork: (network: Network) => void;
    setIsNetworkConstrained: (isNetworkConstrained: boolean) => void;
};

export type PreferenceVariables = {
    firstVar: string;
    secondVar: string;
    thirdVar: string;
    fourthVar: string;
};

export type PreferenceOrderByPair = {
    PreferenceVariables: PreferenceVariables;
    PreferenceOrder: { [key: string]: string[] };
};

export const Preferences: FC<PreferencesProps> = ({
    network,
    setNetwork,
    setIsNetworkConstrained,
}) => {
    const [preferenceOrders, setPreferenceOrders] = useState<
        PreferenceOrderByPair[]
    >([]);

    const initialSinglePreferenceRelations = [
        ...network.NetworkRelations,
    ].splice(0, network.NetworkRelations.length / 2);

    const [singlePreferenceRelations, setSinglePreferenceRelations] = useState<
        Relationship[]
    >(initialSinglePreferenceRelations);

    return (
        <Stack gap={'5px'}>
            <ConditionalPreferences
                network={network}
                preferenceOrders={preferenceOrders}
                setPreferenceOrders={setPreferenceOrders}
                singlePreferenceRelations={singlePreferenceRelations}
                setSinglePreferenceRelations={setSinglePreferenceRelations}
            />
            <SinglePreferences 
                singlePreferenceRelations={singlePreferenceRelations}
                setSinglePreferenceRelations={setSinglePreferenceRelations}
            />
            <Stack.Item align="start">
                <Text
                    variant="mediumPlus"
                    styles={{
                        root: {
                            fontWeight: FontWeights.semibold,
                        },
                    }}
                >
                    Solve Network
                </Text>
            </Stack.Item>
            <Stack.Item align="start">
                <DefaultButton
                    styles={{
                        root: {
                            margin: '5px',
                            padding: '2px 30px',
                            backgroundColor: useTheme().palette.tealLight,
                        },
                    }}
                    text="Solve"
                    onClick={() => {
                        solveNetwork(network, setNetwork);
                        setIsNetworkConstrained(true);
                    }}
                />
            </Stack.Item>
        </Stack>
    );
};
