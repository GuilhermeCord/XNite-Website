---
title: 07. Préparer les outils vidéo
hide:
- navigation
- toc
- footer
template: guide.html
---

<div class="xn-tutorial" data-guide-tutorial data-prev-image="Image précédente" data-next-image="Image suivante →" data-image-label="Image" data-of-label="sur" markdown="1">
<nav class="xn-guide-stages" aria-label="Guide d’installation"><a href="../01-download-playnite/"><span>1</span>Préparer Playnite</a><a href="../04-playnite-settings/" aria-current="step"><span>2</span>Configurer les intégrations</a><a href="../14-download-xnite/"><span>3</span>Installer et activer</a><a href="../19-first-launch/"><span>4</span>Premier démarrage</a></nav>
<div class="xn-guide-progress"><span>Étape 7 sur 19</span><progress value="7" max="19" aria-label="Étape 7 sur 19"></progress></div>
<div class="xn-tutorial__heading"><h1 tabindex="-1">Préparer les outils vidéo</h1><label class="xn-step-picker">Toutes les étapes<select data-guide-step-select aria-label="Toutes les étapes"><option value="../01-download-playnite/">01. Télécharger Playnite</option><option value="../02-install-playnite/">02. Installer Playnite</option><option value="../03-add-ons/">03. Installer les intégrations</option><option value="../04-playnite-settings/">04. Vérifier les paramètres de Playnite</option><option value="../05-metadata/">05. Configurer les images et métadonnées</option><option value="../06-achievements/">06. Connecter Playnite Achievements</option><option value="../07-video-tools/" selected>07. Préparer les outils vidéo</option><option value="../10-music-profile/">08. Configurer la musique</option><option value="../14-download-xnite/">09. Télécharger X-Nite</option><option value="../15-installation-files/">10. Identifier les deux paquets</option><option value="../16-install-extension/">11. Installer X-Nite Profile System</option><option value="../17-install-theme/">12. Installer le thème Fullscreen</option><option value="../18-activate-theme/">13. Activer X-Nite et terminer</option><option value="../19-first-launch/">14. Préparer le premier démarrage</option><option value="../20-create-profile/">15. Créer votre premier profil</option><option value="../21-profile-avatar/">16. Choisir votre avatar</option><option value="../22-profile-color/">17. Choisir votre couleur</option><option value="../23-profile-background/">18. Choisir le fond principal</option><option value="../24-finish-profile/">19. Terminer la configuration</option></select></label></div>
<div class="xn-tutorial__panel" markdown="1">
<div class="xn-tutorial__visual">
<div class="xn-guide-gallery">
<figure data-guide-frame data-guide-label="Téléchargements"><a class="xn-guide-image" href="../../../assets/installation/07-video-tools-01.png" data-guide-image data-close-label="Fermer l’image" aria-label="Téléchargements"><img src="../../../assets/installation/07-video-tools-01.png" alt="Téléchargements" loading="eager" decoding="async"></a></figure>
<figure data-guide-frame data-guide-label="Extraire les outils"><a class="xn-guide-image" href="../../../assets/installation/07-video-tools-02.png" data-guide-image data-close-label="Fermer l’image" aria-label="Extraire les outils"><img src="../../../assets/installation/07-video-tools-02.png" alt="Extraire les outils" loading="eager" decoding="async"></a></figure>
<figure data-guide-frame data-guide-label="Ouvrir Extra Metadata Loader" data-guide-access="Dans Playnite Desktop, ouvrez Add-ons &gt; Extension settings &gt; Generic &gt; Extra Metadata Loader."><a class="xn-guide-image" href="../../../assets/installation/access-extra-metadata.png" data-guide-image data-close-label="Fermer l’image" aria-label="Ouvrir Extra Metadata Loader"><img src="../../../assets/installation/access-extra-metadata.png" alt="Ouvrir Extra Metadata Loader" loading="eager" decoding="async"></a></figure>
<figure data-guide-frame data-guide-label="Configurer les vidéos"><a class="xn-guide-image" href="../../../assets/installation/07-video-tools-03.png" data-guide-image data-close-label="Fermer l’image" aria-label="Configurer les vidéos"><img src="../../../assets/installation/07-video-tools-03.png" alt="Configurer les vidéos" loading="eager" decoding="async"></a></figure>
<figure data-guide-frame data-guide-label="Logos et clé SteamGridDB"><a class="xn-guide-image" href="../../../assets/installation/08-logos-steamgriddb.png" data-guide-image data-close-label="Fermer l’image" aria-label="Logos et clé SteamGridDB"><img src="../../../assets/installation/08-logos-steamgriddb.png" alt="Logos et clé SteamGridDB" loading="eager" decoding="async"></a></figure>
</div>
<div class="xn-tutorial__dots" data-guide-dots></div>
</div>
<div class="xn-tutorial__notes" tabindex="0" markdown="1">
<div data-guide-note-start="0" data-guide-note-end="3" markdown="1">

<span class="xn-guide-optional">Facultatif</span>

Téléchargez **yt-dlp** et **FFmpeg** depuis les extras affichés ou leurs sources officielles : [yt-dlp](https://github.com/yt-dlp/yt-dlp/releases) et [FFmpeg](https://ffmpeg.org/download.html). Extrayez-les dans un dossier permanent. Dans `Extra Metadata Loader > Videos settings`, sélectionnez vos `yt-dlp.exe` et `ffmpeg.exe`, généralement dans `bin`. Ne recopiez pas les chemins de l’exemple. Testez une bande-annonce.

!!! success "Avant de continuer"
    Les deux chemins pointent vers des fichiers existants. Testez une bande-annonce.
</div>

<div data-guide-note-start="4" data-guide-note-end="4" markdown="1">

<span class="xn-guide-optional">Facultatif</span>

1. Dans `Extra Metadata Loader > Logos settings`, activez **Enable logos** et vérifiez la taille et l’alignement.
2. Choisissez **Get API Key**, connectez-vous avec **Login via Steam**, puis ouvrez **API > Create API Key** si vous n’avez pas encore de clé.
3. Collez la clé dans **SteamGridDB API Key** et enregistrez. Utilisez la même clé dans **SteamGridDB Metadata Provider** si nécessaire.

Gardez votre clé **SteamGridDB** privée ; elle est différente d’une clé API Web Steam.

!!! success "Avant de continuer"
    Enregistrez les paramètres et téléchargez le logo d’un jeu pour vérifier l’accès.
</div>

</div>
</div>
<div class="xn-tutorial__footer" markdown="1">
[Précédent](06-achievements.md){ .md-button data-guide-prev="true" }
<span class="xn-tutorial__counter" data-guide-counter role="status" aria-live="polite">1 / 5</span>
[Suivant →](10-music-profile.md){ .md-button .md-button--primary data-guide-next="true" }
</div>
</div>
