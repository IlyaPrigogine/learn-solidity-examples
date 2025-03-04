require("dotenv").config();

require('hardhat-contract-sizer');
require("@nomiclabs/hardhat-waffle");
require(`@nomiclabs/hardhat-etherscan`);
require("solidity-coverage");
require('hardhat-gas-reporter');
require('hardhat-deploy');
require('hardhat-deploy-ethers');
require('@openzeppelin/hardhat-upgrades');
require('./tasks');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

function getMnemonic(networkName) {
  if (networkName) {
    const mnemonic = process.env['MNEMONIC_' + networkName.toUpperCase()]
    if (mnemonic && mnemonic !== '') {
      return mnemonic
    }
  }

  const mnemonic = process.env.MNEMONIC
  if (!mnemonic || mnemonic === '') {
    return 'test test test test test test test test test test test junk'
  }

  return mnemonic
}

function getPrivateKey(networkName) {
  if (networkName) {
    const mnemonic = process.env['PRIVATE_KEY_' + networkName.toUpperCase()]
    if (mnemonic && mnemonic !== '') {
      return mnemonic
    }
  }
  return process.env.PRIVATE_KEY
}


function accounts(chainKey) {
  return { mnemonic: getMnemonic(chainKey) }
}

function account(chainKey) {
  return [getPrivateKey(chainKey)]
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {

  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]


  },

  // solidity: "0.8.4",
  contractSizer: {
    alphaSort: false,
    runOnCompile: true,
    disambiguatePaths: false,
  },

  namedAccounts: {
    deployer: {
      default: 0,    // wallet address 0, of the mnemonic in .env
    },
    proxyOwner: {
      default: 1,
    },
  },

  mocha: {
    timeout: 100000000
  },

  networks: {
    ethereum: {
      url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // public infura endpoint
      chainId: 1,
      accounts: account(),
    },
    bsc: {
      url: "https://bsc-dataseed1.binance.org",
      chainId: 56,
      accounts: account(),
    },
    avalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      chainId: 43114,
      accounts: account(),
    },
    polygon: {
      url: "https://rpc-mainnet.maticvigil.com",
      chainId: 137,
      accounts: account(),
    },
    arbitrum: {
      url: `https://arb1.arbitrum.io/rpc`,
      chainId: 42161,
      accounts: account(),
    },
    optimism: {
      url: `https://mainnet.optimism.io`,
      chainId: 10,
      accounts: account(),
    },
    fantom: {
      url: `https://rpcapi.fantom.network`,
      chainId: 250,
      accounts: account(),
    },
    metis: {
      url: `https://andromeda.metis.io/?owner=1088`,
      chainId: 1088,
      accounts: account(),
    },

    goerli: {
      url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // public infura endpoint
      chainId: 5,
      accounts: account(),
    },
    'bsc-testnet': {
      url: 'https://bsc-testnet.publicnode.com',
      chainId: 97,
      accounts: account(),
      gas: 10000000,
    },
    fuji: {
      url: `https://api.avax-test.network/ext/bc/C/rpc`,
      chainId: 43113,
      accounts: account(),
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      chainId: 80001,
      accounts: account(),
    },
    'arbitrum-goerli': {
      url: `https://goerli-rollup.arbitrum.io/rpc/`,
      chainId: 421613,
      accounts: account(),
    },
    'optimism-goerli': {
      url: `https://goerli.optimism.io/`,
      chainId: 420,
      accounts: account(),
    },
    'fantom-testnet': {
      url: `https://rpc.ankr.com/fantom_testnet`,
      chainId: 4002,
      accounts: account(),
    }
  }
};
