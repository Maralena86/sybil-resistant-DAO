"use client";

import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, goerli, sepolia } from "wagmi/chains";
import { Card, Footer, Header } from "./components";

const chains = [sepolia, arbitrum, mainnet, polygon, goerli];
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
	autoConnect: false,
	connectors: w3mConnectors({ projectId, chains }),
	publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function Home() {
	return (
		<>
			<WagmiConfig config={wagmiConfig}>
				<Header />
				<main>
					<section className="flex flex-col p-6">
						<div className="flex items-center flex-col justify-center gap-12 ">
							<Card />
						</div>
					</section>
				</main>
				<Footer />
			</WagmiConfig>
			<div className="absolute">
				<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
			</div>
		</>
	);
}
