import Image from "next/image";
import Link from "next/link";
import { shieldProof, shieldEmpty } from "@/public";
import { Passport } from ".";
import { useAccount } from "wagmi";
import { useState } from "react";
import { EASComponent, Modal } from ".";

export const Card = () => {
	const { isConnected, isDisconnected } = useAccount();
	const [isSubmitted, setSubmit] = useState(false);
	const [score, setScore] = useState<string>("");
	const [noScoreMessage, setNoScoreMessage] = useState<string>("");
	const [account, setAccount] = useState<`0x${string}` | undefined>(undefined);
	const [modal, setModal] = useState(false);

	const scoreColor = () => {
		if (score === '')
			return ""
		else {
			const scoreValue = parseFloat(score)
			if (scoreValue <= 30)
				return "text-red-700"
			else
				return "text-green-700"
		}
	}

	return (
		<div className="relative card py-8 px-16 rounded-3xl my-4 shadow-xl">
			<div className="  card-icon flex items-center absolute rounded-full py-4 px-4 shadow-xl left-4 -top-6">
				<Image src="/gitcoinco.png" width={30} height={30} alt="Gitcoin" />
			</div>
			<div className="  card-icon flex items-center absolute rounded-full py-4 px-4 shadow-xl right-4 -top-6">
				<Image src="/eas.png" width={30} height={30} alt="Gitcoin" />
			</div>
			<div className="mt-4 text-center">
				<p className="sm:text-2xl font-semibold my-2 text-sky-200">
					Join the Sybil Resistant DAO
				</p>
				<div className="py-6">
					<p className="text-4xl">Your score is: <span className={`${scoreColor()}`}>{score.substring(0, 5)}</span></p>
					{/* <Link href="#" className="text-gray-300">
						There is a link{" "}
					</Link> */}
					<div onClick={() => { setModal(true) }}>
						<Image src={shieldEmpty} className="img-shield" alt="logo" />
					</div>
					{/* <Image src={shieldProof} className="img-shield rotate" alt="logo" /> */}
				</div>
				{score === "" &&
					<div className="flex justify-center">
						{isConnected && (
							<Passport
								setAccount={setAccount}
								setScore={setScore}
								setNoScoreMessage={setNoScoreMessage}
								setSubmit={setSubmit}
								isSubmitted={isSubmitted}
							/>
						)}
					</div>}
				{score !== "" && parseFloat(score) < 30 &&
					<p>You need to go to {' '}
						<a target="_blank" href="https://passport.gitcoin.co" className="underline">
							Gitcoin Passport
						</a>
						{' '} to improve your score to minimum 30</p>
				}
				{score !== "" && parseFloat(score) > 30 &&
					<div className="flex justify-center">
						{isConnected && (
							<EASComponent account={account} />
						)}
					</div>
				}
				<p>{noScoreMessage}</p>
				{isDisconnected && <p>Please click on Connect Wallet</p>}
				{isConnected && !isSubmitted && score === "" && <p className="mt-2">First, Click on Submit Password to request your score</p>}
				{isConnected && isSubmitted && score === "" && <p className="mt-2">Then, Click on Check Password to get your score</p>}
			</div>
			{modal && <Modal setModal={setModal} tx={'0x7c76dc1cf621efecbc9ba9a765421557bb3cbb3e89343267ac3c62bc8b77fc1e'} />}
		</div>
	);
};
