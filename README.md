# Sybil Resistant DAO

We allow any protocol or DAO to rapidly discern the authenticity of users.   
We achieve this using a combination of on-chain attestations, gitcoin passport, and a Soul bound tokenn mint to qualified users.    


# Forge / Smart contract deploy instructions 

- Create forge sol deploy script in deploy/script
- Create shell script to call deploy script in `deploy`
- Grant perms: `chmod u+x`
- Run the script - `./deployX.sh`, abi found in out/ 

# Deployments
| Network               | Address                                          |
|-----------------------|--------------------------------------------------|
| Linea                 | 0xc70a7Cff617E1F2EEdE7D2D18A6a4888DdF77219     |
| Polygon zkEVM (Testnet)| [0xB02d792E290DEc52255d01b221686b4A11254268](https://testnet-zkevm.polygonscan.com/address/0xb02d792e290dec52255d01b221686b4a11254268)     |
| Neon EVM (Devnet)     | [0x980fe87188338c69C210335763b2669ec8F256e0](https://devnet.neonscan.org/address/0x980fe87188338c69C210335763b2669ec8F256e0#contract)  |
| Sepolia (Testnet)     | [0xf13b66Fb0bc1BC35AB89b7647A4ea0E608aA799c](https://sepolia.etherscan.io/address/0xf13b66Fb0bc1BC35AB89b7647A4ea0E608aA799c)


# Contract verification 
```

  forge verify-contract --constructor-args $(cast abi-encode "constructor(string,string,uint256,uint256, uint256, address, address)" "KYCNFTFactory" "knf" 0 10000 10000 0x78f83b36468bFf785046974e21A1449b47FD7e74 0xC2679fBD37d54388Ce493F1DB75320D236e1815e) \
  0xA393088d6172845e4F4003E3FD958a9F174420B0 NFTFactory --chain=sepolia --watch
```

## Wallet Connect 
Web3Modal https://github.com/Maralena86/sybil-resistant-DAO/blob/b0cbb7616521d0b0055df2095d3ab47f5d3383c9/front/app/page.tsx#L8
https://twitter.com/0xyanc/status/1682902807920406528?s=20

## EAS
https://github.com/Maralena86/sybil-resistant-DAO/blob/ebd9a5e706e561a4bd225761faaabd4fcc58f3f8/forge/src/NFTFactory.sol#L114
https://github.com/Maralena86/sybil-resistant-DAO/blob/ebd9a5e706e561a4bd225761faaabd4fcc58f3f8/front/app/components/EAS.tsx#L20

## zkBob
Onboarded account: 0x7307174ED422E37CB5254b944ffa762907F0B41b
