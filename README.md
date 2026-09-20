Equity - WealthLedger v22

This release keeps the reference-style UI and fixes / adds:
- Reports and Help are now real navigation sections rather than dead tabs.
- The “Go to Portfolio” growth CTA now opens the Portfolio view.
- Live market ticker now fetches NIFTY 50, SENSEX and BANK NIFTY through the Angel One Worker.
- Portfolio refresh also refreshes the market ticker.
- Report summary cards mirror the live Net P&L, XIRR and realized P&L.
- Help includes workflow guidance and troubleshooting shortcuts.
- Existing holdings, transactions, FIFO, XIRR, Google Sheets fallback, backup/restore, Angel One mapping, alerts and PWA behavior are retained.

GitHub Pages:
Upload all website files at this folder to the repository root.

Cloudflare Worker:
Deploy the worker.js from the separate v22 Worker package to the existing wealthledger-angel-bridge Worker. Keep your existing four encrypted secrets.
