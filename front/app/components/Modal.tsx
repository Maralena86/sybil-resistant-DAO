import { shieldProof } from "@/public";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
export const Modal = ({
	setModal, tx
}: {
	setModal: Dispatch<SetStateAction<boolean>>
	tx: `0x${string}` | undefined
}) => {
	return (
		<div
			className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
			id="modal-id"
		>
			<div className="absolute bg-black opacity-80 inset-0 z-0"></div>
			<div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  modal-container">
				<div className="">
					<div className="text-center p-5 flex-auto justify-center">
						<h2 className="text-xl font-bold py-4 ">
							Congratulations. You have minted!{" "}
						</h2>
						<Image src={shieldProof} className="img-shield rotate" alt="logo" />
						<p className="text-sm text-gray-500 px-8"></p>
					</div>
					<div className="text-center">Congratulations, you are a human!
						<div>
							<a href={`https://sepolia.etherscan.io/tx/${tx}`} className="underline">Etherscan</a>
						</div>
					</div>
					<div className="p-3  mt-2 text-center space-x-4 md:block">
						<button
							className="mb-2 md:mb-0  border border-sky-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full"
							onClick={() => setModal(false)}
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
