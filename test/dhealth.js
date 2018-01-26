'use strict';
var assert_throw = require('./helpers/utils').assert_throw;

var dHealthToken = artifacts.require("./dHealthToken.sol");
var dHealthTokenGrowth = artifacts.require("./dHealthTokenGrowth.sol");
var dHealthTokenIncentive = artifacts.require("./dHealthTokenIncentive.sol");
var dHealthEtherVesting = artifacts.require("./dHealthEtherVesting.sol");
var dHealthTokenVesting = artifacts.require("./dHealthTokenVesting.sol");
var dHealthTokenSale = artifacts.require("./dHealthTokenSale.sol");

const promisify = (inner) =>
	new Promise((resolve, reject) =>
		inner((err, res) => {
			if (err) { reject(err) }
			resolve(res);
		})
);

const getBalance = (account, at) => promisify(cb => web3.eth.getBalance(account, at, cb));
const makeNumber = (number) => {return parseInt(number * 10 ** -18)}; 		
const toTimestamp = (strDate) => { var datum = Date.parse(strDate); return datum/1000; }
const getTokenBalance = async (account) => {
	var balance = await tokenInstance.balanceOf.call(account);
	return balance;
};

var tokenInstance;
var growthInstance;

var communityTokenVestingInstance;
var foundersTokenVestingInstance;
var technicalTokenVestingInstance;
var managementTokenVestingInstance;
var incentiveInstance;

var projectEtherVestingInstance;
var technologyEtherVestingInstance;
var founderEtherVestingInstance;

var saleInstance;

var communityTokenVestingWallet;
var foundersTokenVestingWallet;
var technicalTokenVestingWallet;
var managementTokenVestingWallet;

var exchangesGrowthWallet;
var countriesGrowthWallet;
var acquisitionsGrowthWallet;
var coindropsGrowthWallet;

var projectEtherVestingWallet;
var technologyEtherVestingWallet;
var founderEtherVestingWallet;

var owner, wallet;

var day = 60 * 60 * 24;
var month = day * 30;
var year = day * 365;

var date_growth_exchanges = toTimestamp('Sunday, 15 April 2018 00:00:00 GMT');
var date_growth_countries = toTimestamp('Tuesday, 1 May 2018 00:00:00 GMT');
var date_growth_acquisitions = toTimestamp('Tuesday, 15 May 2018 00:00:00 GMT');
var date_growth_coindrops = toTimestamp('Friday, 1 June 2018 00:00:00 GMT');

var date_incentive_community = toTimestamp('Thursday, 29 March 2018 00:00:00 GMT');
var date_incentive_founders = toTimestamp('Friday, 26 January 2018 00:00:00');
var date_incentive_technical = toTimestamp('Thursday, 29 March 2018 00:00:00 GMT');
var date_incentive_management = toTimestamp('Thursday, 29 March 2018 00:00:00 GMT');

var date_phase1_start = toTimestamp('Friday, 26 January 2018 00:00:00 GMT');
var date_phase1_between = toTimestamp('Friday, 30 January 2018 00:00:00 GMT');
var date_phase1_end = toTimestamp('Thursday, 8 February 2018 23:59:59 GMT');

var date_phase2_start = toTimestamp('Friday, 9 February 2018 00:00:00 GMT');
var date_phase2_between = toTimestamp('Friday, 12 February 2018 00:00:00 GMT');
var date_phase2_end = toTimestamp('Thursday, 22 February 2018 23:59:59 GMT');

var date_phase3_start = toTimestamp('Friday, 23 February 2018 00:00:00 GMT');
var date_phase3_between = toTimestamp('Friday, 26 February 2018 00:00:00 GMT');
var date_phase3_end = toTimestamp('Thursday, 8 March 2018 23:59:59 GMT');
var date_phase3_after = toTimestamp('Thursday, 9 March 2018 23:59:59 GMT');

var date_sale_end = toTimestamp('Friday, 9 March 2018 00:00:00 GMT');
var date_sale_before = toTimestamp('Thursday, 25 January 2018 00:00:00 GMT');
var date_sale_after = toTimestamp('Friday, 11 March 2018 00:00:00 GMT');

var date_ether_vesting_start = toTimestamp('Friday, 26 January 2018 00:00:00 GMT');
var date_token_vesting_start = toTimestamp('Thursday, 29 March 2018 00:00:00 GMT');

var amount_incentive_community = 10000000E18;
var amount_incentive_founders = 15000000E18;
var amount_incentive_technical = 55000000E18;
var amount_incentive_management = 60000000E18;

