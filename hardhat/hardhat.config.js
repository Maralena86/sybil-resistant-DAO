require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.7",
  networks:{
    hardhat: {},
    neon_devnet: {
      url: "https://devnet.neonevm.org",
      chainId: 245022926,
      accounts: ["0x..."] 
    }
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.API_KEY,
      neon_devnet: "test"
    },
    customChains: [
      {
        network: "neon_devnet",
        chainId: 245022926,
        urls: {
          apiURL: "https://devnet-api.neonscan.org/hardhat/verify",
          browserURL: "https://devnet.neonscan.org"
        }
      }
    ]
  },
 
};