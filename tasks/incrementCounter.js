const CHAIN_ID = require("../constants/chainIds.json")
const ENDPOINTS = require("../constants/layerzeroEndpoints.json");

module.exports = async function (taskArgs, hre) {
    const remoteChainId = CHAIN_ID[taskArgs.targetNetwork]
    const omniCounter = await ethers.getContract("OmniCounter2")

    // quote fee with default adapterParams
    let adapterParams = ethers.utils.solidityPack(["uint16", "uint256"], [1, 200000]) // default adapterParams example

    const endpoint = await ethers.getContractAt("ILayerZeroEndpoint", ENDPOINTS[hre.network.name])
    let fees = await endpoint.estimateFees(remoteChainId, omniCounter.address, "0x", false, adapterParams)
    console.log(`fees[0] (wei): ${fees[0]} / (eth): ${ethers.utils.formatEther(fees[0])}`)
    let fee = fees[0].mul(2);
    console.log('actual send fee:', ethers.utils.formatEther(fee))

    let tx = await (
        await omniCounter.incrementCounter(
            remoteChainId,
            { value: fee}
        )
    ).wait()
    console.log(`✅ Message Sent [${hre.network.name}] incrementCounter on destination OmniCounter @ [${remoteChainId}]`)
    console.log(`tx: ${tx.transactionHash}`)

    console.log(``)
    console.log(`Note: to poll/wait for the message to arrive on the destination use the command:`)
    console.log(`       (it may take a minute to arrive, be patient!)`)
    console.log("")
    console.log(`    $ npx hardhat --network ${taskArgs.targetNetwork} ocPoll`)
}
