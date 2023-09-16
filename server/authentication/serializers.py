import re

from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers, validators
from rest_framework.exceptions import ValidationError

from authentication.models import authenticate_user, Profile

import json
from web3 import Web3, HTTPProvider

def validate_username(value):
    if not re.match('^[a-zA-Z0-9]*$', value):
        raise ValidationError('Username can only contain alphanumeric characters.')


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {
            'username': {'validators': [validators.UniqueValidator(queryset=User.objects.all()), validate_username]},
            'email': {'validators': [validators.UniqueValidator(queryset=User.objects.all())]},
            'password': {'write_only': True, 'validators': [validate_password]},
        }


    def create(self, validated_data):
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


        user = User.objects.create_user(username=validated_data["username"],
                                        email=validated_data["email"],
                                        password=validated_data["password"])
        profile = Profile.objects.create(user=user)
        profile.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        return {"user": authenticate_user(username=data["username"], password=data["password"])}
