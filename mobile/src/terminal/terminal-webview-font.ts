import { ORCA_NERD_FONT_SYMBOLS_DATA_URI } from './terminal-webview-engine.generated'

export const TERMINAL_SYMBOL_FONT_FAMILY = 'Orca Nerd Font Symbols'

// Why: the inline WebView document cannot resolve Metro asset URLs consistently
// across iOS and Android, so the build embeds this offline fallback as a data URI.
export const TERMINAL_SYMBOL_FONT_CSS = `@font-face {
  font-family: '${TERMINAL_SYMBOL_FONT_FAMILY}';
  src: url('${ORCA_NERD_FONT_SYMBOLS_DATA_URI}') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  unicode-range: U+E000-F8FF, U+F0000-FFFFD, U+100000-10FFFD;
}`

// Why: xterm's WebGL atlas does not invalidate glyphs drawn while a web font is
// decoding, so queued terminal bytes must wait until this local font settles.
export const TERMINAL_SYMBOL_FONT_READY_JS = `var symbolFontReady = Promise.resolve();
if (document.fonts && typeof document.fonts.load === 'function') {
  symbolFontReady = document.fonts
    .load('400 13px "${TERMINAL_SYMBOL_FONT_FAMILY}"', String.fromCharCode(0xe0b0))
    .then(function() {}, function() {});
}
function afterSymbolFontReadyFrame(callback) {
  symbolFontReady.then(function() { requestAnimationFrame(callback); });
}`
