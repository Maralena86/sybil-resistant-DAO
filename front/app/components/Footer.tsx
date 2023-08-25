import Image from "next/image";
import githubPic from "@/public/github.svg";

export const Footer = () => {
	return (
		<section className="mt-5 mb-3 w-full flex justify-center gap">
			<a
				href="https://github.com/Maralena86/sybil-resistant-DAO"
				target="_blank"
				rel="noreferrer"
			>
				<Image
					className="h-8 object-contain cursor-pointer opacity-70 hover:opacity-100"
					src={githubPic}
					alt="github"
				/>
			</a>
		</section>
	);
};
