from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.utils import timezone
from rest_framework import serializers, validators
from rest_framework.exceptions import ValidationError

from web3 import Web3, HTTPProvider
import json

from decimal import Decimal

from block.models import BlockEvent, DevicePing

from authentication.models import authenticate_user, Profile

class BlockedSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('blocked',)

    def update(self, instance, validated_data):
        blocked = validated_data.get('blocked')
        user = instance.user

        if blocked:
            BlockEvent.objects.create(user=user, start_time=timezone.now())
        else:
            block_event = BlockEvent.objects.filter(user=user, end_time__isnull=True).last()
            if block_event:
                block_event.end_time = timezone.now()
                rewards = calculate_rewards(user)
                block_event.rewards = rewards

                block_event.save()

                instance.money += rewards
                instance.save()

                DevicePing.objects.filter(user=user).update(valid_ping_count=0)

        instance.blocked = blocked
        instance.save()
        return instance

def calculate_rewards(user):
    device_pings = DevicePing.objects.filter(user=user)

    total_valid_ping_count = sum(dp.valid_ping_count for dp in device_pings)

    money = Decimal(total_valid_ping_count)

    sender_address = "0x435D2cceE0f17E1E264766A80141372C5294d5A0"
    
    # truffle development blockchain address
    blockchain_address = 'http://127.0.0.1:7545'

    # Client instance to interact with the blockchain
    web3 = Web3(HTTPProvider(blockchain_address))

    # Set the default account (so we don't need to set the "from" for every transaction call)
    web3.eth.defaultAccount = web3.eth.accounts[0]

    # Path to the compiled contract JSON file
    compiled_contract_path = '../blockchain/build/contracts/Gitcoin.json'
    
    # Deployed contract address (see `migrate` command output: `contract address`)
    deployed_contract_address = '0x49a2B0243bD665c9e87D8a9cD89B90Cef0D895a1'

    with open(compiled_contract_path) as file:
        contract_json = json.load(file)  # load contract info as JSON
        contract_abi = contract_json['abi']  # fetch contract's abi - necessary to call its functions

    # Fetch deployed contract reference
    sender_private_key = "0x2defc4e471da23cad96e42ba5ff94827e6f0e262d3db6e46beb4e71cdee9d126"

    nonce = web3.eth.get_transaction_count(sender_address)

    tx = {
        'nonce': nonce,
        'to': user.profile.public_key,
        'gas': 2000000,  # Adjust gas as needed
        'gasPrice': web3.to_wei('30', 'gwei'),  # Adjust gas price as needed
        'value': web3.to_wei(money, 'ether'),
    }


    signed_tx = web3.eth.account.sign_transaction(tx, sender_private_key)


    tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)

    print(f"Transaction Hash: {tx_hash.hex()}")

    return money


class BlockEventSerializer(serializers.ModelSerializer):

    class Meta:
        model = BlockEvent
        fields = '__all__'

class UserPingSerializer(serializers.ModelSerializer):

    class Meta:
        model = DevicePing
        fields = '__all__'

class DevicePingSerializer(serializers.ModelSerializer):

    class Meta:
        model = DevicePing
        fields = '__all__'
