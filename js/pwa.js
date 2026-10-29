'use strict';

(() => {
  const installButton = document.getElementById('installAppBtn');
  if (!installButton) return;

  let installPrompt = null;
  const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent) && !window.MSStream;
  const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

  function updateInstallButton() {
    installButton.hidden = isStandalone() || (!installPrompt && !isIOS);
  }

  if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(() => console.info('PWA de La Carnicería lista.'))
        .catch(error => console.warn('No se pudo registrar el Service Worker:', error));
    });
  }

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    installPrompt = event;
    updateInstallButton();
  });

  installButton.addEventListener('click', async () => {
    if (installPrompt) {
      installPrompt.prompt();
      await installPrompt.userChoice;
      installPrompt = null;
      updateInstallButton();
      return;
    }

    if (isIOS) {
      window.alert('Para instalar La Carnicería en tu iPhone o iPad: toca Compartir en Safari y selecciona “Añadir a pantalla de inicio”.');
    }
  });

  window.addEventListener('appinstalled', () => {
    installPrompt = null;
    updateInstallButton();
  });

  window.matchMedia('(display-mode: standalone)').addEventListener?.('change', updateInstallButton);
  updateInstallButton();
})();
