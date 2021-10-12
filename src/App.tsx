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

const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
    root: {
        width: '100vw',
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
                {!inputMode && (
                    <Stack.Item align="start">
                        <Queries
                            network={network}
                            setNetwork={setNetwork}
                        />
                    </Stack.Item>
                )}
            </Stack>
            <Footer {...footerProps} />
        </ThemeProvider>
    );
};
