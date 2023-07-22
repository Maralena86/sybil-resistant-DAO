// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../../src/NFTFactory.sol";

contract Deploy is Script {
    // Test accounts from passphrase in env (not in repo)
    // address constant account0 = 0x17eE56D300E3A0a6d5Fd9D56197bFfE968096EdB;

    function run() external {
        // uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(); /*deployerPrivateKey*/

        console.log("Creator (owner): ", msg.sender);


        // string memory _name,
        // string memory _symbol,
        // uint256 _price, // Price of each NFT in ETH, 1 ETH = 1e18 or 1 followed by 18 0s
        // uint256 _maxSupply, // max supply of the nfts
        // uint256 _maxPerMint, // max no. of nfts a user can mint in a single tx. also max they can mint into 1 wallet
        // address artist // artist address
        // EAS address
        NFTFactory factory = new NFTFactory(
          'KYCNFTFactory',
          'knf',
          0,
          10000,
          10000,
          0x4f2bD410B81Ea24F83D1E807511BAec204c4Cf7a,
          0x0000000000000000000000000000000000000000
        );
        
        console.log("NFT Factory deployed: ", address(factory));
    }
}
