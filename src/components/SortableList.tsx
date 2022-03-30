import { FC, useState, useCallback } from 'react';
import { SortableItem } from './SortableItem';
import update from 'immutability-helper';
import Relationship from '../definitions/Relationship';

const style = {
    width: 250,
};

export interface Item {
    id: number;
    text: string;
}

export type SortableListProps = {
    networkRelations: Array<Relationship>;
};

export const SortableList: FC<SortableListProps> = ({ networkRelations }) => {
    const networkRels = networkRelations.map((rel, i) => ({
        id: i,
        text: `${rel.firstVar}-${rel.secondVar}`,
    }));
    const [netRels, setNetRels] = useState(networkRels);

    const moveCard = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            setNetRels((prevCards: Item[]) =>
                update(prevCards, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, prevCards[dragIndex] as Item],
                    ],
                })
            );
            console.log(netRels);
        },
        [setNetRels, netRels]
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
                {netRels.map((card, i) => renderCard(card, i))}
            </div>
        </>
    );
};
