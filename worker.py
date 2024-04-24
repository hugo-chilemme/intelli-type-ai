import pygetwindow as gw
from pywinauto import Desktop
import time

def search_text_in_children(element, text):
	# Vérifier si le texte est présent dans le titre de l'élément
	if element.window_text():
		print(f"Texte trouvé dans l'élément : {element.window_text()}")
		print(f"\tClasse de l'élément : {element._element_info}")

	# Parcourir tous les enfants de l'élément
	for child in element.children():
		# Appeler récursivement la fonction pour chaque enfant
		search_text_in_children(child, text)


try:
    while True:
        time.sleep(2)
        # Spécifier le titre de la fenêtre
        window_title = gw.getActiveWindow().title

        # Se connecter au bureau
        desktop = Desktop(backend="uia")

        # Trouver la fenêtre par titre
        window = desktop.window(title=window_title)

        # Rechercher le texte dans les enfants de manière récursive
        search_text_in_children(window, "votre_texte")

        # Délai d'une seconde

except KeyboardInterrupt:
    print("Interruption de la boucle.")
