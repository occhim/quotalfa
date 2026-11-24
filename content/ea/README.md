# Schede Expert Advisor

Un file Markdown per EA e per lingua:

- `content/ea/en/<slug-inglese>.md`
- `content/ea/it/<slug-italiano>.md`

Lo stesso `id` nei due file collega le versioni linguistiche. Metti `draft: true` per tenere una scheda nascosta.
Le date vanno tra virgolette. Ogni numero deve venire dai report reali (Strategy Tester, estratto conto demo/reale).

Campi: id, name, title, description, updated, author (true se sviluppato da Marco Occhipinti), status (development | demo | live | retired), platform, symbol, timeframe, version, availability, link, linkLabel, backtest {period, model, deposit, risk, costs, trades, winRate, profitFactor, expectancy, maxDrawdown, netResult}, forward {start, end, account, broker, trades, maxDrawdown, netResult}.

Corpo consigliato: ## Come funziona, ## Parametri principali, ## Risultati e limiti, ## Per chi non è adatto.
