import { FC, useState } from 'react';
import {
    Stack,
    Text,
    FontWeights,
    IStackTokens,
    IStackStyles,
    ThemeProvider,
    useTheme,
} from '@fluentui/react';
import './App.css';
import { darkTheme, lightTheme } from './themes';
import { Footer } from './components/Footer';
import { Input } from './components/Input';
import { Variables } from './components/Variables';
import { Queries } from './components/Queries';
import Network from './definitions/Network';
import { createInitialNetworkRelations } from './utilities/createInitialNetwork';
import { Graph } from './components/Graph';
import { TableOfEquivalences } from './components/TableOfEquivalences';
import { Preferences } from './components/Preferences';
import { ConditionalPreferences } from './components/ConditionalPreferences';

const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
    root: {
        width: '100vw',
        maxWidth: '100%',
        margin: '0 auto',
        padding: '3vh 10vw',
        textAlign: 'center',
        minHeight: '90vh',
    },
};

export const App: FC = () => {
    const [isLightThemed, setIsLightThemed] = useState(false);
    const [network, setNetwork] = useState<Network>({
        Variables: [],
        NetworkRelations: [],
    });
    const [inputMode, setInputMode] = useState<boolean>(true);
    const [isNetworkConstrained, setIsNetworkConstrained] =
        useState<boolean>(false);

    const setTheme = () => {
        setIsLightThemed(!isLightThemed);
    };
    const theme = useTheme();
    const footerProps = {
        isLightThemed,
        setTheme,
    };
    const addNewVariable = (newVar: string) => {
        setNetwork({
            Variables: [...network.Variables, newVar],
            NetworkRelations: network.NetworkRelations,
        });
        setInputMode(true);
        setIsNetworkConstrained(false);
    };

    const startQuestions = () => {
        if (network.Variables.length > 1) {
            setInputMode(false);
            setNetwork(createInitialNetworkRelations(network.Variables));
        }
    };

    return (
        <ThemeProvider theme={isLightThemed ? lightTheme : darkTheme}>
            <Stack verticalFill styles={stackStyles} tokens={stackTokens}>
                <Stack.Item>
                    <Text
                        variant="xLarge"
                        styles={{
                            root: {
                                color: theme.palette.tealLight,
                                fontWeight: FontWeights.semibold,
                            },
                        }}
                    >
                        Allen's Interval Algebra Learning Algorithm
                    </Text>
                </Stack.Item>
                <Stack.Item align="start">
                    <Input
                        networkVars={network.Variables}
                        inputMode={inputMode}
                        addNewVariable={addNewVariable}
                        startQuestions={startQuestions}
                    />
                </Stack.Item>
                {network.Variables.length > 0 && (
                    <Stack.Item align="start">
                        <Variables networkVars={network.Variables} />
                    </Stack.Item>
                )}
                {network.Variables.length / 2 > 1 &&
                    !inputMode &&
                    !isNetworkConstrained && (
                        <>
                            <ConditionalPreferences network={network} />
                            <Preferences
                                network={network}
                                setNetwork={setNetwork}
                                setIsNetworkConstrained={
                                    setIsNetworkConstrained
                                }
                            />
                        </>
                    )}
                {!inputMode && !isNetworkConstrained && (
                    <Stack.Item align="start">
                        <Queries
                            network={network}
                            setNetwork={setNetwork}
                            setIsNetworkConstrained={setIsNetworkConstrained}
                        />
                    </Stack.Item>
                )}
                {network.Variables.length > 1 && !inputMode && (
                    <Stack.Item align="center">
                        <Graph network={network} />
                    </Stack.Item>
                )}
            </Stack>
            <TableOfEquivalences />
            <Footer {...footerProps} />
        </ThemeProvider>
    );
};
