/**
 * APP LOGIC - ACHADINHOS DA SO
 * =============================
 * Gerencia a renderização dos dados de config.js,
 * filtros interativos, busca, cópia de cupons e eventos de conversão.
 */

// Estado global da página
const CONFIG = window.CONFIG;
let currentCategory = 'todas';
let searchTerm = '';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar Links Globais
  initGlobalLinks();

  // 2. Renderizar Destaque do Dia
  renderDailyFeature();

  // 3. Renderizar Categorias
  renderCategories();

  // 4. Renderizar Produtos
  renderProducts();

  // 5. Renderizar Cupons
  renderCoupons();

  // 6. Iniciar Timer Regressivo do Achadinho do Dia
  initCountdownTimer();

  // 7. Eventos de Busca e Filtro
  initSearchAndFilterEvents();

  // 8. Barra VIP Flutuante ao Rolar
  initFloatingVipBar();

  // 9. Simulação Sutil de Atividade Social (Prova Social)
  initSocialProofPopups();

  // 10. Ano dinâmico no footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/**
 * Conecta todas as tags <a> com as URLs definidas no config.js
 */
function initGlobalLinks() {
  const { LINKS } = CONFIG;

  const bindLink = (id, url) => {
    const el = document.getElementById(id);
    if (el && url) {
      el.href = url;
    }
  };

  bindLink('linkInstagram', LINKS.INSTAGRAM_URL);
  bindLink('linkTiktok', LINKS.TIKTOK_URL);
  bindLink('linkVipPrimary', LINKS.VIP_GROUP_URL);
  bindLink('linkShopeeCard', LINKS.SHOPEE_URL);
  bindLink('linkMercadoLivreCard', LINKS.MERCADO_LIVRE_URL);
  bindLink('linkVipFooter', LINKS.VIP_GROUP_URL);
  bindLink('linkVipSticky', LINKS.VIP_GROUP_URL);
  bindLink('footerInstagram', LINKS.INSTAGRAM_URL);
  bindLink('footerTiktok', LINKS.TIKTOK_URL);
}

/**
 * Renderiza o Achadinho do Dia
 */
function renderDailyFeature() {
  const item = CONFIG.ACHADINHO_DO_DIA;
  if (!item) return;

  const titleEl = document.getElementById('dailyTitle');
  const descEl = document.getElementById('dailyDesc');
  const imgEl = document.getElementById('dailyImg');
  const oldPriceEl = document.getElementById('dailyOldPrice');
  const curPriceEl = document.getElementById('dailyCurrentPrice');
  const discountEl = document.getElementById('dailyDiscount');
  const storeEl = document.getElementById('dailyStore');
  const ratingEl = document.getElementById('dailyRating');
  const btnEl = document.getElementById('dailyLinkBtn');

  if (titleEl) titleEl.textContent = item.nome;
  if (descEl) descEl.textContent = item.descricao;
  if (imgEl && item.imagem) imgEl.src = item.imagem;
  if (oldPriceEl) oldPriceEl.textContent = `R$ ${item.precoAntigo}`;
  if (curPriceEl) curPriceEl.textContent = item.precoAtual;
  if (discountEl) discountEl.textContent = item.desconto;
  if (storeEl) storeEl.textContent = item.loja === 'Shopee' ? '🛍️ Shopee' : '💛 Mercado Livre';
  if (ratingEl) ratingEl.textContent = `★ ${item.avaliacao} (${item.vendas})`;
  if (btnEl) btnEl.href = item.link;
}

/**
 * Renderiza os chips de categorias
 */
function renderCategories() {
  const container = document.getElementById('categoriesContainer');
  if (!container) return;

  container.innerHTML = CONFIG.CATEGORIAS.map(cat => `
    <button class="category-chip ${cat.id === 'todas' ? 'active' : ''}" data-category="${cat.id}" aria-label="Filtrar por ${cat.nome}">
      <span class="cat-emoji">${cat.emoji}</span>
      <span class="cat-name">${cat.nome}</span>
    </button>
  `).join('');

  // Eventos de clique nas categorias
  container.querySelectorAll('.category-chip').forEach(button => {
    button.addEventListener('click', () => {
      const catId = button.getAttribute('data-category');
      
      // Atualizar classe ativa
      container.querySelectorAll('.category-chip').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filtrar produtos
      filterByCategory(catId);
    });
  });
}

