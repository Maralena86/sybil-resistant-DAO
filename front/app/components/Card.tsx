import Image from "next/image";
import Link from "next/link";
import { Passport } from "."
import { useAccount } from 'wagmi'
import { useState } from 'react'

export const Card = () => {
	const { isConnected } = useAccount()
	const [isSubmitted, setSubmit] = useState(false)
	const [score, setScore] = useState<string>('')
	const [noScoreMessage, setNoScoreMessage] = useState<string>('')

	return (
		<div className="relative card py-8 px-8 rounded-3xl my-4 shadow-xl">
			<div className="  card-icon flex items-center absolute rounded-full py-4 px-4 shadow-xl left-4 -top-6">
				<Image src="/gitcoinco.png" width={30} height={30} alt="Gitcoin" />
			</div>
			<div className="  card-icon flex items-center absolute rounded-full py-4 px-4 shadow-xl right-4 -top-6">
				<Image src="/sismo.png" width={30} height={30} alt="Gitcoin" />
			</div>
			<div className="mt-8 text-center">
				<p className="sm:text-xl font-semibold my-2 text-sky-200">
					Join the Sybil Resistant DAO
				</p>
				<div className="py-6">
					<div className="flex justify-center">
						<p>Your score is </p>
					</div>
					{/* <div className="flex text-gray-400">
						<Link href="#">There is a link </Link>
					</div> */}
				</div>
				<div className="flex justify-center">
					{isConnected && <Passport setScore={setScore} setNoScoreMessage={setNoScoreMessage} setSubmit={setSubmit} isSubmitted={isSubmitted} />}
				</div>
				<p>{score}</p>
				<p>{noScoreMessage}</p>
			</div>
		</div>
	);
}
