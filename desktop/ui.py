import tkinter as tk
import requests
import pystray
import sys
from PIL import Image

from decouple import Config, RepositoryEnv

class LoginApp(tk.Tk):

    def __init__(self):
        super().__init__()
        self.protocol("WM_DELETE_WINDOW", self.on_closing)
        client_env_config = Config(RepositoryEnv('.envClient'))
        if client_env_config("TOKEN") == "None":
            self.build_login_form()
        else:
            self.build_logout_form()
        self.build_system_tray()

    def clear_window(self):
        for widget in self.winfo_children():
            widget.pack_forget()

    def build_login_form(self):
        self.clear_window()
        self.username_label = tk.Label(self, text="Username")
        self.username_entry = tk.Entry(self)
        self.password_label = tk.Label(self, text="Password")
        self.password_entry = tk.Entry(self, show="*")
        self.login_button = tk.Button(self, text="Login", command=self.login)
        self.username_label.pack()
        self.username_entry.pack()
        self.password_label.pack()
        self.password_entry.pack()
        self.login_button.pack()

    def build_logout_form(self):
        self.clear_window()
        self.logout_button = tk.Button(self, text="Log Out", command=self.logout)
        self.logout_button.pack()

    def build_system_tray(self):
        # Create an image for the system tray icon
        image = Image.open("G.png")
        menu = (pystray.MenuItem('Open', self.show), pystray.MenuItem('Exit', self.quit))
        self.icon = pystray.Icon("name", image, "GameStoppr", menu)
        self.icon.run()

    def show(self):
        self.icon.stop()
        self.deiconify()

    def on_closing(self):
        self.withdraw()
        self.build_system_tray()

    def quit(self):
        self.icon.stop()
        self.destroy()
        try:
            sys.exit()
        except:
            pass


    def login(self):
        username = self.username_entry.get()
        password = self.password_entry.get()

        server_env_config = Config(RepositoryEnv('.envServer'))

        response = requests.post(server_env_config('LOGIN'), data={'username': username, 'password': password})
        if response.status_code == 200:
            token = response.json()['token']
            with open('.envClient', 'w') as f:
                f.write(f'TOKEN={token}')
            self.build_logout_form()
        else:
            # login failed
            pass

    def logout(self):
        server_env_config = Config(RepositoryEnv('.envServer'))
        client_env_config = Config(RepositoryEnv('.envClient'))
        response = requests.post(server_env_config('LOGOUT'), headers={'Authorization': f"Token {client_env_config('TOKEN')}"})
        if response.status_code == 204:
            with open('.envClient', 'w') as f:
                f.write('TOKEN=None')
            self.build_login_form()
        else:
            pass