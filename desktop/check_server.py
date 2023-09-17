import time
import requests

from decouple import Config, RepositoryEnv

def check_server(stop_event):

    while not stop_event.is_set():

        client_env_config = Config(RepositoryEnv('.envClient'))
        server_env_config = Config(RepositoryEnv('.envServer'))
        if(client_env_config('TOKEN') != "None"):
            response = requests.post(server_env_config('CHECK'), headers={'Authorization': f"Token {client_env_config('TOKEN')}"}, data={"device_id": "test1"})
            print(response.content)

        time.sleep(10)