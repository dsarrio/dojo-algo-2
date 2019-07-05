# Exercice 3

Vous devez écrire une fonction prenant en paramètre une matrice N*N et retournant le plus long chemin (peut importe la cellule de départ). Un chemin est constitué de chiffres croissants avec une différence de 1.
On peut se déplacer uniquement sur 4 directions depuis une cellule: haut, bas, gauche, droite.

Example:
```javascript
var mat = [[1, 2, 9]
           [5, 3, 8]
           [4, 6, 7]];

longuestPath(3, mat) => 4 // 6-7-8-9
```

