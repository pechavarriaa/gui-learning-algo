import { FC } from 'react';
import { FontWeights, Stack, Text, useTheme } from '@fluentui/react';

export type VariablesProps = {
    networkVars: Array<string>;
};

export const Variables: FC<VariablesProps> = ({ networkVars }) => {
    const theme = useTheme();
    const networkVarsBuckets = getVarsInBucketsOf10(networkVars);
    return (
        <Stack styles={{ root: { padding: '2px' } }}>
            <Stack.Item styles={{ root: { marginBottom: '5px' } }}>
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
                        backgroundColor: theme.palette.neutralLight,
                        borderRadius: '6px',
                        paddingRight:'20px'
                    },
                }}
            >
                <Stack horizontal>
                    {networkVarsBuckets.map((networkVars, i) => (
                        <Stack.Item key={i}>
                            <ul>
                                {networkVars.map((networkVar, j) => (
                                    <li key={j}>{networkVar}</li>
                                ))}
                            </ul>
                        </Stack.Item>
                    ))}
                </Stack>
            </Stack.Item>
        </Stack>
    );
};

const getVarsInBucketsOf10 = (
    networkVars: Array<string>
): Array<Array<string>> => {
    let arrayOfSize10Vars = [];
    for (let x = 0; x < networkVars.length; x += 10) {
        let tempArr = [];
        for (let y = x; y < x + 10 && y < networkVars.length; y++) {
            tempArr.push(networkVars[y]);
        }
        arrayOfSize10Vars.push(tempArr);
    }
    return arrayOfSize10Vars;
};
