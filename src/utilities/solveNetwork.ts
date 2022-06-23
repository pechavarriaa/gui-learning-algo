import Network from '../definitions/Network';
import Relationship from '../definitions/Relationship';
import { setPropagatedNetwork } from '../components/Queries';

export const solveNetwork = (
    network: Network,
    setNetwork: (network: Network) => void
): Network => {
    let propagatedNetworkRelations: Array<Relationship> = [];
    let requestFailed = false;
    fetch('http://localhost:5000/BooleanAlgebra/solveNetwork', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Variables: network.Variables,
            NetworkRelations: network.NetworkRelations,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            propagatedNetworkRelations = data.networkRelations;
        })
        .catch(() => (requestFailed = true))
        .finally(() => {
            if (!requestFailed) {
                const propagatedNetwork = setPropagatedNetwork(
                    propagatedNetworkRelations,
                    network.NetworkRelations,
                    network.Variables
                );
                setNetwork(propagatedNetwork);
            }
        });
    return network;
};
