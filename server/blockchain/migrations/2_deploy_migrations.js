var Gitcoin = artifacts.require("Gitcoin");

module.exports = function(deployer) {
    deployer.deploy(Gitcoin);
};