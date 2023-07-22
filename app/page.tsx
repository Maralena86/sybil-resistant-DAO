"use client";

import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { Web3Modal, Web3Button } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, goerli } from "wagmi/chains";
import { Card } from "./components/Card";
import Image from "next/image";
import { Footer } from "./Footer";

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
    <main>
      <WagmiConfig config={wagmiConfig}>
        <section className="flex flex-col  p-6">
          <div className="flex justify-between">
            <Image src="/favicon.ico" width={40} height={40} alt="logo" />
            <div className="">
              <Web3Button />
            </div>
          </div>
          <div className="flex items-center flex-col p-20">
            <div className="">
              <Card />
            </div>
            <div className="pt-24 flex gap-12">
              <Image
                src="/shield-gold.png"
                width={200}
                height={200}
                alt="logo"
              />
              <Image
                src="/shield-argent.png"
                width={200}
                height={200}
                alt="logo"
              />
              <Image
                src="/shield-bronze.png"
                width={200}
                height={200}
                alt="logo"
              />
            </div>
          </div>

        </section>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </main>
  );
}

