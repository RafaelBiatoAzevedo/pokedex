import { afterEach, describe, expect, it, vi } from 'vitest';
import { api, matches, number } from './api';
afterEach(() => vi.unstubAllGlobals());
describe('busca do catálogo', () => {
  it('busca nomes sem diferenciar maiúsculas e números exatos com zeros', () => {
    expect(matches('pikachu', 25, ' PIKA ')).toBe(true);
    expect(matches('pikachu', 25, '#0025')).toBe(true);
    expect(matches('pikachu', 25, '2')).toBe(false);
    expect(matches('pikachu', 25, 'bulbasaur')).toBe(false);
    expect(matches('pikachu', 25, '')).toBe(true);
    expect(number(25)).toBe('#0025');
  });
});
describe('cliente PokéAPI', () => {
  it('reutiliza consultas simultâneas e guarda a resposta em cache', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ id: 25 }) });
    vi.stubGlobal('fetch', fetchMock);
    const [a, b] = await Promise.all([api('pokemon/cache-test'), api('pokemon/cache-test')]);
    expect(a).toEqual({ id: 25 }); expect(b).toEqual(a);
    await api('pokemon/cache-test'); expect(fetchMock).toHaveBeenCalledTimes(1);
  });
  it('permite repetir uma requisição após falha', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({ ok: false }).mockResolvedValueOnce({ ok: true, json: async () => ({ id: 1 }) });
    vi.stubGlobal('fetch', fetchMock);
    await expect(api('pokemon/retry-test')).rejects.toThrow();
    await expect(api('pokemon/retry-test')).resolves.toEqual({ id: 1 });
  });
});
