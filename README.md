# St Valentin Marie — partager le site

Options rapides pour obtenir un lien public que ta copine pourra ouvrir :

1) GitHub Pages (recommandé, gratuit, lien permanent)
- Crée un dépôt sur GitHub et pousse tout le dossier (index.html, style.css, script.js, images...).
- Dans les settings du repo → Pages → Source → Branch `main` (ou `master`) / root → Save.
- Le site sera disponible en quelques minutes à https://TONUTILISATEUR.github.io/NOM-DU-REPO

2) Local (rapide) + LocalTunnel (lien temporaire)
- Ouvre un terminal dans ce dossier.
- Démarre un serveur local (ex. Python) :
  cd "c:\Users\moham\Documents\St Valentin Marie"
  python -m http.server 8000
- Dans un autre terminal, installe/exécute localtunnel (ou via npx) :
  npx localtunnel --port 8000
- localtunnel renverra une URL publique (ex. https://abcd.loca.lt) que tu pourras partager.

3) Local + ngrok (plus robuste, nécessite compte gratuit)
- Télécharge et connecte ngrok (https://ngrok.com/).
- Démarre le serveur local :
  python -m http.server 8000
- Dans un autre terminal :
  ngrok http 8000
- ngrok fournit une URL publique (https) à partager.

Script Windows fourni (local + localtunnel)
- Double-clique sur `share.bat` (ou exécute-le depuis PowerShell). Il démarre un serveur Python sur le port 8000 et lance localtunnel. Il affichera l'URL à partager.

## Publier rapidement via GitHub Pages (depuis Visual Studio)

1. Crée un dépôt sur GitHub ou connecte ce projet à un dépôt existant.
2. Dans Visual Studio : commit tes changements puis "Push" (Synchroniser / Push vers la remote). Assure-toi de pousser sur la branche `main`.
3. Le workflow GitHub Actions (fichier .github/workflows/deploy.yml) déploiera automatiquement le contenu vers la branche `gh-pages`.
4. Après quelques minutes, ton site sera accessible à :
   https://TONUTILISATEUR.github.io/NOM-DU-REPO/
   (remplace TONUTILISATEUR et NOM-DU-REPO par les tiens)

Remarques :
- Si tu préfères, active GitHub Pages dans les Settings du repo et sélectionne la branche `gh-pages` → `/ (root)`.
- Si tu veux un nom de domaine personnalisé, ajoute un fichier CNAME dans la racine du dépôt (ou configure via Settings).
- Les tunnels (ngrok/localtunnel) restent une alternative temporaire si tu ne veux pas pousser le repo.

Remarques
- Si tu utilises GitHub Pages, supprime/ignore les fichiers volumineux (images) si nécessaire ou pousse tout via Git LFS.
- Les tunnels (localtunnel/ngrok) donnent des liens temporaires qui cessent de fonctionner quand tu arrêtes le script.
