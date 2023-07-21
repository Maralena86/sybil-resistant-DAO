"use client"
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal, Web3Button } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon, goerli } from 'wagmi/chains'

const chains = [arbitrum, mainnet, polygon, goerli]
const projectId = '91c0353f17b535b32824d5df3a07418a'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-6">
      <WagmiConfig config={wagmiConfig} >
        <Web3Button/>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </main>
  )
}
