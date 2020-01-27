from pytradfri.util import load_json, save_json
from pytradfri.api.libcoap_api import APIFactory
from pytradfri.error import PytradfriError

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
parser.add_argument("psk", metavar="PSK", type=str,
                    help="PSK for setting the psk name")
args = parser.parse_args()

if args.host not in load_json(CONFIG_FILE) and args.key is None:
    print("Please provide the 'Security Code' on the back of your "
          "Tradfri gateway:", end=" ")
    key = input().strip()
    if len(key) != 16:
        raise PytradfriError("Invalid 'Security Code' provided.")
    else:
        args.key = key

if args.psk is None:
    print("Provide a psk name:", end=" ")
    psk = input().strip()
    args.psk = psk

conf = load_json(CONFIG_FILE)

try:
    identity = conf[args.host].get('identity')
    psk = conf[args.host].get('key')
    print("There already is a conf")
    api_factory = APIFactory(host=args.host, psk_id=identity, psk=psk)
except KeyError:
    identity = uuid.uuid4().hex
    api_factory = APIFactory(host=args.host, psk_id=identity, psk=args.psk)

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
