const hre = require("hardhat");

async function main() {
  const CCRToken = await hre.ethers.getContractFactory("CCRToken");

  const deployCcrToken = await CCRToken.deploy();

  await deployCcrToken.waitForDeployment();

  console.log(`CCRToken is deployed at: ${await deployCcrToken.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
