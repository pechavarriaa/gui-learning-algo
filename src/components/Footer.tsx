import { FC } from 'react';
import {
    useTheme,
    DefaultButton,
    Stack,
    IStackStyles,
    Text,
    IButtonStyles,
    IStyle,
} from '@fluentui/react';
import { Sun } from './Icons/Sun';
import { Moon } from './Icons/Moon';

export type FooterProps = {
    isLightThemed: boolean;
    setTheme: () => void;
};

const stackStyles: Partial<IStackStyles> = {
    root: {
        alignItems: 'center',
        height: '10vh',
        gridGap: '1vw',
        padding: '10px 30px',
    },
};

export const Footer: FC<FooterProps> = ({ isLightThemed, setTheme }) => {
    const theme = useTheme();
    var year = new Date().getFullYear();
    const footerStyle = {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.neutralQuaternaryAlt,
    };
    const buttonRootStyles: IStyle = {
        borderColor: theme.palette.neutralQuaternaryAlt,
        backgroundColor: theme.palette.neutralQuaternaryAlt,
    };
    const buttonStyles: IButtonStyles = {
        root: buttonRootStyles,
        rootHovered: {
            borderColor: theme.palette.neutralDark,
            backgroundColor: theme.palette.neutralQuaternaryAlt,
        },
        rootPressed: buttonRootStyles,
    };
    return (
        <div style={footerStyle}>
            <Stack horizontal styles={stackStyles}>
                <Stack.Item align="center">
                    <DefaultButton styles={buttonStyles} onClick={setTheme}>
                        {isLightThemed ? <Moon /> : <Sun />}
                        <span style={{ marginLeft: '5px' }}>Theme</span>
                    </DefaultButton>{' '}
                </Stack.Item>

                <Stack.Item align="center">
                    <Text>{`© Pablo Echavarria ${year}`}</Text>
                </Stack.Item>
            </Stack>
        </div>
    );
};
