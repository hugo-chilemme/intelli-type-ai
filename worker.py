import keyboard
import asyncio
import websockets

async def send_data_to_ws(data):
	async with websockets.connect('ws://localhost:8623') as websocket:
		await websocket.send(str(data))

def on_key_press(event):
	print('Touche pressée:', event.name)
	asyncio.run(send_data_to_ws(event.name))

keyboard.on_press(on_key_press)

# To keep the program running
keyboard.wait('esc')
