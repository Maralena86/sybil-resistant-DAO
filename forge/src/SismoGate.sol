// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "forge-std/console2.sol";
import "sismo-connect-solidity/SismoConnectLib.sol";

/*
 * @title SismoGate
 * @author Sismo
 * @dev Simple contract gated by Sismo Connect to get Gitcoin Passport Score for an user
 * Application requests multiple zk proofs (with auths and claims requests) and verify them
 * The contract stores all requests and verified results in storage
 */
contract SismoGate is ERC20, SismoConnect {
  event ClaimVerified(VerifiedClaim verifiedClaim);
  event SignedMessageVerified(bytes verifiedSignedMessage);
  using SismoConnectHelper for SismoConnectVerifiedResult;

  // appId of the Sismo Connect app
  bytes16 private _appId = 0x32403ced4b65f2079eda77c84e7d2be6;
  // allow proofs made from impersonating accounts to be verified
  // it should be set to false for production
  bool private _isImpersonationMode = false;

  // Results of the verification of the Sismo Connect response.
  VerifiedClaim[] internal _verifiedClaims;
  bytes internal _verifiedSignedMessage;

  constructor(
    string memory name,
    string memory symbol
  ) ERC20(name, symbol) SismoConnect(buildConfig(_appId, _isImpersonationMode)) {
    // Defining requests that will be queried by the app frontend to allow users to generate a Sismo Connect response in their Sismo Vault
    // The Sismo Connect Response holding the zk proofs will be checked against these requests in the claimWithSismo function below
  }

  /**
   * @dev Claim the airdrop with a Sismo Connect response
   * Sismo Connect response's zk proofs will be checked against the requests defined in the constructor above
   * @param response Sismo Connect response
   * @param to address to mint the airdrop to
   */
  function claimWithSismo(bytes memory response, address to) public {
    // Request users to prove membership in a Data Group (e.g I own a wallet that is part of a DAO, owns an NFT, etc.)
    ClaimRequest[] memory claimRequests = new ClaimRequest[](1);
    // claim on Sismo Hub GitHub Contributors Data Group membership: https://factory.sismo.io/groups-explorer?search=0xda1c3726426d5639f4c6352c2c976b87
    // Data Group members          = contributors to sismo-core/sismo-hub
    // value for each group member = number of contributions
    // request user to prove membership in the group
    claimRequests[0] = buildClaim({
      groupId: 0x1cde61966decb8600dfd0749bd371f12,
      value: 30,
      claimType: ClaimType.GTE
    });
    // claim on Stand with Crypto NFT Minters Data Group membership: https://factory.sismo.io/groups-explorer?search=0xfae674b6cba3ff2f8ce2114defb200b1
    // Data Group members          = minters of the Stand with Crypto NFT
    // value for each group member = number of NFT minted
    // request user to prove membership in the group with value = 10

    SismoConnectVerifiedResult memory result = verify({
      responseBytes: response,
      // checking response against requested claims
      claims: claimRequests,
      // checking response against a message signature
      // the message is the address to mint the airdrop to
      // this signature prevents front-running attacks
      signature: buildSignature({message: abi.encode(to)})
    });

    // airdrop amount = number of verified proofs
    uint256 airdropAmount = (result.auths.length + result.claims.length) * 10 ** 18;
    _mint(to, airdropAmount);

    // remove previous verified results from the verification
    _removePreviousVerifiedResults();

    // storing the result of the verification
    for (uint256 i = 0; i < result.claims.length; i++) {
      _verifiedClaims.push(result.claims[i]);
      emit ClaimVerified(result.claims[i]);
    }
    _verifiedSignedMessage = result.signedMessage;
    emit SignedMessageVerified(result.signedMessage);
  }

  /**
   * @dev Get the verified auths, claims and the verified signature that was verified in the claimWithSismo function
   */
  function getSismoConnectVerifiedResult()
    external
    view
    returns (VerifiedClaim[] memory, bytes memory)
  {
    return (_verifiedClaims, _verifiedSignedMessage);
  }

  // helpers

  function _removePreviousVerifiedResults() private {
    _cleanVerifiedClaims();
  }

  function _cleanVerifiedClaims() private {
    uint256 verifiedClaimsLength = _verifiedClaims.length;
    if (verifiedClaimsLength != 0) {
      for (uint256 i = 0; i < verifiedClaimsLength; i++) {
        _verifiedClaims.pop();
      }
    }
  }
}
