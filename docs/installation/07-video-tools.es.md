---
title: 07. Preparar las herramientas de vídeo
hide:
- navigation
- toc
- footer
template: guide.html
---

<div class="xn-tutorial" data-guide-tutorial data-prev-image="Imagen anterior" data-next-image="Siguiente imagen →" data-image-label="Imagen" data-of-label="de" markdown="1">
<nav class="xn-guide-stages" aria-label="Guía de instalación"><a href="../01-download-playnite/"><span>1</span>Preparar Playnite</a><a href="../04-playnite-settings/" aria-current="step"><span>2</span>Configurar las integraciones</a><a href="../14-download-xnite/"><span>3</span>Instalar y activar</a><a href="../19-first-launch/"><span>4</span>Primer inicio</a></nav>
<div class="xn-guide-progress"><span>Paso 7 de 19</span><progress value="7" max="19" aria-label="Paso 7 de 19"></progress></div>
<div class="xn-tutorial__heading"><h1 tabindex="-1">Preparar las herramientas de vídeo</h1><label class="xn-step-picker">Todos los pasos<select data-guide-step-select aria-label="Todos los pasos"><option value="../01-download-playnite/">01. Descargar Playnite</option><option value="../02-install-playnite/">02. Instalar Playnite</option><option value="../03-add-ons/">03. Instalar las integraciones</option><option value="../04-playnite-settings/">04. Revisar los ajustes de Playnite</option><option value="../05-metadata/">05. Configurar imágenes y metadatos</option><option value="../06-achievements/">06. Conectar Playnite Achievements</option><option value="../07-video-tools/" selected>07. Preparar las herramientas de vídeo</option><option value="../10-music-profile/">08. Configurar la música</option><option value="../14-download-xnite/">09. Descargar X-Nite</option><option value="../15-installation-files/">10. Identificar los dos paquetes</option><option value="../16-install-extension/">11. Instalar X-Nite Profile System</option><option value="../17-install-theme/">12. Instalar el tema Fullscreen</option><option value="../18-activate-theme/">13. Activar X-Nite y finalizar</option><option value="../19-first-launch/">14. Preparar el primer inicio</option><option value="../20-create-profile/">15. Crear tu primer perfil</option><option value="../21-profile-avatar/">16. Elegir el avatar</option><option value="../22-profile-color/">17. Elegir el color</option><option value="../23-profile-background/">18. Elegir el fondo principal</option><option value="../24-finish-profile/">19. Finalizar la configuración</option></select></label></div>
<div class="xn-tutorial__panel" markdown="1">
<div class="xn-tutorial__visual">
<div class="xn-guide-gallery">
<figure data-guide-frame data-guide-label="Descargas"><a class="xn-guide-image" href="../../../assets/installation/07-video-tools-01.png" data-guide-image data-close-label="Cerrar imagen" aria-label="Descargas"><img src="../../../assets/installation/07-video-tools-01.png" alt="Descargas" loading="eager" decoding="async"></a></figure>
<figure data-guide-frame data-guide-label="Extraer herramientas"><a class="xn-guide-image" href="../../../assets/installation/07-video-tools-02.png" data-guide-image data-close-label="Cerrar imagen" aria-label="Extraer herramientas"><img src="../../../assets/installation/07-video-tools-02.png" alt="Extraer herramientas" loading="eager" decoding="async"></a></figure>
<figure data-guide-frame data-guide-label="Abrir Extra Metadata Loader" data-guide-access="En Playnite Desktop, abre Add-ons &gt; Extension settings &gt; Generic &gt; Extra Metadata Loader."><a class="xn-guide-image" href="../../../assets/installation/access-extra-metadata.png" data-guide-image data-close-label="Cerrar imagen" aria-label="Abrir Extra Metadata Loader"><img src="../../../assets/installation/access-extra-metadata.png" alt="Abrir Extra Metadata Loader" loading="eager" decoding="async"></a></figure>
<figure data-guide-frame data-guide-label="Configurar vídeos"><a class="xn-guide-image" href="../../../assets/installation/07-video-tools-03.png" data-guide-image data-close-label="Cerrar imagen" aria-label="Configurar vídeos"><img src="../../../assets/installation/07-video-tools-03.png" alt="Configurar vídeos" loading="eager" decoding="async"></a></figure>
<figure data-guide-frame data-guide-label="Logos y clave SteamGridDB"><a class="xn-guide-image" href="../../../assets/installation/08-logos-steamgriddb.png" data-guide-image data-close-label="Cerrar imagen" aria-label="Logos y clave SteamGridDB"><img src="../../../assets/installation/08-logos-steamgriddb.png" alt="Logos y clave SteamGridDB" loading="eager" decoding="async"></a></figure>
</div>
<div class="xn-tutorial__dots" data-guide-dots></div>
</div>
<div class="xn-tutorial__notes" tabindex="0" markdown="1">
<div data-guide-note-start="0" data-guide-note-end="3" markdown="1">

<span class="xn-guide-optional">Opcional</span>

Descarga **yt-dlp** y **FFmpeg** desde los extras mostrados o sus fuentes oficiales: [yt-dlp](https://github.com/yt-dlp/yt-dlp/releases) y [FFmpeg](https://ffmpeg.org/download.html). Extráelos en una carpeta permanente. En `Extra Metadata Loader > Videos settings`, selecciona tus `yt-dlp.exe` y `ffmpeg.exe`, normalmente en `bin`. No copies las rutas del ejemplo. Prueba un trailer.

!!! success "Antes de continuar"
    Las dos rutas apuntan a archivos existentes. Prueba a descargar un trailer.
</div>

<div data-guide-note-start="4" data-guide-note-end="4" markdown="1">

<span class="xn-guide-optional">Opcional</span>

1. En `Extra Metadata Loader > Logos settings`, activa **Enable logos** y revisa el tamaño y la alineación.
2. Pulsa **Get API Key**, entra con **Login via Steam** y abre **API > Create API Key** si todavía no tienes una clave.
3. Copia la clave en **SteamGridDB API Key** y guarda. Usa la misma clave en **SteamGridDB Metadata Provider** si la solicita.

Mantén privada tu clave **SteamGridDB**; es diferente de una clave de la API Web de Steam.

!!! success "Antes de continuar"
    Guarda los ajustes y descarga el logo de un juego para comprobar el acceso.
</div>

</div>
</div>
<div class="xn-tutorial__footer" markdown="1">
[Anterior](06-achievements.md){ .md-button data-guide-prev="true" }
<span class="xn-tutorial__counter" data-guide-counter role="status" aria-live="polite">1 / 5</span>
[Siguiente →](10-music-profile.md){ .md-button .md-button--primary data-guide-next="true" }
</div>
</div>
