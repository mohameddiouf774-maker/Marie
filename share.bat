@echo off
REM Démarre un serveur HTTP local (Python) et expose le port 8000 via localtunnel.
REM Usage:
REM   Double-clique sur ce fichier, ou depuis CMD:
REM     share.bat            -> ouvre http://localhost:8000 et lance localtunnel (sans sous-domaine)
REM     share.bat monsite   -> lance localtunnel avec sous-domaine "monsite" et ouvre https://monsite.loca.lt

cd /d "%~dp0"

SET "SUB=%1"
SET "PYCMD="

REM Détecter Python (python, py, python3)
where python >nul 2>&1
if errorlevel 1 (
  where py >nul 2>&1
  if errorlevel 1 (
    where python3 >nul 2>&1
    if errorlevel 1 (
      echo Python n'est pas trouve sur cette machine.
      echo Installe Python (https://python.org) ou lance un serveur alternatif (ex: npx http-server).
      pause
      goto :EOF
    ) else set "PYCMD=python3"
  ) else set "PYCMD=py"
) else set "PYCMD=python"

echo Utilisation de %PYCMD% pour demarrer le serveur.

REM Lancer le serveur Python dans une nouvelle fenêtre (la fenetre restera ouverte)
start "Server" cmd /k "%PYCMD% -m http.server 8000"

echo Serveur local demarre sur http://localhost:8000
timeout /t 1 /nobreak >nul

REM Ouvrir la page locale dans le navigateur
start "" "http://localhost:8000"

REM Préparer la commande localtunnel (si present)
where npx >nul 2>&1
if errorlevel 1 (
  echo Attention : npx (Node.js) n'est pas trouve. localtunnel ne peut pas etre lance automatiquement.
  echo Si tu veux un lien public, installe Node.js (https://nodejs.org) puis relance ce script ou utilise ngrok.
  echo Ou bien partage via GitHub Pages.
  echo.
  echo Le serveur local est demarre ; la page est ouverte dans le navigateur.
  pause
  goto :EOF
)

REM Construire option de sous-domaine si fourni
if not "%SUB%"=="" (
  set "SUBOPT=--subdomain %SUB%"
) else (
  set "SUBOPT="
)

REM Lancer localtunnel dans une nouvelle fenêtre (tu verras l'URL publique dans cette fenetre)
start "Tunnel" cmd /k "npx localtunnel --port 8000 %SUBOPT%"

REM Si un sous-domaine a ete fourni, ouvrir directement l'URL publique previsible
if not "%SUB%"=="" (
  timeout /t 2 /nobreak >nul
  start "" "https://%SUB%.loca.lt"
  echo Localtunnel demarre ; ouverture de https://%SUB%.loca.lt
) else (
  echo Localtunnel demarre ; verifie la fenetre 'Tunnel' pour recuperer l'URL publique a partager.
)

echo.
echo --- Instructions ---
echo - La fenetre "Server" contient le serveur HTTP (ne la fermez pas si vous souhaitez garder le site actif).
echo - La fenetre "Tunnel" affiche l'URL publique generee par localtunnel.
echo - Pour arreter : fermez les fenetres "Server" et "Tunnel".
echo.
pause

:EOF
