function escapeHtml(str) {
  return str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

describe('escapeHtml', () => {
  test('deve escapar caracteres especiais HTML', () => {
    const input = '<script>alert("XSS")</script>';
    const expected = '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;';
    expect(escapeHtml(input)).toBe(expected);
  });

  test('deve escapar aspas simples', () => {
    expect(escapeHtml("It's a test")).toBe('It&#039;s a test');
  });

  test('deve escapar ampersand', () => {
    expect(escapeHtml('A & B')).toBe('A &amp; B');
  });

  test('deve retornar string normal sem caracteres especiais', () => {
    expect(escapeHtml('Hello World')).toBe('Hello World');
  });

  test('deve lidar com strings vazias', () => {
    expect(escapeHtml('')).toBe('');
  });
});
