import { Horizon, SorobanRpc } from "@stellar/stellar-sdk";

export type NetworkConfig = {
  rpcUrl: string;
  horizonUrl: string;
  networkPassphrase: string;
};

export const Networks = {
  mainnet: {
    rpcUrl: "https://soroban-rpc.mainnet.stellar.gateway.lobstr.co",
    horizonUrl: "https://horizon.stellar.org",
    networkPassphrase: "Public Global Stellar Network ; September 2015",
  },
  testnet: {
    rpcUrl: "https://soroban-rpc-testnet.stellar.gateway.lobstr.co",
    horizonUrl: "https://horizon-testnet.stellar.org",
    networkPassphrase: "Test SDF Network ; September 2015",
  },
  futurenet: {
    rpcUrl: "https://rpc-futurenet.stellar.org",
    horizonUrl: "https://horizon-futurenet.stellar.org",
    networkPassphrase: "Test SDF Future Network ; October 2022",
  },
} satisfies Record<string, NetworkConfig>;

export class StellarClient {
  public readonly horizon: Horizon.Server;
  public readonly soroban: SorobanRpc.Server;
  public readonly config: NetworkConfig;

  constructor(config: NetworkConfig) {
    this.config = config;
    this.horizon = new Horizon.Server(config.horizonUrl);
    this.soroban = new SorobanRpc.Server(config.rpcUrl);
  }

  async getLatestLedger(): Promise<number> {
    const { sequence } = await this.soroban.getLatestLedger();
    return Number(sequence);
  }

  streamTransactions(cursor: string = "") {
    return this.horizon
      .transactions()
      .cursor(cursor)
      .stream({ onmessage: console.log });
  }
}
