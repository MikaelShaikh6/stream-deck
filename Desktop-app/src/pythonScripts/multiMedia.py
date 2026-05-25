import sys
import keyboard

def multimedia():
    match sys.argv[1]:
        case "play/pause":
            keyboard.send("play/pause media")
        case "next":
            keyboard.send("next track")
        case "previous":
            keyboard.send("previous track")
        case _:
            print("Given arg is not correct")

if __name__ == "__main__":
    multimedia()