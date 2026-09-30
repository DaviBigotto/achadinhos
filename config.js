/**
 * CONFIGURAÇÃO CENTRAL - ACHADINHOS DA SO
 * =====================================
 * Edite facilmente os links, cupons e a lista de produtos aqui.
 * Tudo na página é atualizado automaticamente ao alterar este arquivo.
 */

window.CONFIG = {
  // LINKS PRINCIPAIS (Altere para seus links reais)
  LINKS: {
    VIP_GROUP_URL: "https://chat.whatsapp.com/seu-grupo-vip-achadinhos-so",
    SHOPEE_URL: "https://shopee.com.br/achadinhos-da-so",
    MERCADO_LIVRE_URL: "https://mercadolivre.com.br/achadinhos-da-so",
    INSTAGRAM_URL: "https://instagram.com/achadinhosdaso",
    TIKTOK_URL: "https://tiktok.com/@achadinhosdaso",
    TELEGRAM_URL: "https://t.me/achadinhosdaso",
  },

  // CUPONS DE DESCONTO
  CUPONS: [
    {
      id: "shopee",
      titulo: "Cupom Shopee",
      codigo: "SO15OFF",
      desconto: "15% OFF",
      regras: "Em compras acima de R$ 59",
      loja: "Shopee",
      icone: "🛍️",
      link: "https://shopee.com.br"
    },
    {
      id: "mercadolivre",
      titulo: "Cupom Mercado Livre",
      codigo: "SO20OFF",
      desconto: "R$ 20 OFF",
      regras: "Válido para produtos selecionados",
      loja: "Mercado Livre",
      icone: "💛",
      link: "https://mercadolivre.com.br"
    },
    {
      id: "relampago",
      titulo: "Ofertas Relâmpago",
      codigo: "ACHADINHOS",
      desconto: "Até 70% OFF",
      regras: "Atualizadas a cada 6 horas",
      loja: "Todas",
      icone: "⚡",
      link: "https://shopee.com.br"
    },
    {
      id: "frete",
      titulo: "Frete Grátis",
      codigo: "FRETELIVRE",
      desconto: "Frete 0800",
      regras: "Sem valor mínimo no app",
      loja: "Shopee",
      icone: "🚚",
      link: "https://shopee.com.br"
    }
  ],

  // DESTAQUE ESPECIAL: ACHADINHO DO DIA
  ACHADINHO_DO_DIA: {
    nome: "Escova Secadora & Modeladora Oval 4 em 1 Glam Rosé",
    descricao: "Meninas, essa é a escova que deixa o cabelo de salão em 10 minutos! Cerdas ionizadas anti-frizz e potência surreal. O menor preço do ano!",
    imagem: "assets/product-destaque.jpg",
    precoAtual: "119,90",
    precoAntigo: "239,90",
    desconto: "-50%",
    selo: "💖 ACHADINHO DO DIA",
    cupom: "SO10",
    loja: "Shopee",
    avaliacao: "4.9",
    vendas: "14.2k vendidos",
    link: "https://shopee.com.br/produto-placeholder-escova-secadora"
  },

  // LISTA DE CATEGORIAS
  CATEGORIAS: [
    { id: "todas", nome: "Todas as Ofertas", emoji: "✨", cor: "pink" },
    { id: "skincare", nome: "Skincare", emoji: "💗", cor: "rose" },
    { id: "maquiagem", nome: "Maquiagem", emoji: "💄", cor: "coral" },
    { id: "cabelo", nome: "Cabelo", emoji: "🧴", cor: "lavender" },
    { id: "autocuidado", nome: "Autocuidado", emoji: "🛁", cor: "blush" },
    { id: "casa", nome: "Casa & Décor", emoji: "🏠", cor: "warm" },
    { id: "shopee", nome: "Shopee", emoji: "🛍️", cor: "orange" },
    { id: "mercadolivre", nome: "Mercado Livre", emoji: "💛", cor: "yellow" },
    { id: "ofertas", nome: "Super Ofertas", emoji: "🔥", cor: "red" }
  ],

  // VITRINE PRINCIPAL DE PRODUTOS
  PRODUTOS: [
    {
      id: "prod-1",
      nome: "Sérum Facial Aura Glow - Vitamina C & Ácido Hialurônico 30ml",
      categoria: "skincare",
      tagOrigem: "Shopee",
      selo: "🔥 MAIS VENDIDO",
      imagem: "assets/product-serum.jpg",
      precoAtual: "38,90",
      precoAntigo: "79,90",
      desconto: "-51%",
      avaliacao: "4.9",
      vendidos: "8.4k",
      link: "https://shopee.com.br/produto-placeholder-serum"
    },
    {
      id: "prod-2",
      nome: "Nourishing Lip Oil Hidratante Gloss Efeito Preenchimento",
      categoria: "maquiagem",
      tagOrigem: "Shopee",
      selo: "💄 TENDÊNCIA TIKTOK",
      imagem: "assets/product-lipoil.jpg",
      precoAtual: "24,50",
      precoAntigo: "49,90",
      desconto: "-50%",
      avaliacao: "4.8",
      vendidos: "12.1k",
      link: "https://shopee.com.br/produto-placeholder-lipoil"
    },
    {
      id: "prod-3",
      nome: "Organizador Giratório 360° Acrílico Transparente para Make & Skincare",
      categoria: "casa",
      tagOrigem: "Mercado Livre",
      selo: "⭐ NOTA MÁXIMA",
      imagem: "assets/product-organizer.jpg",
      precoAtual: "59,90",
      precoAntigo: "110,00",
      desconto: "-45%",
      avaliacao: "5.0",
      vendidos: "5.7k",
      link: "https://mercadolivre.com.br/produto-placeholder-organizador"
    },
    {
      id: "prod-4",
      nome: "Kit 12 Pincéis de Maquiagem Profissional Rosé Velvet com Estojo",
      categoria: "maquiagem",
      tagOrigem: "Shopee",
      selo: "💖 QUERIDINHO",
      imagem: "assets/product-brushes.jpg",
      precoAtual: "44,90",
      precoAntigo: "89,90",
      desconto: "-50%",
      avaliacao: "4.9",
      vendidos: "9.3k",
      link: "https://shopee.com.br/produto-placeholder-pinceis"
    },
    {
      id: "prod-5",
      nome: "Máscara Capilar Lumière Reparação Profunda Óleo de Rosa Mosqueta 250g",
      categoria: "cabelo",
      tagOrigem: "Mercado Livre",
      selo: "✨ CABELO DE SALÃO",
      imagem: "assets/product-hairmask.jpg",
      precoAtual: "49,90",
      precoAntigo: "92,00",
      desconto: "-46%",
      avaliacao: "4.9",
      vendidos: "6.2k",
      link: "https://mercadolivre.com.br/produto-placeholder-mascara"
    },
    {
      id: "prod-6",
      nome: "Mini Difusor & Umidificador Ultrassônico de Mesa com Led Calmaria",
      categoria: "autocuidado",
      tagOrigem: "Shopee",
      selo: "🛁 ACONCHEGO",
      imagem: "assets/product-diffuser.jpg",
      precoAtual: "34,90",
      precoAntigo: "68,00",
      desconto: "-48%",
      avaliacao: "4.8",
      vendidos: "11.5k",
      link: "https://shopee.com.br/produto-placeholder-difusor"
    }
  ]
};
