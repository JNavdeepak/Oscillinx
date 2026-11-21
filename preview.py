from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import webbrowser

root = Path(__file__).resolve().parent
class Preview(SimpleHTTPRequestHandler):
    def translate_path(self, url):
        clean_url = url.split('?', 1)[0]
        if clean_url == '/downloads/Oscillinx.exe':
            return str(root / 'public/downloads/Oscillinx.exe')
        if clean_url == '/downloads/Oscillinx.apk':
            return str(root / 'public/downloads/Oscillinx.apk')
        return super().translate_path(url)

server = ThreadingHTTPServer(('127.0.0.1', 0), partial(Preview, directory=root / 'out'))
address = 'http://127.0.0.1:' + str(server.server_port)
print('OSCILLINX preview at', address, flush=True)
webbrowser.open(address)
try:
    server.serve_forever()
except KeyboardInterrupt:
    server.server_close()
