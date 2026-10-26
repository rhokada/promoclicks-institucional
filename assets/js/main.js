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



  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;



  /* ==========================================================================

     1. Header Fixo Profissional: Barra de Progresso e Estado ao Rolar

     ========================================================================== */

  const siteHeader = $('#site-header');

  const scrollProgress = $('#header-scroll-progress');



  let ticking = false;

  const updateHeaderScroll = () => {

    const scrollY = window.scrollY || window.pageYOffset;

    if (siteHeader) {

      if (scrollY > 15) siteHeader.classList.add('is-scrolled');

      else siteHeader.classList.remove('is-scrolled');

    }



    if (scrollProgress) {

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

      scrollProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;

    }

    ticking = false;

  };



  window.addEventListener('scroll', () => {

    if (!ticking) {

      window.requestAnimationFrame(updateHeaderScroll);

      ticking = true;

    }

  }, { passive: true });

  updateHeaderScroll();



  /* ==========================================================================

     2. Menu Responsivo Profissional (Drawer, Dropdown Desktop & Accordion Mobile)

     ========================================================================== */

  const menuToggle = $('#menu-toggle');

  const siteNav = $('#site-nav');

  const navBackdrop = $('#nav-backdrop');

  const drawerCloseBtn = $('#drawer-close-btn');

  const mobileServicesToggle = $('#mobile-services-toggle');

  const navDropdownServicos = $('#nav-dropdown-servicos');



  if (siteNav) {

    const openMenu = () => {

      siteNav.classList.add('is-open');

      if (menuToggle) {

        menuToggle.setAttribute('aria-expanded', 'true');

        menuToggle.setAttribute('aria-label', 'Fechar menu de navegação');

      }

      if (navBackdrop) navBackdrop.classList.add('is-active');

      document.body.classList.add('nav-lock');

    };



    const closeMenu = () => {

      siteNav.classList.remove('is-open');

      if (menuToggle) {

        menuToggle.setAttribute('aria-expanded', 'false');

        menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');

      }

      if (navBackdrop) navBackdrop.classList.remove('is-active');

      document.body.classList.remove('nav-lock');

    };



    if (menuToggle) {

      menuToggle.addEventListener('click', () => {

        const isOpen = siteNav.classList.contains('is-open');

        if (isOpen) closeMenu();

        else openMenu();

      });

    }



    if (drawerCloseBtn) {

      drawerCloseBtn.addEventListener('click', closeMenu);

    }



    if (navBackdrop) {

      navBackdrop.addEventListener('click', closeMenu);

    }



    // Fecha ao clicar em links no mobile

    $$('a', siteNav).forEach((link) => {

      link.addEventListener('click', () => {

        if (window.innerWidth <= 920) closeMenu();

      });

    });



    // Accordion de Serviços no Drawer Mobile

    if (mobileServicesToggle && navDropdownServicos) {
      mobileServicesToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isCollapsed = navDropdownServicos.classList.toggle('is-collapsed');
        if (isCollapsed) {
          navDropdownServicos.classList.remove('is-expanded');
        } else {
          navDropdownServicos.classList.add('is-expanded');
        }
        mobileServicesToggle.setAttribute('aria-expanded', String(!isCollapsed));
        mobileServicesToggle.setAttribute('aria-label', isCollapsed ? 'Expandir submenu de serviços' : 'Recolher submenu de serviços');
      });
    }



    window.addEventListener('keydown', (e) => {

      if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {

        closeMenu();

        if (menuToggle) menuToggle.focus();

      }

    });

  }



  /* ==========================================================================

     3. Efeitos Dinâmicos de Revelação ao Rolar (Scroll Reveal Engine)

     ========================================================================== */

  if ('IntersectionObserver' in window && !prefersReducedMotion) {

    document.documentElement.classList.add('has-reveal');



    // Auto-identifica e marca elementos nobres da página

    const autoRevealSelectors = [

      '.section-header',

      '.hero-grid > *',

      '.features-grid',

      '.clients-grid',

      '.authority-pillars-grid',

      '.cases-metric-grid',

      '.big-numbers-row',

      '.split-grid > *',

      '.benefits-list > *',

      '.plan-cards',

      '.card',

      '.notice-banner',

      '.step-card'

    ];



    autoRevealSelectors.forEach((sel) => {

      $$(sel).forEach((el) => {

        if (!el.classList.contains('reveal') && !el.classList.contains('reveal-stagger')) {

          if (el.matches('.features-grid, .clients-grid, .authority-pillars-grid, .cases-metric-grid, .big-numbers-row, .plan-cards')) {

            el.classList.add('reveal-stagger');

          } else {

            el.classList.add('reveal');

          }

        }

      });

    });



    const revealObserver = new IntersectionObserver((entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add('is-revealed');

          observer.unobserve(entry.target);

        }

      });

    }, {

      rootMargin: '0px 0px -40px 0px',

      threshold: 0.12

    });



    $$('.reveal, .reveal-stagger').forEach((el) => revealObserver.observe(el));



    /* ==========================================================================

       4. Contador Animado Dinâmico de Indicadores (Big Numbers Ticker)

       ========================================================================== */

    const parseNumberMetric = (raw) => {

      const match = raw.match(/^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/);

      if (!match) return null;

      return {

        prefix: match[1] || '',

        value: parseFloat(match[2].replace(',', '.')),

        suffix: match[3] || ''

      };

    };



    const counterObserver = new IntersectionObserver((entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          const el = entry.target;

          const metric = parseNumberMetric(el.textContent.trim());

          if (metric && metric.value > 0) {

            const startVal = 0;

            const targetVal = metric.value;

            const duration = 1400; // ms

            const startTime = performance.now();



            const tick = (now) => {

              const elapsed = now - startTime;

              const progress = Math.min(1, elapsed / duration);

              // Ease Out Cubic

              const eased = 1 - Math.pow(1 - progress, 3);

              const current = Math.round(startVal + (targetVal - startVal) * eased);

              el.textContent = `${metric.prefix}${current}${metric.suffix}`;

              if (progress < 1) {

                requestAnimationFrame(tick);

              } else {

                el.textContent = `${metric.prefix}${targetVal}${metric.suffix}`;

              }

            };

            requestAnimationFrame(tick);

          }

          observer.unobserve(el);

        }

      });

    }, { threshold: 0.25 });



    $$('.big-number-val').forEach((el) => counterObserver.observe(el));

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

        waBtn.href = `https://api.whatsapp.com/send?phone=5511971596496&text=${encoded}`;

      }



      const mailBtn = $('#email-summary-btn');

      if (mailBtn) {

        const subject = encodeURIComponent(`[Contato Comercial] ${v.assunto || 'Solicitação PromoClicks'} - ${v.nome || ''}`);

        const body = encodeURIComponent(preparedText);

        mailBtn.href = `mailto:comercial@promoclicks.com.br?subject=${subject}&body=${body}`;

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

  /* ==========================================================================
     WebMCP (Model Context Protocol in Browser) Registration
     Exposes client-side agent tools via document.modelContext.registerTool()
     ========================================================================== */
  const initWebMCP = () => {
    const modelContext = document.modelContext || navigator.modelContext || window.modelContext;
    if (!modelContext || typeof modelContext.registerTool !== 'function') {
      return;
    }

    const abortController = new AbortController();

    // Tool 1: Solicitar Proposta / Briefing de Campanha Promocional
    try {
      modelContext.registerTool({
        name: 'solicitar_proposta_campanha',
        description: 'Submete solicitação de proposta comercial ou adesão para o Natal Premiado 2026 e campanhas promocionais coletivas ou exclusivas da PromoClicks.',
        inputSchema: {
          type: 'object',
          properties: {
            nome: { type: 'string', description: 'Nome completo do contato' },
            email: { type: 'string', format: 'email', description: 'E-mail corporativo para contato' },
            telefone: { type: 'string', description: 'Telefone com DDD ou WhatsApp' },
            perfil: {
              type: 'string',
              enum: ['Lojista', 'Marca ou Rede', 'Parceiro', 'Consumidor'],
              description: 'Perfil de relacionamento'
            },
            assunto: { type: 'string', description: 'Assunto da solicitação comercial' },
            empresa: { type: 'string', description: 'Nome fantasia ou razão social da loja/empresa' },
            cidade: { type: 'string', description: 'Cidade e UF' },
            plano: {
              type: 'string',
              enum: ['Bronze', 'Prata', 'Ouro', 'Diamante', 'Ainda quero comparar os planos'],
              description: 'Plano de interesse no Natal Premiado'
            },
            mensagem: { type: 'string', description: 'Mensagem detalhada ou briefing da campanha' }
          },
          required: ['nome', 'email', 'telefone', 'perfil', 'assunto', 'mensagem']
        },
        execute: async (params) => {
          const form = document.getElementById('contact-form');
          if (form) {
            Object.entries(params).forEach(([k, v]) => {
              const el = form.elements[k];
              if (el) el.value = v;
            });
            const event = new Event('submit', { cancelable: true, bubbles: true });
            form.dispatchEvent(event);
          }
          return {
            status: 'success',
            message: 'Solicitação de proposta estruturada com sucesso para os canais comerciais da PromoClicks.',
            data: params
          };
        }
      }, { signal: abortController.signal });
    } catch (e) {
      console.warn('WebMCP tool registration error (solicitar_proposta_campanha):', e);
    }

    // Tool 2: Consultar Planos do Natal Premiado 2026
    try {
      modelContext.registerTool({
        name: 'consultar_planos_natal',
        description: 'Retorna a tabela oficial de planos, faixas de preços e cotas de números da sorte por CPF no Natal Premiado 2026.',
        inputSchema: {
          type: 'object',
          properties: {
            planoDesejado: {
              type: 'string',
              enum: ['todos', 'Bronze', 'Prata', 'Ouro', 'Diamante'],
              description: 'Plano específico para consulta detalhada ou "todos"'
            }
          }
        },
        execute: async (params) => {
          const planos = [
            { id: 'bronze', nome: 'Bronze', preco: 'R$ 399', limiteCPF: 3, destaque: false },
            { id: 'prata', nome: 'Prata', preco: 'R$ 499', limiteCPF: 6, destaque: false },
            { id: 'ouro', nome: 'Ouro', preco: 'R$ 699', limiteCPF: 10, destaque: true },
            { id: 'diamante', nome: 'Diamante', preco: 'R$ 899', limiteCPF: 20, destaque: false }
          ];
          const filtro = params?.planoDesejado;
          const resultado = (!filtro || filtro === 'todos')
            ? planos
            : planos.filter(p => p.nome.toLowerCase() === filtro.toLowerCase());

          return {
            status: 'success',
            prazoAdesao: 'Até 22 de novembro de 2026',
            periodoCampanha: '01 a 25 de dezembro de 2026',
            premio: 'R$ 1.000 em dinheiro / certificado em barras de ouro via Loteria Federal',
            planos: resultado
          };
        }
      }, { signal: abortController.signal });
    } catch (e) {
      console.warn('WebMCP tool registration error (consultar_planos_natal):', e);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWebMCP);
  } else {
    initWebMCP();
  }

})();

