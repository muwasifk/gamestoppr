import sys
import threading
import time

from ui import LoginApp
from check_server import check_server
from block import game_blocker

stop_event = threading.Event()

def UI(stop_event):
    app = LoginApp()
    app.mainloop()
    print("UI Exited")
    stop_event.set()

UIThread = threading.Thread(target=UI, args=(stop_event,))
checkServerThread = threading.Thread(target=check_server, args=(stop_event,))
#blockThread = threading.Thread(target=game_blocker, args=(stop_event,))

UIThread.start()
checkServerThread.start()
#blockThread.start()

UIThread.join()
checkServerThread.join()
#blockThread.join()