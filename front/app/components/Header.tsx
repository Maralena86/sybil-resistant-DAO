import Image from "next/image";
import { Web3Button } from "@web3modal/react";

export const Header = () => {
	return (
		<header className="flex justify-between p-6">
			<Image src="/favicon.ico" width={40} height={40} alt="logo" />
			<div className="">
				<Web3Button />
			</div>
		</header>
	);
};
