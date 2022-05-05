import {
    DefaultButton,
    Dropdown,
    Stack,
    StackItem,
    useTheme,
} from '@fluentui/react';
import { FC, useState, useEffect } from 'react';
import { useBoolean } from '@fluentui/react-hooks';
import { PreferenceVariables } from './ConditionalPreferenceCard';
import { OrderOfRelations } from './OrderOfRelations';

export type ConditionalPreferenceProps = {
    networkVars: string[];
    setVariablePairs: (varPairs: PreferenceVariables) => void;
    orderOfRelations: string[];
    setOrderOfRelations: (rel: string, orderOfRelations: string[]) => void;
};

export const ConditionalPreference: FC<ConditionalPreferenceProps> = ({
    networkVars,
    orderOfRelations,
    setVariablePairs,
    setOrderOfRelations,
}) => {
    const varOptions = networkVars.slice(0, -1).map((value, i) => ({
        key: i,
        text: value,
    }));
    const [firstVarIndex, setFirstVarIndex] = useState<number>(-1);
    const [secondVarIndex, setSecondVarIndex] = useState<number>(-1);
    const [thirdVarIndex, setThirdVarIndex] = useState<number>(-1);
    const [fourthVarIndex, setFourthVarIndex] = useState<number>(-1);

    useEffect(() => {
        setVariablePairs({
            firstVar: networkVars[firstVarIndex],
            secondVar: networkVars[secondVarIndex],
            thirdVar: networkVars[thirdVarIndex],
            fourthVar: networkVars[fourthVarIndex],
        });
    }, [
        setVariablePairs,
        networkVars,
        firstVarIndex,
        secondVarIndex,
        thirdVarIndex,
        fourthVarIndex,
    ]);

    const secondVarOptions = networkVars
        .map((value, i) => ({
            key: i,
            text: value,
        }))
        .filter(({ key }) => key > firstVarIndex);

    const fourthVarOptions = networkVars
        .map((value, i) => ({
            key: i,
            text: value,
        }))
        .filter(({ key }) => key > thirdVarIndex);

    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(false);

    return (
        <Stack horizontal horizontalAlign="baseline" gap={'10px'}>
            <StackItem align="center">If</StackItem>
            <StackItem align="center">
                <Dropdown
                    placeholder="var"
                    options={varOptions}
                    styles={{ dropdown: { width: 60 } }}
                    onChange={(_, option) => {
                        if (typeof option?.key === 'number')
                            setFirstVarIndex(option?.key);
                    }}
                />
            </StackItem>
            <StackItem align="center">Precedes</StackItem>
            <StackItem align="center">
                <Dropdown
                    placeholder="var"
                    options={secondVarOptions}
                    styles={{ dropdown: { width: 60 } }}
                    onChange={(_, option) => {
                        if (typeof option?.key === 'number')
                            setSecondVarIndex(option?.key);
                    }}
                />
            </StackItem>
            <StackItem align="center">
                then the preferred order for pair (
            </StackItem>
            <StackItem align="center">
                <Dropdown
                    placeholder="var"
                    options={varOptions}
                    styles={{ dropdown: { width: 60 } }}
                    onChange={(_, option) => {
                        if (typeof option?.key === 'number')
                            setThirdVarIndex(option?.key);
                    }}
                />
            </StackItem>
            <StackItem align="center">,</StackItem>
            <StackItem align="center">
                <Dropdown
                    placeholder="var"
                    options={fourthVarOptions}
                    styles={{ dropdown: { width: 60 } }}
                    onChange={(_, option) => {
                        if (typeof option?.key === 'number')
                            setFourthVarIndex(option?.key);
                    }}
                />
            </StackItem>
            <StackItem align="center">) is</StackItem>
            <StackItem align="center">
                <select>
                    <option value="order" selected>
                        Order:
                    </option>
                    {orderOfRelations.map((rel) => (
                        <option value={rel} disabled>
                            {rel.replace('_', ' ')}
                        </option>
                    ))}
                </select>
            </StackItem>
            <StackItem align="center">
                <DefaultButton
                    styles={{
                        root: {
                            margin: '5px',
                            padding: '2px 30px',
                            backgroundColor: useTheme().palette.tealLight,
                        },
                    }}
                    onClick={toggleHideDialog}
                >
                    (edit)
                </DefaultButton>
            </StackItem>
            <StackItem>
                <OrderOfRelations
                    relation="Precedes"
                    orderOfRelations={orderOfRelations}
                    setOrderOfRelations={setOrderOfRelations}
                    isOpen={hideDialog}
                    toggleHideDialog={toggleHideDialog}
                />
            </StackItem>
        </Stack>
    );
};
