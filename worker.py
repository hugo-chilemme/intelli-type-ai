import pygetwindow as gw
import pyperclip
import pyautogui 
import time

# Get the active window
active_window = gw.getActiveWindow()

# Assuming the text input field is currently focused, you can get the current input
def get_current_input():
	try:

		old_clipboard = pyperclip.paste()
		pyperclip.copy('')  # Clear the clipboard
		pyautogui.hotkey('ctrl', 'c')  # Copy the selected text to clipboard
		current_input = pyperclip.paste()  # Retrieve the text from 
		pyperclip.copy(old_clipboard)  # Restore the clipboard
	except Exception as e:
		current_input = ""
	return current_input


try:
	# Get the current input from the active element
	current_input = get_current_input()
	print(current_input)

except Exception as e:
	pass
