# Mute System Audio

from pycaw.pycaw import AudioUtilities

def mute_audio():
    """
    Mutes audio
    """
    device = AudioUtilities.GetSpeakers()
    volume = device.EndpointVolume

    is_muted = volume.GetMute()

    if is_muted:
        volume.SetMute(0, None)
    else:
        volume.SetMute(1, None)
    print(volume.GetMasterVolumeLevel())
    return volume

if __name__ == "__main__":
    mute_audio()
