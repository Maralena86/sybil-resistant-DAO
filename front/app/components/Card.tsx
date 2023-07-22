import Image from "next/image";
import Link from "next/link";
<<<<<<< HEAD
import { shieldProof } from "@/public";
export function Card() {
=======
import { Passport } from "."
import { useAccount } from 'wagmi'
import { useState } from 'react'

export const Card = () => {
	const { isConnected } = useAccount()
	const [score, setScore] = useState<string>('')
	const [noScoreMessage, setNoScoreMessage] = useState<string>('')

>>>>>>> db3e4aa13826cc48106668b56d6f914b3f14b072
	return (
		<div className="relative card py-8 px-16 rounded-3xl my-4 shadow-xl">
			<div className="  card-icon flex items-center absolute rounded-full py-4 px-4 shadow-xl left-4 -top-6">
				<Image src="/gitcoinco.png" width={30} height={30} alt="Gitcoin" />
			</div>
			<div className="  card-icon flex items-center absolute rounded-full py-4 px-4 shadow-xl right-4 -top-6">
				<Image src="/sismo.png" width={30} height={30} alt="Gitcoin" />
			</div>
<<<<<<< HEAD
			<div className="mt-4 text-center">
				<p className="sm:text-2xl font-semibold my-2 text-sky-200">
					Join the Sybil Resitant DAO
				</p>
				<div className="py-6">
					
					<p className="text-4xl">0.0</p>
					
				
						<Link href="#" className="text-gray-300">There is a link </Link>
					
					<Image src={shieldProof} className="img-shield rotate" alt="logo" />
=======
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
>>>>>>> db3e4aa13826cc48106668b56d6f914b3f14b072
				</div>
				<div className="flex justify-center">
					{!isConnected &&
						<div className="text-base card-button font-semibold">
							<button>SUBMIT</button>
						</div>
					}
					{isConnected && <Passport setScore={setScore} setNoScoreMessage={setNoScoreMessage} />}
				</div>
				<p>{score}</p>
				<p>{noScoreMessage}</p>
			</div>
		</div>
	);
}
