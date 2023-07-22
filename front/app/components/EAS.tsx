import { useAccount, useWalletClient } from 'wagmi'
import { useState } from 'react'
import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { useEthersSigner } from '../../ethersConvert'

const getAttestation = async (eas:EAS, uid: string) => {
    const attestation = await eas.getAttestation(uid);
    console.log(attestation);
}

const attest = async (eas:EAS, signer: any) => {
    eas.connect(signer);

    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder("address user, string tier");
    const encodedData = schemaEncoder.encodeData([
        { name: "user", value: "0x78f83b36468bFf785046974e21A1449b47FD7e74" , type: "address" },
        { name: "tier", value: "gold", type: "string" },
    ]);


    const schemaUID = "0xfb08fb45bac0ed4b95d23fd173d202453d0b1c3f6bd96e7bca1b2f616492df98";

    const tx = await eas.attest({
        schema: schemaUID,
        data: {
        recipient: "0x78f83b36468bFf785046974e21A1449b47FD7e74",
        expirationTime: 0,
        revocable: true,
        data: encodedData,
        },
    });
  
    const newAttestationUID = await tx.wait();
  
    console.log("New attestation UID:", newAttestationUID);
}


export const EASComponent = () => {
// 	const { isConnected } = useAccount()
//     const { data: walletClient } = useWalletClient()
    const signer = useEthersSigner()

    const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

    // Initialize the sdk with the address of the EAS Schema contract address
    // const eas = new EAS(EASContractAddress);
    
    // Gets a default provider (in production use something else like infura/alchemy)
    const provider = ethers.providers.getDefaultProvider(
      "sepolia"
    );
    
    // Connects an ethers style provider/signingProvider to perform read/write functions.
    // MUST be a signer to do write operations!
    // eas.connect(provider);

    const eas:EAS = new EAS(EASContractAddress);
eas.connect(provider);

const uid = "0x5134f511e0533f997e569dac711952dde21daf14b316f3cce23835defc82c065";

// getAttestation(eas, uid)

attest(eas, signer)
	return (<></>
	);
}
