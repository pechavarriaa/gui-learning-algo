import { FC } from 'react';
import { FontWeights, Stack, Text } from '@fluentui/react';

export type VariablesProps = {
    networkVars: Array<string>;
};

export const Variables: FC<VariablesProps> = ({ networkVars }) => {
    return (
        <Stack styles={{ root: { padding: '2px', marginLeft: '10px' } }}>
            <Stack.Item>
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
