---
title: 07. Preparar as ferramentas de vídeo
hide:
- navigation
- toc
- footer
template: guide.html
---

<div class="xn-tutorial" data-guide-tutorial data-prev-image="Imagem anterior" data-next-image="Próxima imagem →" data-image-label="Imagem" data-of-label="de" markdown="1">
<nav class="xn-guide-stages" aria-label="Guia de instalação"><a href="../01-download-playnite/"><span>1</span>Preparar o Playnite</a><a href="../04-playnite-settings/" aria-current="step"><span>2</span>Configurar as integrações</a><a href="../14-download-xnite/"><span>3</span>Instalar e ativar</a><a href="../19-first-launch/"><span>4</span>Primeira inicialização</a></nav>
<div class="xn-guide-progress"><span>Passo 7 de 19</span><progress value="7" max="19" aria-label="Passo 7 de 19"></progress></div>
<div class="xn-tutorial__heading"><h1 tabindex="-1">Preparar as ferramentas de vídeo</h1><label class="xn-step-picker">Todas as etapas<select data-guide-step-select aria-label="Todas as etapas"><option value="../01-download-playnite/">01. Baixar o Playnite</option><option value="../02-install-playnite/">02. Instalar o Playnite</option><option value="../03-add-ons/">03. Instalar as integrações</option><option value="../04-playnite-settings/">04. Revisar as configurações do Playnite</option><option value="../05-metadata/">05. Configurar artes e metadados</option><option value="../06-achievements/">06. Conectar o Playnite Achievements</option><option value="../07-video-tools/" selected>07. Preparar as ferramentas de vídeo</option><option value="../10-music-profile/">08. Configurar música</option><option value="../14-download-xnite/">09. Baixar o X-Nite</option><option value="../15-installation-files/">10. Identificar os dois pacotes</option><option value="../16-install-extension/">11. Instalar o X-Nite Profile System</option><option value="../17-install-theme/">12. Instalar o tema Fullscreen</option><option value="../18-activate-theme/">13. Ativar o X-Nite e concluir</option><option value="../19-first-launch/">14. Preparar a primeira inicialização</option><option value="../20-create-profile/">15. Criar o primeiro perfil</option><option value="../21-profile-avatar/">16. Escolher o avatar</option><option value="../22-profile-color/">17. Escolher a cor</option><option value="../23-profile-background/">18. Escolher o fundo principal</option><option value="../24-finish-profile/">19. Concluir a configuração</option></select></label></div>
<div class="xn-tutorial__panel" markdown="1">
<div class="xn-tutorial__visual">
<div class="xn-guide-gallery">
<figure data-guide-frame data-guide-label="Downloads"><a class="xn-guide-image" href="../../../assets/installation/07-video-tools-01.png" data-guide-image data-close-label="Fechar imagem" aria-label="Downloads"><img src="../../../assets/installation/07-video-tools-01.png" alt="Downloads" loading="eager" decoding="async"></a></figure>
<figure data-guide-frame data-guide-label="Extrair ferramentas"><a class="xn-guide-image" href="../../../assets/installation/07-video-tools-02.png" data-guide-image data-close-label="Fechar imagem" aria-label="Extrair ferramentas"><img src="../../../assets/installation/07-video-tools-02.png" alt="Extrair ferramentas" loading="eager" decoding="async"></a></figure>
<figure data-guide-frame data-guide-label="Acessar Extra Metadata Loader" data-guide-access="No Playnite Desktop, abra Add-ons &gt; Extension settings &gt; Generic &gt; Extra Metadata Loader."><a class="xn-guide-image" href="../../../assets/installation/access-extra-metadata.png" data-guide-image data-close-label="Fechar imagem" aria-label="Acessar Extra Metadata Loader"><img src="../../../assets/installation/access-extra-metadata.png" alt="Acessar Extra Metadata Loader" loading="eager" decoding="async"></a></figure>
<figure data-guide-frame data-guide-label="Configurar vídeos"><a class="xn-guide-image" href="../../../assets/installation/07-video-tools-03.png" data-guide-image data-close-label="Fechar imagem" aria-label="Configurar vídeos"><img src="../../../assets/installation/07-video-tools-03.png" alt="Configurar vídeos" loading="eager" decoding="async"></a></figure>
<figure data-guide-frame data-guide-label="Logos e chave SteamGridDB"><a class="xn-guide-image" href="../../../assets/installation/08-logos-steamgriddb.png" data-guide-image data-close-label="Fechar imagem" aria-label="Logos e chave SteamGridDB"><img src="../../../assets/installation/08-logos-steamgriddb.png" alt="Logos e chave SteamGridDB" loading="eager" decoding="async"></a></figure>
</div>
<div class="xn-tutorial__dots" data-guide-dots></div>
</div>
<div class="xn-tutorial__notes" tabindex="0" markdown="1">
<div data-guide-note-start="0" data-guide-note-end="3" markdown="1">

<span class="xn-guide-optional">Opcional</span>

Para baixar trailers, prepare **yt-dlp** e **FFmpeg** antes de preencher os caminhos. Use os extras da comunidade mostrados abaixo ou as fontes oficiais: [yt-dlp](https://github.com/yt-dlp/yt-dlp/releases) e [FFmpeg](https://ffmpeg.org/download.html). Extraia em uma pasta permanente, por exemplo `PlayniteTools` ao lado da instalação do Playnite. Em `Extra Metadata Loader > Videos settings`, selecione os seus arquivos `yt-dlp.exe` e `ffmpeg.exe` (normalmente dentro de `bin`). Não copie os caminhos do computador dos prints.

!!! success "Antes de continuar"
    Os dois caminhos apontam para arquivos existentes. Teste o download de um trailer.
</div>

<div data-guide-note-start="4" data-guide-note-end="4" markdown="1">

<span class="xn-guide-optional">Opcional</span>

1. Em `Extra Metadata Loader > Logos settings`, ative **Enable logos** e revise tamanho e alinhamento.
2. Clique em **Get API Key**, entre com **Login via Steam** e abra **API > Create API Key**, caso ainda não tenha uma chave.
3. Copie a chave para **SteamGridDB API Key** e salve. Use a mesma chave no **SteamGridDB Metadata Provider**, se ele solicitar.

Mantenha sua chave **SteamGridDB** privada; ela é diferente da chave da API Web da Steam.

!!! success "Antes de continuar"
    Salve as configurações e baixe a logo de um jogo para confirmar o acesso.
</div>

</div>
</div>
<div class="xn-tutorial__footer" markdown="1">
[Anterior](06-achievements.md){ .md-button data-guide-prev="true" }
<span class="xn-tutorial__counter" data-guide-counter role="status" aria-live="polite">1 / 5</span>
[Próximo →](10-music-profile.md){ .md-button .md-button--primary data-guide-next="true" }
</div>
</div>
