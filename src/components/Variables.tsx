import { FC } from 'react';
import { FontWeights, Stack, Text, useTheme } from '@fluentui/react';

export type VariablesProps = {
    networkVars: Array<string>;
};

export const Variables: FC<VariablesProps> = ({ networkVars }) => {
    const theme = useTheme();
    return (
        <Stack styles={{ root: { padding: '2px' } }}>
            <Stack.Item
                styles={{ root: { overflow: 'hidden', marginBottom: '5px' } }}
            >
                <Text
                    variant="mediumPlus"
                    styles={{
                        root: {
                            fontWeight: FontWeights.semibold,
                        },
                    }}
                >
                    <strong>Variables</strong>
                </Text>
            </Stack.Item>
            <Stack.Item
                styles={{
                    root: {
                        overflowY: 'scroll',
                        '::-webkit-scrollbar': { width: '5px' },
                        '::-webkit-scrollbar-track': { background: '#f1f1f1' },
                        '::-webkit-scrollbar-thumb': {
                            background: '#888',
                        },
                        '::-webkit-scrollbar-thumb:hover': {
                            background: '#555',
                        },
                        maxHeight: '150px',
                        minWidth: '100px',
                        backgroundColor: theme.palette.neutralLight,
                        borderRadius: '6px',
                    },
                }}
            >
                <ul>
                    {networkVars.map((networkVar, i) => (
                        <li key={i}>{networkVar}</li>
                    ))}
                </ul>
            </Stack.Item>
        </Stack>
    );
};
