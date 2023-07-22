const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const NFTFactory = await hre.ethers.getContractFactory("NFTFactory");
  const factory = await NFTFactory.deploy("KYCNFTFactory","knf",0,10000,10000,"0x78f83b36468bFf785046974e21A1449b47FD7e74","0xC2679fBD37d54388Ce493F1DB75320D236e1815e");

  await factory.deployed();
  console.log("Contract address is: ", factory.address);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});