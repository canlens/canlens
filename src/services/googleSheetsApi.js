export const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL || '';

async function gasGet(path = 'products', params = {}) {
  if (!SCRIPT_URL) {
    throw new Error('VITE_SCRIPT_URL is not configured. Add it to your .env file.');
  }

  const query = new URLSearchParams({ ...params, path });
  const url = `${SCRIPT_URL}?${query.toString()}`;

  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok) {
    throw new Error(`Network error: ${response.status}`);
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Unknown error from server');
  }
  return data;
}

export async function getProducts() {
  const data = await gasGet('products');
  return data.data || [];
}

export async function getGlobalProducts() {
  const data = await gasGet('global-products');
  return data.data || [];
}

export async function getPortfolioItems() {
  const data = await gasGet('portfolio');
  return data.data || [];
}
