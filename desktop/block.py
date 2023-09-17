import os
import time
import subprocess
import psutil
import cohere
import requests
import json

from decouple import Config, RepositoryEnv
from check_server import check_server

def game_blocker(stop_event):
    while not stop_event.is_set():

        client_env_config = Config(RepositoryEnv('.envClient'))
        server_env_config = Config(RepositoryEnv('.envServer'))

        if(client_env_config('TOKEN') != "None"):
            response = requests.post(server_env_config('CHECK'), headers={'Authorization': f"Token {client_env_config('TOKEN')}"}, data={"device_id": "test1"})

            block = False
            try:
                decoded_content = response.content.decode('utf-8')
                parsed_content = json.loads(decoded_content)
                detail_value = parsed_content['detail']
                if detail_value == "User is not blocked":
                    print("unblocked games")
                    continue
            except:
                block = True
                print("Blocked games")
            
            if block:
                # get list of all running processes
                all_processes = []
                for pid in psutil.pids():
                    try:
                        process = psutil.Process(pid)
                        all_processes.append(process)
                    except (psutil.NoSuchProcess, psutil.AccessDenied):
                        continue

                with open("apps.txt", "r+") as f_app_list:
                    app_list = f_app_list.read().splitlines()
                    for i in range(len(app_list)):
                        app_list[i] = app_list[i].split(",")

                    apps = dict(app_list)

                    # print various information about each process
                    for process in all_processes:
                        try:
                            if "\\Windows\\" not in process.exe():
                                if process.name() not in apps:
                                    verdict = isgame(process)
                                    apps[process.name()] = verdict
                                    f_app_list.write(f"\n{process.name()},{verdict}")

                                if apps[process.name()] == "1":
                                    print(f"{process.name()} is a game! Please close it to focus up!")
                                    os.system(f'taskkill /F /IM {process.name()}')

                                # print(f"PID: {p.pid}, Name: {p.name()}, Exe: {p.exe()}, Memory Info: {p.memory_info()}, CPU percent: {p.cpu_percent()}")
                        except (psutil.NoSuchProcess, psutil.AccessDenied):
                            continue

            time.sleep(10)

def isgame(process):
    co = cohere.Client('iFOswps4U9XCDpfa148nUlZnrUHr3kqiqro8Reu3')

    tries = 1
    response = co.generate(
        prompt = f"If {process.exe()} is a file belonging to a game or if {process.name()} is a game file, return 1. Else, return 0.",
    )
    while (response[0].text[-1] != "0" and response[0].text[-1] != "1") and (tries <= 3):
        response = co.generate(
            prompt = f"If {process.exe()} is a file belonging to a game or if {process.name()} is a game file, return 1. Else, return 0.",
        )
        tries += 1
        print(tries)
    if (response[0].text[-1] == "0" or response[0].text[-1] == "1"):
        return response[0].text[-1]
    else:
        return "0"