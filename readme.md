# dHealthNetwork Smart Contract

This repository contains the Smart Contract and tests for a dHealthNetwork (dHt) token.

dHt is a ERC20-compliant token based on the [ERC223](https://github.com/Dexaran/ERC223-token-standard) proposal due to the additional features it provides for ongoing usage of the token within the dHealthNetwork utility network.

# Sale Contract

## Public Address

```
0x11D635bbba3f9B8f7C9b91cA9f315a2207cb5AD5
```

## ABI

```
[{"constant":true,"inputs":[],"name":"technologyShare","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"resume","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"sendToGrowthContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isClose","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"growthContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"phase2TokenSold","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"plus","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"founderShare","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minEthPerTransaction","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"phase3TokenSold","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"founderContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"close","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"phase2TokenPriceInEth","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"phase2MaxTokenForSale","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalEtherRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"phase3EndingAt","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"phase1MaxTokenForSale","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"val","type":"uint256"}],"name":"setBlockTime","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"contractTimeout","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"phase1TokenSold","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"phase3MaxTokenForSale","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getBlockTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxTokenForSale","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"val","type":"uint256"}],"name":"setPlusTime","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"technologyContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"projectContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"phase3TokenPriceInEth","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isPaused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalTokenSold","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"tokenFallback","outputs":[],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"phase3StartingAt","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"phase2EndingAt","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"etherRaisedPerWallet","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_message","type":"string"}],"name":"transferManual","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"sendToVestingContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"projectShare","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"distribute","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"ts","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"phase1StartingAt","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"beneficiary","type":"address"}],"name":"buy","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"phase1EndingAt","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"maxEthPerTransaction","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"phase1TokenPriceInEth","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"phase2StartingAt","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_token","type":"address"},{"name":"_projectContract","type":"address"},{"name":"_technologyContract","type":"address"},{"name":"_founderContract","type":"address"},{"name":"_growthContract","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_purchaser","type":"address"},{"indexed":true,"name":"_beneficiary","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_amount","type":"uint256"},{"indexed":false,"name":"_timestamp","type":"uint256"}],"name":"TokenPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_message","type":"string"}],"name":"TransferManual","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]
```

# Token Definition Contract

## Public Address
```
0x605c90b034E075f5Ff1e9B91939747ECA6ef7B9d
```
Symbol:   dHt

Decimals: 18

## ABI
```
[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_initialAmount","type":"uint256"},{"name":"_tokenName","type":"string"},{"name":"_decimalUnits","type":"uint8"},{"name":"_tokenSymbol","type":"string"}],"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]

```

# ICO Logic

## Sale Contract

1.  Mint 500m tokens

2.  Send 180m to "Growth Contract"

3.  Send 140m to "Incentive Contract"

4.  With the remaining 180m tokens, continue as below within this contract

5.  Beginning January 26th 00:00 GMT until February 9th 00:00 GMT set exchange rate of 2000 dHt for each 1ETH and allow up to 60m tokens total to be sold at this price

6.  Beginning February 9th 00:00 GMT until February 23rd 00:00 GMT exchange rate is 1650 dHt for each 1ETH and allow up to 120m tokens total to be sold at this price

7.  Beginning February 23rd 00:00 GMT until March 9th 00:00 GMT exchange rate is 1300 dHt for each 1ETH and allow up to 180m tokens total to be sold at this price

8.  On or after March 9th 00:00 GMT, send any unsold tokens to Growth Contract when "sendToGrowthContract" function triggered

9.  Whenever the "sendToVestingContract" function is triggered, send any ETH received to the below distribution

```
Action Projects (AP) => AP Vesting Contract @ 72.00% of wallet total ETH
Marketing & Technology => Tech Vesting Contract @ 18.00% of wallet total ETH
Founders => Founders Vesting Contract @ 10.00% of wallet total ETH
```

In all cases, ensure no single purchase exceeds 1000 ETH. If larger than 1000 ETH then return the difference. Check that total ETH attempting to be transferred is < 1000 ETH, if false then only use up to 1000 ETH from the total and return the remaining ETH that was greater than 1000 ETH to requesting wallet. If a purchase is less than 0.01 ETH then reject it.

## Growth Contract

On April 15th 00:00 GMT send 45m tokens to the Exchanges Wallet. This intends to be used to incentivise exchanges to consider dHt.

```
0xaC36fed1994aeA1499636Adb3392750ffd9086e2
```

On May 1st 00:00 GMT send 45m tokens to the Countries Wallet. This intends to be used to attract providers to the platform in specific countries through targeted campaigns.
```
0xcBe422cEF1e85a1409066E51D04722B00B97a153
```

On May 15th 00:00 GMT send 45m tokens to the Acquisitions Wallet. This intends to be used to strategically aquire technology and services for the purpose of increasing the service offering, expanding the user base and acquiring assets.
```
0x64Ec9c119479f851f1C746572747C8Fd6EB38116
```


On June 1st 00:00 GMT send 45m tokens to the Coin Drops Wallet. This intends to be used to increase market excitement in accordance with the marketing strategy.
```
0x1E187C6FC3D7f7A9b7E7eabFa2dBf23c5f77Aa7b
```

## Incentive Contract

-   10m tokens to be distributed 29 Mar 2018 00:00 GMT to "Community Support Vesting Contract"

-   15m tokens to be distributed 27 Feb 2019 00:00 GMT to "Founders Distribution Vesting Contract"

-   55m tokens to be distributed 29 Mar 2018 00:00 GMT to "Technical Talent Vesting Contract"

-   60m tokens to be distributed 29 Mar 2018 00:00 GMT to "Management Talent Vesting Contract"


## Community Support Vesting Contract (dHt)

Start at 29 Mar 2018 00:00 GMT and run for 18 months.

On trigger method "Pay" from approved wallet below send 20% of wallet total to the fixed wallet address but do not exceed more than 20% paid per month.

```
0x36bE99e10Ae753E82D7C7F8B3830878E5dF6894c
```

If claim is placed at the final month of the contract, then the balance of the wallet is returned and the contract is destroyed.

## Founders Distribution Vesting Contract (dHt)

Start at 26 Jan 2018 00:00 GMT and run for 18 months.

On trigger method "Pay" from approved wallet below send 20% of wallet total to the fixed wallet address but do not exceed more than 20% paid per month.

```
0x9D26827bB0994Eec3c34753D6e4EBdB5074BaB0c
```

If claim is placed at the final month of the contract, then the balance of the wallet is returned and the contract is destroyed.

This wallet will be used immediately to pay the initial Founding Members pre-ICO pledges then returning to a standard vesting schedule beyond this date.

## Technical Talent Vesting Contract (dHt)

Start at 29 Mar 2018 00:00 GMT and run for 18 months.

On trigger method "Pay" from approved wallet below send 20% of wallet total to the fixed wallet address but do not exceed more than 20% paid per month.
```
0x3e6D5E8B9C5B7cc1FB5c12E7e107Cb0A980f9481
```

If claim is placed at the final month of the contract, then the balance of the wallet is returned and the contract is destroyed.

## Management Talent Vesting Contract (dHt)

Start at 29 Mar 2018 00:00 GMT and run for 18 months.

On trigger method "Pay" from approved wallet below send 20% of wallet total to the fixed wallet address but do not exceed more than 20% paid per month.
```
0x9E836d67b7DbCE8851f1Ac9f039bA977ED49B1b8
```

If claim is placed at the final month of the contract, then the balance of the wallet is returned and the contract is destroyed.

## AP Vesting Contract (ETH)

Start at 26 Jan 2018 00:00 GMT and run for 18 months.

On trigger method "Pay" from approved wallet below send 20% of wallet total to the fixed wallet address but do not exceed more than 20% paid per month.
```
0x8Eae6d7fe79cac17B82A9D052BbEDfE80dfa8cb2
```

If claim is placed at the final month of the contract, then the balance of the wallet is returned and the contract is destroyed.

## Technology Vesting Contract (ETH)

Start at 26 Jan 2018 00:00 GMT and run for 18 months.

On trigger method "Pay" from approved wallet below send 20% of wallet total to the fixed wallet address but do not exceed more than 20% paid per month.
```
0xE2fA53FbF303af8BBa5D245eA4760Db29779363A
```

If claim is placed at the final month of the contract, then the balance of the wallet is returned and the contract is destroyed.

## Founders Vesting Contract (ETH)

Start at 26 Jan 2018 00:00 GMT and run for 18 months.

On trigger method "Pay" from approved wallet below send 20% of wallet total to the fixed wallet address but do not exceed more than 20% paid per month.
```
0xEfc3B85BE8040d2d750A87A3Cf20717C8491BE5F
```

If claim is placed at the final month of the contract, then the balance of the wallet is returned and the contract is destroyed.