const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
    contracts_build_directory: "./artifacts",
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*",
        },
    },
    compilers: {
        solc: {
            version: "0.8.15",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 4290000000,
                },
            },
        },
    },
};