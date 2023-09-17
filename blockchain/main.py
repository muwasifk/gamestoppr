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
deployed_contract_address = '0x3fD8fFeB096cD9b1ac52Bf97Da97802D34b5f593'

with open(compiled_contract_path) as file:
    contract_json = json.load(file)  # load contract info as JSON
    contract_abi = contract_json['abi']  # fetch contract's abi - necessary to call its functions

# Fetch deployed contract reference
contract = web3.eth.contract(address=deployed_contract_address, abi=contract_abi)

balance = contract.functions.balanceOf(public_key).call()

# Call contract function (this is not persisted to the blockchain)
token_name = contract.functions.balanceOf(web3.eth.accounts[2]).call()

print(token_name)
sender_address = "0x435D2cceE0f17E1E264766A80141372C5294d5A0"
receiver_address = "0x0911a3E390b92b1C0fB1BeA21550497fEc6c2FD7"

new_account = web3.eth.account.create() 

print(new_account.address)
new_account._private_key.hex()
# sender_private_key = "0x2defc4e471da23cad96e42ba5ff94827e6f0e262d3db6e46beb4e71cdee9d126"

# nonce = web3.eth.get_transaction_count(sender_address)

# tx_data = contract.functions.transfer(sender_address, 5000)

# tx = {
#     'nonce': nonce,
#     'to': receiver_address,
#     'gas': 2000000,  # Adjust gas as needed
#     'gasPrice': web3.to_wei('30', 'gwei'),  # Adjust gas price as needed
#     'value': web3.to_wei(1, 'ether'),
# }


# signed_tx = web3.eth.account.sign_transaction(tx, sender_private_key)


# tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)

# print(f"Transaction Hash: {tx_hash.hex()}")