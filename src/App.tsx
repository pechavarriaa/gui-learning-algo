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
import { VariableList } from './components/VariableList';

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
    const [networkVars, setNetworkVars] = useState<string[]>([]);
    const setTheme = () => {
        setIsLightThemed(!isLightThemed);
    };
    const theme = useTheme();
    const footerProps = {
        isLightThemed,
        setTheme,
    };
    const addNewVariable = (newVar: string) => {
        setNetworkVars([...networkVars, newVar]);
    };

    return (
        <ThemeProvider theme={isLightThemed ? lightTheme : darkTheme}>
            <Stack verticalFill styles={stackStyles} tokens={stackTokens}>
                <Stack.Item>
                    <Text
                        variant="xLarge"
                        styles={{
                            root: {
                                color: theme.palette.blueLight,
                                fontWeight: FontWeights.semibold,
                            },
                        }}
                    >
                        Allen's Interval Algebra Learning Algorithm
                    </Text>
                </Stack.Item>

                <Stack.Item align="start">
                    <Input
                        networkVars={networkVars}
                        addNewVariable={addNewVariable}
                    />
                </Stack.Item>
                <Stack.Item align="start">
                    <VariableList networkVars={networkVars} />
                </Stack.Item>
            </Stack>

            <Footer {...footerProps} />
        </ThemeProvider>
    );
};
