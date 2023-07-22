"use client";
import {
	EthereumClient,
	w3mConnectors,
	w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal, Web3Button } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, goerli } from "wagmi/chains";
import { Card, Footer, Header } from "./components";
import Image from "next/image";
import { shieldGold, shieldSilver, shieldBronze } from "@/public";

const chains = [arbitrum, mainnet, polygon, goerli];
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
	autoConnect: true,
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
						<div className="flex items-center flex-col gap-12 ">
							<Card />
							<div className="flex img-shield-container">
								<Image src={shieldGold} className="img-shield" alt="logo" />
								<Image src={shieldSilver} className="img-shield" alt="logo" />
								<Image src={shieldBronze} className="img-shield" alt="logo" />
							</div>
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
