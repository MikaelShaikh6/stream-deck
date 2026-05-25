# Gets Device IPv4

import subprocess

def getIp():
    result = str(subprocess.run(["ipconfig"], capture_output=True, text=True, check=False))
    result = result.strip().split("\r\n")
    result = result[0]
    index = result.find("IPv4")

    if index == -1:
        print("Error, no iPv4 found")

    result = result[index:]
    index = result.find("\\n")
    if index == -1:
        print("No \\n found, Error")

    result = result[:index]
    result = result[::-1]
    result = result[:result.find(" ")]
    result = result[::-1]

    print(result)

if __name__ == "__main__":
    getIp()