contract('dHealthToken' , (accounts) => {
	owner = accounts[0];
	wallet = accounts[1];

	exchangesGrowthWallet = accounts[2];
	countriesGrowthWallet = accounts[3];
	acquisitionsGrowthWallet = accounts[4];
	coindropsGrowthWallet = accounts[5];

	communityTokenVestingWallet = accounts[6];
	foundersTokenVestingWallet = accounts[7];
	technicalTokenVestingWallet = accounts[8];
	managementTokenVestingWallet = accounts[9];

	projectEtherVestingWallet = accounts[10];
	technologyEtherVestingWallet = accounts[11];
	founderEtherVestingWallet = accounts[12];

	beforeEach(async () => {
		// deploy token contracts
		tokenInstance = await dHealthToken.new({from: owner});
		
		// deploy growth contracts	
		growthInstance = await dHealthTokenGrowth.new(tokenInstance.address , exchangesGrowthWallet, countriesGrowthWallet, acquisitionsGrowthWallet, coindropsGrowthWallet , {from: owner});
		
		// deploy incentive contracts	
		communityTokenVestingInstance = await dHealthTokenVesting.new(tokenInstance.address , communityTokenVestingWallet , amount_incentive_community , date_incentive_community , {from: owner});
		foundersTokenVestingInstance = await dHealthTokenVesting.new(tokenInstance.address , foundersTokenVestingWallet , amount_incentive_founders , date_incentive_founders , {from: owner});
		technicalTokenVestingInstance = await dHealthTokenVesting.new(tokenInstance.address , technicalTokenVestingWallet , amount_incentive_technical , date_incentive_technical , {from: owner});
		managementTokenVestingInstance = await dHealthTokenVesting.new(tokenInstance.address , managementTokenVestingWallet , amount_incentive_management , date_incentive_management , {from: owner});
		incentiveInstance = await dHealthTokenIncentive.new(tokenInstance.address , communityTokenVestingInstance.address , foundersTokenVestingInstance.address , technicalTokenVestingInstance.address , managementTokenVestingInstance.address , {from: owner});

		// ether vesting contracts
		projectEtherVestingInstance = await dHealthEtherVesting.new(projectEtherVestingWallet , {from: owner});
		technologyEtherVestingInstance = await dHealthEtherVesting.new(technologyEtherVestingWallet , {from: owner});
		founderEtherVestingInstance = await dHealthEtherVesting.new(founderEtherVestingWallet , {from: owner});
			
		// sale instance	
		saleInstance = await dHealthTokenSale.new(tokenInstance.address , projectEtherVestingInstance.address , technologyEtherVestingInstance.address , founderEtherVestingInstance.address , growthInstance.address , {from: owner});
		
		var maxTokenForSale = await saleInstance.maxTokenForSale.call();
		await tokenInstance.transfer(saleInstance.address , maxTokenForSale);
		var balanceSale = await tokenInstance.balanceOf(saleInstance.address);

		var maxTokenForHold = await growthInstance.maxTokenForHold.call();
		await tokenInstance.transfer(growthInstance.address , maxTokenForHold);
		var balanceLeft = await tokenInstance.balanceOf(growthInstance.address);

		var maxTokenForHold = await incentiveInstance.maxTokenForHold.call();
		await tokenInstance.transfer(incentiveInstance.address , maxTokenForHold);
		var balanceLeft = await tokenInstance.balanceOf(incentiveInstance.address);
	});

	// it('timestamped : should set timestamp' , async () => {
	// 	await saleInstance.setBlockTime(123 , {from: owner});
	// 	var timestamp = await saleInstance.getBlockTime.call();
	// 	var ts = await saleInstance.ts.call();
	// 	assert.equal(timestamp.toNumber() , 123 , 'timestamp should be set');
	// });

	// it('timestamped : should get timestamp' , async () => {
	// 	var timestamp = await saleInstance.getBlockTime.call();
	// 	assert.isTrue(timestamp.toNumber() > 0 , 'timestamp should be get');	
	// });

	// it('timestamped : should reset timestamp' , async () => {
	// 	await saleInstance.setBlockTime(123 , {from: owner});
	// 	var timestamp = await saleInstance.getBlockTime.call();
	// 	assert.equal(timestamp.toNumber() , 123 , 'timestamp should be set');

	// 	await saleInstance.setBlockTime(0);
	// 	var timestamp = await saleInstance.getBlockTime.call();	
	// 	assert.isTrue(timestamp > 0 , 'timestamp should be reset');
	// });

	// /* TOKEN CONTRACT */

	// it('token : should match name' , async () => {
	// 	var name = await tokenInstance.name.call();
	// 	assert.equal(name , 'dHealth' , 'name does not match');		
	// });

	// it('token : should match symbol' , async () => {
	// 	var symbol = await tokenInstance.symbol.call();
	// 	assert.equal(symbol , 'dHt' , 'symbol does not match');		
	// });

	// it('token : should match decimals' , async () => {
	// 	var decimals = await tokenInstance.decimals.call();
	// 	assert.equal(decimals , 18 , 'decimals does not match');		
	// });

	// it('token : should distribute full balance' , async () => {
	// 	var balance = await tokenInstance.balanceOf.call(owner);
	// 	var maxTokenForSale = await saleInstance.maxTokenForSale.call();
	// 	var maxTokenForHoldGrowth = await growthInstance.maxTokenForHold.call();
	// 	var maxTokenForHoldIncentive = await incentiveInstance.maxTokenForHold.call();

	// 	assert.equal(makeNumber(balance) + makeNumber(maxTokenForSale) + makeNumber(maxTokenForHoldGrowth) + makeNumber(maxTokenForHoldIncentive) , makeNumber(500000000 * 1E18) , 'full balance does not match');		
	// });


	// /* SALE INSTANCE */

	// it('sale : should match sale token address' , async () => {
	// 	var token = await saleInstance.token.call();
	// 	assert.equal(token , tokenInstance.address , 'token address does not match');		
	// });

	// it('sale : should match sale maxTokenForSale' , async () => {
	// 	var maxTokenForSale = await saleInstance.maxTokenForSale.call();
	// 	assert.equal(maxTokenForSale , 180000000 * 1E18 , 'maxTokenForSale does not match');
	// });

	// it('sale : should match project address' , async () => {
	// 	var projectAddress = await saleInstance.projectContract.call();
	// 	assert.equal(projectAddress , projectEtherVestingInstance.address , 'project address does not match');		
	// });

	// it('sale : should match technology address' , async () => {
	// 	var technologyAddress = await saleInstance.technologyContract.call();
	// 	assert.equal(technologyAddress , technologyEtherVestingInstance.address , 'technology address does not match');		
	// });

	// it('sale : should match founder address' , async () => {
	// 	var founderAddress = await saleInstance.founderContract.call();
	// 	assert.equal(founderAddress , founderEtherVestingInstance.address , 'founder address does not match');		
	// });

	// it('sale : should match growth address' , async () => {
	// 	var growthAddress = await saleInstance.growthContract.call();
	// 	assert.equal(growthAddress , growthInstance.address , 'growth address does not match');		
	// });

	// it('sale : should allow owner to buy token' , async () => {
	// 	var account = owner;

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase1_between);
	// 	await saleInstance.buy(account , {from: account, value: 1E18});
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() + 2000E18 , 'balance should be increased');
	// });

	// it('sale : should allow owner to buy token and transfer those tokens' , async () => {
	// 	var account1 = owner;
	// 	var account2 = accounts[1];

	// 	var account1BalanceBefore = await tokenInstance.balanceOf.call(account1);
	// 	await saleInstance.setBlockTime(date_phase1_between);
	// 	await saleInstance.buy(account1 , {from: account1, value: 1E18});
	// 	var account1BalanceAfter = await tokenInstance.balanceOf.call(account1);
		
	// 	assert.equal(account1BalanceAfter.toNumber(), account1BalanceBefore.toNumber() + 2000E18 , 'balance should be increased');

	// 	var account1BalanceBefore = await tokenInstance.balanceOf.call(account1);
	// 	var account2BalanceBefore = await tokenInstance.balanceOf.call(account2);

	// 	await tokenInstance.transfer(account2 , 2000E18 , {from: account1});
		
	// 	var account1BalanceAfter = await tokenInstance.balanceOf.call(account1);
	// 	var account2BalanceAfter = await tokenInstance.balanceOf.call(account2);

	// 	assert.equal(account1BalanceAfter.toNumber() , account1BalanceBefore.toNumber() - 2000E18 , 'balance should be reduced');
	// 	assert.equal(account2BalanceAfter.toNumber() , account2BalanceBefore.toNumber() + 2000E18 , 'balance should be increased');
	// });

	// it('sale : should allow owner to buy token and transfer those tokens and return back those tokens' , async () => {
	// 	var account1 = owner;
	// 	var account2 = accounts[1];

	// 	var account1BalanceBefore = await tokenInstance.balanceOf.call(account1);
	// 	await saleInstance.setBlockTime(date_phase1_between);
	// 	await saleInstance.buy(account1 , {from: account1, value: 1E18});
	// 	var account1BalanceAfter = await tokenInstance.balanceOf.call(account1);
		
	// 	assert.equal(account1BalanceAfter.toNumber(), account1BalanceBefore.toNumber() + 2000E18 , 'balance should be increased');

	// 	var account1BalanceBefore = await tokenInstance.balanceOf.call(account1);
	// 	var account2BalanceBefore = await tokenInstance.balanceOf.call(account2);

	// 	await tokenInstance.transfer(account2 , 2000E18 , {from: account1});
		
	// 	var account1BalanceAfter = await tokenInstance.balanceOf.call(account1);
	// 	var account2BalanceAfter = await tokenInstance.balanceOf.call(account2);

	// 	assert.equal(account1BalanceAfter.toNumber() , account1BalanceBefore.toNumber() - 2000E18 , 'balance should be reduced');
	// 	assert.equal(account2BalanceAfter.toNumber() , account2BalanceBefore.toNumber() + 2000E18 , 'balance should be increased');

	// 	var account1BalanceBefore = await tokenInstance.balanceOf.call(account1);
	// 	var account2BalanceBefore = await tokenInstance.balanceOf.call(account2);

	// 	await tokenInstance.transfer(account1 , 2000E18 , {from: account2});
		
	// 	var account1BalanceAfter = await tokenInstance.balanceOf.call(account1);
	// 	var account2BalanceAfter = await tokenInstance.balanceOf.call(account2);

	// 	assert.equal(account1BalanceAfter.toNumber() , account1BalanceBefore.toNumber() + 2000E18 , 'balance should be reduced');
	// 	assert.equal(account2BalanceAfter.toNumber() , account2BalanceBefore.toNumber() - 2000E18 , 'balance should be increased');
	// });

	// it('sale : should allow owner to transfer tokens manually' , async () => {
	// 	var account = owner;
	// 	var units = 2000E18

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase1_between);
	// 	await saleInstance.transferManual(account , units , "" , {from: account});
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() + units , 'balance should be increased');
	// });

	// it('sale : should allow user to buy token' , async () => {
	// 	var account = accounts[3];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase1_between);
	// 	await saleInstance.buy(account , {from: account, value: 1E18});
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() + 2000E18 , 'balance should be increased');		
	// });

	// it('sale : should allow user to buy token from fallback address' , async () => {
	// 	var account = accounts[3];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase1_between);
	// 	await saleInstance.sendTransaction({from: account, value: 1E18});
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() + 2000E18 , 'balance should be increased');		
	// });

	// it('sale : should allow user to buy token for max 1000 ether' , async () => {
	// 	var account = accounts[5];

	// 	var ethBalanceBefore = await getBalance(account);	
	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase1_between);
	// 	await saleInstance.sendTransaction({from: account, value: 2000E18});
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
	// 	var ethBalanceAfter = await getBalance(account);	

	// 	assert.equal(balanceAfter.toNumber() , balanceBefore.toNumber() + 2000000E18 , 'balance should be increased for 1000 ethers only');		
	// 	assert.isTrue(ethBalanceBefore.toNumber() - ethBalanceAfter.toNumber() < 2000E18 , 'balance should be returned for extra ethers only');		
	// });

	// it('sale : should throw error to buy token for min 0.01 ether' , async () => {
	// 	var account = accounts[5];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase1_between);
	// 	await saleInstance.sendTransaction({from: account, value: 0.01E18});
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);

	// 	assert.equal(balanceAfter.toNumber() , balanceBefore.toNumber() + 20E18 , 'balance should be increased for 0.01 ethers only');		

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase1_between);
	// 	assert_throw(saleInstance.sendTransaction({from: account, value: 0.009E18}));
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);

	// 	assert.equal(balanceAfter.toNumber() , balanceBefore.toNumber() , 'balance should not be increased for 0.009 ethers');		
	// });

	// it('token : should allow user to transfer token to account address' , async () => {
	// 	var account1 = accounts[1];
	// 	var account2 = accounts[2];

	// 	var account1BalanceBefore = await tokenInstance.balanceOf.call(account1);
	// 	await saleInstance.setBlockTime(date_phase1_between);
	// 	await saleInstance.buy(account1 , {from: account1, value: 1E18});
	// 	var account1BalanceAfter = await tokenInstance.balanceOf.call(account1);
		
	// 	assert.equal(account1BalanceAfter.toNumber(), account1BalanceBefore.toNumber() + 2000E18 , 'balance should be increased');

	// 	var account1BalanceBefore = await tokenInstance.balanceOf.call(account1);
	// 	var account2BalanceBefore = await tokenInstance.balanceOf.call(account2);

	// 	await tokenInstance.transfer(account2 , 2000E18 , {from: account1});
		
	// 	var account1BalanceAfter = await tokenInstance.balanceOf.call(account1);
	// 	var account2BalanceAfter = await tokenInstance.balanceOf.call(account2);

	// 	assert.equal(account1BalanceAfter.toNumber() , account1BalanceBefore.toNumber() - 2000E18 , 'balance should be reduced');
	// 	assert.equal(account2BalanceAfter.toNumber() , account2BalanceBefore.toNumber() + 2000E18 , 'balance should be increased');
	// });

	// it('token : should allow user to transfer token to contract address' , async () => {
	// 	var account1 = accounts[1];
	// 	var account2 = growthInstance.address;

	// 	var account1BalanceBefore = await tokenInstance.balanceOf.call(account1);
	// 	await saleInstance.setBlockTime(date_phase1_between);
	// 	await saleInstance.buy(account1 , {from: account1, value: 1E18});
	// 	var account1BalanceAfter = await tokenInstance.balanceOf.call(account1);
		
	// 	assert.equal(account1BalanceAfter.toNumber(), account1BalanceBefore.toNumber() + 2000E18 , 'balance should be increased');

	// 	var account1BalanceBefore = await tokenInstance.balanceOf.call(account1);
	// 	var account2BalanceBefore = await tokenInstance.balanceOf.call(account2);

	// 	await tokenInstance.transfer(account2 , 2000E18 , {from: account1});
		
	// 	var account1BalanceAfter = await tokenInstance.balanceOf.call(account1);
	// 	var account2BalanceAfter = await tokenInstance.balanceOf.call(account2);

	// 	assert.equal(account1BalanceAfter.toNumber() , account1BalanceBefore.toNumber() - 2000E18 , 'balance should be reduced');
	// 	assert.equal(account2BalanceAfter.toNumber() , account2BalanceBefore.toNumber() + 2000E18 , 'balance should be increased');
	// });

	// it('token : should allow user to transfer token to no erc223 receiver contract address' , async () => {
	// 	var account1 = accounts[1];
	// 	var account2 = tokenInstance.address;

	// 	var account1BalanceBefore = await tokenInstance.balanceOf.call(account1);
	// 	await saleInstance.setBlockTime(date_phase1_between);
	// 	await saleInstance.buy(account1 , {from: account1, value: 1E18});
	// 	var account1BalanceAfter = await tokenInstance.balanceOf.call(account1);
		
	// 	assert.equal(account1BalanceAfter.toNumber(), account1BalanceBefore.toNumber() + 2000E18 , 'balance should be increased');

	// 	var account1BalanceBefore = await tokenInstance.balanceOf.call(account1);
	// 	var account2BalanceBefore = await tokenInstance.balanceOf.call(account2);

	// 	assert_throw(tokenInstance.transfer(account2 , 2000E18 , {from: account1}));
		
	// 	var account1BalanceAfter = await tokenInstance.balanceOf.call(account1);
	// 	var account2BalanceAfter = await tokenInstance.balanceOf.call(account2);

	// 	assert.equal(account1BalanceAfter.toNumber() , account1BalanceBefore.toNumber() , 'balance should not be reduced');
	// 	assert.equal(account2BalanceAfter.toNumber() , account2BalanceBefore.toNumber() , 'balance should not be increased');
	// });

	// it('sale : should not allow user to buy token before start of phase 1' , async () => {
	// 	var account = accounts[3];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_sale_before);
	// 	assert_throw(saleInstance.sendTransaction({from: account, value: 1E18}));
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() , 'balance should not be increased');		
	// });

	// it('sale : should allow user to buy token in phase 1 in start' , async () => {
	// 	var account = accounts[3];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase1_start);
	// 	await saleInstance.sendTransaction({from: account, value: 1E18});
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() + 2000E18 , 'balance should be increased');		
	// });

	// it('sale : should allow user to buy token in phase 1 in between' , async () => {
	// 	var account = accounts[3];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase1_between);
	// 	await saleInstance.sendTransaction({from: account, value: 1E18});
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() + 2000E18 , 'balance should be increased');		
	// });

	// it('sale : should allow user to buy token in phase 1 in end' , async () => {
	// 	var account = accounts[3];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase1_end);
	// 	await saleInstance.sendTransaction({from: account, value: 1E18});
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() + 2000E18 , 'balance should be increased');		
	// });

	// it('sale : should not allow user to buy more than allocated token in phase 1' , async () => {
	// 	var account = accounts[19];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase1_end);
		
	// 	var phase1MaxTokenForSale = await saleInstance.phase1MaxTokenForSale.call();
	// 	var phase1TokenBatchSize = 2000000E18;

	// 	for(var i = 0 ; true ; i ++) {
	// 		var balance = await getTokenBalance(account);
	// 		console.log('Balance dHt' , i , balance.toNumber() , phase1MaxTokenForSale.toNumber() , phase1TokenBatchSize , (balance.toNumber() + phase1TokenBatchSize));

	// 		if((balance.toNumber() + phase1TokenBatchSize) > phase1MaxTokenForSale.toNumber()) {
	// 			assert_throw(saleInstance.sendTransaction({from: account, value: 1000E18}));
	// 			break;
	// 		} else {
	// 			await saleInstance.sendTransaction({from: account, value: 1000E18});
	// 		}
	// 	}
	// });

	// it('sale : should allow user to buy token in phase 2 in start' , async () => {
	// 	var account = accounts[3];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase2_start);
	// 	await saleInstance.sendTransaction({from: account, value: 1E18});
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() + 1.650000000165E21 , 'balance should be increased');		
	// });

	// it('sale : should allow user to buy token in phase 2 in between' , async () => {
	// 	var account = accounts[3];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase2_between);
	// 	await saleInstance.sendTransaction({from: account, value: 1E18});
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() + 1.650000000165E21 , 'balance should be increased');		
	// });

	// it('sale : should allow user to buy token in phase 2 in end' , async () => {
	// 	var account = accounts[3];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase2_end);
	// 	await saleInstance.sendTransaction({from: account, value: 1E18});
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() + 1.650000000165E21 , 'balance should be increased');		
	// });

	// it('sale : should not allow user to buy more than allocated token in phase 2' , async () => {
	// 	var account = accounts[19];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase2_end);
		
	// 	var phase2MaxTokenForSale = await saleInstance.phase2MaxTokenForSale.call();
	// 	var phase2TokenBatchSize = 1.650000000165E24;

	// 	for(var i = 0 ; true ; i ++) {
	// 		var balance = await getTokenBalance(account);
	// 		console.log('Balance dHt' , i , balance.toNumber() , phase2MaxTokenForSale.toNumber() , phase2TokenBatchSize , (balance.toNumber() + phase2TokenBatchSize));

	// 		if((balance.toNumber() + phase2TokenBatchSize) > phase2MaxTokenForSale.toNumber()) {
	// 			assert_throw(saleInstance.sendTransaction({from: account, value: 1000E18}));
	// 			break;
	// 		} else {
	// 			await saleInstance.sendTransaction({from: account, value: 1000E18});
	// 		}
	// 	}
	// });

	// it('sale : should allow user to buy token in phase 3 in start' , async () => {
	// 	var account = accounts[3];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase3_start);
	// 	await saleInstance.sendTransaction({from: account, value: 1E18});
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() + 1.30000000039E21 , 'balance should be increased');		
	// });

	// it('sale : should allow user to buy token in phase 3 in between' , async () => {
	// 	var account = accounts[3];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase3_between);
	// 	await saleInstance.sendTransaction({from: account, value: 1E18});
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() + 1.30000000039E21 , 'balance should be increased');		
	// });

	// it('sale : should allow user to buy token in phase 3 in end' , async () => {
	// 	var account = accounts[3];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase3_end);
	// 	await saleInstance.sendTransaction({from: account, value: 1E18});
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() + 1.30000000039E21 , 'balance should be increased');		
	// });

	// it('sale : should not allow user to buy more than allocated token in phase 3' , async () => {
	// 	var account = accounts[19];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase3_end);
		
	// 	var phase3MaxTokenForSale = await saleInstance.phase3MaxTokenForSale.call();
	// 	var phase3TokenBatchSize = 1.30000000039E24;

	// 	for(var i = 0 ; true ; i ++) {
	// 		var balance = await getTokenBalance(account);
	// 		console.log('Balance dHt' , i , balance.toNumber() , phase3MaxTokenForSale.toNumber() , phase3TokenBatchSize , (balance.toNumber() + phase3TokenBatchSize));

	// 		if((balance.toNumber() + phase3TokenBatchSize) > phase3MaxTokenForSale.toNumber()) {
	// 			assert_throw(saleInstance.sendTransaction({from: account, value: 1000E18}));
	// 			break;
	// 		} else {
	// 			await saleInstance.sendTransaction({from: account, value: 1000E18});
	// 		}
	// 	}
	// });

	// it('sale : should not allow user to buy token after end of phase 3' , async () => {
	// 	var account = accounts[3];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase3_after);
	// 	assert_throw(saleInstance.sendTransaction({from: account, value: 1E18}));
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() , 'balance should not be increased');		
	// });

	// it('sale : should allow user to buy from phase1 to phase2' , async () => {
	// 	var account = accounts[16];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase1_start);
	// 	await saleInstance.sendTransaction({from: account, value: 1E18});
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() + 2000E18 , 'balance should be increased');		

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase2_start);
	// 	await saleInstance.sendTransaction({from: account, value: 1E18});
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() + 1.650000000165E21 , 'balance should be increased');		
	// });

	// it('sale : should allow user to buy from phase1 to phase2 to phase3' , async () => {
	// 	var account = accounts[16];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase1_start);
	// 	await saleInstance.sendTransaction({from: account, value: 1E18});
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() + 2000E18 , 'balance should be increased');		

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase2_start);
	// 	await saleInstance.sendTransaction({from: account, value: 1E18});
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() + 1.650000000165E21 , 'balance should be increased');		

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase3_start);
	// 	await saleInstance.sendTransaction({from: account, value: 1E18});
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() + 1.30000000039E21 , 'balance should be increased');		
	// });

	// it('sale : should allow user to buy more token which are moved from phase1 to phase2' , async () => {
	// 	var account = accounts[16];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase1_end);
		
	// 	var phase1MaxTokenForSale = await saleInstance.phase1MaxTokenForSale.call();
	// 	var phase1TokenBatchSize = 2000000E18;

	// 	for(var i = 0 ; i < 15 ; i ++) {
	// 		var balance = await getTokenBalance(account);
	// 		console.log('Balance dHt' , i , balance.toNumber() , phase1MaxTokenForSale.toNumber() , phase1TokenBatchSize , (balance.toNumber() + phase1TokenBatchSize));
	// 		await saleInstance.sendTransaction({from: account, value: 1000E18});
	// 	}

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase2_start);
		
	// 	var phase2MaxTokenForSale = await saleInstance.phase2MaxTokenForSale.call();
	// 	var phase2TokenBatchSize = 1.650000000165E24;

	// 	for(var i = 0 ; true ; i ++) {
	// 		var balance = await getTokenBalance(account);
	// 		console.log('Balance dHt' , i , balance.toNumber() , phase2MaxTokenForSale.toNumber() , phase2TokenBatchSize , (balance.toNumber() + phase2TokenBatchSize));

	// 		if((balance.toNumber() + phase2TokenBatchSize) > phase2MaxTokenForSale.toNumber()) {
	// 			assert_throw(saleInstance.sendTransaction({from: account, value: 1000E18}));
	// 			break;
	// 		} else {
	// 			await saleInstance.sendTransaction({from: account, value: 1000E18});
	// 		}
	// 	}

	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);

	// 	assert.isTrue(balanceAfter.toNumber() <= phase2MaxTokenForSale.toNumber() , 'more tokens sold');
	// });

	// it('sale : should allow user to buy more token which are moved from phase2 to phase3' , async () => {
	// 	var account = accounts[16];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase2_start);
		
	// 	var phase2MaxTokenForSale = await saleInstance.phase2MaxTokenForSale.call();
	// 	var phase2TokenBatchSize = 1.650000000165E24;

	// 	for(var i = 0 ; i < 20 ; i ++) {
	// 		var balance = await getTokenBalance(account);
	// 		console.log('Balance dHt' , i , balance.toNumber() , phase2MaxTokenForSale.toNumber() , phase2TokenBatchSize , (balance.toNumber() + phase2TokenBatchSize));
	// 		await saleInstance.sendTransaction({from: account, value: 1000E18});
	// 	}

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase3_end);
		
	// 	var phase3MaxTokenForSale = await saleInstance.phase3MaxTokenForSale.call();
	// 	var phase3TokenBatchSize = 1.30000000039E24;

	// 	for(var i = 0 ; true ; i ++) {
	// 		var balance = await getTokenBalance(account);
	// 		console.log('Balance dHt' , i , balance.toNumber() , phase3MaxTokenForSale.toNumber() , phase3TokenBatchSize , (balance.toNumber() + phase3TokenBatchSize));

	// 		if((balance.toNumber() + phase3TokenBatchSize) > phase3MaxTokenForSale.toNumber()) {
	// 			assert_throw(saleInstance.sendTransaction({from: account, value: 1000E18}));
	// 			break;
	// 		} else {
	// 			await saleInstance.sendTransaction({from: account, value: 1000E18});
	// 		}
	// 	}

	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);

	// 	assert.isTrue(balanceAfter.toNumber() <= phase3MaxTokenForSale.toNumber() , 'more tokens sold');
	// });


	// it('sale : should allow user to buy more token which are moved from phase1 to phase2 to phase3' , async () => {
	// 	var account = accounts[16];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase1_start);
		
	// 	var phase1MaxTokenForSale = await saleInstance.phase1MaxTokenForSale.call();
	// 	var phase1TokenBatchSize = 2000000E18;

	// 	for(var i = 0 ; i < 10 ; i ++) {
	// 		var balance = await getTokenBalance(account);
	// 		console.log('Balance dHt' , i , balance.toNumber() , phase1MaxTokenForSale.toNumber() , phase1TokenBatchSize , (balance.toNumber() + phase1TokenBatchSize));
	// 		await saleInstance.sendTransaction({from: account, value: 1000E18});
	// 	}

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase2_start);
		
	// 	var phase2MaxTokenForSale = await saleInstance.phase2MaxTokenForSale.call();
	// 	var phase2TokenBatchSize = 1.650000000165E24;

	// 	for(var i = 0 ; i < 20 ; i ++) {
	// 		var balance = await getTokenBalance(account);
	// 		console.log('Balance dHt' , i , balance.toNumber() , phase2MaxTokenForSale.toNumber() , phase2TokenBatchSize , (balance.toNumber() + phase2TokenBatchSize));
	// 		await saleInstance.sendTransaction({from: account, value: 1000E18});
	// 	}

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase3_end);
		
	// 	var phase3MaxTokenForSale = await saleInstance.phase3MaxTokenForSale.call();
	// 	var phase3TokenBatchSize = 1.30000000039E24;

	// 	for(var i = 0 ; true ; i ++) {
	// 		var balance = await getTokenBalance(account);
	// 		console.log('Balance dHt' , i , balance.toNumber() , phase3MaxTokenForSale.toNumber() , phase3TokenBatchSize , (balance.toNumber() + phase3TokenBatchSize));

	// 		if((balance.toNumber() + phase3TokenBatchSize) > phase3MaxTokenForSale.toNumber()) {
	// 			assert_throw(saleInstance.sendTransaction({from: account, value: 1000E18}));
	// 			break;
	// 		} else {
	// 			await saleInstance.sendTransaction({from: account, value: 1000E18});
	// 		}
	// 	}

	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);

	// 	assert.isTrue(balanceAfter.toNumber() <= phase3MaxTokenForSale.toNumber() , 'more tokens sold');
	// });

	// it('sale : should do send to vesting contract' , async () => {
	// 	var account = accounts[3];
	// 	await saleInstance.setBlockTime(date_phase1_between , {from: owner});
	// 	await saleInstance.buy(account , {from: account, value: 1E18});

	// 	var balanceBefore = await getBalance(saleInstance.address);
	// 	assert.equal(balanceBefore.toNumber(), 1E18, 'balance should be there');			

	// 	var technologyBalanceBefore = await getBalance(technologyEtherVestingInstance.address);
	// 	assert.equal(technologyBalanceBefore.toNumber(), 0, 'technology balance should not there');			

	// 	var founderBalanceBefore = await getBalance(founderEtherVestingInstance.address);
	// 	assert.equal(founderBalanceBefore.toNumber(), 0, 'founder balance should not there');			

	// 	var projectBalanceBefore = await getBalance(projectEtherVestingInstance.address);
	// 	assert.equal(projectBalanceBefore.toNumber(), 0, 'project balance should not there');			

	// 	await saleInstance.sendToVestingContract({from: owner});

	// 	var technologyBalanceAfter = await getBalance(technologyEtherVestingInstance.address);
	// 	assert.equal(technologyBalanceAfter.toNumber(), (balanceBefore.toNumber() * 18 / 100), 'technology balance should be there as 18%');			

	// 	var founderBalanceAfter = await getBalance(founderEtherVestingInstance.address);
	// 	assert.equal(founderBalanceAfter.toNumber(), (balanceBefore.toNumber() * 10 / 100), 'founder balance should be there as 10%');			

	// 	var projectBalanceAfter = await getBalance(projectEtherVestingInstance.address);
	// 	assert.equal(projectBalanceAfter.toNumber(), (balanceBefore.toNumber() * 72 / 100), 'project balance should be there as 72%');			

	// 	var balanceAfter = await getBalance(saleInstance.address);
	// 	assert.equal(balanceAfter.toNumber(), 0, 'balance should be distributed');		

	// 	await saleInstance.setBlockTime(0 , {from: owner});
	// });

	// it('sale : should do send to growth contract after end time' , async () => {
	// 	var timeout = await saleInstance.contractTimeout.call();
	// 	await saleInstance.setBlockTime(timeout , {from: owner});

	// 	var saleBalanceBefore = await getTokenBalance(saleInstance.address);
	// 	var growthBalanceBefore = await getTokenBalance(growthInstance.address);

	// 	await saleInstance.sendToGrowthContract({from: owner});			
		
	// 	var saleBalanceAfter = await getTokenBalance(saleInstance.address);
	// 	var growthBalanceAfter = await getTokenBalance(growthInstance.address);

	// 	assert.equal(saleBalanceAfter.toNumber(), 0, 'balance should be distributed');		
	// 	assert.equal(growthBalanceAfter.toNumber(), growthBalanceBefore.toNumber() + saleBalanceBefore.toNumber(), 'balance should be distributed');		
	// });

	// it('sale : should not do send to growth contract before end time' , async () => {
	// 	var timeout = await saleInstance.contractTimeout.call();
	// 	await saleInstance.setBlockTime(timeout - day , {from: owner});

	// 	var saleBalanceBefore = await getTokenBalance(saleInstance.address);
	// 	var growthBalanceBefore = await getTokenBalance(growthInstance.address);

	// 	assert_throw(saleInstance.sendToGrowthContract({from: owner}));			
		
	// 	var saleBalanceAfter = await getTokenBalance(saleInstance.address);
	// 	var growthBalanceAfter = await getTokenBalance(growthInstance.address);

	// 	assert.equal(saleBalanceAfter.toNumber(), saleBalanceBefore.toNumber(), 'balance should not be distributed');		
	// 	assert.equal(growthBalanceAfter.toNumber(), growthBalanceBefore.toNumber(), 'balance should not be distributed');		
	// });

	// it('sale : should do withdraw after end time' , async () => {
	// 	var timeout = await saleInstance.contractTimeout.call();
	// 	await saleInstance.setBlockTime(timeout , {from: owner});

	// 	var saleBalanceBefore = await getTokenBalance(saleInstance.address);
	// 	var growthBalanceBefore = await getTokenBalance(growthInstance.address);

	// 	await saleInstance.withdraw({from: owner});			
		
	// 	var saleBalanceAfter = await getTokenBalance(saleInstance.address);
	// 	var growthBalanceAfter = await getTokenBalance(growthInstance.address);

	// 	assert.equal(saleBalanceAfter.toNumber(), 0, 'balance should be distributed');		
	// 	assert.equal(growthBalanceAfter.toNumber(), growthBalanceBefore.toNumber() + saleBalanceBefore.toNumber(), 'balance should be distributed');		
	// });

	// it('sale : should not do withdraw before end time' , async () => {
	// 	var timeout = await saleInstance.contractTimeout.call();
	// 	await saleInstance.setBlockTime(timeout - day , {from: owner});

	// 	var saleBalanceBefore = await getTokenBalance(saleInstance.address);
	// 	var growthBalanceBefore = await getTokenBalance(growthInstance.address);

	// 	assert_throw(saleInstance.withdraw({from: owner}));			

	// 	var saleBalanceAfter = await getTokenBalance(saleInstance.address);
	// 	var growthBalanceAfter = await getTokenBalance(growthInstance.address);

	// 	assert.equal(saleBalanceAfter.toNumber(), saleBalanceBefore.toNumber(), 'balance should not be distributed');		
	// 	assert.equal(growthBalanceAfter.toNumber(), growthBalanceBefore.toNumber(), 'balance should not be distributed');		
	// });

	// it('sale : should close the sale contract' , async () => {
	// 	var closeBefore = await saleInstance.isClose.call();
	// 	assert.equal(closeBefore , false , 'should not be closed');

	// 	await saleInstance.close({from: owner});	

	// 	var closeAfter = await saleInstance.isClose.call();
	// 	assert.equal(closeAfter , true , 'should be closed');
	// });

	// it('sale : should not allow to buy when closed' , async () => {
	// 	await saleInstance.close({from: owner});	
	// 	var account = accounts[3];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase1_between);
	// 	assert_throw(saleInstance.sendTransaction({from: account, value: 1E18}));
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() , 'balance should not be increased');		
	// });


	// it('sale : should pause the sale contract' , async () => {
	// 	var pauseBefore = await saleInstance.isPaused.call();
	// 	assert.equal(pauseBefore , false , 'should not be paused');
		
	// 	await saleInstance.pause({from: owner});	

	// 	var pauseAfter = await saleInstance.isPaused.call();
	// 	assert.equal(pauseAfter , true , 'should be paused');
	// });

	// it('sale : should resume the sale contract' , async () => {
	// 	var pauseBefore = await saleInstance.isPaused.call();
	// 	assert.equal(pauseBefore , false , 'should not be paused');
		
	// 	await saleInstance.pause({from: owner});	

	// 	var pauseAfter = await saleInstance.isPaused.call();
	// 	assert.equal(pauseAfter , true , 'should be paused');		

	// 	var pauseBefore = await saleInstance.isPaused.call();
	// 	assert.equal(pauseBefore , true , 'should not be paused');
		
	// 	await saleInstance.resume({from: owner});	

	// 	var pauseAfter = await saleInstance.isPaused.call();
	// 	assert.equal(pauseAfter , false , 'should be paused');		
	// });

	// it('sale : should not allow to buy when paused' , async () => {
	// 	await saleInstance.pause({from: owner});	
	// 	var account = accounts[3];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase1_between);
	// 	assert_throw(saleInstance.sendTransaction({from: account, value: 1E18}));
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() , 'balance should not be increased');		
	// });

	// it('sale : should not allow to buy when resumed' , async () => {
	// 	await saleInstance.pause({from: owner});	
	// 	await saleInstance.resume({from: owner});
	// 	var account = accounts[3];

	// 	var balanceBefore = await tokenInstance.balanceOf.call(account);
	// 	await saleInstance.setBlockTime(date_phase1_between);
	// 	await saleInstance.sendTransaction({from: account, value: 1E18});
	// 	var balanceAfter = await tokenInstance.balanceOf.call(account);
		
	// 	assert.equal(balanceAfter.toNumber(), balanceBefore.toNumber() + 2000E18 , 'balance should be increased');		
	// });

	// /* GROWTH INSTANCE */

	// it('growth : should match max token for hold' , async () => {
	// 	var maxTokenForHold = await growthInstance.maxTokenForHold.call();
	// 	var balance = await tokenInstance.balanceOf.call(growthInstance.address);
	// 	assert.equal(maxTokenForHold.toNumber() , balance.toNumber() , 'balance and maxTokenForHold should match');
	// });	

	// it('growth : should match exchanges wallet, count, end time, status' , async () => {
	// 	var wallet = await growthInstance.exchangesWallet.call();
	// 	assert.equal(wallet , exchangesGrowthWallet , 'wallet should match');		

	// 	var tokens = await growthInstance.exchangesTokens.call();
	// 	assert.equal(tokens.toNumber() , 45000000E18 , 'tokens should match');		

	// 	var endTime = await growthInstance.exchangesLockEndingAt.call();
	// 	assert.equal(endTime.toNumber() , date_growth_exchanges , 'end date should match');		

	// 	var status = await growthInstance.exchangesStatus.call();
	// 	assert.equal(status , false , 'status should match');		
	// });	

	// it('growth : should match countries wallet, count, end time, status' , async () => {
	// 	var wallet = await growthInstance.countriesWallet.call();
	// 	assert.equal(wallet , countriesGrowthWallet , 'wallet should match');		

	// 	var tokens = await growthInstance.countriesTokens.call();
	// 	assert.equal(tokens.toNumber() , 45000000E18 , 'tokens should match');		

	// 	var endTime = await growthInstance.countriesLockEndingAt.call();
	// 	assert.equal(endTime.toNumber() , date_growth_countries , 'end date should match');		

	// 	var status = await growthInstance.countriesStatus.call();
	// 	assert.equal(status , false , 'status should match');		
	// });	

	// it('growth : should match acquisitions wallet, count, end time, status' , async () => {
	// 	var wallet = await growthInstance.acquisitionsWallet.call();
	// 	assert.equal(wallet , acquisitionsGrowthWallet , 'wallet should match');		

	// 	var tokens = await growthInstance.acquisitionsTokens.call();
	// 	assert.equal(tokens.toNumber() , 45000000E18 , 'tokens should match');		

	// 	var endTime = await growthInstance.acquisitionsLockEndingAt.call();
	// 	assert.equal(endTime.toNumber() , date_growth_acquisitions , 'end date should match');		

	// 	var status = await growthInstance.acquisitionsStatus.call();
	// 	assert.equal(status , false , 'status should match');		
	// });	

	// it('growth : should match coindrops wallet, count, end time, status' , async () => {
	// 	var wallet = await growthInstance.coindropsWallet.call();
	// 	assert.equal(wallet , coindropsGrowthWallet , 'wallet should match');		

	// 	var tokens = await growthInstance.coindropsTokens.call();
	// 	assert.equal(tokens.toNumber() , 45000000E18 , 'tokens should match');		

	// 	var endTime = await growthInstance.coindropsLockEndingAt.call();
	// 	assert.equal(endTime.toNumber() , date_growth_coindrops , 'end date should match');		

	// 	var status = await growthInstance.coindropsStatus.call();
	// 	assert.equal(status , false , 'status should match');		
	// });	

	// it('growth : should not allow exchanges to withdraw before end time' , async () => {
	// 	var wallet = await growthInstance.exchangesWallet.call();
	// 	var tokens = await growthInstance.exchangesTokens.call();

	// 	var statusBefore = await growthInstance.exchangesStatus.call();		
	// 	var walletBalanceBefore = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceBefore = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert_throw(growthInstance.withdrawExchangesToken.call({from: owner}));

	// 	var statusAfter = await growthInstance.exchangesStatus.call();		
	// 	var walletBalanceAfter = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceAfter = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert.equal(statusAfter , statusBefore , 'status should not change');
	// 	assert.equal(walletBalanceAfter.toNumber() , walletBalanceBefore.toNumber() , 'wallet balance should not change');
	// 	assert.equal(growthBalanceAfter.toNumber() , growthBalanceBefore.toNumber() , 'growth balance should not change');
	// });	

	// it('growth : should allow exchanges to withdraw after end time' , async () => {
	// 	await growthInstance.setBlockTime(date_growth_exchanges , {from: owner});

	// 	var wallet = await growthInstance.exchangesWallet.call();
	// 	var tokens = await growthInstance.exchangesTokens.call();
	// 	var endTime = await growthInstance.exchangesLockEndingAt.call();
	// 	var timestamp = await growthInstance.getBlockTime.call();

	// 	var statusBefore = await growthInstance.exchangesStatus.call();		
	// 	var walletBalanceBefore = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceBefore = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	await growthInstance.withdrawExchangesToken({from: owner});

	// 	var statusAfter = await growthInstance.exchangesStatus.call();		
	// 	var walletBalanceAfter = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceAfter = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert.equal(statusAfter , true , 'status be true change');
	// 	assert.equal(statusBefore , false , 'status be false change');

	// 	assert.equal(walletBalanceAfter.toNumber() , walletBalanceBefore.toNumber() + tokens.toNumber() , 'wallet balance should change');
	// 	assert.equal(growthBalanceAfter.toNumber() , growthBalanceBefore.toNumber() - tokens.toNumber() , 'growth balance should change');

	// 	await growthInstance.setBlockTime(0 , {from: owner});
	// });	

	// it('growth : should not allow exchanges to withdraw twice' , async () => {
	// 	await growthInstance.setBlockTime(date_growth_exchanges , {from: owner});

	// 	var wallet = await growthInstance.exchangesWallet.call();
	// 	var tokens = await growthInstance.exchangesTokens.call();
	// 	var endTime = await growthInstance.exchangesLockEndingAt.call();
	// 	var timestamp = await growthInstance.getBlockTime.call();

	// 	var statusBefore = await growthInstance.exchangesStatus.call();		
	// 	var walletBalanceBefore = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceBefore = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	await growthInstance.withdrawExchangesToken({from: owner});

	// 	var statusAfter = await growthInstance.exchangesStatus.call();		
	// 	var walletBalanceAfter = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceAfter = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert.equal(statusAfter , true , 'status be true change');
	// 	assert.equal(statusBefore , false , 'status be false change');

	// 	assert.equal(walletBalanceAfter.toNumber() , walletBalanceBefore.toNumber() + tokens.toNumber() , 'wallet balance should change');
	// 	assert.equal(growthBalanceAfter.toNumber() , growthBalanceBefore.toNumber() - tokens.toNumber() , 'growth balance should change');

	// 	var statusBefore = await growthInstance.exchangesStatus.call();		
	// 	var walletBalanceBefore = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceBefore = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert_throw(growthInstance.withdrawExchangesToken({from: owner}));

	// 	var statusAfter = await growthInstance.exchangesStatus.call();		
	// 	var walletBalanceAfter = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceAfter = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert.equal(statusAfter , true , 'status be true change');
	// 	assert.equal(statusBefore , true , 'status be true change');
	// 	assert.equal(walletBalanceAfter.toNumber() , walletBalanceBefore.toNumber() , 'wallet balance should not change');
	// 	assert.equal(growthBalanceAfter.toNumber() , growthBalanceBefore.toNumber() , 'growth balance should not change');

	// 	await growthInstance.setBlockTime(0 , {from: owner});
	// });	

	// it('growth : should not allow countries to withdraw before end time' , async () => {
	// 	var wallet = await growthInstance.countriesWallet.call();
	// 	var tokens = await growthInstance.countriesTokens.call();

	// 	var statusBefore = await growthInstance.countriesStatus.call();		
	// 	var walletBalanceBefore = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceBefore = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert_throw(growthInstance.withdrawCountriesToken.call({from: owner}));

	// 	var statusAfter = await growthInstance.countriesStatus.call();		
	// 	var walletBalanceAfter = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceAfter = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert.equal(statusAfter , statusBefore , 'status should not change');
	// 	assert.equal(walletBalanceAfter.toNumber() , walletBalanceBefore.toNumber() , 'wallet balance should not change');
	// 	assert.equal(growthBalanceAfter.toNumber() , growthBalanceBefore.toNumber() , 'growth balance should not change');
	// });	

	// it('growth : should allow countries to withdraw after end time' , async () => {
	// 	await growthInstance.setBlockTime(date_growth_countries , {from: owner});

	// 	var wallet = await growthInstance.countriesWallet.call();
	// 	var tokens = await growthInstance.countriesTokens.call();
	// 	var endTime = await growthInstance.countriesLockEndingAt.call();
	// 	var timestamp = await growthInstance.getBlockTime.call();

	// 	var statusBefore = await growthInstance.countriesStatus.call();		
	// 	var walletBalanceBefore = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceBefore = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	await growthInstance.withdrawCountriesToken({from: owner});

	// 	var statusAfter = await growthInstance.countriesStatus.call();		
	// 	var walletBalanceAfter = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceAfter = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert.equal(statusAfter , true , 'status be true change');
	// 	assert.equal(statusBefore , false , 'status be false change');

	// 	assert.equal(walletBalanceAfter.toNumber() , walletBalanceBefore.toNumber() + tokens.toNumber() , 'wallet balance should change');
	// 	assert.equal(growthBalanceAfter.toNumber() , growthBalanceBefore.toNumber() - tokens.toNumber() , 'growth balance should change');

	// 	await growthInstance.setBlockTime(0 , {from: owner});
	// });	

	// it('growth : should not allow countries to withdraw twice' , async () => {
	// 	await growthInstance.setBlockTime(date_growth_countries , {from: owner});

	// 	var wallet = await growthInstance.countriesWallet.call();
	// 	var tokens = await growthInstance.countriesTokens.call();
	// 	var endTime = await growthInstance.countriesLockEndingAt.call();
	// 	var timestamp = await growthInstance.getBlockTime.call();

	// 	var statusBefore = await growthInstance.countriesStatus.call();		
	// 	var walletBalanceBefore = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceBefore = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	await growthInstance.withdrawCountriesToken({from: owner});

	// 	var statusAfter = await growthInstance.countriesStatus.call();		
	// 	var walletBalanceAfter = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceAfter = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert.equal(statusAfter , true , 'status be true change');
	// 	assert.equal(statusBefore , false , 'status be false change');

	// 	assert.equal(walletBalanceAfter.toNumber() , walletBalanceBefore.toNumber() + tokens.toNumber() , 'wallet balance should change');
	// 	assert.equal(growthBalanceAfter.toNumber() , growthBalanceBefore.toNumber() - tokens.toNumber() , 'growth balance should change');

	// 	var statusBefore = await growthInstance.countriesStatus.call();		
	// 	var walletBalanceBefore = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceBefore = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert_throw(growthInstance.withdrawCountriesToken({from: owner}));

	// 	var statusAfter = await growthInstance.countriesStatus.call();		
	// 	var walletBalanceAfter = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceAfter = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert.equal(statusAfter , true , 'status be true change');
	// 	assert.equal(statusBefore , true , 'status be true change');
	// 	assert.equal(walletBalanceAfter.toNumber() , walletBalanceBefore.toNumber() , 'wallet balance should not change');
	// 	assert.equal(growthBalanceAfter.toNumber() , growthBalanceBefore.toNumber() , 'growth balance should not change');

	// 	await growthInstance.setBlockTime(0 , {from: owner});
	// });	

	// it('growth : should not allow acquisitions to withdraw before end time' , async () => {
	// 	var wallet = await growthInstance.acquisitionsWallet.call();
	// 	var tokens = await growthInstance.acquisitionsTokens.call();

	// 	var statusBefore = await growthInstance.acquisitionsStatus.call();		
	// 	var walletBalanceBefore = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceBefore = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert_throw(growthInstance.withdrawAcquisitionsToken.call({from: owner}));

	// 	var statusAfter = await growthInstance.acquisitionsStatus.call();		
	// 	var walletBalanceAfter = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceAfter = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert.equal(statusAfter , statusBefore , 'status should not change');
	// 	assert.equal(walletBalanceAfter.toNumber() , walletBalanceBefore.toNumber() , 'wallet balance should not change');
	// 	assert.equal(growthBalanceAfter.toNumber() , growthBalanceBefore.toNumber() , 'growth balance should not change');
	// });	

	// it('growth : should allow acquisitions to withdraw after end time' , async () => {
	// 	await growthInstance.setBlockTime(date_growth_acquisitions , {from: owner});

	// 	var wallet = await growthInstance.acquisitionsWallet.call();
	// 	var tokens = await growthInstance.acquisitionsTokens.call();
	// 	var endTime = await growthInstance.acquisitionsLockEndingAt.call();
	// 	var timestamp = await growthInstance.getBlockTime.call();

	// 	var statusBefore = await growthInstance.acquisitionsStatus.call();		
	// 	var walletBalanceBefore = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceBefore = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	await growthInstance.withdrawAcquisitionsToken({from: owner});

	// 	var statusAfter = await growthInstance.acquisitionsStatus.call();		
	// 	var walletBalanceAfter = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceAfter = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert.equal(statusAfter , true , 'status be true change');
	// 	assert.equal(statusBefore , false , 'status be false change');

	// 	assert.equal(walletBalanceAfter.toNumber() , walletBalanceBefore.toNumber() + tokens.toNumber() , 'wallet balance should change');
	// 	assert.equal(growthBalanceAfter.toNumber() , growthBalanceBefore.toNumber() - tokens.toNumber() , 'growth balance should change');

	// 	await growthInstance.setBlockTime(0 , {from: owner});
	// });	

	// it('growth : should not allow acquisitions to withdraw twice' , async () => {
	// 	await growthInstance.setBlockTime(date_growth_acquisitions , {from: owner});

	// 	var wallet = await growthInstance.acquisitionsWallet.call();
	// 	var tokens = await growthInstance.acquisitionsTokens.call();
	// 	var endTime = await growthInstance.acquisitionsLockEndingAt.call();
	// 	var timestamp = await growthInstance.getBlockTime.call();

	// 	var statusBefore = await growthInstance.acquisitionsStatus.call();		
	// 	var walletBalanceBefore = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceBefore = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	await growthInstance.withdrawAcquisitionsToken({from: owner});

	// 	var statusAfter = await growthInstance.acquisitionsStatus.call();		
	// 	var walletBalanceAfter = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceAfter = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert.equal(statusAfter , true , 'status be true change');
	// 	assert.equal(statusBefore , false , 'status be false change');

	// 	assert.equal(walletBalanceAfter.toNumber() , walletBalanceBefore.toNumber() + tokens.toNumber() , 'wallet balance should change');
	// 	assert.equal(growthBalanceAfter.toNumber() , growthBalanceBefore.toNumber() - tokens.toNumber() , 'growth balance should change');

	// 	var statusBefore = await growthInstance.acquisitionsStatus.call();		
	// 	var walletBalanceBefore = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceBefore = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert_throw(growthInstance.withdrawAcquisitionsToken({from: owner}));

	// 	var statusAfter = await growthInstance.acquisitionsStatus.call();		
	// 	var walletBalanceAfter = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceAfter = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert.equal(statusAfter , true , 'status be true change');
	// 	assert.equal(statusBefore , true , 'status be true change');
	// 	assert.equal(walletBalanceAfter.toNumber() , walletBalanceBefore.toNumber() , 'wallet balance should not change');
	// 	assert.equal(growthBalanceAfter.toNumber() , growthBalanceBefore.toNumber() , 'growth balance should not change');

	// 	await growthInstance.setBlockTime(0 , {from: owner});
	// });	

	// it('growth : should not allow coindrops to withdraw before end time' , async () => {
	// 	var wallet = await growthInstance.coindropsWallet.call();
	// 	var tokens = await growthInstance.coindropsTokens.call();

	// 	var statusBefore = await growthInstance.coindropsStatus.call();		
	// 	var walletBalanceBefore = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceBefore = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert_throw(growthInstance.withdrawCoindropsToken.call({from: owner}));

	// 	var statusAfter = await growthInstance.coindropsStatus.call();		
	// 	var walletBalanceAfter = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceAfter = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert.equal(statusAfter , statusBefore , 'status should not change');
	// 	assert.equal(walletBalanceAfter.toNumber() , walletBalanceBefore.toNumber() , 'wallet balance should not change');
	// 	assert.equal(growthBalanceAfter.toNumber() , growthBalanceBefore.toNumber() , 'growth balance should not change');
	// });	

	// it('growth : should allow coindrops to withdraw after end time' , async () => {
	// 	await growthInstance.setBlockTime(date_growth_coindrops , {from: owner});

	// 	var wallet = await growthInstance.coindropsWallet.call();
	// 	var tokens = await growthInstance.coindropsTokens.call();
	// 	var endTime = await growthInstance.coindropsLockEndingAt.call();
	// 	var timestamp = await growthInstance.getBlockTime.call();

	// 	var statusBefore = await growthInstance.coindropsStatus.call();		
	// 	var walletBalanceBefore = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceBefore = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	await growthInstance.withdrawCoindropsToken({from: owner});

	// 	var statusAfter = await growthInstance.coindropsStatus.call();		
	// 	var walletBalanceAfter = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceAfter = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert.equal(statusAfter , true , 'status be true change');
	// 	assert.equal(statusBefore , false , 'status be false change');

	// 	assert.equal(walletBalanceAfter.toNumber() , walletBalanceBefore.toNumber() + tokens.toNumber() , 'wallet balance should change');
	// 	assert.equal(growthBalanceAfter.toNumber() , growthBalanceBefore.toNumber() - tokens.toNumber() , 'growth balance should change');

	// 	await growthInstance.setBlockTime(0 , {from: owner});
	// });	

	// it('growth : should not allow coindrops to withdraw twice' , async () => {
	// 	await growthInstance.setBlockTime(date_growth_coindrops , {from: owner});

	// 	var wallet = await growthInstance.coindropsWallet.call();
	// 	var tokens = await growthInstance.coindropsTokens.call();
	// 	var endTime = await growthInstance.coindropsLockEndingAt.call();
	// 	var timestamp = await growthInstance.getBlockTime.call();

	// 	var statusBefore = await growthInstance.coindropsStatus.call();		
	// 	var walletBalanceBefore = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceBefore = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	await growthInstance.withdrawCoindropsToken({from: owner});

	// 	var statusAfter = await growthInstance.coindropsStatus.call();		
	// 	var walletBalanceAfter = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceAfter = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert.equal(statusAfter , true , 'status be true change');
	// 	assert.equal(statusBefore , false , 'status be false change');

	// 	assert.equal(walletBalanceAfter.toNumber() , walletBalanceBefore.toNumber() + tokens.toNumber() , 'wallet balance should change');
	// 	assert.equal(growthBalanceAfter.toNumber() , growthBalanceBefore.toNumber() - tokens.toNumber() , 'growth balance should change');

	// 	var statusBefore = await growthInstance.coindropsStatus.call();		
	// 	var walletBalanceBefore = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceBefore = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert_throw(growthInstance.withdrawCoindropsToken({from: owner}));

	// 	var statusAfter = await growthInstance.coindropsStatus.call();		
	// 	var walletBalanceAfter = await tokenInstance.balanceOf.call(wallet);		
	// 	var growthBalanceAfter = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert.equal(statusAfter , true , 'status be true change');
	// 	assert.equal(statusBefore , true , 'status be true change');
	// 	assert.equal(walletBalanceAfter.toNumber() , walletBalanceBefore.toNumber() , 'wallet balance should not change');
	// 	assert.equal(growthBalanceAfter.toNumber() , growthBalanceBefore.toNumber() , 'growth balance should not change');

	// 	await growthInstance.setBlockTime(0 , {from: owner});
	// });	

	// it('growth : should not allow owner to withdraw before timeout' , async () => {
	// 	var ownerBalanceBefore = await tokenInstance.balanceOf.call(owner);		
	// 	var growthBalanceBefore = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert_throw(growthInstance.withdraw({from: owner}));

	// 	var ownerBalanceAfter = await tokenInstance.balanceOf.call(owner);		
	// 	var growthBalanceAfter = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert.equal(ownerBalanceAfter.toNumber() , ownerBalanceBefore.toNumber() , 'owner balance should not change');
	// 	assert.equal(growthBalanceAfter.toNumber() , growthBalanceBefore.toNumber() , 'growth balance should not change');
	// });	

	// it('growth : should allow owner to withdraw after timeout' , async () => {
	// 	var timeout = await growthInstance.contractTimeout.call();
	// 	await growthInstance.setBlockTime(timeout , {from: owner});

	// 	var ownerBalanceBefore = await tokenInstance.balanceOf.call(owner);		
	// 	var growthBalanceBefore = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	await growthInstance.withdraw({from: owner});

	// 	var ownerBalanceAfter = await tokenInstance.balanceOf.call(owner);		
	// 	var growthBalanceAfter = await tokenInstance.balanceOf.call(growthInstance.address);		

	// 	assert.equal(ownerBalanceAfter.toNumber() , growthBalanceBefore.toNumber() , 'owner balance should change');
	// 	assert.equal(growthBalanceAfter.toNumber() , 0 , 'growth balance should change');

	// 	await growthInstance.setBlockTime(0 , {from: owner});
	// });	

	// /*  INCENTIVE CONTRACT */

	// it('incentive : should match community contract address' , async () => {
	// 	var contract = await incentiveInstance.communityContract.call();
	// 	assert.equal(contract , communityTokenVestingInstance.address , 'contract should match');		
	// });

	// it('incentive : should match founders contract address' , async () => {
	// 	var contract = await incentiveInstance.foundersContract.call();
	// 	assert.equal(contract , foundersTokenVestingInstance.address , 'contract should match');			
	// });

	// it('incentive : should match technical contract address' , async () => {
	// 	var contract = await incentiveInstance.technicalContract.call();
	// 	assert.equal(contract , technicalTokenVestingInstance.address , 'contract should match');			
	// });

	// it('incentive : should match management contract address' , async () => {
	// 	var contract = await incentiveInstance.managementContract.call();
	// 	assert.equal(contract , managementTokenVestingInstance.address , 'contract should match');				
	// });

	// it('incentive : should distribute tokens allocated' , async () => {
	// 	var communityContract = await incentiveInstance.communityContract.call();
	// 	var foundersContract = await incentiveInstance.foundersContract.call();
	// 	var technicalContract = await incentiveInstance.technicalContract.call();
	// 	var managementContract = await incentiveInstance.managementContract.call();

	// 	var communityAmount = await incentiveInstance.communityAmount.call();
	// 	var foundersAmount = await incentiveInstance.foundersAmount.call();
	// 	var technicalAmount = await incentiveInstance.technicalAmount.call();
	// 	var managementAmount = await incentiveInstance.managementAmount.call();

	// 	var communityContractBalanceBefore = await tokenInstance.balanceOf(communityContract);
	// 	var foundersContractBalanceBefore = await tokenInstance.balanceOf(foundersContract);
	// 	var technicalContractBalanceBefore = await tokenInstance.balanceOf(technicalContract);
	// 	var managementContractBalanceBefore = await tokenInstance.balanceOf(managementContract);

	// 	await incentiveInstance.distribute({from: owner});

	// 	var communityContractBalanceAfter = await tokenInstance.balanceOf(communityContract);
	// 	var foundersContractBalanceAfter = await tokenInstance.balanceOf(foundersContract);
	// 	var technicalContractBalanceAfter = await tokenInstance.balanceOf(technicalContract);
	// 	var managementContractBalanceAfter = await tokenInstance.balanceOf(managementContract);

	// 	assert.equal(communityContractBalanceAfter.toNumber() , communityAmount.toNumber() , 'contract balance should match');
	// 	assert.equal(foundersContractBalanceAfter.toNumber() , foundersAmount.toNumber() , 'contract balance should match');
	// 	assert.equal(technicalContractBalanceAfter.toNumber() , technicalAmount.toNumber() , 'contract balance should match');
	// 	assert.equal(managementContractBalanceAfter.toNumber() , managementAmount.toNumber() , 'contract balance should match');
	// });

	// // ETHER VESTING CONTRACTS

	// it('ether vesting : should match project wallet' , async () => {
	// 	var wallet = await projectEtherVestingInstance.wallet.call();
	// 	assert.equal(wallet , projectEtherVestingWallet , 'wallet should match');
	// });

	// it('ether vesting : should match project start time' , async () => {
	// 	var startingAt = await projectEtherVestingInstance.startingAt.call();
	// 	assert.equal(startingAt , date_ether_vesting_start , 'starting should match');
	// });

	// it('ether vesting : should match project total' , async () => {
	// 	var balance = await getBalance(projectEtherVestingInstance.address);
	// 	assert.equal(balance , 0 , 'balance should match');
	// });

	// it('ether vesting : should match technology wallet' , async () => {
	// 	var wallet = await technologyEtherVestingInstance.wallet.call();
	// 	assert.equal(wallet , technologyEtherVestingWallet , 'wallet should match');
	// });

	// it('ether vesting : should match technology start time' , async () => {
	// 	var startingAt = await technologyEtherVestingInstance.startingAt.call();
	// 	assert.equal(startingAt , date_ether_vesting_start , 'starting should match');
	// });

	// it('ether vesting : should match technology total' , async () => {
	// 	var balance = await getBalance(technologyEtherVestingInstance.address);
	// 	assert.equal(balance , 0 , 'balance should match');
	// });

	// it('ether vesting : should match founder wallet' , async () => {
	// 	var wallet = await founderEtherVestingInstance.wallet.call();
	// 	assert.equal(wallet , founderEtherVestingWallet , 'wallet should match');
	// });

	// it('ether vesting : should match founder start time' , async () => {
	// 	var startingAt = await founderEtherVestingInstance.startingAt.call();
	// 	assert.equal(startingAt , date_ether_vesting_start , 'starting should match');
	// });

	// it('ether vesting : should match founder total' , async () => {
	// 	var balance = await getBalance(founderEtherVestingInstance.address);
	// 	assert.equal(balance , 0 , 'balance should match');
	// });

	// it('ether vesting : should allow owner to change wallet' , async () => {
	// 	var account = accounts[1];

	// 	var walletBefore = await projectEtherVestingInstance.wallet.call();
	// 	await projectEtherVestingInstance.setWallet(account , {from: owner});

	// 	var walletAfter = await projectEtherVestingInstance.wallet.call();	
	// 	assert.equal(walletAfter , account , 'wallet should change');

	// 	await projectEtherVestingInstance.setWallet(walletBefore , {from: owner});

	// 	var walletAfter = await projectEtherVestingInstance.wallet.call();	
	// 	assert.equal(walletAfter , walletBefore , 'wallet should change');
	// });

	// it('ether vesting : should not allow owner to withdraw before end time' , async () => {
	// 	await projectEtherVestingInstance.sendTransaction({from: owner , value: 1E18});	

	// 	var ownerBalanceBefore = await getBalance(owner);
	// 	var contractBalanceBefore = await getBalance(projectEtherVestingInstance.address);

	// 	assert_throw(projectEtherVestingInstance.withdraw({from: owner}));

	// 	var ownerBalanceAfter = await getBalance(owner);
	// 	var contractBalanceAfter = await getBalance(projectEtherVestingInstance.address);

	// 	assert.equal(ownerBalanceAfter.toNumber() , ownerBalanceBefore.toNumber() , 'balance should not change');
	// 	assert.equal(contractBalanceAfter.toNumber() , contractBalanceBefore.toNumber() , 'balance should not change');
	// });

	// it('ether vesting : should allow owner to withdraw after end time' , async () => {
	// 	await projectEtherVestingInstance.sendTransaction({from: owner , value: 1E18});	
		
	// 	var timeout = await projectEtherVestingInstance.contractTimeout.call();
	// 	await projectEtherVestingInstance.setBlockTime(timeout , {from: owner});

	// 	var ownerBalanceBefore = await getBalance(owner);
	// 	var contractBalanceBefore = await getBalance(projectEtherVestingInstance.address);

	// 	await projectEtherVestingInstance.withdraw({from: owner});

	// 	var ownerBalanceAfter = await getBalance(owner);
	// 	var contractBalanceAfter = await getBalance(projectEtherVestingInstance.address);

	// 	assert.isTrue(ownerBalanceAfter.toNumber() > ownerBalanceBefore.toNumber() , 'balance should change');
	// 	assert.equal(contractBalanceAfter.toNumber() , 0 , 'balance should change');

	// 	await projectEtherVestingInstance.setBlockTime(0 , {from: owner});
	// });

	// it('ether vesting : should allow user to withdraw 20% for first month on border' , async () => {
	// 	var timestamp = await projectEtherVestingInstance.startingAt.call();
			
	// 	var result = await projectEtherVestingInstance.calculate.call(timestamp, 1E18 , 20);
	// 	var round = result[0];
	// 	var amount = result[1];
		
	// 	assert.equal(round.toNumber(), 1, 'round should be 1');
	// 	assert.equal(amount.toNumber(), 1E18 * 20 / 100, 'amount should be returned');
	// });

	// it('ether vesting : should allow user to withdraw 20% for first month' , async () => {
	// 	var timestamp = await projectEtherVestingInstance.startingAt.call();
		
	// 	var result = await projectEtherVestingInstance.calculate.call(timestamp.toNumber() + day, 1E18 , 20);
	// 	var round = result[0];
	// 	var amount = result[1];
		
	// 	assert.equal(round.toNumber(), 1, 'round should be 1');
	// 	assert.equal(amount.toNumber(), 1E18 * 20 / 100, 'amount should be returned');		
	// });

	// it('ether vesting : should allow user to withdraw 18% for first month' , async () => {
	// 	var timestamp = await projectEtherVestingInstance.startingAt.call();
			
	// 	var result = await projectEtherVestingInstance.calculate.call(timestamp.toNumber() + day, 1E18 , 18);
	// 	var round = result[0];
	// 	var amount = result[1];
		
	// 	assert.equal(round.toNumber(), 1, 'round should be 1');
	// 	assert.equal(amount.toNumber(), 1E18 * 18 / 100, 'amount should be returned');		
	// });

	// it('ether vesting : should not allow user to withdraw 22% for first month' , async () => {
	// 	var timestamp = await projectEtherVestingInstance.startingAt.call();
		
	// 	var result = await projectEtherVestingInstance.calculate.call(timestamp.toNumber() + month + day, 1E18 , 22);
	// 	var round = result[0];
	// 	var amount = result[1];
		
	// 	assert.equal(round.toNumber(), 2, 'round should be 2');
	// 	assert.equal(amount.toNumber(), 1E18 * 22 / 100, 'amount should be returned');		
	// });

	// it('ether vesting : should allow user to withdraw 20% for second month' , async () => {
	// 	var timestamp = await projectEtherVestingInstance.startingAt.call();
		
	// 	var result = await projectEtherVestingInstance.calculate.call(timestamp.toNumber() + month + day, 1E18 , 20);
	// 	var round = result[0];
	// 	var amount = result[1];
		
	// 	assert.equal(round.toNumber(), 2, 'round should be 2');
	// 	assert.equal(amount.toNumber(), 1E18 * 20 / 100, 'amount should be returned');				
	// });

	// it('ether vesting : should allow user to withdraw 20% for third month' , async () => {
	// 	var timestamp = await projectEtherVestingInstance.startingAt.call();
		
	// 	var result = await projectEtherVestingInstance.calculate.call(timestamp.toNumber() + month + month + day, 1E18 , 20);
	// 	var round = result[0];
	// 	var amount = result[1];
		
	// 	assert.equal(round.toNumber(), 3, 'round should be 3');
	// 	assert.equal(amount.toNumber(), 1E18 * 20 / 100, 'amount should be returned');
	// });

	// it('ether vesting : should allow user to withdraw 20% for fourth month' , async () => {
	// 	var timestamp = await projectEtherVestingInstance.startingAt.call();
		
	// 	var result = await projectEtherVestingInstance.calculate.call(timestamp.toNumber() + month + month + month + day, 1E18 , 20);
	// 	var round = result[0];
	// 	var amount = result[1];
		
	// 	assert.equal(round.toNumber(), 4, 'round should be 4');
	// 	assert.equal(amount.toNumber(), 1E18 * 20 / 100, 'amount should be returned');
	// });

	// it('ether vesting : should allow user to withdraw full for last month' , async () => {
	// 	var timestamp = await projectEtherVestingInstance.startingAt.call();
		
	// 	var result = await projectEtherVestingInstance.calculate.call(timestamp.toNumber() + (month * 17) + day, 1E18 , 20);
	// 	var round = result[0];
	// 	var amount = result[1];

	// 	assert.equal(round.toNumber(), 18, 'round should be 18');
	// 	assert.equal(amount.toNumber(), 1E18, 'amount should be returned in full');
	// });

	// it('ether vesting : should allow user to withdraw full after last month' , async () => {
	// 	var timestamp = await projectEtherVestingInstance.startingAt.call();
		
	// 	var result = await projectEtherVestingInstance.calculate.call(timestamp.toNumber() + (month * 19) + day, 1E18 , 20);
	// 	var round = result[0];
	// 	var amount = result[1];

	// 	assert.equal(round.toNumber(), 18, 'round should be 18');
	// 	assert.equal(amount.toNumber(), 1E18, 'amount should be returned in full');
	// });

	// it('ether vesting : should allow user to get 20% for first month' , async () => {
	// 	await projectEtherVestingInstance.sendTransaction({from: owner , value: 1E18});
	// 	await projectEtherVestingInstance.setBlockTime(date_ether_vesting_start , {from : owner});

	// 	var projectEtherVestingWallet = await projectEtherVestingInstance.wallet.call();
	// 	var startingAt = await projectEtherVestingInstance.startingAt.call();
		
	// 	var projectBalanceBefore = await getBalance(projectEtherVestingInstance.address);
	// 	var projectEtherVestingWalletBalanceBefore = await getBalance(projectEtherVestingWallet);

	// 	await projectEtherVestingInstance.pay(20 , {from: owner});	
		
	// 	var projectBalanceAfter = await getBalance(projectEtherVestingInstance.address);
	// 	var projectEtherVestingWalletBalanceAfter = await getBalance(projectEtherVestingWallet);

	// 	assert.equal(projectBalanceAfter.toNumber(), projectBalanceBefore.toNumber() - (projectBalanceBefore.toNumber() * 20 / 100), 'contract balance should be reduced by 20%');
	// 	assert.equal(projectEtherVestingWalletBalanceAfter.toNumber(), projectEtherVestingWalletBalanceBefore.toNumber() + (projectBalanceBefore.toNumber() * 20 / 100), 'wallet balance should be increased by 20%');

	// 	await projectEtherVestingInstance.setBlockTime(0 , {from : owner});
	// });

	// it('ether vesting : should allow user to get 20% for first month only once' , async () => {
	// 	await projectEtherVestingInstance.sendTransaction({from: owner , value: 1E18});
	// 	await projectEtherVestingInstance.setBlockTime(date_ether_vesting_start , {from : owner});

	// 	var projectEtherVestingWallet = await projectEtherVestingInstance.wallet.call();
	// 	var startingAt = await projectEtherVestingInstance.startingAt.call();
		
	// 	var projectBalanceBefore = await getBalance(projectEtherVestingInstance.address);
	// 	var projectEtherVestingWalletBalanceBefore = await getBalance(projectEtherVestingWallet);

	// 	await projectEtherVestingInstance.pay(20 , {from: owner});	
		
	// 	var projectBalanceAfter = await getBalance(projectEtherVestingInstance.address);
	// 	var projectEtherVestingWalletBalanceAfter = await getBalance(projectEtherVestingWallet);

	// 	assert.equal(projectBalanceAfter.toNumber(), projectBalanceBefore.toNumber() - (projectBalanceBefore.toNumber() * 20 / 100), 'contract balance should be reduced by 20%');
	// 	assert.equal(projectEtherVestingWalletBalanceAfter.toNumber(), projectEtherVestingWalletBalanceBefore.toNumber() + (projectBalanceBefore.toNumber() * 20 / 100), 'wallet balance should be increased by 20%');

	// 	var projectBalanceBefore = await getBalance(projectEtherVestingInstance.address);
	// 	var projectEtherVestingWalletBalanceBefore = await getBalance(projectEtherVestingWallet);

	// 	assert_throw(projectEtherVestingInstance.pay(20 , {from: owner}));	
		
	// 	var projectBalanceAfter = await getBalance(projectEtherVestingInstance.address);
	// 	var projectEtherVestingWalletBalanceAfter = await getBalance(projectEtherVestingWallet);

	// 	assert.equal(projectBalanceAfter.toNumber(), projectBalanceBefore.toNumber(), 'contract balance should not be reduced by 20%');
	// 	assert.equal(projectEtherVestingWalletBalanceAfter.toNumber(), projectEtherVestingWalletBalanceBefore.toNumber(), 'wallet balance should not be increased by 20%');

	// 	await projectEtherVestingInstance.setBlockTime(0 , {from : owner});
	// });

	// it('ether vesting : should allow user to get 20% for second month' , async () => {
	// 	await projectEtherVestingInstance.sendTransaction({from: owner , value: 1E18});
	// 	await projectEtherVestingInstance.setBlockTime(date_ether_vesting_start + month + day , {from : owner});

	// 	var projectEtherVestingWallet = await projectEtherVestingInstance.wallet.call();
	// 	var startingAt = await projectEtherVestingInstance.startingAt.call();
		
	// 	var projectBalanceBefore = await getBalance(projectEtherVestingInstance.address);
	// 	var projectEtherVestingWalletBalanceBefore = await getBalance(projectEtherVestingWallet);

	// 	await projectEtherVestingInstance.pay(20 , {from: owner});	
		
	// 	var projectBalanceAfter = await getBalance(projectEtherVestingInstance.address);
	// 	var projectEtherVestingWalletBalanceAfter = await getBalance(projectEtherVestingWallet);

	// 	assert.equal(projectBalanceAfter.toNumber(), projectBalanceBefore.toNumber() - (projectBalanceBefore.toNumber() * 20 / 100), 'contract balance should be reduced by 20%');
	// 	assert.equal(projectEtherVestingWalletBalanceAfter.toNumber(), projectEtherVestingWalletBalanceBefore.toNumber() + (projectBalanceBefore.toNumber() * 20 / 100), 'wallet balance should be increased by 20%');

	// 	await projectEtherVestingInstance.setBlockTime(0 , {from : owner});
	// });

	// it('ether vesting : should allow user to get 20% for second month only once' , async () => {
	// 	await projectEtherVestingInstance.sendTransaction({from: owner , value: 1E18});
	// 	await projectEtherVestingInstance.setBlockTime(date_ether_vesting_start + month + day , {from : owner});

	// 	var projectEtherVestingWallet = await projectEtherVestingInstance.wallet.call();
	// 	var startingAt = await projectEtherVestingInstance.startingAt.call();
		
	// 	var projectBalanceBefore = await getBalance(projectEtherVestingInstance.address);
	// 	var projectEtherVestingWalletBalanceBefore = await getBalance(projectEtherVestingWallet);

	// 	await projectEtherVestingInstance.pay(20 , {from: owner});	
		
	// 	var projectBalanceAfter = await getBalance(projectEtherVestingInstance.address);
	// 	var projectEtherVestingWalletBalanceAfter = await getBalance(projectEtherVestingWallet);

	// 	assert.equal(projectBalanceAfter.toNumber(), projectBalanceBefore.toNumber() - (projectBalanceBefore.toNumber() * 20 / 100), 'contract balance should be reduced by 20%');
	// 	assert.equal(projectEtherVestingWalletBalanceAfter.toNumber(), projectEtherVestingWalletBalanceBefore.toNumber() + (projectBalanceBefore.toNumber() * 20 / 100), 'wallet balance should be increased by 20%');

	// 	var projectBalanceBefore = await getBalance(projectEtherVestingInstance.address);
	// 	var projectEtherVestingWalletBalanceBefore = await getBalance(projectEtherVestingWallet);

	// 	assert_throw(projectEtherVestingInstance.pay(20 , {from: owner}));	
		
	// 	var projectBalanceAfter = await getBalance(projectEtherVestingInstance.address);
	// 	var projectEtherVestingWalletBalanceAfter = await getBalance(projectEtherVestingWallet);

	// 	assert.equal(projectBalanceAfter.toNumber(), projectBalanceBefore.toNumber(), 'contract balance should not be reduced by 20%');
	// 	assert.equal(projectEtherVestingWalletBalanceAfter.toNumber(), projectEtherVestingWalletBalanceBefore.toNumber(), 'wallet balance should not be increased by 20%');

	// 	await projectEtherVestingInstance.setBlockTime(0 , {from : owner});
	// });

	// it('ether vesting : should allow user to get 100% for last month' , async () => {
	// 	await projectEtherVestingInstance.sendTransaction({from: owner , value: 1E18});
	// 	await projectEtherVestingInstance.setBlockTime(date_ether_vesting_start + (month * 17) + day , {from : owner});

	// 	var projectEtherVestingWallet = await projectEtherVestingInstance.wallet.call();
	// 	var startingAt = await projectEtherVestingInstance.startingAt.call();
		
	// 	var projectBalanceBefore = await getBalance(projectEtherVestingInstance.address);
	// 	var projectEtherVestingWalletBalanceBefore = await getBalance(projectEtherVestingWallet);

	// 	await projectEtherVestingInstance.pay(100 , {from: owner});	
		
	// 	var projectBalanceAfter = await getBalance(projectEtherVestingInstance.address);
	// 	var projectEtherVestingWalletBalanceAfter = await getBalance(projectEtherVestingWallet);

	// 	assert.equal(projectBalanceAfter.toNumber(), projectBalanceBefore.toNumber() - (projectBalanceBefore.toNumber()), 'contract balance should be reduced by 100%');
	// 	assert.equal(projectEtherVestingWalletBalanceAfter.toNumber(), projectEtherVestingWalletBalanceBefore.toNumber() + (projectBalanceBefore.toNumber()), 'wallet balance should be increased by 100%');

	// 	await projectEtherVestingInstance.setBlockTime(0 , {from : owner});
	// });

	// it('ether vesting : should allow user to get 100% for last month only once' , async () => {
	// 	await projectEtherVestingInstance.sendTransaction({from: owner , value: 1E18});
	// 	await projectEtherVestingInstance.setBlockTime(date_ether_vesting_start + (month * 17) + day , {from : owner});

	// 	var projectEtherVestingWallet = await projectEtherVestingInstance.wallet.call();
	// 	var startingAt = await projectEtherVestingInstance.startingAt.call();
		
	// 	var projectBalanceBefore = await getBalance(projectEtherVestingInstance.address);
	// 	var projectEtherVestingWalletBalanceBefore = await getBalance(projectEtherVestingWallet);

	// 	await projectEtherVestingInstance.pay(100 , {from: owner});	
		
	// 	var projectBalanceAfter = await getBalance(projectEtherVestingInstance.address);
	// 	var projectEtherVestingWalletBalanceAfter = await getBalance(projectEtherVestingWallet);

	// 	assert.equal(projectBalanceAfter.toNumber(), projectBalanceBefore.toNumber() - (projectBalanceBefore.toNumber()), 'contract balance should be reduced by 100%');
	// 	assert.equal(makeNumber(projectEtherVestingWalletBalanceAfter), makeNumber(projectEtherVestingWalletBalanceBefore) + makeNumber(projectBalanceBefore), 'wallet balance should be increased by 100%');

	// 	var projectBalanceBefore = await getBalance(projectEtherVestingInstance.address);
	// 	var projectEtherVestingWalletBalanceBefore = await getBalance(projectEtherVestingWallet);

	// 	assert_throw(projectEtherVestingInstance.pay(100 , {from: owner}));	
		
	// 	var projectBalanceAfter = await getBalance(projectEtherVestingInstance.address);
	// 	var projectEtherVestingWalletBalanceAfter = await getBalance(projectEtherVestingWallet);

	// 	assert.equal(projectBalanceAfter.toNumber(), projectBalanceBefore.toNumber(), 'contract balance should not be reduced by 100%');
	// 	assert.equal(projectEtherVestingWalletBalanceAfter.toNumber(), projectEtherVestingWalletBalanceBefore.toNumber(), 'wallet balance should not be increased by 100%');

	// 	await projectEtherVestingInstance.setBlockTime(0 , {from : owner});
	// });

	// it('ether vesting : should allow admin to get full after timeout' , async () => {
	// 	var timeout = await projectEtherVestingInstance.contractTimeout.call();
	// 	await projectEtherVestingInstance.sendTransaction({from: owner , value: 1E18});
	// 	await projectEtherVestingInstance.setBlockTime(timeout , {from : owner});

	// 	var projectBalanceBefore = await getBalance(projectEtherVestingInstance.address);
	// 	var ownerBalanceBefore = await getBalance(owner);

	// 	await projectEtherVestingInstance.withdraw({from: owner});	

	// 	var projectBalanceAfter = await getBalance(projectEtherVestingInstance.address);
	// 	var ownerBalanceAfter = await getBalance(owner);

	// 	assert.equal(projectBalanceAfter.toNumber(), 0, 'contract balance should be reduced by 100%');
	// 	assert.isTrue(ownerBalanceAfter.toNumber() > ownerBalanceBefore.toNumber(), 'wallet balance should be increased by 100%');

	// 	await projectEtherVestingInstance.setBlockTime(0 , {from : owner});
	// });

	// it('ether vesting : should not allow admin to get full before timeout' , async () => {
	// 	var startingAt = await projectEtherVestingInstance.startingAt.call();
	// 	await projectEtherVestingInstance.sendTransaction({from: owner , value: 1E18});
	// 	await projectEtherVestingInstance.setBlockTime(startingAt , {from : owner});

	// 	var projectBalanceBefore = await getBalance(projectEtherVestingInstance.address);
	// 	var ownerBalanceBefore = await getBalance(owner);

	// 	assert_throw(projectEtherVestingInstance.withdraw({from: owner}));	

	// 	var projectBalanceAfter = await getBalance(projectEtherVestingInstance.address);
	// 	var ownerBalanceAfter = await getBalance(owner);

	// 	assert.equal(projectBalanceAfter.toNumber(), projectBalanceBefore.toNumber(), 'contract balance should not be reduced by 100%');
	// 	assert.equal(ownerBalanceAfter.toNumber(), ownerBalanceBefore.toNumber(), 'wallet balance should not be increased by 100%');

	// 	await projectEtherVestingInstance.setBlockTime(0 , {from : owner});
	// });

	
	// /* TOKEN VESTING CONTRACTS */

	// it('token vesting : should match community wallet' , async () => {
	// 	var wallet = await communityTokenVestingInstance.wallet.call();
	// 	assert.equal(wallet , communityTokenVestingWallet , 'wallet should match');
	// });

	// it('token vesting : should match community start time' , async () => {
	// 	var startingAt = await communityTokenVestingInstance.startingAt.call();
	// 	assert.equal(startingAt.toNumber() , date_incentive_community , 'starting should match');
	// });

	// it('token vesting : should match community total' , async () => {
	// 	var maxTokenForHold = await communityTokenVestingInstance.maxTokenForHold.call();
	// 	assert.equal(maxTokenForHold.toNumber() , amount_incentive_community , 'token amount should match');		
	// });

	// it('token vesting : should match founders wallet' , async () => {
	// 	var wallet = await foundersTokenVestingInstance.wallet.call();
	// 	assert.equal(wallet , foundersTokenVestingWallet , 'wallet should match');
	// });

	// it('token vesting : should match founders start time' , async () => {
	// 	var startingAt = await foundersTokenVestingInstance.startingAt.call();
	// 	assert.equal(startingAt.toNumber() , date_incentive_founders , 'starting should match');
	// });

	// it('token vesting : should match founders total' , async () => {
	// 	var maxTokenForHold = await foundersTokenVestingInstance.maxTokenForHold.call();
	// 	assert.equal(maxTokenForHold.toNumber() , amount_incentive_founders , 'token amount should match');		
	// });

	// it('token vesting : should match technical wallet' , async () => {
	// 	var wallet = await technicalTokenVestingInstance.wallet.call();
	// 	assert.equal(wallet , technicalTokenVestingWallet , 'wallet should match');
	// });

	// it('token vesting : should match technical start time' , async () => {
	// 	var startingAt = await technicalTokenVestingInstance.startingAt.call();
	// 	assert.equal(startingAt.toNumber() , date_incentive_technical , 'starting should match');
	// });

	// it('token vesting : should match technical total' , async () => {
	// 	var maxTokenForHold = await technicalTokenVestingInstance.maxTokenForHold.call();
	// 	assert.equal(maxTokenForHold.toNumber() , amount_incentive_technical , 'token amount should match');		
	// });

	// it('token vesting : should match management wallet' , async () => {
	// 	var wallet = await managementTokenVestingInstance.wallet.call();
	// 	assert.equal(wallet , managementTokenVestingWallet , 'wallet should match');
	// });

	// it('token vesting : should match management start time' , async () => {
	// 	var startingAt = await managementTokenVestingInstance.startingAt.call();
	// 	assert.equal(startingAt.toNumber() , date_incentive_management , 'starting should match');
	// });

	// it('token vesting : should match management total' , async () => {
	// 	var maxTokenForHold = await managementTokenVestingInstance.maxTokenForHold.call();
	// 	assert.equal(maxTokenForHold.toNumber() , amount_incentive_management , 'token amount should match');		
	// });

	// it('token vesting : should allow owner to change wallet' , async () => {
	// 	var account = accounts[1];

	// 	var walletBefore = await communityTokenVestingInstance.wallet.call();
	// 	await communityTokenVestingInstance.setWallet(account , {from: owner});

	// 	var walletAfter = await communityTokenVestingInstance.wallet.call();	
	// 	assert.equal(walletAfter , account , 'wallet should change');

	// 	await communityTokenVestingInstance.setWallet(walletBefore , {from: owner});

	// 	var walletAfter = await communityTokenVestingInstance.wallet.call();	
	// 	assert.equal(walletAfter , walletBefore , 'wallet should change');
	// });

	// it('token vesting : should not allow owner to withdraw before end time' , async () => {
	// 	await saleInstance.setBlockTime(date_phase1_start , {from: owner});
	// 	await saleInstance.sendTransaction({from: accounts[1] , value: 1E18});
	// 	var balance = await tokenInstance.balanceOf.call(accounts[1]);
	// 	await tokenInstance.transfer(communityTokenVestingInstance.address , balance , {from: accounts[1]});
	// 	await saleInstance.setBlockTime(0 , {from: owner});

	// 	var ownerBalanceBefore = await getTokenBalance(owner);
	// 	var contractBalanceBefore = await getTokenBalance(communityTokenVestingInstance.address);

	// 	assert_throw(communityTokenVestingInstance.withdraw({from: owner}));

	// 	var ownerBalanceAfter = await getTokenBalance(owner);
	// 	var contractBalanceAfter = await getTokenBalance(communityTokenVestingInstance.address);

	// 	assert.equal(ownerBalanceAfter.toNumber() , ownerBalanceBefore.toNumber() , 'balance should not change');
	// 	assert.equal(contractBalanceAfter.toNumber() , contractBalanceBefore.toNumber() , 'balance should not change');
	// });

	// it('token vesting : should allow owner to withdraw after end time' , async () => {
	// 	await saleInstance.setBlockTime(date_phase1_start , {from: owner});
	// 	await saleInstance.sendTransaction({from: accounts[1] , value: 1E18});
	// 	var balance = await tokenInstance.balanceOf.call(accounts[1]);
	// 	await tokenInstance.transfer(communityTokenVestingInstance.address , balance , {from: accounts[1]});
	// 	await saleInstance.setBlockTime(0 , {from: owner});
		
	// 	var timeout = await communityTokenVestingInstance.contractTimeout.call();
	// 	await communityTokenVestingInstance.setBlockTime(timeout , {from: owner});

	// 	var ownerBalanceBefore = await getTokenBalance(owner);
	// 	var contractBalanceBefore = await getTokenBalance(communityTokenVestingInstance.address);

	// 	await communityTokenVestingInstance.withdraw({from: owner});

	// 	var ownerBalanceAfter = await getTokenBalance(owner);
	// 	var contractBalanceAfter = await getTokenBalance(communityTokenVestingInstance.address);

	// 	assert.equal(ownerBalanceAfter.toNumber() , ownerBalanceBefore.toNumber() + contractBalanceBefore.toNumber() , 'balance should change');
	// 	assert.equal(contractBalanceAfter.toNumber() , 0 , 'balance should change');

	// 	await communityTokenVestingInstance.setBlockTime(0 , {from: owner});
	// });

	// it('token vesting : should allow user to withdraw 20% for first month on border' , async () => {
	// 	var timestamp = await communityTokenVestingInstance.startingAt.call();
			
	// 	var result = await communityTokenVestingInstance.calculate.call(timestamp, 1E18 , 20);
	// 	var round = result[0];
	// 	var amount = result[1];
		
	// 	assert.equal(round.toNumber(), 1, 'round should be 1');
	// 	assert.equal(amount.toNumber(), 1E18 * 20 / 100, 'amount should be returned');
	// });

	// it('token vesting : should allow user to withdraw 20% for first month' , async () => {
	// 	var timestamp = await communityTokenVestingInstance.startingAt.call();
		
	// 	var result = await communityTokenVestingInstance.calculate.call(timestamp.toNumber() + day, 1E18 , 20);
	// 	var round = result[0];
	// 	var amount = result[1];
		
	// 	assert.equal(round.toNumber(), 1, 'round should be 1');
	// 	assert.equal(amount.toNumber(), 1E18 * 20 / 100, 'amount should be returned');		
	// });

	// it('token vesting : should allow user to withdraw 18% for first month' , async () => {
	// 	var timestamp = await communityTokenVestingInstance.startingAt.call();
			
	// 	var result = await communityTokenVestingInstance.calculate.call(timestamp.toNumber() + day, 1E18 , 18);
	// 	var round = result[0];
	// 	var amount = result[1];
		
	// 	assert.equal(round.toNumber(), 1, 'round should be 1');
	// 	assert.equal(amount.toNumber(), 1E18 * 18 / 100, 'amount should be returned');		
	// });

	// it('token vesting : should not allow user to withdraw 22% for first month' , async () => {
	// 	var timestamp = await communityTokenVestingInstance.startingAt.call();
		
	// 	var result = await communityTokenVestingInstance.calculate.call(timestamp.toNumber() + month + day, 1E18 , 22);
	// 	var round = result[0];
	// 	var amount = result[1];
		
	// 	assert.equal(round.toNumber(), 2, 'round should be 2');
	// 	assert.equal(amount.toNumber(), 1E18 * 22 / 100, 'amount should be returned');		
	// });

	// it('token vesting : should allow user to withdraw 20% for second month' , async () => {
	// 	var timestamp = await communityTokenVestingInstance.startingAt.call();
		
	// 	var result = await communityTokenVestingInstance.calculate.call(timestamp.toNumber() + month + day, 1E18 , 20);
	// 	var round = result[0];
	// 	var amount = result[1];
		
	// 	assert.equal(round.toNumber(), 2, 'round should be 2');
	// 	assert.equal(amount.toNumber(), 1E18 * 20 / 100, 'amount should be returned');				
	// });

	// it('token vesting : should allow user to withdraw 20% for third month' , async () => {
	// 	var timestamp = await communityTokenVestingInstance.startingAt.call();
		
	// 	var result = await communityTokenVestingInstance.calculate.call(timestamp.toNumber() + month + month + day, 1E18 , 20);
	// 	var round = result[0];
	// 	var amount = result[1];
		
	// 	assert.equal(round.toNumber(), 3, 'round should be 3');
	// 	assert.equal(amount.toNumber(), 1E18 * 20 / 100, 'amount should be returned');
	// });

	// it('token vesting : should allow user to withdraw 20% for fourth month' , async () => {
	// 	var timestamp = await communityTokenVestingInstance.startingAt.call();
		
	// 	var result = await communityTokenVestingInstance.calculate.call(timestamp.toNumber() + month + month + month + day, 1E18 , 20);
	// 	var round = result[0];
	// 	var amount = result[1];
		
	// 	assert.equal(round.toNumber(), 4, 'round should be 4');
	// 	assert.equal(amount.toNumber(), 1E18 * 20 / 100, 'amount should be returned');
	// });

	// it('token vesting : should allow user to withdraw full for last month' , async () => {
	// 	var timestamp = await communityTokenVestingInstance.startingAt.call();
		
	// 	var result = await communityTokenVestingInstance.calculate.call(timestamp.toNumber() + (month * 17) + day, 1E18 , 20);
	// 	var round = result[0];
	// 	var amount = result[1];

	// 	assert.equal(round.toNumber(), 18, 'round should be 18');
	// 	assert.equal(amount.toNumber(), 1E18, 'amount should be returned in full');
	// });

	// it('token vesting : should allow user to withdraw full after last month' , async () => {
	// 	var timestamp = await communityTokenVestingInstance.startingAt.call();
		
	// 	var result = await communityTokenVestingInstance.calculate.call(timestamp.toNumber() + (month * 19) + day, 1E18 , 20);
	// 	var round = result[0];
	// 	var amount = result[1];

	// 	assert.equal(round.toNumber(), 18, 'round should be 18');
	// 	assert.equal(amount.toNumber(), 1E18, 'amount should be returned in full');
	// });

	// it('token vesting : should allow founder user to get 20% for first month' , async () => {
	// 	await saleInstance.setBlockTime(date_phase1_start , {from: owner});
	// 	await saleInstance.sendTransaction({from: accounts[1] , value: 1E18});
	// 	var balance = await tokenInstance.balanceOf.call(accounts[1]);
	// 	await tokenInstance.transfer(foundersTokenVestingInstance.address , balance , {from: accounts[1]});
	// 	await saleInstance.setBlockTime(0 , {from: owner});

	// 	await foundersTokenVestingInstance.setBlockTime(date_incentive_founders , {from : owner});

	// 	var foundersTokenVestingWallet = await foundersTokenVestingInstance.wallet.call();
	// 	var startingAt = await foundersTokenVestingInstance.startingAt.call();
		
	// 	var founderBalanceBefore = await getTokenBalance(foundersTokenVestingInstance.address);
	// 	var foundersTokenVestingWalletBalanceBefore = await getTokenBalance(foundersTokenVestingWallet);

	// 	await foundersTokenVestingInstance.pay(20 , {from: owner});	
		
	// 	var founderBalanceAfter = await getTokenBalance(foundersTokenVestingInstance.address);
	// 	var foundersTokenVestingWalletBalanceAfter = await getTokenBalance(foundersTokenVestingWallet);

	// 	assert.equal(founderBalanceAfter.toNumber(), founderBalanceBefore.toNumber() - (founderBalanceBefore.toNumber() * 20 / 100), 'contract balance should be reduced by 20%');
	// 	assert.equal(foundersTokenVestingWalletBalanceAfter.toNumber(), foundersTokenVestingWalletBalanceBefore.toNumber() + (founderBalanceBefore.toNumber() * 20 / 100), 'wallet balance should be increased by 20%');

	// 	await foundersTokenVestingInstance.setBlockTime(0 , {from : owner});
	// });

	// it('token vesting : should allow user to get 20% for first month' , async () => {
	// 	await saleInstance.setBlockTime(date_phase1_start , {from: owner});
	// 	await saleInstance.sendTransaction({from: accounts[1] , value: 1E18});
	// 	var balance = await tokenInstance.balanceOf.call(accounts[1]);
	// 	await tokenInstance.transfer(communityTokenVestingInstance.address , balance , {from: accounts[1]});
	// 	await saleInstance.setBlockTime(0 , {from: owner});

	// 	await communityTokenVestingInstance.setBlockTime(date_token_vesting_start , {from : owner});

	// 	var communityTokenVestingWallet = await communityTokenVestingInstance.wallet.call();
	// 	var startingAt = await communityTokenVestingInstance.startingAt.call();
		
	// 	var communityBalanceBefore = await getTokenBalance(communityTokenVestingInstance.address);
	// 	var communityTokenVestingWalletBalanceBefore = await getTokenBalance(communityTokenVestingWallet);

	// 	await communityTokenVestingInstance.pay(20 , {from: owner});	
		
	// 	var communityBalanceAfter = await getTokenBalance(communityTokenVestingInstance.address);
	// 	var communityTokenVestingWalletBalanceAfter = await getTokenBalance(communityTokenVestingWallet);

	// 	assert.equal(communityBalanceAfter.toNumber(), communityBalanceBefore.toNumber() - (communityBalanceBefore.toNumber() * 20 / 100), 'contract balance should be reduced by 20%');
	// 	assert.equal(communityTokenVestingWalletBalanceAfter.toNumber(), communityTokenVestingWalletBalanceBefore.toNumber() + (communityBalanceBefore.toNumber() * 20 / 100), 'wallet balance should be increased by 20%');

	// 	await communityTokenVestingInstance.setBlockTime(0 , {from : owner});
	// });

	it('token vesting : should allow user to get 20% for first month only once' , async () => {
		await saleInstance.setBlockTime(date_phase1_start , {from: owner});
		await saleInstance.sendTransaction({from: accounts[1] , value: 1E18});
		var balance = await tokenInstance.balanceOf.call(accounts[1]);
		await tokenInstance.transfer(communityTokenVestingInstance.address , balance , {from: accounts[1]});
		await saleInstance.setBlockTime(0 , {from: owner});

		await communityTokenVestingInstance.setBlockTime(date_token_vesting_start , {from : owner});

		var communityTokenVestingWallet = await communityTokenVestingInstance.wallet.call();
		var startingAt = await communityTokenVestingInstance.startingAt.call();
		
		var communityBalanceBefore = await getTokenBalance(communityTokenVestingInstance.address);
		var communityTokenVestingWalletBalanceBefore = await getTokenBalance(communityTokenVestingWallet);

		await communityTokenVestingInstance.pay(20 , {from: owner});	
		
		var communityBalanceAfter = await getTokenBalance(communityTokenVestingInstance.address);
		var communityTokenVestingWalletBalanceAfter = await getTokenBalance(communityTokenVestingWallet);

		// console.log(communityBalanceBefore.toNumber() , communityBalanceAfter.toNumber());
		// console.log(communityTokenVestingWalletBalanceBefore.toNumber() , communityTokenVestingWalletBalanceAfter.toNumber());

		assert.equal(communityBalanceAfter.toNumber(), communityBalanceBefore.toNumber() - (communityBalanceBefore.toNumber() * 20 / 100), 'contract balance should be reduced by 20%');
		assert.equal(communityTokenVestingWalletBalanceAfter.toNumber(), communityTokenVestingWalletBalanceBefore.toNumber() + (communityBalanceBefore.toNumber() * 20 / 100), 'wallet balance should be increased by 20%');

		var communityBalanceBefore = await getTokenBalance(communityTokenVestingInstance.address);
		var communityTokenVestingWalletBalanceBefore = await getTokenBalance(communityTokenVestingWallet);

		assert_throw(communityTokenVestingInstance.pay(20 , {from: owner}));	
		
		var communityBalanceAfter = await getTokenBalance(communityTokenVestingInstance.address);
		var communityTokenVestingWalletBalanceAfter = await getTokenBalance(communityTokenVestingWallet);

		// console.log(communityBalanceBefore.toNumber() , communityBalanceAfter.toNumber());
		// console.log(communityTokenVestingWalletBalanceBefore.toNumber() , communityTokenVestingWalletBalanceAfter.toNumber());

		assert.equal(communityBalanceAfter.toNumber(), communityBalanceBefore.toNumber(), 'contract balance should not be reduced by 20%');
		assert.equal(communityTokenVestingWalletBalanceAfter.toNumber(), communityTokenVestingWalletBalanceBefore.toNumber(), 'wallet balance should not be increased by 20%');

		await communityTokenVestingInstance.setBlockTime(0 , {from : owner});
	});

	it('token vesting : should allow user to get 20% for second month' , async () => {
		await saleInstance.setBlockTime(date_phase1_start , {from: owner});
		await saleInstance.sendTransaction({from: accounts[1] , value: 1E18});
		var balance = await tokenInstance.balanceOf.call(accounts[1]);
		await tokenInstance.transfer(communityTokenVestingInstance.address , balance , {from: accounts[1]});
		await saleInstance.setBlockTime(0 , {from: owner});

		await communityTokenVestingInstance.setBlockTime(date_token_vesting_start + month + day , {from : owner});

		var communityTokenVestingWallet = await communityTokenVestingInstance.wallet.call();
		var startingAt = await communityTokenVestingInstance.startingAt.call();
		
		var communityBalanceBefore = await getTokenBalance(communityTokenVestingInstance.address);
		var communityTokenVestingWalletBalanceBefore = await getTokenBalance(communityTokenVestingWallet);

		await communityTokenVestingInstance.pay(20 , {from: owner});	
		
		var communityBalanceAfter = await getTokenBalance(communityTokenVestingInstance.address);
		var communityTokenVestingWalletBalanceAfter = await getTokenBalance(communityTokenVestingWallet);

		assert.equal(communityBalanceAfter.toNumber(), communityBalanceBefore.toNumber() - (communityBalanceBefore.toNumber() * 20 / 100), 'contract balance should be reduced by 20%');
		assert.equal(communityTokenVestingWalletBalanceAfter.toNumber(), communityTokenVestingWalletBalanceBefore.toNumber() + (communityBalanceBefore.toNumber() * 20 / 100), 'wallet balance should be increased by 20%');

		await communityTokenVestingInstance.setBlockTime(0 , {from : owner});
	});

	it('token vesting : should allow user to get 20% for second month only once' , async () => {
		await saleInstance.setBlockTime(date_phase1_start , {from: owner});
		await saleInstance.sendTransaction({from: accounts[1] , value: 1E18});
		var balance = await tokenInstance.balanceOf.call(accounts[1]);
		await tokenInstance.transfer(communityTokenVestingInstance.address , balance , {from: accounts[1]});
		await saleInstance.setBlockTime(0 , {from: owner});

		await communityTokenVestingInstance.setBlockTime(date_token_vesting_start + month + day , {from : owner});

		var communityTokenVestingWallet = await communityTokenVestingInstance.wallet.call();
		var startingAt = await communityTokenVestingInstance.startingAt.call();
		
		var communityBalanceBefore = await getTokenBalance(communityTokenVestingInstance.address);
		var communityTokenVestingWalletBalanceBefore = await getTokenBalance(communityTokenVestingWallet);

		await communityTokenVestingInstance.pay(20 , {from: owner});	
		
		var communityBalanceAfter = await getTokenBalance(communityTokenVestingInstance.address);
		var communityTokenVestingWalletBalanceAfter = await getTokenBalance(communityTokenVestingWallet);

		assert.equal(communityBalanceAfter.toNumber(), communityBalanceBefore.toNumber() - (communityBalanceBefore.toNumber() * 20 / 100), 'contract balance should be reduced by 20%');
		assert.equal(communityTokenVestingWalletBalanceAfter.toNumber(), communityTokenVestingWalletBalanceBefore.toNumber() + (communityBalanceBefore.toNumber() * 20 / 100), 'wallet balance should be increased by 20%');

		var communityBalanceBefore = await getTokenBalance(communityTokenVestingInstance.address);
		var communityTokenVestingWalletBalanceBefore = await getTokenBalance(communityTokenVestingWallet);

		assert_throw(communityTokenVestingInstance.pay(20 , {from: owner}));	
		
		var communityBalanceAfter = await getTokenBalance(communityTokenVestingInstance.address);
		var communityTokenVestingWalletBalanceAfter = await getTokenBalance(communityTokenVestingWallet);

		assert.equal(communityBalanceAfter.toNumber(), communityBalanceBefore.toNumber(), 'contract balance should not be reduced by 20%');
		assert.equal(communityTokenVestingWalletBalanceAfter.toNumber(), communityTokenVestingWalletBalanceBefore.toNumber(), 'wallet balance should not be increased by 20%');

		await communityTokenVestingInstance.setBlockTime(0 , {from : owner});
	});

	it('token vesting : should allow user to get 100% for last month' , async () => {
		await saleInstance.setBlockTime(date_phase1_start , {from: owner});
		await saleInstance.sendTransaction({from: accounts[1] , value: 1E18});
		var balance = await tokenInstance.balanceOf.call(accounts[1]);
		await tokenInstance.transfer(communityTokenVestingInstance.address , balance , {from: accounts[1]});
		await saleInstance.setBlockTime(0 , {from: owner});

		await communityTokenVestingInstance.setBlockTime(date_token_vesting_start + (month * 17) + day , {from : owner});

		var communityTokenVestingWallet = await communityTokenVestingInstance.wallet.call();
		var startingAt = await communityTokenVestingInstance.startingAt.call();
		
		var communityBalanceBefore = await getTokenBalance(communityTokenVestingInstance.address);
		var communityTokenVestingWalletBalanceBefore = await getTokenBalance(communityTokenVestingWallet);

		await communityTokenVestingInstance.pay(100 , {from: owner});	
		
		var communityBalanceAfter = await getTokenBalance(communityTokenVestingInstance.address);
		var communityTokenVestingWalletBalanceAfter = await getTokenBalance(communityTokenVestingWallet);

		assert.equal(communityBalanceAfter.toNumber(), communityBalanceBefore.toNumber() - (communityBalanceBefore.toNumber()), 'contract balance should be reduced by 100%');
		assert.equal(communityTokenVestingWalletBalanceAfter.toNumber(), communityTokenVestingWalletBalanceBefore.toNumber() + (communityBalanceBefore.toNumber()), 'wallet balance should be increased by 100%');

		await communityTokenVestingInstance.setBlockTime(0 , {from : owner});
	});

	it('token vesting : should allow user to get 100% for last month only once' , async () => {
		await saleInstance.setBlockTime(date_phase1_start , {from: owner});
		await saleInstance.sendTransaction({from: accounts[1] , value: 1E18});
		var balance = await tokenInstance.balanceOf.call(accounts[1]);
		await tokenInstance.transfer(communityTokenVestingInstance.address , balance , {from: accounts[1]});
		await saleInstance.setBlockTime(0 , {from: owner});

		await communityTokenVestingInstance.setBlockTime(date_token_vesting_start + (month * 17) + day , {from : owner});

		var communityTokenVestingWallet = await communityTokenVestingInstance.wallet.call();
		var startingAt = await communityTokenVestingInstance.startingAt.call();
		
		var communityBalanceBefore = await getTokenBalance(communityTokenVestingInstance.address);
		var communityTokenVestingWalletBalanceBefore = await getTokenBalance(communityTokenVestingWallet);

		await communityTokenVestingInstance.pay(100 , {from: owner});	
		
		var communityBalanceAfter = await getTokenBalance(communityTokenVestingInstance.address);
		var communityTokenVestingWalletBalanceAfter = await getTokenBalance(communityTokenVestingWallet);

		assert.equal(communityBalanceAfter.toNumber(), communityBalanceBefore.toNumber() - (communityBalanceBefore.toNumber()), 'contract balance should be reduced by 100%');
		assert.equal(communityTokenVestingWalletBalanceAfter.toNumber(), communityTokenVestingWalletBalanceBefore.toNumber() + (communityBalanceBefore.toNumber()), 'wallet balance should be increased by 100%');

		var communityBalanceBefore = await getTokenBalance(communityTokenVestingInstance.address);
		var communityTokenVestingWalletBalanceBefore = await getTokenBalance(communityTokenVestingWallet);

		assert_throw(communityTokenVestingInstance.pay(100 , {from: owner}));	
		
		var communityBalanceAfter = await getTokenBalance(communityTokenVestingInstance.address);
		var communityTokenVestingWalletBalanceAfter = await getTokenBalance(communityTokenVestingWallet);

		assert.equal(communityBalanceAfter.toNumber(), communityBalanceBefore.toNumber(), 'contract balance should not be reduced by 100%');
		assert.equal(communityTokenVestingWalletBalanceAfter.toNumber(), communityTokenVestingWalletBalanceBefore.toNumber(), 'wallet balance should not be increased by 100%');

		await communityTokenVestingInstance.setBlockTime(0 , {from : owner});
	});

	it('token vesting : should allow admin to get full after timeout' , async () => {
		await saleInstance.setBlockTime(date_phase1_start , {from: owner});
		await saleInstance.sendTransaction({from: accounts[1] , value: 1E18});
		var balance = await tokenInstance.balanceOf.call(accounts[1]);
		await tokenInstance.transfer(communityTokenVestingInstance.address , balance , {from: accounts[1]});
		await saleInstance.setBlockTime(0 , {from: owner});
		
		var timeout = await communityTokenVestingInstance.contractTimeout.call();
		await communityTokenVestingInstance.setBlockTime(timeout , {from : owner});

		var communityBalanceBefore = await getTokenBalance(communityTokenVestingInstance.address);
		var ownerBalanceBefore = await getTokenBalance(owner);

		await communityTokenVestingInstance.withdraw({from: owner});	

		var communityBalanceAfter = await getTokenBalance(communityTokenVestingInstance.address);
		var ownerBalanceAfter = await getTokenBalance(owner);

		assert.equal(communityBalanceAfter.toNumber(), 0, 'contract balance should be reduced by 100%');
		assert.equal(ownerBalanceAfter.toNumber() , ownerBalanceBefore.toNumber() + communityBalanceBefore.toNumber(), 'wallet balance should be increased by 100%');

		// console.log(communityBalanceBefore.toNumber() , communityBalanceAfter.toNumber());
		// console.log(ownerBalanceBefore.toNumber() , ownerBalanceAfter.toNumber());

		await communityTokenVestingInstance.setBlockTime(0 , {from : owner});
	});

	it('token vesting : should not allow admin to get full before timeout' , async () => {
		await saleInstance.setBlockTime(date_phase1_start , {from: owner});
		await saleInstance.sendTransaction({from: accounts[1] , value: 1E18});
		var balance = await tokenInstance.balanceOf.call(accounts[1]);
		await tokenInstance.transfer(communityTokenVestingInstance.address , balance , {from: accounts[1]});
		await saleInstance.setBlockTime(0 , {from: owner});
		
		var startingAt = await communityTokenVestingInstance.startingAt.call();
		await communityTokenVestingInstance.setBlockTime(startingAt , {from : owner});

		var communityBalanceBefore = await getTokenBalance(communityTokenVestingInstance.address);
		var ownerBalanceBefore = await getTokenBalance(owner);

		assert_throw(communityTokenVestingInstance.withdraw({from: owner}));	

		var communityBalanceAfter = await getTokenBalance(communityTokenVestingInstance.address);
		var ownerBalanceAfter = await getTokenBalance(owner);

		assert.equal(communityBalanceAfter.toNumber(), communityBalanceBefore.toNumber(), 'contract balance should not be reduced by 100%');
		assert.equal(ownerBalanceAfter.toNumber(), ownerBalanceBefore.toNumber(), 'wallet balance should not be increased by 100%');

		// console.log(communityBalanceBefore.toNumber() , communityBalanceAfter.toNumber());
		// console.log(ownerBalanceBefore.toNumber() , ownerBalanceAfter.toNumber());

		await communityTokenVestingInstance.setBlockTime(0 , {from : owner});
	});
});
