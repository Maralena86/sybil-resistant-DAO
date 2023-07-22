'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { useWalletClient, useAccount, useSignMessage } from 'wagmi'

const API_KEY = '6PNyWWCI.JAUjqps5kQIWgNAwd9S7CX1DxU1SPH1O'
const SCORER_ID = '1692'

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

export const Passport = ({ setScore, setNoScoreMessage, setSubmit, isSubmitted }: {
    setScore: Dispatch<SetStateAction<string>>
    setNoScoreMessage: Dispatch<SetStateAction<string>>
    setSubmit: Dispatch<SetStateAction<boolean>>
    isSubmitted: boolean
}) => {
    const { address } = useAccount()
    const { data: signer } = useWalletClient()
    const { signMessage } = useSignMessage()
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
                const roundedScore = Math.round(passportData.score * 100) / 100
                setScore(roundedScore.toString())
            } else {
                console.log('No score available, please add stamps to your passport and then resubmit.')
                setNoScoreMessage('No score available, please submit your passport after you have added some stamps.')
            }
        } catch (err) {
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
            console.log(message)
            console.log(signer)
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
        } catch (err) {
            console.log('error: ', err)
        }
    }

    return (
        <button
            disabled={disabled}
            className={`text-base card-button font-semibold ${disabled ? "bg-grey-500" : ""}`}
            onClick={() => {
                setDisabled(true)
                if (isSubmitted)
                    checkPassport()
                else {
                    submitPassport()
                }
            }}>
            {isSubmitted ? "Check Passport" : "Submit Passport"}
        </button >
    )
}