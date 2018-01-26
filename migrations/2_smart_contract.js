var dHealthToken = artifacts.require("./dHealthToken.sol");
var dHealthTokenGrowth = artifacts.require("./dHealthTokenGrowth.sol");
var dHealthTokenIncentive = artifacts.require("./dHealthTokenIncentive.sol");
var dHealthEtherVesting = artifacts.require("./dHealthEtherVesting.sol");
var dHealthTokenVesting = artifacts.require("./dHealthTokenVesting.sol");
var dHealthTokenSale = artifacts.require("./dHealthTokenSale.sol");

module.exports = function(deployer , network , accounts) {

	// var exchangesGrowthWallet = accounts[1];
	// var countriesGrowthWallet = accounts[2]; 
	// var acquisitionsGrowthWallet = accounts[3]; 
	// var coindropsGrowthWallet = accounts[4];

	// // ether vesting wallets
	// var projectEtherVestingWallet = accounts[5];
	// var technologyEtherVestingWallet = accounts[6];
	// var founderEtherVestingWallet = accounts[7];

	// // token vesting wallets
	// var communityTokenVestingWallet = accounts[5];
	// var foundersTokenVestingWallet = accounts[6];
	// var technicalTokenVestingWallet = accounts[7];
	// var managementTokenVestingWallet = accounts[8];

	/* MAIN NETWORK */	
	var exchangesGrowthWallet = '0xaC36fed1994aeA1499636Adb3392750ffd9086e2';
	var countriesGrowthWallet = '0xcBe422cEF1e85a1409066E51D04722B00B97a153'; 
	var acquisitionsGrowthWallet = '0x64Ec9c119479f851f1C746572747C8Fd6EB38116'; 
	var coindropsGrowthWallet = '0x1E187C6FC3D7f7A9b7E7eabFa2dBf23c5f77Aa7b';

	var projectEtherVestingWallet = '0x8Eae6d7fe79cac17B82A9D052BbEDfE80dfa8cb2';
	var technologyEtherVestingWallet = '0xE2fA53FbF303af8BBa5D245eA4760Db29779363A';
	var founderEtherVestingWallet = '0xEfc3B85BE8040d2d750A87A3Cf20717C8491BE5F';

	var communityTokenVestingWallet = '0x36bE99e10Ae753E82D7C7F8B3830878E5dF6894c';
	var foundersTokenVestingWallet = '0x9D26827bB0994Eec3c34753D6e4EBdB5074BaB0c';
	var technicalTokenVestingWallet = '0x3e6D5E8B9C5B7cc1FB5c12E7e107Cb0A980f9481';
	var managementTokenVestingWallet = '0x9E836d67b7DbCE8851f1Ac9f039bA977ED49B1b8';


	/* ROPSTEN NETWORK */	
	// var exchangesGrowthWallet = '0xC981bF0c3AaaF355D4511c958Bba7Df4632BBa9A';
	// var countriesGrowthWallet = '0x96Fb7bBD1fdF36d6d4bCA13E01eA77cF3DBBF60f'; 
	// var acquisitionsGrowthWallet = '0xA95b4BD3e092Bff399d88dad0b405f728B9D773D'; 
	// var coindropsGrowthWallet = '0x59405E70CF6bBe63D22169BB368D61ced4A46675';

	// var projectEtherVestingWallet = '0x3461121102E5BC59Eac68031c278677777378e2B';
	// var technologyEtherVestingWallet = '0x13bE6D633d73aB6f2603cC68C8832A21C047C17d';
	// var founderEtherVestingWallet = '0xed2717dC3e4d20Cc40644773639b2B53782D782F';

	// var communityTokenVestingWallet = '0x5680BFAFA114302fffe5F03C70b8AFB933842323';
	// var foundersTokenVestingWallet = '0xb13A82d3Bf1Aa1C26B149a26F3658CD03ab41213';
	// var technicalTokenVestingWallet = '0xa7d5EbC8204595eD8c49a36df8bB69bD364E221c';
	// var managementTokenVestingWallet = '0x71502Ab94d5b176B9af2d4e92754Eb5E8F75928E';

	/*
Token Contract : 0x11D635bbba3f9B8f7C9b91cA9f315a2207cb5AD5
Growth COntract : 0x6fb17bBa46ACB27471C769901425BC18E414ccF5
Community Token Vesting : 0x6BDE26088A343B5dd472e7aC6F602c76048129F8
Founders Token Vesting : 0x7f1047AB0f8cdfbcFEDa29Ed13Cf4170dC6D1f8A
Technical Token Vesting : 0xc3E851950d93ce27Ec8A341150B7cAe6912A25E4
Management Token Vesting : 0x622d30ac421364fBf03dc2CC65d8bd296Be01700
Incentive Token : 0xa965EF0fD074082077AD4986f08f75F7c65582B9

Project Ether Vesting Contract: 0x0429E50b9C0D063eA1392410dcd3709000297A9f
Technolgoy Ether Vesting Contract: 0xb12daB7A050dbFEbB17004788aF61034030202C4
Founder Ether Vesting Contract: 0xDDEB6e17fB083f159831A61D0FA41c6252CB308e

Sale Contract : 0x605c90b034E075f5Ff1e9B91939747ECA6ef7B9d
	*/
	deployer.deploy(dHealthToken).then(function(){
		dHealthToken.deployed().then(function(tokenInstance) {
			console.log('----------------------------------');
			console.log('Token Instance' , tokenInstance.address);
			console.log('----------------------------------');
			// "0x11D635bbba3f9B8f7C9b91cA9f315a2207cb5AD5","0xaC36fed1994aeA1499636Adb3392750ffd9086e2","0xcBe422cEF1e85a1409066E51D04722B00B97a153","0x64Ec9c119479f851f1C746572747C8Fd6EB38116","0x1E187C6FC3D7f7A9b7E7eabFa2dBf23c5f77Aa7b"
			deployer.deploy(dHealthTokenGrowth , tokenInstance.address , exchangesGrowthWallet , countriesGrowthWallet , acquisitionsGrowthWallet , coindropsGrowthWallet).then(function(){
				dHealthTokenGrowth.deployed().then(async function(growthInstance) {
					console.log('----------------------------------');
					console.log('Growth Instance' , growthInstance.address);
					console.log('----------------------------------');

					// "0x11D635bbba3f9B8f7C9b91cA9f315a2207cb5AD5","0x36bE99e10Ae753E82D7C7F8B3830878E5dF6894c","10000000000000000000000000","1522281600"
					deployer.deploy(dHealthTokenVesting , tokenInstance.address , communityTokenVestingWallet , 10000000E18 , 1522281600).then(function(){
						dHealthTokenVesting.deployed().then(async function(communityTokenVestingInstance) {
							console.log('----------------------------------');
							console.log('Community Token Vesting' , communityTokenVestingInstance.address);
							console.log('----------------------------------');

							// "0x11D635bbba3f9B8f7C9b91cA9f315a2207cb5AD5","0x9D26827bB0994Eec3c34753D6e4EBdB5074BaB0c","15000000000000000000000000","1516924800"
							deployer.deploy(dHealthTokenVesting , tokenInstance.address , foundersTokenVestingWallet , 15000000E18 , 1516924800).then(function(){
								dHealthTokenVesting.deployed().then(async function(foundersTokenVestingInstance) {
									console.log('----------------------------------');
									console.log('Founders Token Vesting' , foundersTokenVestingInstance.address);
									console.log('----------------------------------');

									// "0x11D635bbba3f9B8f7C9b91cA9f315a2207cb5AD5","0x3e6D5E8B9C5B7cc1FB5c12E7e107Cb0A980f9481","55000000000000000000000000","1522281600"
									deployer.deploy(dHealthTokenVesting , tokenInstance.address , technicalTokenVestingWallet , 55000000E18 , 1522281600).then(function(){
										dHealthTokenVesting.deployed().then(async function(technicalTokenVestingInstance) {
											console.log('----------------------------------');
											console.log('Technical Token Vesting' , technicalTokenVestingInstance.address);
											console.log('----------------------------------');

											// "0x11D635bbba3f9B8f7C9b91cA9f315a2207cb5AD5","0x9E836d67b7DbCE8851f1Ac9f039bA977ED49B1b8","60000000000000000000000000","1522281600"
											deployer.deploy(dHealthTokenVesting , tokenInstance.address , managementTokenVestingWallet , 60000000E18 , 1522281600).then(function(){
												dHealthTokenVesting.deployed().then(async function(managementTokenVestingInstance) {
													console.log('----------------------------------');
													console.log('Management Token Vesting' , managementTokenVestingInstance.address);
													console.log('----------------------------------');

													// "0x11D635bbba3f9B8f7C9b91cA9f315a2207cb5AD5","0x6BDE26088A343B5dd472e7aC6F602c76048129F8","0x7f1047AB0f8cdfbcFEDa29Ed13Cf4170dC6D1f8A","0xc3E851950d93ce27Ec8A341150B7cAe6912A25E4","0x622d30ac421364fBf03dc2CC65d8bd296Be01700"
													deployer.deploy(dHealthTokenIncentive , tokenInstance.address , communityTokenVestingInstance.address , foundersTokenVestingInstance.address , technicalTokenVestingInstance.address , managementTokenVestingInstance.address).then(function(){
														dHealthTokenIncentive.deployed().then(async function(incentiveInstance) {
															console.log('----------------------------------');
															console.log('Incentive Instance' , incentiveInstance.address);
															console.log('----------------------------------');

															// "0x8Eae6d7fe79cac17B82A9D052BbEDfE80dfa8cb2"
															deployer.deploy(dHealthEtherVesting , projectEtherVestingWallet).then(function(){
																dHealthEtherVesting.deployed().then(async function(projectEtherVestingInstance) {
																	console.log('----------------------------------');
																	console.log('Project Vesting Instance' , projectEtherVestingInstance.address);
																	console.log('----------------------------------');

																	// "0xE2fA53FbF303af8BBa5D245eA4760Db29779363A"
																	deployer.deploy(dHealthEtherVesting , technologyEtherVestingWallet).then(function(){
																		dHealthEtherVesting.deployed().then(async function(technologyEtherVestingInstance) {
																			console.log('----------------------------------');
																			console.log('Technology Vesting Instance' , technologyEtherVestingInstance.address);
																			console.log('----------------------------------');

																			// "0xEfc3B85BE8040d2d750A87A3Cf20717C8491BE5F"
																			deployer.deploy(dHealthEtherVesting , founderEtherVestingWallet).then(function(){
																				dHealthEtherVesting.deployed().then(async function(founderEtherVestingInstance) {
																					console.log('----------------------------------');
																					console.log('Founder Vesting Instance' , founderEtherVestingInstance.address);
																					console.log('----------------------------------');	

																					// "0x11D635bbba3f9B8f7C9b91cA9f315a2207cb5AD5","0x0429E50b9C0D063eA1392410dcd3709000297A9f","0xb12daB7A050dbFEbB17004788aF61034030202C4","0xDDEB6e17fB083f159831A61D0FA41c6252CB308e","0x6fb17bBa46ACB27471C769901425BC18E414ccF5"
																					deployer.deploy(dHealthTokenSale , tokenInstance.address , projectEtherVestingInstance.address , technologyEtherVestingInstance.address , founderEtherVestingInstance.address , growthInstance.address).then(function(){
																						dHealthTokenSale.deployed().then(async function(saleInstance) {
																							console.log('----------------------------------');
																							console.log('Sale Instance' , saleInstance.address);
																							console.log('----------------------------------');		
																							
																							/* transfer tokens to sale contract */
																							console.log('--------------------------------------------------------------');
																							// get goal	
																							var maxTokenForSale = await saleInstance.maxTokenForSale.call();
																							console.log('maxTokenForSale: ' + maxTokenForSale.toNumber());
																								
																							console.log('Transferring to :' +  saleInstance.address , maxTokenForSale.toNumber());	
																							var transaction = await tokenInstance.transfer(saleInstance.address , maxTokenForSale);
																							console.log('Transfer Txn :' +  transaction.tx);

																							// check balance of address to be null
																							var balanceOf = await tokenInstance.balanceOf.call(saleInstance.address);
																							console.log('Balance of Sale ' + balanceOf.toNumber());
																							console.log('--------------------------------------------------------------');

																							/* transfer tokens to growth contract */
																							console.log('--------------------------------------------------------------');
																							// get goal	
																							var maxTokenForHold = await growthInstance.maxTokenForHold.call();
																							console.log('maxTokenForHold: ' + maxTokenForHold.toNumber());
																								
																							console.log('Transferring to :' +  growthInstance.address , maxTokenForHold.toNumber());	
																							var transaction = await tokenInstance.transfer(growthInstance.address , maxTokenForHold);
																							console.log('Transfer Txn :' +  transaction.tx);

																							// check balance of address to be null
																							var balanceOf = await tokenInstance.balanceOf.call(growthInstance.address);
																							console.log('Balance of Growth ' + balanceOf.toNumber());
																							console.log('--------------------------------------------------------------');
																							
																							/* transfer tokens to incentive contract */
																							console.log('--------------------------------------------------------------');
																							// get goal	
																							var maxTokenForHold = await incentiveInstance.maxTokenForHold.call();
																							console.log('maxTokenForHold: ' + maxTokenForHold.toNumber());
																								
																							console.log('Transferring to :' +  incentiveInstance.address , maxTokenForHold.toNumber());	
																							var transaction = await tokenInstance.transfer(incentiveInstance.address , maxTokenForHold);
																							console.log('Transfer Txn :' +  transaction.tx);

																							// check balance of address to be null
																							var balanceOf = await tokenInstance.balanceOf.call(incentiveInstance.address);
																							console.log('Balance of Incentive ' + balanceOf.toNumber());
																							console.log('--------------------------------------------------------------');

																							/* check balance of owner contract */
																							console.log('--------------------------------------------------------------');
																							// check balance of address to be null
																							var balanceOf = await tokenInstance.balanceOf.call(accounts[0]);
																							console.log('Balance of Owner ' + balanceOf.toNumber());
																							console.log('--------------------------------------------------------------');
									









																							// // transfer funds from ico to some account
																							// var transaction = await saleInstance.transferManual(accounts[1] , 1E18 , "Some transfer");
																							// console.log('Transfer Token Txn :' +  transaction.tx);	

																							// // transfer funds from ico to some account
																							// var balanceOf = await tokenInstance.balanceOf.call(accounts[1]);
																							// console.log('Balance  :' +  balanceOf);	

																							// // try to buy token 
																							// var transaction = await saleInstance.buy(accounts[2] , {from: accounts[2] , value: 1E15});
																							// console.log('Buy Token Txn :' +  transaction.tx);	

																							// // transfer funds from ico to some account
																							// var balanceOf = await tokenInstance.balanceOf.call(accounts[2]);
																							// console.log('Balance  :' +  balanceOf);	

																							// buy tokens
																							// await saleInstance.buy(accounts[3] , {from: accounts[3], value: 1E18});
																						});
																					});
																				});
																			});				
																		});
																	});
																});
															});
														});
													});
												});
											});
										});
									});
								});
							});
						});
					});		
				});
			});
		});	
	});
};
