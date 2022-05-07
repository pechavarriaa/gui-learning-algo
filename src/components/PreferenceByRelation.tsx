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
import Relationship from '../definitions/Relationship';
import { SortablePreferenceList } from './SortablePreferenceList';

export type PreferenceByRelationProps = {
    singlePreferenceRelations: Relationship[];
    setSinglePreferenceRelations: (
        singlePreferenceRelations: Relationship[]
    ) => void;
};

export const PreferenceByRelation: FC<PreferenceByRelationProps> = ({
    singlePreferenceRelations,
    setSinglePreferenceRelations,
}) => {
    const dropdownStyles: Partial<IDropdownStyles> = {
        dropdown: { width: 300 },
    };

    const networkRels = singlePreferenceRelations.map((rel, i) => ({
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
                            singlePreferenceRelations={
                                singlePreferenceRelations
                            }
                            setSinglePreferenceRelations={
                                setSinglePreferenceRelations
                            }
                        />
                    )}
                </DndProvider>
            </Stack.Item>
        </Stack>
    );
};
