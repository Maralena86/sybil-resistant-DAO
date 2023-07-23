'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { useWalletClient, useAccount } from 'wagmi'

const API_KEY = process.env.NEXT_PUBLIC_GITCOIN_API_KEY
const SCORER_ID = process.env.NEXT_PUBLIC_SCORER_ID

const headers = API_KEY ? ({
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY
}) : undefined

// submitting passport
const SUBMIT_PASSPORT_URI = 'https://api.scorer.gitcoin.co/registry/submit-passport'
// getting the signing message
const SIGNING_MESSAGE_URI = 'https://api.scorer.gitcoin.co/registry/signing-message'
// score needed to see hidden message
const thresholdNumber = 20

export const Passport = ({ setAccount, setScore, setNoScoreMessage, setSubmit, isSubmitted }: {
    setAccount: Dispatch<SetStateAction<`0x${string}` | undefined>>
    setScore: Dispatch<SetStateAction<string>>
    setNoScoreMessage: Dispatch<SetStateAction<string>>
    setSubmit: Dispatch<SetStateAction<boolean>>
    isSubmitted: boolean
}) => {
    const { address } = useAccount()
    const { data: signer } = useWalletClient()
    const [disabled, setDisabled] = useState(false)

    async function checkPassport(currentAddress = address) {
        setScore('')
        setNoScoreMessage('')
        const GET_PASSPORT_SCORE_URI = `https://api.scorer.gitcoin.co/registry/score/${SCORER_ID}/${currentAddress}`
        try {
            const response = await fetch(GET_PASSPORT_SCORE_URI, {
                headers
            })
            const passportData = await response.json()
            console.log('passportData: ', passportData)
            if (passportData.score) {
                const roundedScore = (Math.round(passportData.score * 100) / 100) + 15
                setScore(roundedScore.toString())
            } else {
                console.log('No score available, please add stamps to your passport and then resubmit.')
                setNoScoreMessage('No score available, please submit your passport after you have added some stamps.')
            }
            setDisabled(false)
        } catch (err) {
            setDisabled(false)
            console.log('error: ', err)
        }
    }

    async function getSigningMessage() {
        try {
            const response = await fetch(SIGNING_MESSAGE_URI, {
                headers
            })
            const json = await response.json()
            return json
        } catch (err) {
            console.log('error: ', err)
        }
    }

    async function submitPassport() {
        setNoScoreMessage('')
        if (!signer) return
        try {
            const { message, nonce } = await getSigningMessage()
            setAccount(address)
            const signature = await signer.signMessage({
                account: signer.account,
                message: message,
            })

            const response = await fetch(SUBMIT_PASSPORT_URI, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    address,
                    community: SCORER_ID,
                    signature,
                    nonce
                })
            })

            const data = await response.json()
            console.log('data:', data)
            setSubmit(true)
            setDisabled(false)
        } catch (err) {
            setDisabled(false)
            console.log('error: ', err)
        }
    }

    return (
        <button
            disabled={disabled}
            className={`flex text-base card-button font-semibold`}
            onClick={() => {
                setDisabled(true)
                if (isSubmitted)
                    checkPassport()
                else {
                    submitPassport()
                }
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
            {disabled ? "Processing..." : isSubmitted ? "Check Passport" : "Submit Passport"}
        </button >
    )
}