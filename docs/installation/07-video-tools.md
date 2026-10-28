---
title: 07. Set up trailer tools
hide:
- navigation
- toc
- footer
template: guide.html
---

<div class="xn-tutorial" data-guide-tutorial data-prev-image="Previous image" data-next-image="Next image →" data-image-label="Image" data-of-label="of" markdown="1">
<nav class="xn-guide-stages" aria-label="Installation guide"><a href="../01-download-playnite/"><span>1</span>Prepare Playnite</a><a href="../04-playnite-settings/" aria-current="step"><span>2</span>Configure integrations</a><a href="../14-download-xnite/"><span>3</span>Install and activate</a><a href="../19-first-launch/"><span>4</span>First launch</a></nav>
<div class="xn-guide-progress"><span>Step 7 of 19</span><progress value="7" max="19" aria-label="Step 7 of 19"></progress></div>
<div class="xn-tutorial__heading"><h1 tabindex="-1">Set up trailer tools</h1><label class="xn-step-picker">All steps<select data-guide-step-select aria-label="All steps"><option value="../01-download-playnite/">01. Download Playnite</option><option value="../02-install-playnite/">02. Install Playnite</option><option value="../03-add-ons/">03. Install the integrations</option><option value="../04-playnite-settings/">04. Review Playnite settings</option><option value="../05-metadata/">05. Configure artwork and metadata</option><option value="../06-achievements/">06. Connect Playnite Achievements</option><option value="../07-video-tools/" selected>07. Set up trailer tools</option><option value="../10-music-profile/">08. Configure music</option><option value="../14-download-xnite/">09. Download X-Nite</option><option value="../15-installation-files/">10. Identify the two packages</option><option value="../16-install-extension/">11. Install X-Nite Profile System</option><option value="../17-install-theme/">12. Install the Fullscreen theme</option><option value="../18-activate-theme/">13. Activate X-Nite and finish</option><option value="../19-first-launch/">14. Prepare the first launch</option><option value="../20-create-profile/">15. Create your first profile</option><option value="../21-profile-avatar/">16. Choose your avatar</option><option value="../22-profile-color/">17. Choose your color</option><option value="../23-profile-background/">18. Choose your main background</option><option value="../24-finish-profile/">19. Finish setup</option></select></label></div>
<div class="xn-tutorial__panel" markdown="1">
<div class="xn-tutorial__visual">
<div class="xn-guide-gallery">
<figure data-guide-frame data-guide-label="Downloads"><a class="xn-guide-image" href="../../assets/installation/07-video-tools-01.png" data-guide-image data-close-label="Close image" aria-label="Downloads"><img src="../../assets/installation/07-video-tools-01.png" alt="Downloads" loading="eager" decoding="async"></a></figure>
<figure data-guide-frame data-guide-label="Extract tools"><a class="xn-guide-image" href="../../assets/installation/07-video-tools-02.png" data-guide-image data-close-label="Close image" aria-label="Extract tools"><img src="../../assets/installation/07-video-tools-02.png" alt="Extract tools" loading="eager" decoding="async"></a></figure>
<figure data-guide-frame data-guide-label="Open Extra Metadata Loader" data-guide-access="In Playnite Desktop, open Add-ons &gt; Extension settings &gt; Generic &gt; Extra Metadata Loader."><a class="xn-guide-image" href="../../assets/installation/access-extra-metadata.png" data-guide-image data-close-label="Close image" aria-label="Open Extra Metadata Loader"><img src="../../assets/installation/access-extra-metadata.png" alt="Open Extra Metadata Loader" loading="eager" decoding="async"></a></figure>
<figure data-guide-frame data-guide-label="Configure videos"><a class="xn-guide-image" href="../../assets/installation/07-video-tools-03.png" data-guide-image data-close-label="Close image" aria-label="Configure videos"><img src="../../assets/installation/07-video-tools-03.png" alt="Configure videos" loading="eager" decoding="async"></a></figure>
<figure data-guide-frame data-guide-label="Logos and SteamGridDB key"><a class="xn-guide-image" href="../../assets/installation/08-logos-steamgriddb.png" data-guide-image data-close-label="Close image" aria-label="Logos and SteamGridDB key"><img src="../../assets/installation/08-logos-steamgriddb.png" alt="Logos and SteamGridDB key" loading="eager" decoding="async"></a></figure>
</div>
<div class="xn-tutorial__dots" data-guide-dots></div>
</div>
<div class="xn-tutorial__notes" tabindex="0" markdown="1">
<div data-guide-note-start="0" data-guide-note-end="3" markdown="1">

<span class="xn-guide-optional">Optional</span>

Prepare **yt-dlp** and **FFmpeg** before configuring trailer downloads. Use the community extras shown below or the official [yt-dlp releases](https://github.com/yt-dlp/yt-dlp/releases) and [FFmpeg downloads](https://ffmpeg.org/download.html). Extract them into a permanent folder, such as `PlayniteTools` beside your Playnite installation. In `Extra Metadata Loader > Videos settings`, select your own `yt-dlp.exe` and `ffmpeg.exe` (usually inside `bin`). Do not copy the example computer paths.

!!! success "Before continuing"
    Both executable paths point to existing files. Try downloading one trailer.
</div>

<div data-guide-note-start="4" data-guide-note-end="4" markdown="1">

<span class="xn-guide-optional">Optional</span>

1. In `Extra Metadata Loader > Logos settings`, enable **Enable logos** and review size and alignment.
2. Choose **Get API Key**, sign in with **Login via Steam**, then open **API > Create API Key** if you do not already have a key.
3. Copy the key into **SteamGridDB API Key** and save. Use the same key in **SteamGridDB Metadata Provider** if requested.

Keep this **SteamGridDB** key private; it is different from a Steam Web API key.

!!! success "Before continuing"
    Save the settings and download a logo for one game to confirm access.
</div>

</div>
</div>
<div class="xn-tutorial__footer" markdown="1">
[Previous](06-achievements.md){ .md-button data-guide-prev="true" }
<span class="xn-tutorial__counter" data-guide-counter role="status" aria-live="polite">1 / 5</span>
[Next →](10-music-profile.md){ .md-button .md-button--primary data-guide-next="true" }
</div>
</div>
