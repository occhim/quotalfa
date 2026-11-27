---
id: trend-following-basic-rules
order: 16
title: "Trend following: le regole di base per seguire il trend con metodo"
description: "Le regole di base del trend following: come definire il trend, entrare, mettere lo stop, dimensionare la posizione e reggere le serie di perdite."
date: "2026-11-27"
pillar: trading
coverAlt: "Linea astratta in salita che attraversa fasce di colore sovrapposte"
---

Il trend following è uno degli approcci sistematici più antichi del trading e anche uno dei più fraintesi. L'idea sembra banale: comprare ciò che sale, vendere ciò che scende. Il difficile è la disciplina. La maggior parte dei sistemi di trend chiude in perdita più operazioni di quante ne vinca, attraversa lunghe fasi piatte e costruisce il risultato su pochi movimenti ampi. Se non conosci questo profilo prima di iniziare, abbandonerai il metodo proprio nel momento sbagliato. Ecco le regole di base comuni a quasi tutti gli approcci, e il perché di ognuna.

## Che cos'è davvero il trend following

Il trend following non prevede dove andrà il prezzo: reagisce a dove è già andato. Parte dall'ipotesi che i mercati a volte si muovano in una direzione più a lungo di quanto ci si aspetti, così chi entra tardi ed esce tardi può comunque catturare la parte centrale del movimento. Due conseguenze:

- **Non compri mai sul minimo e non vendi mai sul massimo.** Entri quando il movimento è già partito ed esci quando è già finito.
- **Accetti molte piccole perdite.** La maggior parte delle rotture fallisce; il sistema le ripaga con i pochi trend che corrono lontano.

## Regola 1: definisci il trend in modo oggettivo

Il trend deve essere misurabile, non una sensazione. Tre definizioni diffuse:

| Metodo | Condizione long | Punto debole |
|---|---|---|
| Filtro con media mobile | Prezzo sopra la media mobile a 200 periodi | Lento nei punti di svolta |
| Incrocio di medie | Media a 50 periodi sopra quella a 200 | Molti falsi segnali in laterale |
| Rottura del canale di prezzo | Chiusura sopra il massimo delle ultime N barre | Entrata a prezzi già estesi |

La rottura del canale è spesso associata a Richard Donchian, le cui regole basate sui canali sono un riferimento classico del trading sistematico. Nessuno è migliore in assoluto: conta che la regola sia scritta.

## Regola 2: entra su conferma, non per speranza

L'entrata deve essere un evento meccanico: una chiusura sopra il canale, un incrocio, un nuovo massimo. Niente ingressi "perché sembra pronto": solo una regola applicata sempre allo stesso modo rende i risultati misurabili. Un'abitudine utile è prendere segnali long solo con il filtro di lungo periodo rialzista e segnali short solo con il filtro ribassista.

## Regola 3: lo stop va dove il trend è smentito

Lo stop iniziale indica il punto in cui la tua ipotesi di trend non regge più. Due approcci comuni:

- **Stop strutturale:** sotto l'ultimo minimo di swing (per un'operazione long).
- **Stop di volatilità:** un multiplo dell'Average True Range sotto l'entrata, così lo stop si adatta a quanto si muove il mercato. Ne abbiamo parlato in dettaglio in [ATR e stop loss: usare la volatilità per dimensionare lo stop](/it/blog/atr-stop-loss-volatilita-dimensionare-lo-stop).

I sistemi trend following richiedono di solito stop ampi. Uno stop dentro il normale rumore giornaliero trasforma un'operazione valida in una piccola perdita quasi certa.

## Regola 4: dimensiona ogni posizione sul rischio

Con stop larghi e diversi da mercato a mercato, la size va calcolata, non stimata a occhio:

**Size = (Capitale × Rischio %) ÷ Distanza dello stop**

Esempio: conto da 10.000 €, rischio dell'1% per operazione, entrata a 105,00, ATR pari a 2,00 e stop a 3 × ATR = 6,00 sotto l'entrata (99,00).

- Importo a rischio: 10.000 × 0,01 = 100 €
- Size: 100 ÷ 6,00 ≈ 16,6 unità

Se lo stop scatta perdi circa 100 €, qualunque sia la volatilità del mercato. Se operi con prodotti a leva come CFD o forex, ricorda che la maggior parte dei conti retail su questi strumenti perde denaro e che la leva amplifica ogni errore di dimensionamento.

## Regola 5: lascia correre i profitti con un'uscita mobile

Il vantaggio sta nell'uscita: chiudere presto i guadagni distrugge i pochi grandi profitti che pagano tutto il resto. Uscite mobili tipiche:

- Uscire quando il prezzo chiude sotto un canale più corto (per esempio il minimo delle ultime 20 barre).
- Uscire alla chiusura sotto una media mobile.
- Seguire il prezzo con uno stop a un multiplo fisso di ATR sotto la chiusura più alta dall'entrata.

In un sistema di trend lo stop si muove solo nella direzione del trade, mai più lontano.

## Regola 6: metti in conto lunghe serie di perdite

Qui la matematica è decisiva. Ipotizza un sistema che vince il 35% delle volte, con guadagno medio di 3R e perdita media di 1R (R = importo rischiato).

**Expectancy = (0,35 × 3) − (0,65 × 1) = 1,05 − 0,65 = +0,40R per operazione**

È positiva, ma il tasso di perdita è del 65%. La probabilità di dieci perdite consecutive in una data sequenza di dieci operazioni è 0,65^10 ≈ 1,3%. Con l'1% di rischio per trade, dieci perdite di fila tolgono circa il 10% del conto; con il 5% ne toglierebbero circa il 40%. Il quadro completo è in [expectancy: perché un win rate alto può farti perdere](/it/blog/expectancy-rischio-rendimento-win-rate).

## Regola 7: prima verifica, poi fidati

Prima di usare denaro reale con qualsiasi regola di trend:

1. Scrivi ogni regola: filtro, entrata, stop, size, uscita.
2. Testa su più mercati e periodi lunghi, comprese le fasi laterali, con costi realistici (spread, commissioni, slippage, finanziamento).
3. Fai girare il sistema su demo o con size minima e confronta il comportamento reale con il test.

Un backtest o un periodo su demo non garantiscono risultati futuri.

## In sintesi

Il trend following scambia tante piccole perdite controllate con guadagni ampi ma rari. Le regole sono facili da scrivere e difficili da rispettare. Definisci il trend in modo oggettivo, dimensiona sul rischio, usa uscite mobili e prepara le serie di perdite prima che arrivino.

**Prima di adottare una regola di trend, inserisci il tuo win rate e il tuo rapporto rischio/rendimento nel [calcolatore di expectancy](/it/tools#expectancy) e verifica se i numeri reggono.**
