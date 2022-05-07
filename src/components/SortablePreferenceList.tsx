import { FC, useCallback } from 'react';
import { SortableItem } from './SortableItem';
import Relationship from '../definitions/Relationship';

const style = {
    width: 300,
    marginTop: '10px',
};

export type SortablePreferenceListProps = {
    selectedIndex: number;
    singlePreferenceRelations: Relationship[];
    setSinglePreferenceRelations: (
        singlePreferenceRelations: Relationship[]
    ) => void;
};

export const SortablePreferenceList: FC<SortablePreferenceListProps> = ({
    selectedIndex,
    singlePreferenceRelations,
    setSinglePreferenceRelations,
}) => {
    const relationKeys = singlePreferenceRelations[selectedIndex].relations.map(
        (rel, i) => ({
            id: i,
            text: rel.toString().replace('_', ' '),
        })
    );

    const moveCard = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            let newSinglePreferenceRelations = [...singlePreferenceRelations];
            let rels = newSinglePreferenceRelations[selectedIndex].relations;
            let dragRel = rels[dragIndex];
            rels.splice(dragIndex, 1);
            rels.splice(hoverIndex, 0, dragRel);
            newSinglePreferenceRelations[selectedIndex].relations = rels;
            setSinglePreferenceRelations(newSinglePreferenceRelations);
        },
        [singlePreferenceRelations, selectedIndex, setSinglePreferenceRelations]
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
            <div style={style} key={selectedIndex}>
                {relationKeys.map((card, i) => renderCard(card, i))}
            </div>
        </>
    );
};
