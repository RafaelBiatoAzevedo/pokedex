export interface Resource { name: string; url: string }
export interface Pokemon { id: number; name: string; height: number; weight: number; types: { type: Resource }[]; abilities: { ability: Resource; is_hidden: boolean }[]; stats: { base_stat: number; stat: Resource }[]; sprites: { other: { 'official-artwork': { front_default: string | null; front_shiny: string | null } } } }
export interface Species { flavor_text_entries: { flavor_text: string; language: Resource }[]; genera: { genus: string; language: Resource }[]; generation: Resource; is_legendary: boolean; is_mythical: boolean }
const cache = new Map<string, unknown>();
const pending = new Map<string, Promise<unknown>>();
export async function api<T>(path: string): Promise<T> {
  if (cache.has(path)) return cache.get(path) as T;
  if (pending.has(path)) return pending.get(path) as Promise<T>;
  const request = fetch(`https://pokeapi.co/api/v2/${path}`, { signal: AbortSignal.timeout(15000) }).then(async r => {
    if (!r.ok) throw new Error('Não foi possível acessar a PokéAPI.');
    const data: T = await r.json(); cache.set(path, data); return data;
  }).finally(() => pending.delete(path));
  pending.set(path, request); return request;
}
export const artwork = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
export const number = (id: number) => `#${String(id).padStart(4, '0')}`;
export const names: Record<string, string> = { normal: 'Normal', fire: 'Fogo', water: 'Água', electric: 'Elétrico', grass: 'Planta', ice: 'Gelo', fighting: 'Lutador', poison: 'Veneno', ground: 'Terra', flying: 'Voador', psychic: 'Psíquico', bug: 'Inseto', rock: 'Pedra', ghost: 'Fantasma', dragon: 'Dragão', dark: 'Sombrio', steel: 'Aço', fairy: 'Fada' };
export const regions = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar', 'Paldea'];
export function matches(name: string, id: number, query: string) { const q = query.trim().toLowerCase().replace(/^#/, ''); return !q || name.includes(q) || (/^\d+$/.test(q) && id === Number(q)); }
