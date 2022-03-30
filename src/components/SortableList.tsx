import { FC, useState, useCallback } from 'react';
import { SortableItem } from './SortableItem';
import update from 'immutability-helper';
import Network from '../definitions/Network';

const style = {
    width: 250,
};

export interface Item {
    id: number;
    text: string;
}

export type SortableListProps = {
    network: Network;
    setNetwork: (network: Network) => void;
};

export const SortableList: FC<SortableListProps> = ({
    network,
    setNetwork,
}) => {
    const networkRels = [...network.NetworkRelations]
        .splice(0, network.NetworkRelations.length / 2)
        .map((rel, i) => ({
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
            let { Variables, NetworkRelations } = { ...network };
            let dragRel = NetworkRelations[dragIndex];
            NetworkRelations.splice(dragIndex, 1);
            NetworkRelations.splice(hoverIndex, 0, dragRel);
            setNetwork({ Variables, NetworkRelations });
        },
        [setNetRels, setNetwork, network]
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
