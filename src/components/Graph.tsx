import { useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone/esm/vis-network';

export const Graph: React.FC = () => {
    const visJsRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const nodes = [
            { id: 1, label: 'Node 1' },
            { id: 2, label: 'Node 2' },
            { id: 3, label: 'Node 3' },
            { id: 4, label: 'Node 4' },
            { id: 5, label: 'Node 5' },
        ];

        const edges = [
            { from: 1, to: 3 },
            { from: 1, to: 2 },
            { from: 2, to: 4 },
            { from: 2, to: 5 },
            { from: 3, to: 3 },
        ];
        visJsRef.current && new Network(visJsRef.current, { nodes, edges });
    }, [visJsRef]);

    return <div ref={visJsRef} />;
};

