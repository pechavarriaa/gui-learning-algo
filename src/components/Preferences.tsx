import {
    FontWeights,
    Stack,
    Text,
    DefaultButton,
    useTheme,
} from '@fluentui/react';
import { FC } from 'react';
import { SortableList } from './SortableList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Network from '../definitions/Network';
import { PreferenceByRelation } from './PreferenceByRelation';
import { solveNetwork } from '../utilities/solveNetwork';

export type PreferencesProps = {
    network: Network;
    setNetwork: (network: Network) => void;
    setIsNetworkConstrained: (isNetworkConstrained: boolean) => void;
};

export const Preferences: FC<PreferencesProps> = ({
    network,
    setNetwork,
    setIsNetworkConstrained,
}) => {
    return (
        <Stack horizontal gap={'30px'}>
            <Stack>
                <Stack.Item
                    align="start"
                    styles={{
                        root: {
                            marginBottom: '10px',
                        },
                    }}
                >
                    <Text
                        variant="mediumPlus"
                        styles={{
                            root: {
                                fontWeight: FontWeights.semibold,
                            },
                        }}
                    >
                        Preference of relations
                    </Text>
                </Stack.Item>
                <Stack.Item align="start">
                    <DndProvider backend={HTML5Backend}>
                        <SortableList
                            network={network}
                            setNetwork={setNetwork}
                        />
                    </DndProvider>
                </Stack.Item>
            </Stack>
            <Stack styles={{ root: { marginLeft: '20px' } }}>
                <PreferenceByRelation
                    network={network}
                    setNetwork={setNetwork}
                />
            </Stack>
            <Stack styles={{ root: { marginLeft: '20px' } }}>
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
        </Stack>
    );
};
