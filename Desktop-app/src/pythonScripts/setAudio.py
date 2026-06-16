# Set system volume to given parameter
# Volume wanted should be given on a scale of 0.0-1.0

import sys
from pycaw.pycaw import AudioUtilities

def setAudio():
    device = AudioUtilities.GetSpeakers()
    volume = device.EndpointVolume

    volume.SetMasterVolumeLevelScalar(float(sys.argv[1]), None)

if __name__ == "__main__":
    setAudio()
