import { FC } from 'react';
import {
    FontWeights,
    Stack,
    StackItem,
    Text,
    DefaultButton,
    useTheme,
} from '@fluentui/react';

import { useBoolean } from '@fluentui/react-hooks';
import Network from '../definitions/Network';
import { ConditionalPreferencesCard } from './ConditionalPreferenceCard';

export type ConditionalPreferencesProps = { network: Network };

export const ConditionalPreferences: FC<ConditionalPreferencesProps> = ({
    network,
}) => {
    // const vars = network.Variables;
 
    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(false);
    return (
        <Stack
            horizontalAlign="start"
            gap={'10px'}
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
                            onClick={() => toggleHideDialog()}
                        >
                            Add new
                        </DefaultButton>
                    </StackItem>
                    <StackItem>
                        <ConditionalPreferencesCard
                            network={network}
                            isOpen={hideDialog}
                            editMode={false}
                            toggleHideDialog={toggleHideDialog}
                        />
                    </StackItem>
                </Stack>
            </StackItem>
        </Stack>
    );
};
