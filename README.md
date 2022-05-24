# 🔍 lexiconomy

## 📚 background

The original **lexiconomy** was built in early 2018 and launched on the Ethereum mainnet on [March 28, 2019](https://etherscan.io/txs?a=0x05dde4609035e464f995d13221b5166080634f21&f=5). Like many other projects of its time, the **lexiconomy** was inspired by [CryptoKitties](https://www.cryptokitties.co/), which paved the way for the ERC-721 standard. The **lexiconomy** explored concepts of provable creation and ownership, composability, and token economics unlocked by the nascent NFT and web3 ecosystem. 

The **lexiconomy**, true to  its name, breaks language down into ownable, composable, and trade-able parts. Every letter, symbol, word, or phrase is a _lemma_ and every _lemma_ is a unique, ownable NFT. The project was intended to be provocative, absurd, and playful, much like the internet itself.

## 🤔 why lexiconomy v2? 

While at [Viaduct](https://viaduct.ai/), I took three years off from the crypto and web3 space. In those years, the NFT ecosystem exploded. Interest peaked, I decided to dust off the old **lexiconomy** repositories. After reviewing the state of the **lexiconomy** and NFT ecosystem, I felt a rewrite and redesign was appropriate for a number of reasons, including: 

- Opportunity to dive back into the Solidity and web3 developer tooling and see how what has changed.
- Unabled to verify ownership and the source code of original contract on Etherscan. This caused incompatibility issues with downstream NFT and DApp marketplaces that relied on Etherscan.
- Breaking changes in web3 libraries (I'm looking at you [web3.js](https://web3js.readthedocs.io/en/v1.7.3/) and [truffle](https://trufflesuite.com/)) made the previous app unmaintainable without a serious re-write.
- Token metadata and images became the focal point of NFTs. The original **lexiconomy** was focused exclusively on-chain data-layer and wasn't compliant with OpenSea's token metadata API standard. 
- I ❤️ coding.

## 🏛 project structure

#### /contracts

The Solidity contracts for the **lexiconomy** v2.

#### /scripts

[Hardhat](https://hardhat.org/) scripts for deploying and initializing the **lexiconomy** contract. 

#### /test

Unit and integration tests for the **lexiconomy** contracts.

#### /app

The **lexiconomy** app built with [SvelteKit](https://kit.svelte.dev/).

## 👾 features, bugs, ideas

If you have ideas, feature requests, or found a bug, make a Github issue! Contributions are welcome.
