/**
 * PromoClicks — Camada de Eventos CRO Preparada para Mensuração Futura
 *
 * Importante (Conformidade & Privacidade):
 * Esta camada estrutura os eventos de conversão no formato dataLayer / CustomEvent
 * sem enviar dados para servidores externos e sem simular coleta analítica ativa
 * antes da configuração de consentimento LGPD e de um ID real de GTM/GA4.
 */

(() => {
  'use strict';

  const eventQueue = [];

  function track(eventName, payload = {}) {
    const entry = {
      event: eventName,
      timestamp: new Date().toISOString(),
      path: window.location.pathname,
      ...payload
    };
    eventQueue.push(entry);

    // Dispara CustomEvent no documento para futura integração com GTM / consentimento LGPD
    document.dispatchEvent(new CustomEvent('promoclicks:track', { detail: entry }));
  }

  window.PromoClicksAnalytics = {
    track,
    getRecordedEvents: () => [...eventQueue]
  };
})();
