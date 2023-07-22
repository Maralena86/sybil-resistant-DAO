import { useAccount, useWalletClient } from 'wagmi'
import { useState } from 'react'
import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { useEthersSigner } from '../../ethersConvert'
import { EASContractAddress, NFTContractAddress, schemaUID } from '../utils/contractAddress';

export const EASComponent = ({ account }: {
    account: `0x${string}` | undefined
}) => {
    const getAttestation = async (eas: EAS, uid: string) => {
        const attestation = await eas.getAttestation(uid);
        console.log(attestation);
    }

    const attest = async (eas: EAS, signer: any) => {
        eas.connect(signer);

        // Initialize SchemaEncoder with the schema string
        const schemaEncoder = new SchemaEncoder("address user, string tier");
        const encodedData = schemaEncoder.encodeData([
            { name: "user", value: account!, type: "address" },
            { name: "tier", value: "gold", type: "string" },
        ]);

        const tx = await eas.attest({
            schema: schemaUID,
            data: {
                recipient: account!,
                expirationTime: 0,
                revocable: true,
                data: encodedData,
            },
        });

        const newAttestationUID = await tx.wait();
        setUid(newAttestationUID)
        console.log("New attestation UID:", newAttestationUID);
    }

    // 	const { isConnected } = useAccount()
    //     const { data: walletClient } = useWalletClient()
    const signer = useEthersSigner()
    const [disabled, setDisabled] = useState(false)
    const [uid, setUid] = useState('')

    // Initialize the sdk with the address of the EAS Schema contract address
    // const eas = new EAS(EASContractAddress);

    // Gets a default provider (in production use something else like infura/alchemy)
    const provider = ethers.providers.getDefaultProvider(
        "sepolia"
    );

    // Connects an ethers style provider/signingProvider to perform read/write functions.
    // MUST be a signer to do write operations!
    // eas.connect(provider);

    const eas: EAS = new EAS(EASContractAddress);
    eas.connect(provider);

    // const uid = "0x5134f511e0533f997e569dac711952dde21daf14b316f3cce23835defc82c065";

    // getAttestation(eas, uid)

    return (
        <button
            disabled={disabled}
            className={`flex text-base card-button font-semibold`}
            onClick={() => {
                setDisabled(true)
                attest(eas, signer)
                setDisabled(false)
            }}>
            {disabled &&
                <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="black"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>}
            {disabled ? "Processing..." : "Attest your score"}
        </button >




    );
}
