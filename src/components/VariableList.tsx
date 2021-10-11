import { FC } from 'react';
import { FontWeights, Stack, Text, useTheme } from '@fluentui/react';

export type VariableListProps = {
    networkVars: Array<string>;
};

export const VariableList: FC<VariableListProps> = ({ networkVars }) => {
    const theme = useTheme();
    return (
        <Stack styles={{ root: { padding: '2px', marginLeft: '10px' } }}>
            <Stack.Item>
                <Text
                    variant="mediumPlus"
                    styles={{
                        root: {
                            color: theme.palette.blueLight,
                            fontWeight: FontWeights.semibold,
                        },
                    }}
                >
                    <strong>Variables</strong>
                </Text>
            </Stack.Item>
            <Stack.Item>
                <ul>
                    {networkVars.map((networkVar, i) => (
                        <li key={i}>{networkVar}</li>
                    ))}
                </ul>
            </Stack.Item>
        </Stack>
    );
};
