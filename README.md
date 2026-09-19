# WealthLedger v9

Updated portfolio dashboard with current-price refresh plus optional historical-price alerts.

## Price history sheet
Create a viewable Google Sheets tab with columns: Date, Symbol, Price. Keep at least 10 trading days of daily observations.

In Settings → Price history & alerts, paste the link to that tab (include its gid). Refreshing the portfolio loads current prices, loads history, calculates 1/3/7/14/30 trading-day percentage moves, and shows alerts when configured thresholds are crossed.

The app remains browser-local and uses the existing Google Sheets viewer integration; it does not write back to the spreadsheet.
