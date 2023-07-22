'use client'

import { Dispatch, SetStateAction } from 'react'
import { useWalletClient, useAccount } from 'wagmi'

const API_KEY = '6PNyWWCI.JAUjqps5kQIWgNAwd9S7CX1DxU1SPH1O'
const SCORER_ID = '892'

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

export const Passport = ({ setScore, setNoScoreMessage }: {
    setScore: Dispatch<SetStateAction<string>>
    setNoScoreMessage: Dispatch<SetStateAction<string>>
}) => {
    const { address } = useAccount()
    const { data: signer } = useWalletClient()

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
            const signature = await signer.signMessage(message)

            const response = await fetch(SUBMIT_PASSPORT_URI, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    address,
                    scorer: SCORER_ID,
                    signature,
                    nonce
                })
            })

            const data = await response.json()
            console.log('data:', data)
        } catch (err) {
            console.log('error: ', err)
        }
    }

    return (
        <button
            className="text-base card-button font-semibold"
            onClick={() => checkPassport()}
        >
            Check passport score
        </button >

    )
}