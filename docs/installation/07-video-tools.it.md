---
title: 07. Preparare gli strumenti video
hide:
- navigation
- toc
- footer
template: guide.html
---

<div class="xn-tutorial" data-guide-tutorial data-prev-image="Immagine precedente" data-next-image="Immagine successiva →" data-image-label="Immagine" data-of-label="di" markdown="1">
<nav class="xn-guide-stages" aria-label="Guida all’installazione"><a href="../01-download-playnite/"><span>1</span>Preparare Playnite</a><a href="../04-playnite-settings/" aria-current="step"><span>2</span>Configurare le integrazioni</a><a href="../14-download-xnite/"><span>3</span>Installare e attivare</a><a href="../19-first-launch/"><span>4</span>Primo avvio</a></nav>
<div class="xn-guide-progress"><span>Passo 7 di 19</span><progress value="7" max="19" aria-label="Passo 7 di 19"></progress></div>
<div class="xn-tutorial__heading"><h1 tabindex="-1">Preparare gli strumenti video</h1><label class="xn-step-picker">Tutti i passaggi<select data-guide-step-select aria-label="Tutti i passaggi"><option value="../01-download-playnite/">01. Scaricare Playnite</option><option value="../02-install-playnite/">02. Installare Playnite</option><option value="../03-add-ons/">03. Installare le integrazioni</option><option value="../04-playnite-settings/">04. Verificare le impostazioni di Playnite</option><option value="../05-metadata/">05. Configurare immagini e metadati</option><option value="../06-achievements/">06. Collegare Playnite Achievements</option><option value="../07-video-tools/" selected>07. Preparare gli strumenti video</option><option value="../10-music-profile/">08. Configurare la musica</option><option value="../14-download-xnite/">09. Scaricare X-Nite</option><option value="../15-installation-files/">10. Identificare i due pacchetti</option><option value="../16-install-extension/">11. Installare X-Nite Profile System</option><option value="../17-install-theme/">12. Installare il tema Fullscreen</option><option value="../18-activate-theme/">13. Attivare X-Nite e terminare</option><option value="../19-first-launch/">14. Preparare il primo avvio</option><option value="../20-create-profile/">15. Creare il primo profilo</option><option value="../21-profile-avatar/">16. Scegliere l’avatar</option><option value="../22-profile-color/">17. Scegliere il colore</option><option value="../23-profile-background/">18. Scegliere lo sfondo principale</option><option value="../24-finish-profile/">19. Completare la configurazione</option></select></label></div>
<div class="xn-tutorial__panel" markdown="1">
<div class="xn-tutorial__visual">
<div class="xn-guide-gallery">
<figure data-guide-frame data-guide-label="Download"><a class="xn-guide-image" href="../../../assets/installation/07-video-tools-01.png" data-guide-image data-close-label="Chiudi immagine" aria-label="Download"><img src="../../../assets/installation/07-video-tools-01.png" alt="Download" loading="eager" decoding="async"></a></figure>
<figure data-guide-frame data-guide-label="Estrarre gli strumenti"><a class="xn-guide-image" href="../../../assets/installation/07-video-tools-02.png" data-guide-image data-close-label="Chiudi immagine" aria-label="Estrarre gli strumenti"><img src="../../../assets/installation/07-video-tools-02.png" alt="Estrarre gli strumenti" loading="eager" decoding="async"></a></figure>
<figure data-guide-frame data-guide-label="Apri Extra Metadata Loader" data-guide-access="In Playnite Desktop, apri Add-ons &gt; Extension settings &gt; Generic &gt; Extra Metadata Loader."><a class="xn-guide-image" href="../../../assets/installation/access-extra-metadata.png" data-guide-image data-close-label="Chiudi immagine" aria-label="Apri Extra Metadata Loader"><img src="../../../assets/installation/access-extra-metadata.png" alt="Apri Extra Metadata Loader" loading="eager" decoding="async"></a></figure>
<figure data-guide-frame data-guide-label="Configurare i video"><a class="xn-guide-image" href="../../../assets/installation/07-video-tools-03.png" data-guide-image data-close-label="Chiudi immagine" aria-label="Configurare i video"><img src="../../../assets/installation/07-video-tools-03.png" alt="Configurare i video" loading="eager" decoding="async"></a></figure>
<figure data-guide-frame data-guide-label="Loghi e chiave SteamGridDB"><a class="xn-guide-image" href="../../../assets/installation/08-logos-steamgriddb.png" data-guide-image data-close-label="Chiudi immagine" aria-label="Loghi e chiave SteamGridDB"><img src="../../../assets/installation/08-logos-steamgriddb.png" alt="Loghi e chiave SteamGridDB" loading="eager" decoding="async"></a></figure>
</div>
<div class="xn-tutorial__dots" data-guide-dots></div>
</div>
<div class="xn-tutorial__notes" tabindex="0" markdown="1">
<div data-guide-note-start="0" data-guide-note-end="3" markdown="1">

<span class="xn-guide-optional">Facoltativo</span>

Scarica **yt-dlp** e **FFmpeg** dagli extra mostrati o dalle fonti ufficiali: [yt-dlp](https://github.com/yt-dlp/yt-dlp/releases) e [FFmpeg](https://ffmpeg.org/download.html). Estrai i file in una cartella permanente. In `Extra Metadata Loader > Videos settings`, seleziona i tuoi `yt-dlp.exe` e `ffmpeg.exe`, normalmente in `bin`. Non copiare i percorsi dell’esempio. Prova un trailer.

!!! success "Prima di continuare"
    I due percorsi indicano file esistenti. Prova a scaricare un trailer.
</div>

<div data-guide-note-start="4" data-guide-note-end="4" markdown="1">

<span class="xn-guide-optional">Facoltativo</span>

1. In `Extra Metadata Loader > Logos settings`, attiva **Enable logos** e controlla dimensioni e allineamento.
2. Scegli **Get API Key**, accedi con **Login via Steam** e apri **API > Create API Key** se non hai ancora una chiave.
3. Incolla la chiave in **SteamGridDB API Key** e salva. Usa la stessa chiave in **SteamGridDB Metadata Provider**, se richiesta.

Mantieni privata la chiave **SteamGridDB**; è diversa da una chiave API Web di Steam.

!!! success "Prima di continuare"
    Salva le impostazioni e scarica il logo di un gioco per verificare l’accesso.
</div>

</div>
</div>
<div class="xn-tutorial__footer" markdown="1">
[Precedente](06-achievements.md){ .md-button data-guide-prev="true" }
<span class="xn-tutorial__counter" data-guide-counter role="status" aria-live="polite">1 / 5</span>
[Successivo →](10-music-profile.md){ .md-button .md-button--primary data-guide-next="true" }
</div>
</div>
