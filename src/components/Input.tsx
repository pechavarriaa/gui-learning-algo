import { Stack, TextField, PrimaryButton } from '@fluentui/react';
import { FC, useState, useEffect, useCallback } from 'react';

export type InputProps = {
    networkVars: Array<string>;
    inputMode: boolean;
    addNewVariable: (newVar: string) => void;
    startQuestions: () => void;
};

export const Input: FC<InputProps> = ({
    networkVars,
    inputMode,
    addNewVariable,
    startQuestions,
}) => {
    const [varName, setVarName] = useState('');

    const handleAddNewVariable = useCallback(() => {
        if (!networkVars.includes(varName) && varName.trim() !== '') {
            addNewVariable(varName.trim());
            setVarName('');
        }
    }, [addNewVariable, varName, networkVars]);

    const handleUserKeyPress = useCallback(
        (event) => {
            if (event.keyCode === 13 && event.ctrlKey) {
                handleAddNewVariable();
            }
        },
        [handleAddNewVariable]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);
        return () => {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    return (
        <>
            <Stack horizontal>
                <Stack.Item align="start">
                    <TextField
                        autoComplete="off"
                        styles={{
                            root: { width: '240px', margin: '10px' },
                        }}
                        label="Add new variable"
                        value={varName}
                        onChange={(_, newVar) => {
                            setVarName(newVar!);
                        }}
                        onGetErrorMessage={(varString) => {
                            if (networkVars.includes(varString)) {
                                return 'Variable names must differ';
                            }
                        }}
                    />
                </Stack.Item>
                <Stack.Item
                    align="start"
                    styles={{ root: { marginTop: '28px' } }}
                >
                    <PrimaryButton
                        text="Add"
                        disabled={
                            varName === '' || networkVars.includes(varName)
                        }
                        styles={{ root: { margin: '10px', padding: '2px' } }}
                        onClick={handleAddNewVariable}
                    />
                </Stack.Item>
                <Stack.Item
                    align="start"
                    styles={{ root: { marginTop: '28px' } }}
                >
                    <PrimaryButton
                        text="Begin Algorithm"
                        disabled={networkVars.length < 2 || !inputMode}
                        styles={{ root: { margin: '10px', padding: '2px' } }}
                        onClick={startQuestions}
                    />
                </Stack.Item>
            </Stack>
        </>
    );
};
