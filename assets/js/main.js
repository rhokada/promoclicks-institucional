/**
 * PromoClicks — Interações de Interface, Acessibilidade e Jornada de Conversão
 * Progressivo: todas as páginas funcionam integralmente via HTML semântico pré-renderizado.
 */

(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const track = (name, data) => {
    if (window.PromoClicksAnalytics && typeof window.PromoClicksAnalytics.track === 'function') {
      window.PromoClicksAnalytics.track(name, data);
    }
  };

  /* 1. Menu Responsivo Acessível com Drawer e Backdrop */
  const menuToggle = $('#menu-toggle');
  const siteNav = $('#site-nav');
  const navBackdrop = $('#nav-backdrop');

  if (menuToggle && siteNav) {
    const openMenu = () => {
      siteNav.classList.add('is-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Fechar menu de navegação');
      if (navBackdrop) navBackdrop.classList.add('is-active');
      document.body.classList.add('nav-lock');
    };

    const closeMenu = () => {
      siteNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
      if (navBackdrop) navBackdrop.classList.remove('is-active');
      document.body.classList.remove('nav-lock');
    };

    menuToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.contains('is-open');
      if (isOpen) closeMenu();
      else openMenu();
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMenu);
    }

    $$('a', siteNav).forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  /* 2. Rastreamento Preparado de Cliques em CTAs e Seleção de Planos */
  $$('[data-track]').forEach((el) => {
    el.addEventListener('click', () => {
      track(el.dataset.track, {
        label: (el.dataset.trackLabel || el.textContent || '').trim().slice(0, 80),
        destination: el.getAttribute('href') || ''
      });
    });
  });

  /* 3. Abas Acessíveis WAI-ARIA (Jornadas Lojista / Consumidor) */
  const tabButtons = $$('[role="tab"][data-tab-target]');
  if (tabButtons.length > 0) {
    const activateTab = (targetTab, moveFocus = false) => {
      const targetId = targetTab.dataset.tabTarget;
      tabButtons.forEach((btn) => {
        const isSelected = btn === targetTab;
        btn.setAttribute('aria-selected', String(isSelected));
        btn.tabIndex = isSelected ? 0 : -1;
        const panel = document.getElementById(btn.dataset.tabTarget);
        if (panel) {
          panel.hidden = !isSelected;
        }
      });
      if (moveFocus) {
        targetTab.focus();
      }
      track('journey_tab_select', { tab: targetId });
    };

    tabButtons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        activateTab(btn, false);
        history.replaceState(null, '', `#${btn.dataset.tabTarget}`);
      });
      btn.addEventListener('keydown', (e) => {
        if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
        e.preventDefault();
        let nextIndex = idx;
        if (e.key === 'Home') nextIndex = 0;
        else if (e.key === 'End') nextIndex = tabButtons.length - 1;
        else if (e.key === 'ArrowRight') nextIndex = (idx + 1) % tabButtons.length;
        else if (e.key === 'ArrowLeft') nextIndex = (idx - 1 + tabButtons.length) % tabButtons.length;
        activateTab(tabButtons[nextIndex], true);
      });
    });

    // Sincronização com hash de URL (#lojista ou #consumidor)
    const checkHashTab = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const btn = tabButtons.find((b) => b.dataset.tabTarget === hash);
      if (btn) {
        activateTab(btn, false);
        const container = btn.closest('[data-tabs]');
        if (container) container.scrollIntoView({ block: 'start' });
      }
    };
    checkHashTab();
    window.addEventListener('hashchange', checkHashTab);
  }

  /* 4. Formulário Comercial com Campos Condicionais e Pré-preenchimento Contextual
   *    Integridade: nenhum envio a servidor é simulado. O formulário prepara um resumo
   *    copiável até que o endpoint de produção seja integrado. */
  const contactForm = $('#contact-form');
  if (contactForm) {
    const perfilSelect = $('#field-perfil');
    const assuntoSelect = $('#field-assunto');
    const planoSelect = $('#field-plano');
    const mensagemInput = $('#field-mensagem');
    const empresaInput = $('#field-empresa');
    const groupPlano = $('#group-plano');
    const groupEmpresa = $('#group-empresa');
    const groupCidade = $('#group-cidade');
    const feedback = $('#form-feedback');
    const feedbackIntro = $('#feedback-intro');
    const summaryBox = $('#form-summary-box');
    const btnCopy = $('#copy-summary-btn');

    let formStarted = false;
    let preparedText = '';

    const matchOption = (select, value) => {
      if (!select || !value) return false;
      const opt = Array.from(select.options).find((o) => o.value.toLowerCase() === value.toLowerCase());
      if (opt) select.value = opt.value;
      return Boolean(opt);
    };

    const updateConditionalFields = () => {
      const perfil = perfilSelect ? perfilSelect.value : '';
      const assunto = assuntoSelect ? assuntoSelect.value : '';
      const isConsumer = perfil === 'Consumidor';
      const isB2B = Boolean(perfil) && !isConsumer;

      if (groupPlano) groupPlano.hidden = !(assunto === 'Natal Premiado' || assunto.toLowerCase().includes('natal'));
      [groupEmpresa, groupCidade].forEach((g) => { if (g) g.hidden = isConsumer; });
      if (empresaInput) empresaInput.required = isB2B;
    };

    // Pré-preenchimento a partir de ?perfil=&assunto=&plano= (links contextuais dos CTAs)
    const params = new URLSearchParams(window.location.search);
    const paramPerfil = params.get('perfil');
    const paramAssunto = params.get('assunto');
    const paramPlano = params.get('plano');

    matchOption(perfilSelect, paramPerfil);
    if (paramAssunto && !matchOption(assuntoSelect, paramAssunto)) {
      // Assuntos livres dos CTAs (ex.: "Quero planejar uma campanha") viram ponto de partida da mensagem
      if (mensagemInput && !mensagemInput.value) mensagemInput.value = `${paramAssunto}. `;
    }
    if (paramPlano && matchOption(planoSelect, paramPlano)) {
      if (perfilSelect && !perfilSelect.value) perfilSelect.value = 'Lojista';
      if (assuntoSelect && !assuntoSelect.value) assuntoSelect.value = 'Natal Premiado';
      if (mensagemInput && !mensagemInput.value) {
        mensagemInput.value = `Olá! Tenho interesse no plano ${planoSelect.value} do Natal Premiado 2026 e gostaria de confirmar as condições de adesão para o meu estabelecimento.`;
      }
    }

    updateConditionalFields();
    [perfilSelect, assuntoSelect].forEach((el) => el && el.addEventListener('change', updateConditionalFields));

    contactForm.addEventListener('focusin', () => {
      if (!formStarted) {
        formStarted = true;
        track('form_start', { formId: 'contact-form' });
      }
    });

    contactForm.addEventListener('input', () => {
      if (preparedText && feedback) {
        preparedText = '';
        feedback.hidden = true;
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.reportValidity()) {
        track('form_validation_error', { formId: 'contact-form' });
        return;
      }

      const v = Object.fromEntries(new FormData(contactForm).entries());
      const isConsumer = v.perfil === 'Consumidor';
      preparedText = [
        'SOLICITAÇÃO — PROMOCLICKS',
        '------------------------------------------',
        `Nome: ${v.nome || ''}`,
        `Perfil: ${v.perfil || ''}`,
        !isConsumer && v.empresa ? `Empresa / Loja: ${v.empresa}` : null,
        !isConsumer && v.cidade ? `Cidade / UF: ${v.cidade}` : null,
        `E-mail: ${v.email || ''}`,
        `Telefone / WhatsApp: ${v.telefone || ''}`,
        `Assunto: ${v.assunto || ''}`,
        groupPlano && !groupPlano.hidden && v.plano ? `Plano de interesse (condições previstas): ${v.plano}` : null,
        '',
        'Mensagem:',
        v.mensagem || ''
      ].filter((l) => l !== null).join('\n');

      if (summaryBox) summaryBox.textContent = preparedText;
      if (feedbackIntro) {
        feedbackIntro.textContent = `Obrigado, ${(v.nome || '').split(' ')[0]}. Seu resumo foi gerado com sucesso. Escolha abaixo como deseja enviar para o atendimento:`;
      }

      // Atualiza botões de envio direto
      const waBtn = $('#whatsapp-summary-btn');
      if (waBtn) {
        const encoded = encodeURIComponent(preparedText);
        waBtn.href = `https://api.whatsapp.com/send?text=${encoded}`;
      }

      const mailBtn = $('#email-summary-btn');
      if (mailBtn) {
        const subject = encodeURIComponent(`[Contato Comercial] ${v.assunto || 'Solicitação PromoClicks'} - ${v.nome || ''}`);
        const body = encodeURIComponent(preparedText);
        mailBtn.href = `mailto:contato@promoclicks.com.br?subject=${subject}&body=${body}`;
      }

      if (feedback) {
        feedback.hidden = false;
        feedback.focus();
      }

      track('form_message_prepared', {
        perfil: v.perfil || '',
        assunto: v.assunto || '',
        plano: v.plano || 'N/A'
      });
    });

    if (btnCopy) {
      btnCopy.addEventListener('click', async () => {
        if (!preparedText) return;
        let ok = false;
        try {
          await navigator.clipboard.writeText(preparedText);
          ok = true;
        } catch {
          const temp = document.createElement('textarea');
          temp.value = preparedText;
          temp.style.position = 'fixed';
          temp.style.left = '-9999px';
          document.body.appendChild(temp);
          temp.select();
          ok = document.execCommand('copy');
          temp.remove();
        }
        btnCopy.textContent = ok
          ? 'Resumo copiado ✓'
          : 'Não foi possível copiar — selecione o texto acima';
        track('form_message_copied', { ok });
      });
    }
  }
})();
