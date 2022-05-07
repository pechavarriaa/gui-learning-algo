import { FC, useCallback } from 'react';
import { SortableItem } from './SortableItem';
import Relationship from '../definitions/Relationship';

const style = {
    width: 250,
};

export interface Item {
    id: number;
    text: string;
}

export type SortableListProps = {
    singlePreferenceRelations: Relationship[];
    setSinglePreferenceRelations: (
        singlePreferenceRelations: Relationship[]
    ) => void;
};

export const SortableList: FC<SortableListProps> = ({
    singlePreferenceRelations,
    setSinglePreferenceRelations,
}) => {
    const networkRels = singlePreferenceRelations.map((rel, i) => ({
        id: i,
        text: `${rel.firstVar}-${rel.secondVar}`,
    }));

    const moveCard = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            let newSinglePreferenceRelations = [...singlePreferenceRelations];
            let dragRel = newSinglePreferenceRelations[dragIndex];
            newSinglePreferenceRelations.splice(dragIndex, 1);
            newSinglePreferenceRelations.splice(hoverIndex, 0, dragRel);
            setSinglePreferenceRelations(newSinglePreferenceRelations);
        },
        [singlePreferenceRelations, setSinglePreferenceRelations]
    );

    const renderCard = useCallback(
        (card: { id: number; text: string }, index: number) => {
            return (
                <SortableItem
                    key={card.id}
                    index={index}
                    id={card.id}
                    text={card.text}
                    moveCard={moveCard}
                />
            );
        },
        [moveCard]
    );

    return (
        <>
            <div style={style}>
                {networkRels.map((card, i) => renderCard(card, i))}
            </div>
        </>
    );
};
