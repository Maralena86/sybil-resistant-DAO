"use client";

import {
    SismoConnectButton,
    AuthType,
    SismoConnectResponse,
    ClaimType,
} from "@sismo-core/sismo-connect-react";

export default function SismoConnect() {
    return (
        <SismoConnectButton
            config={{
                appId: "0xf4977993e52606cfd67b7a1cde717069", // replace with your appId
                vault: {
                    // For development purposes insert the Data Sources that you want to impersonate here
                    // Never use this in production
                    impersonate: [
                        // EVM
                        "peps.eth",
                    ],
                },
                // displayRawResponse: true,
            }}
            claims={[
                // Gitcoin passport with at least a score of 15
                { groupId: "0x1cde61966decb8600dfd0749bd371f12", value: 30, claimType: ClaimType.GTE }
            ]}
            // request message signature from users.
            signature={{ message: "I vote Yes to Privacy" }}
            // retrieve the Sismo Connect Reponse from the user's Sismo data vault
            onResponse={async (response: SismoConnectResponse) => {
                const res = await fetch("/api/verify", {
                    method: "POST",
                    body: JSON.stringify(response),
                });
                console.log(await res.json());
            }}
        // reponse in bytes to call a contract
        // onResponseBytes={async (response: string) => {
        //   console.log(response);
        // }}
        />
    );
}