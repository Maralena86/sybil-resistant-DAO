# Sybil Resistant DAO

# Forge / Smart contract deploy instructions 

- Create forge sol deploy script in deploy/script
- Create shell script to call deploy script in `deploy`
- Grant perms: `chmod u+x 

# Deployments
| Network               | Address                                          |
|-----------------------|--------------------------------------------------|
| Linea                 | 0xc70a7Cff617E1F2EEdE7D2D18A6a4888DdF77219     |
| Polygon zkEVM (Testnet)| [0xB02d792E290DEc52255d01b221686b4A11254268](https://testnet-zkevm.polygonscan.com/address/0xb02d792e290dec52255d01b221686b4a11254268)     |
| Neon EVM (Devnet)     | [0x980fe87188338c69C210335763b2669ec8F256e0](https://devnet.neonscan.org/address/0x980fe87188338c69C210335763b2669ec8F256e0#contract)  |
| Sepolia (Testnet)     | [0x2B6F60bec5a6Ee94935A76C5647D2E1C44A41F30](https://sepolia.etherscan.io/address/0x2B6F60bec5a6Ee94935A76C5647D2E1C44A41F30)


# Contract verification 
```

  forge verify-contract --constructor-args $(cast abi-encode "constructor(string,string,uint256,uint256, uint256, address, address)" "KYCNFTFactory" "knf" 0 10000 10000 0x78f83b36468bFf785046974e21A1449b47FD7e74 0xC2679fBD37d54388Ce493F1DB75320D236e1815e) \
  0xA393088d6172845e4F4003E3FD958a9F174420B0 NFTFactory --chain=sepolia --watch
```
