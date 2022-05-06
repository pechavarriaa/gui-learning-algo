import {
    DefaultButton,
    Dropdown,
    Stack,
    StackItem,
    useTheme,
} from '@fluentui/react';
import { FC } from 'react';
import { useBoolean } from '@fluentui/react-hooks';
import { PreferenceVariables } from './ConditionalPreferences';
import { OrderOfRelations } from './OrderOfRelations';

export type ConditionalPreferenceProps = {
    varPairs: PreferenceVariables;
    networkVars: string[];
    setPreferenceVariables: (varPairs: PreferenceVariables) => void;
    orderOfRelations: string[];
    setOrderOfRelations: (rel: string, orderOfRelations: string[]) => void;
};

export const ConditionalPreference: FC<ConditionalPreferenceProps> = ({
    varPairs,
    networkVars,
    orderOfRelations,
    setPreferenceVariables,
    setOrderOfRelations,
}) => {
    const { firstVar, secondVar, thirdVar, fourthVar } = varPairs;
    const varOptions = networkVars.slice(0, -1).map((value, i) => ({
        key: i,
        text: value,
    }));

    const secondVarOptions = networkVars
        .map((value, i) => ({
            key: i,
            text: value,
        }))
        .filter(({ key }) => key > Math.max(0, networkVars.indexOf(firstVar)));

    const fourthVarOptions = networkVars
        .map((value, i) => ({
            key: i,
            text: value,
        }))
        .filter(({ key }) => key > Math.max(0, networkVars.indexOf(thirdVar)));

    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(false);

    return (
        <Stack horizontal horizontalAlign="baseline" gap={'10px'}>
            <StackItem align="center">If</StackItem>
            <StackItem align="center">
                <Dropdown
                    placeholder="var"
                    options={varOptions}
                    styles={{ dropdown: { width: 60 } }}
                    defaultSelectedKey={networkVars.indexOf(firstVar)}
                    onChange={(_, option) => {
                        if (typeof option?.key === 'number') {
                            setPreferenceVariables({
                                ...varPairs,
                                ...{ firstVar: networkVars[option?.key] },
                            });
                        }
                    }}
                />
            </StackItem>
            <StackItem align="center">Precedes</StackItem>
            <StackItem align="center">
                <Dropdown
                    placeholder="var"
                    options={secondVarOptions}
                    defaultSelectedKey={networkVars.indexOf(secondVar)}
                    styles={{ dropdown: { width: 60 } }}
                    onChange={(_, option) => {
                        if (typeof option?.key === 'number') {
                            setPreferenceVariables({
                                ...varPairs,
                                ...{ secondVar: networkVars[option?.key] },
                            });
                        }
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
                    defaultSelectedKey={networkVars.indexOf(thirdVar)}
                    onChange={(_, option) => {
                        if (typeof option?.key === 'number') {
                            setPreferenceVariables({
                                ...varPairs,
                                ...{ thirdVar: networkVars[option?.key] },
                            });
                        }
                    }}
                />
            </StackItem>
            <StackItem align="center">,</StackItem>
            <StackItem align="center">
                <Dropdown
                    placeholder="var"
                    options={fourthVarOptions}
                    styles={{ dropdown: { width: 60 } }}
                    defaultSelectedKey={networkVars.indexOf(fourthVar)}
                    onChange={(_, option) => {
                        if (typeof option?.key === 'number') {
                            setPreferenceVariables({
                                ...varPairs,
                                ...{ fourthVar: networkVars[option?.key] },
                            });
                        }
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
