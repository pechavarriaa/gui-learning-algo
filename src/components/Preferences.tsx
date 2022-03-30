import { FontWeights, Stack, Text, Theme } from '@fluentui/react';
import { FC } from 'react';
import { SortableList } from './SortableList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Relationship from '../definitions/Relationship';

export type PreferencesProps = {
    theme: Theme;
    networkRelations: Array<Relationship>;
};

export const Preferences: FC<PreferencesProps> = ({
    networkRelations,
    theme,
}) => {
    const firstHalfNetworkRelations = networkRelations.splice(
        0,
        networkRelations.length / 2
    );
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
                            color: theme.palette.tealLight,
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
                        networkRelations={firstHalfNetworkRelations}
                    />
                </DndProvider>
            </Stack.Item>
        </Stack>
    );
};
