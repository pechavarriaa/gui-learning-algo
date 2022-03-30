import {
    FontWeights,
    Stack,
    Text,
    Dropdown,
    IDropdownStyles,
} from '@fluentui/react';
import { FC, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Network from '../definitions/Network';
import { SortablePreferenceList } from './SortablePreferenceList';

export type PreferenceByRelationProps = {
    network: Network;
    setNetwork: (network: Network) => void;
};

export const PreferenceByRelation: FC<PreferenceByRelationProps> = ({
    network,
    setNetwork,
}) => {
    const dropdownStyles: Partial<IDropdownStyles> = {
        dropdown: { width: 300 },
    };

    const networkRels = [...network.NetworkRelations]
        .splice(0, network.NetworkRelations.length / 2)
        .map((rel, i) => ({
            key: i,
            text: `${rel.firstVar}-${rel.secondVar}`,
        }));
    const [selectedOption, setSelectedOption] = useState(-1);
    return (
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
                    Preference by relation
                </Text>
            </Stack.Item>
            <Stack.Item align="start">
                <Dropdown
                    placeholder="Select an option"
                    onChange={(e, option) => {
                        if (
                            typeof option?.key === 'number' &&
                            selectedOption !== option?.key
                        )
                            setSelectedOption(option?.key);
                    }}
                    options={networkRels}
                    styles={dropdownStyles}
                />
            </Stack.Item>
            <Stack.Item align="start">
                <DndProvider backend={HTML5Backend}>
                    {selectedOption >= 0 && (
                        <SortablePreferenceList
                            selectedIndex={selectedOption}
                            network={network}
                            setNetwork={setNetwork}
                        />
                    )}
                </DndProvider>
            </Stack.Item>
        </Stack>
    );
};
