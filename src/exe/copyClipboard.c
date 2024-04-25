#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <windows.h>

// Function to get the handle of the active window
HWND getActiveWindow() {
    return GetForegroundWindow();
}

// Function to get the current input from the clipboard
char *get_current_input() {
    char *current_input = malloc(1024 * sizeof(char));  // Allocate memory for the clipboard text
    if (!current_input) return NULL;  // Memory allocation failed

    // Save current clipboard text
    if (OpenClipboard(NULL)) {
        HANDLE hClip = GetClipboardData(CF_TEXT);
        char *clipText = GlobalLock(hClip);
        strcpy(current_input, clipText ? clipText : "");
        GlobalUnlock(hClip);
        CloseClipboard();
    }

    // Copy selected text to clipboard using simulated Ctrl + C
    keybd_event(VK_CONTROL, 0, 0, 0);  // Ctrl key down
    keybd_event('C', 0, 0, 0);         // C key down
    keybd_event('C', 0, KEYEVENTF_KEYUP, 0);  // C key up
    keybd_event(VK_CONTROL, 0, KEYEVENTF_KEYUP, 0);  // Ctrl key up
    Sleep(100);  // Wait for the clipboard to update

    // Retrieve the new clipboard text
    if (OpenClipboard(NULL)) {
        HANDLE hNewClip = GetClipboardData(CF_TEXT);
        char *newClipText = GlobalLock(hNewClip);
        if (newClipText) {
            strcpy(current_input, newClipText);
        }
        GlobalUnlock(hNewClip);
        CloseClipboard();
    }

    return current_input;
}

int main() {
    HWND active_window = getActiveWindow();  // Get the active window

    char *current_input = get_current_input();  // Get current input text

    if (current_input) {
        printf("%s", current_input);
        free(current_input);
    } else {
        printf("(void) No input");
    }

    return 0;
}
