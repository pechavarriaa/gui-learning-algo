import { DefaultButton, Stack, StackItem, useTheme } from '@fluentui/react';
import { FC } from 'react';
import { useBoolean } from '@fluentui/react-hooks';
import { PreferenceVariables } from './ConditionalPreferenceCard';
import { OrderOfRelations } from './OrderOfRelations';

export type ConditionalPreferencePresetProps = {
    varPairs: PreferenceVariables;
    relation: string;
    orderOfRelations: string[];
    setOrderOfRelations: (rel: string, orderOfRelations: string[]) => void;
};

export const ConditionalPreferencePreset: FC<
    ConditionalPreferencePresetProps
> = ({ varPairs, relation, orderOfRelations, setOrderOfRelations }) => {
    const { firstVar, secondVar, thirdVar, fourthVar } = varPairs;
    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(false);
    return (
        <Stack horizontal horizontalAlign="baseline" gap={'10px'}>
            <StackItem align="center">
                If {firstVar} {relation.replace('_', ' ')} {secondVar} then the
                preferred order for pair ({thirdVar}, {fourthVar}) is
            </StackItem>
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
                    relation={relation}
                    orderOfRelations={orderOfRelations}
                    setOrderOfRelations={setOrderOfRelations}
                    isOpen={hideDialog}
                    toggleHideDialog={toggleHideDialog}
                />
            </StackItem>
        </Stack>
    );
};
