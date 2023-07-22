"use client"
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal, Web3Button } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon, goerli } from 'wagmi/chains'
import {Card} from './components/Card'
import Image from 'next/image'

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
    <main className="flex min-h-screen flex-col  p-6">
      <div className='flex justify-between'>
        
        
        <Image
         src="/favicon.ico"
         width={35}
         height={20}
         alt="Gitcoin"/>
         <WagmiConfig config={wagmiConfig} >
          <Web3Button />
        </WagmiConfig>
        
      </div>
      
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      <div className="flex items-center justify-center p-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          <Card/>
        </div>
      </div>
    </main>
  )
}