/**
 * Filtra produtos por categoria e faz scroll suave para a vitrine
 */
function filterByCategory(catId) {
  const statusRow = document.getElementById('filterStatusRow');
  const statusText = document.getElementById('filterStatusText');
  const catObj = CONFIG.CATEGORIAS.find(c => c.id === catId);

  currentCategory = catId;

  if (catId === 'todas') {
    statusText.textContent = 'Mostrando todos os achadinhos';
  } else {
    statusText.textContent = `Filtrado por: ${catObj ? catObj.emoji + ' ' + catObj.nome : catId}`;
  }

  renderProducts();

  // Scroll suave até a seção de produtos se o usuário clicou na categoria
  const vitrineSection = document.getElementById('vitrineProdutos');
  if (vitrineSection) {
    const yOffset = -20;
    const y = vitrineSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

/**
 * Renderiza o grid de produtos com base no filtro e na busca
 */
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  // Filtragem
  const filtered = CONFIG.PRODUTOS.filter(prod => {
    // Filtro por Categoria
    let matchesCategory = true;
    if (currentCategory !== 'todas') {
      if (currentCategory === 'shopee') {
        matchesCategory = prod.tagOrigem.toLowerCase() === 'shopee';
      } else if (currentCategory === 'mercadolivre') {
        matchesCategory = prod.tagOrigem.toLowerCase().includes('mercado');
      } else if (currentCategory === 'ofertas') {
        matchesCategory = prod.selo.includes('🔥') || prod.desconto.includes('50%');
      } else {
        matchesCategory = prod.categoria.toLowerCase() === currentCategory.toLowerCase();
      }
    }

    // Filtro por Busca
    let matchesSearch = true;
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      matchesSearch = prod.nome.toLowerCase().includes(term) ||
                      prod.categoria.toLowerCase().includes(term) ||
                      prod.tagOrigem.toLowerCase().includes(term);
    }

    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="products-empty">
        <p>Nenhum achadinho encontrado para essa busca 🥺</p>
        <button class="reset-filter-btn" onclick="resetFilters()">Limpar filtros e ver tudo</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(prod => `
    <article class="product-card" id="${prod.id}">
      <div class="product-thumb-wrap">
        <img src="${prod.imagem}" alt="${prod.nome}" class="product-thumb" loading="lazy">
        <span class="product-badge-badge">${prod.selo}</span>
        <span class="product-discount-pill">${prod.desconto}</span>
      </div>
      <div class="product-info">
        <div class="product-meta-row">
          <span class="product-platform ${prod.tagOrigem.toLowerCase() === 'shopee' ? 'shopee' : 'ml'}">
            ${prod.tagOrigem === 'Shopee' ? '🛍️ Shopee' : '💛 Mercado Livre'}
          </span>
          <span class="product-rating">★ ${prod.avaliacao}</span>
        </div>
        <h3 class="product-title" title="${prod.nome}">${prod.nome}</h3>
        <div class="product-pricing">
          <span class="product-old-price">R$ ${prod.precoAntigo}</span>
          <div class="product-cur-price">
            <span class="prod-curr-symbol">R$</span>
            <span class="prod-curr-value">${prod.precoAtual}</span>
          </div>
        </div>
        <a href="${prod.link}" target="_blank" rel="noopener noreferrer" class="btn-product-cta">
          <span>Ver achadinho</span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </article>
  `).join('');
}

/**
 * Reseta filtros e busca
 */
window.resetFilters = function() {
  currentCategory = 'todas';
  searchTerm = '';
  
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  
  const clearBtn = document.getElementById('clearSearch');
  if (clearBtn) clearBtn.classList.remove('visible');

  const catChips = document.querySelectorAll('.category-chip');
  catChips.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-category') === 'todas');
  });

  const statusText = document.getElementById('filterStatusText');
  if (statusText) statusText.textContent = 'Mostrando todos os achadinhos';

  renderProducts();
};

