import { FontWeights, Stack, Text } from '@fluentui/react';
import { FC } from 'react';
import { SortableList } from './SortableList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { PreferenceByRelation } from './PreferenceByRelation';
import Relationship from '../definitions/Relationship';

export type SinglePreferencesProps = {
    singlePreferenceRelations: Relationship[];
    setSinglePreferenceRelations: (
        singlePreferenceRelations: Relationship[]
    ) => void;
};

export const SinglePreferences: FC<SinglePreferencesProps> = ({
    singlePreferenceRelations,
    setSinglePreferenceRelations,
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
                            singlePreferenceRelations={
                                singlePreferenceRelations
                            }
                            setSinglePreferenceRelations={
                                setSinglePreferenceRelations
                            }
                        />
                    </DndProvider>
                </Stack.Item>
            </Stack>
            <Stack styles={{ root: { marginLeft: '20px' } }}>
                <PreferenceByRelation
                    singlePreferenceRelations={singlePreferenceRelations}
                    setSinglePreferenceRelations={setSinglePreferenceRelations}
                />
            </Stack>
        </Stack>
    );
};
