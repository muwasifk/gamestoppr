import os
import time
import subprocess
import psutil
import cohere

def game_blocker(stop_event):
    while not stop_event.is_set():
        # get list of all running processes
        all_processes = [psutil.Process(pid) for pid in psutil.pids()]

        co = cohere.Client('CF7vW6fYsPurYDy2J1fvRov2O0iupNb0zjraIPUC')

        with open("apps.txt", "r+") as f_app_list:
            app_list = f_app_list.read().splitlines()
            for i in range(len(app_list)):
                app_list[i] = app_list[i].split(",")

            apps = dict(app_list)

            # print various information about each process
            for process in all_processes:
                try:
                    if "\\Windows\\" not in process.exe() and process.name() not in apps:
                        response = co.generate(
                            prompt = f"If {process.name()} is a game, return 1. Else, return 0.",
                        )
                        apps[process.name()] = response[0].text[-1]
                        f_app_list.write(f"\n{process.name()},{response[0].text[-1]}")

                        #print(f"PID: {p.pid}, Name: {p.name()}, Exe: {p.exe()}, Memory Info: {p.memory_info()}, CPU percent: {p.cpu_percent()}")
                except (psutil.NoSuchProcess, psutil.AccessDenied):
                    pass

            for app in apps:
                if apps[app] == 1:
                    try:
                        print(f"{app} is a game! Please close it to focus up!")
                        # os.system(f'taskkill /F /IM {app}')
                    except Exception as e:
                        print(e)
        time.sleep(120)