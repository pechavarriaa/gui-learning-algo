import { FC, useCallback } from 'react';
import { SortableItem } from './SortableItem';
import Network from '../definitions/Network';

const style = {
    width: 300,
    marginTop: '10px',
};

export type SortablePreferenceListProps = {
    selectedIndex: number;
    network: Network;
    setNetwork: (network: Network) => void;
};

export const SortablePreferenceList: FC<SortablePreferenceListProps> = ({
    selectedIndex,
    network,
    setNetwork,
}) => {
    const netRels = [...network.NetworkRelations].splice(
        0,
        network.NetworkRelations.length / 2
    );

    const relationKeys = netRels[selectedIndex].relations.map(
        (rel, i) => ({
            id: i,
            text: rel.toString().replace('_', ' '),
        })
    );

    const moveCard = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            let { Variables, NetworkRelations } = { ...network };
            let rels = NetworkRelations[selectedIndex].relations;
            let dragRel = rels[dragIndex];
            rels.splice(dragIndex, 1);
            rels.splice(hoverIndex, 0, dragRel);
            NetworkRelations[selectedIndex].relations = rels;
            setNetwork({ Variables, NetworkRelations });
        },
        [setNetwork, network, selectedIndex]
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
