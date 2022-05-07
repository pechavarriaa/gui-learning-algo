import Network from '../definitions/Network';
import Relationship from '../definitions/Relationship';
import { setPropagatedNetwork } from '../components/Queries';
import { PreferenceOrderByPair } from '../components/Preferences';

export const solveNetwork = (
    network: Network,
    setNetwork: (network: Network) => void,
    singlePreferences: Relationship[],
    conditionalPreferences: PreferenceOrderByPair[]
): Network => {
    let propagatedNetworkRelations: Array<Relationship> = [];
    let requestFailed = false;
    fetch('https://localhost:5001/BooleanAlgebra/solveNetworkWithPreferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Network: network,
            SinglePreferences: singlePreferences,
            ConditionalPreferences: conditionalPreferences
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
