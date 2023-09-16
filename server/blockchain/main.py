import json
from web3 import Web3, HTTPProvider

# truffle development blockchain address
blockchain_address = 'http://127.0.0.1:7545'
# Client instance to interact with the blockchain
web3 = Web3(HTTPProvider(blockchain_address))
# Set the default account (so we don't need to set the "from" for every transaction call)
web3.eth.defaultAccount = web3.eth.accounts[0]
print(web3.eth.defaultAccount)

# Path to the compiled contract JSON file
compiled_contract_path = 'build/contracts/Gitcoin.json'
# Deployed contract address (see `migrate` command output: `contract address`)
deployed_contract_address = '0xB8d9e2d66408B3B0230c4A5678cB323050EbA30D'

with open(compiled_contract_path) as file:
    contract_json = json.load(file)  # load contract info as JSON
    contract_abi = contract_json['abi']  # fetch contract's abi - necessary to call its functions

# Fetch deployed contract reference
contract = web3.eth.contract(address=deployed_contract_address, abi=contract_abi)

# Call contract function (this is not persisted to the blockchain)
token_name = contract.functions.balanceOf(web3.eth.accounts[2]).call()
print(token_name)
sender_address = "0x1335cE4786b0e84d48d41f8F6ae2e3b15B63A5cd"
receiver_address = "0x50a55C9feCeE4d789d45ff30fbCa9A8ed6a5a65D"



sender_private_key = "0x4486169bd24ab143d4cbd577cc1932c7ef55594d812744a907d02eac8ea7d262"

nonce = web3.eth.get_transaction_count(sender_address)

tx_data = contract.functions.transfer(sender_address, 5000)

tx = {
    'nonce': nonce,
    'to': receiver_address,
    'gas': 2000000,  # Adjust gas as needed
    'gasPrice': web3.to_wei('30', 'gwei'),  # Adjust gas price as needed
    'value': web3.to_wei(1, 'ether'),
}


signed_tx = web3.eth.account.sign_transaction(tx, sender_private_key)


tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)

print(f"Transaction Hash: {tx_hash.hex()}")