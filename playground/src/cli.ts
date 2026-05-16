import { StellarClient, Networks } from "@stellar-indexer/services";

const network = process.argv[2] as keyof typeof Networks | undefined;
const selectedNetwork = network && network in Networks ? Networks[network] : Networks.testnet;

const client = new StellarClient(selectedNetwork);

const latestLedger = await client.getLatestLedger();
console.log(`Connected to: ${selectedNetwork.networkPassphrase}`);
console.log(`Latest ledger: ${latestLedger}`);

process.exit(0);
