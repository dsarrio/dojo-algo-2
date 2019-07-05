# Exercice 1

Vous devez écrire une fonction prenant en paramètre deux chaines de charactères et retournant les indexes de début et fin de la plus petite sous-chaine du paramètre #1 contenant tous les charactères du paramètre #2.

Vous n'avez le droit qu'aux structures de données et de contrôle du language. Donc pas d'appels système, d'expression régulières ou autres fonctions avancées.

On recherche une implémentation la plus proche du O(n). Donc que le temps d'execution soit linéaire avec la taille de l'input.

Example:
```javascript
#     0000000000111111111122222
#     0123456789012345678901234
find("abcdeghijklmnopqrstuvwxyz", "cba") => [0,  2]
find("abcdeghijklmnopqrstuvwxyz", "rhk") => [6, 16]
find("01234596789", "699") => [6, 10]
```
