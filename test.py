# import sys
# import os
# folder = os.path.dirname(os.path.abspath(__file__))  # noqa
# sys.path.insert(0, os.path.normpath("%s/.." % folder))  # noqa

from pytradfri.gateway import Gateway
from pytradfri.api.libcoap_api import APIFactory
from pytradfri.error import PytradfriError
from pytradfri.util import load_json, save_json
from pytradfri.device import LightControl, Device
from pytradfri.command import Command

import uuid
import argparse
import threading
import time

CONFIG_FILE = 'tradfri_standalone_psk.conf'

parser = argparse.ArgumentParser()
parser.add_argument('host', metavar='IP', type=str,
                    help='IP Address of your Tradfri gateway')
parser.add_argument('-K', '--key', dest='key', required=False,
                    help='Security code found on your Tradfri gateway')
args = parser.parse_args()

if args.host not in load_json(CONFIG_FILE) and args.key is None:
    print("Please provide the 'Security Code' on the back of your "
          "Tradfri gateway:", end=" ")
    key = input().strip()
    if len(key) != 16:
        raise PytradfriError("Invalid 'Security Code' provided.")
    else:
        args.key = key

conf = load_json(CONFIG_FILE)

try:
    identity = conf[args.host].get('identity')
    psk = conf[args.host].get('key')
    api_factory = APIFactory(host=args.host, psk_id=identity, psk=psk)
except KeyError:
    identity = uuid.uuid4().hex
    api_factory = APIFactory(host=args.host, psk_id=identity)

    try:
        psk = api_factory.generate_psk(args.key)
        print('Generated PSK: ', psk)

        conf[args.host] = {'identity': identity,
                           'key': psk}
        save_json(CONFIG_FILE, conf)
    except AttributeError:
        raise PytradfriError("Please provide the 'Security Code' on the "
                             "back of your Tradfri gateway using the "
                             "-K flag.")

api = api_factory.request

gateway = Gateway()
devices_cmd = gateway.get_devices()
commands = api(devices_cmd)
devices: [Device] = api(commands)

device: Device = devices[0]
light_control: LightControl = devices[1].light_control
print(light_control)