/**
 * Eventos da barra de pesquisa e botão de limpar
 */
function initSearchAndFilterEvents() {
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearch');
  const resetBtn = document.getElementById('resetFilterBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      if (clearBtn) {
        clearBtn.classList.toggle('visible', searchTerm.length > 0);
      }
      renderProducts();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchTerm = '';
      clearBtn.classList.remove('visible');
      renderProducts();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      window.resetFilters();
    });
  }
}

/**
 * Renderiza os cupons com cópia rápida
 */
function renderCoupons() {
  const container = document.getElementById('couponsContainer');
  if (!container) return;

  container.innerHTML = CONFIG.CUPONS.map(cupom => `
    <div class="coupon-card">
      <div class="coupon-head">
        <span class="coupon-store-pill">${cupom.icone} ${cupom.loja}</span>
        <span class="coupon-value">${cupom.desconto}</span>
      </div>
      <h3 class="coupon-title">${cupom.titulo}</h3>
      <p class="coupon-rule">${cupom.regras}</p>
      <div class="coupon-action-row">
        <button class="btn-copy-coupon" data-code="${cupom.codigo}" onclick="copyCouponCode('${cupom.codigo}', this)">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span class="btn-code-text">${cupom.codigo}</span>
        </button>
      </div>
    </div>
  `).join('');
}

/**
 * Copia código do cupom para a área de transferência
 */
window.copyCouponCode = function(code, buttonElement) {
  navigator.clipboard.writeText(code).then(() => {
    // Feedback no botão
    const originalText = buttonElement.innerHTML;
    buttonElement.classList.add('copied');
    buttonElement.innerHTML = `
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>COPIADO!</span>
    `;

    // Toast flutuante
    showToast(`Cupom <strong>${code}</strong> copiado com sucesso! 🎉`);

    setTimeout(() => {
      buttonElement.classList.remove('copied');
      buttonElement.innerHTML = originalText;
    }, 2200);
  }).catch(() => {
    showToast(`Código do cupom: ${code}`);
  });
};

/**
 * Timer regressivo para o Achadinho do Dia
 */
function initCountdownTimer() {
  const timerEl = document.getElementById('timerValue');
  if (!timerEl) return;

  // Define 4 horas e 32 minutos a partir de agora
  let totalSeconds = (4 * 3600) + (32 * 60) + 15;

  setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
    } else {
      totalSeconds = 86400; // Reset para o próximo dia
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n) => n.toString().padStart(2, '0');
    timerEl.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }, 1000);
}

/**
 * Barra VIP flutuante que aparece ao descer a página
 */
function initFloatingVipBar() {
  const floatingBar = document.getElementById('floatingVipBar');
  if (!floatingBar) return;

  window.addEventListener('scroll', () => {
    // Mostra após rolar 260px
    if (window.scrollY > 260) {
      floatingBar.classList.add('visible');
    } else {
      floatingBar.classList.remove('visible');
    }
  }, { passive: true });
}

/**
 * Notificações tipo Toast elegantes
 */
function showToast(htmlMessage) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = htmlMessage;

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 3200);
}

/**
 * Notificações ocasionais de prova social (mais conversão)
 */
function initSocialProofPopups() {
  const cidades = ['São Paulo', 'Rio de Janeiro', 'Curitiba', 'Belo Horizonte', 'Salvador', 'Fortaleza', 'Campinas', 'Brasília'];
  const nomes = ['Larissa', 'Beatriz', 'Mariana', 'Camila', 'Fernanda', 'Juliana', 'Amanda', 'Bruna'];

  const triggerSocialToast = () => {
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const cidade = cidades[Math.floor(Math.random() * cidades.length)];
    showToast(`✨ <strong>${nome}</strong> acabou de entrar no Clube da Sô!`);
  };

  // Primeira notificação após 8 segundos
  setTimeout(triggerSocialToast, 8000);

  // Notificações subsequentes a cada 45 segundos
  setInterval(triggerSocialToast, 45000);
}
