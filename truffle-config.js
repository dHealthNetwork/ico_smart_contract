module.exports = {
	networks: {
		development: {
			host: "localhost",
			port: 8545,
			network_id: "*" // Match any network id
		},
		ropsten: {
		    network_id: 3,
		    host: '127.0.0.1',
		    port: 8545,
		    gas: 4000000,
		    from: 0x0
		},
	}
};
