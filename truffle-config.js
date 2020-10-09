require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
    networks: {
      /*development: {
        host: '127.0.0.1',
        port: 8545,
        network_id: '*',
        gas: 0xfffffffffff,
        gasPrice: 0x01,
      },*/
      rinkeby: {
        provider: () =>
          new HDWalletProvider(
            process.env.MNEMONIC,
            'https://rinkeby.infura.io/v3/' + process.env.INFURA_API_KEY
          ),
        gas: 2000000,
        gasPrice: 50000000000,
        network_id: 4,
      },
      ropsten: {
        provider: () =>
          new HDWalletProvider(
            process.env.MNEMONIC,
            'https://ropsten.infura.io/v3/' + process.env.INFURA_API_KEY
          ),
        network_id: 3,
        gas: 5898551,
        gasPrice: 50000000000
      },
      mainnet: {
        ref: 'mainnet-prod',
        network_id: 1,
        provider: () =>
          new HDWalletProvider(
            process.env.MNEMONIC,
            'https://mainnet.infura.io/v3/' + process.env.INFURA_API_KEY
          ),
        gasPrice: 150000000000
      }
    },
  compilers: {
    solc: {
      version: "0.6.12"
    }
  }
};
