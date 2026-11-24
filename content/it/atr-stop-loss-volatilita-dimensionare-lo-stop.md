---
id: atr-stop-loss-volatility
order: 13
title: "ATR: usare la volatilità per dimensionare lo stop"
description: "Come funziona l'Average True Range, come impostare uno stop loss basato sull'ATR con un moltiplicatore e come ricavarne la size a rischio fisso."
date: "2026-11-24"
pillar: trading
coverAlt: "Linea di prezzo astratta dentro una fascia di colore che si allarga e si restringe"
---

Uno stop adatto a un mercato tranquillo diventa una trappola in un mercato nervoso. Se lo metti 50 centesimi sotto l'ingresso quando lo strumento si muove normalmente di un euro al giorno, il semplice rumore ti farà uscire prima che l'idea abbia il tempo di funzionare. Se invece lo allarghi troppo in una fase calma, restituisci molto più di quanto il setup giustifichi. L'Average True Range (ATR) misura quanto si sta muovendo davvero il mercato: lo stop si adatta alle condizioni, non a un numero tondo.

## Cosa misura l'ATR

L'ATR è stato introdotto da J. Welles Wilder nel 1978 e risponde a una sola domanda: **di quanto si muove in media il prezzo in una candela?** Non dice nulla sulla direzione. Un ATR in crescita significa candele più ampie; un ATR in calo indica un mercato che si sta calmando.

### Il true range, candela per candela

L'elemento di base è il true range (TR) di ogni candela, cioè la maggiore di tre distanze:

- Massimo − Minimo
- |Massimo − Chiusura precedente|
- |Minimo − Chiusura precedente|

Le ultime due servono a catturare i gap. Se un mercato chiude a 50,30 e il giorno dopo apre a 51,60, il semplice range massimo-minimo ignora quel salto; il true range no.

| Candela | Massimo | Minimo | Chiusura | Chiusura prec. | TR |
|---|---|---|---|---|---|
| 1 | 51,00 | 49,80 | 50,60 | 50,00 | 1,20 |
| 2 | 51,40 | 50,20 | 50,30 | 50,60 | 1,20 |
| 3 | 52,50 | 51,60 | 52,20 | 50,30 | 2,20 |
| 4 | 52,60 | 51,50 | 51,80 | 52,20 | 1,10 |
| 5 | 52,00 | 51,00 | 51,40 | 51,80 | 1,00 |

Nella candela 3 il range massimo-minimo è solo 0,90, ma il gap rispetto alla chiusura precedente porta il true range a 2,20.

### Dal true range all'ATR

L'ATR è la media degli ultimi *n* true range. La media semplice delle cinque candele qui sopra è (1,20 + 1,20 + 2,20 + 1,10 + 1,00) / 5 = **1,34**. La maggior parte delle piattaforme usa però la media smussata di Wilder:

**ATR di oggi = (ATR di ieri × (n − 1) + TR di oggi) / n**

Il valore convenzionale è n = 14. Periodi più brevi reagiscono prima, periodi più lunghi sono più stabili; usa lo stesso valore nei test e nell'operatività reale.

## Impostare uno stop con l'ATR

La regola è semplice: **distanza dello stop = k × ATR**, dove k è un moltiplicatore scelto da te.

- Posizione long: stop = ingresso − k × ATR
- Posizione short: stop = ingresso + k × ATR

Supponiamo di comprare a 50,00 con ATR(14) pari a 1,20 e k = 1,5. La distanza dello stop è 1,5 × 1,20 = 1,80, quindi lo stop va a 48,20.

### Come scegliere il moltiplicatore

Non esiste un k giusto per tutti. Un moltiplicatore piccolo contiene le perdite ma viene colpito più spesso dalle oscillazioni normali; uno grande sopravvive al rumore ma costa di più quando hai torto. Il valore adatto dipende da timeframe e strategia, e va scelto testandolo sui tuoi dati. Due controlli pratici:

1. **Incrocia con la struttura.** L'ATR dice quanto spazio serve al mercato; il grafico dice dove l'idea viene invalidata. Se 1,5 × ATR cade appena sopra un supporto evidente, porta lo stop oltre quel livello invece di lasciarlo dove si accumulano gli stop di tutti. La guida su [dove mettere lo stop loss](/it/blog/stop-loss-dove-metterlo-e-dove-no) approfondisce i livelli di invalidazione.
2. **Guarda il lato del profitto.** Uno stop più largo richiede un target proporzionalmente più lontano per mantenere lo stesso rapporto rischio-rendimento. Se il primo target realistico è a 1 ATR, uno stop a 2 ATR rende l'operazione poco interessante.

## Dallo stop alla size della posizione

È qui che l'ATR diventa uno strumento di gestione del rischio. Fissi quanto sei disposto a perdere per operazione e lasci che sia la distanza dello stop a stabilire quante unità comprare:

**Size = (Capitale × Rischio %) / Distanza dello stop**

Con un conto da 10.000 € e rischio dell'1%, il budget è 100 €. Con uno stop a 1,80: 100 / 1,80 = 55,5, arrotondato per difetto a **55 unità**, per un rischio effettivo di 55 × 1,80 = 99 €.

Ora la volatilità raddoppia e l'ATR sale a 2,40. La distanza dello stop diventa 1,5 × 2,40 = 3,60 e la size 100 / 3,60 = 27,7, cioè **27 unità**, con un rischio di 97,20 €. Il rischio in euro resta quasi invariato: sui mercati più volatili le posizioni si riducono da sole. La logica del rischio percentuale fisso è spiegata nell'articolo sulla [regola dell'1% nel position sizing](/it/blog/position-sizing-regola-dell-1-per-cento).

## L'ATR come trailing stop

L'ATR funziona anche in uscita. Un metodo diffuso consiste nel seguire il prezzo con uno stop posto al massimo più alto dall'ingresso meno k × ATR per un long (all'opposto per uno short). Lo stop si muove solo a tuo favore e segue la volatilità: non prenderà il top, ma lascia respirare il trend.

## I limiti da tenere presenti

- **L'ATR è espresso in unità di prezzo.** Un ATR di 1,20 non dice nulla senza conoscere il prezzo; per confrontare strumenti diversi usa l'ATR in percentuale del prezzo.
- **Guarda al passato.** L'ATR riflette le candele già chiuse. Un dato macro o una trimestrale possono generare un movimento molto più ampio di quanto suggerisca l'ATR recente.
- **I gap saltano gli stop.** Un ordine stop non garantisce il prezzo di esecuzione. In caso di gap l'uscita può avvenire ben oltre il livello, e la perdita reale superare quella pianificata.
- **I costi contano.** Spread e commissioni riducono di fatto la distanza utile dello stop: includili nel calcolo della size.
- **La leva amplifica tutto.** Se operi in CFD o forex con leva, ricorda che la maggior parte dei conti retail perde denaro con questi prodotti. Uno stop basato sulla volatilità gestisce il rischio, non lo elimina.

## In sintesi

L'ATR trasforma una domanda vaga, quanto spazio dare a questa operazione, in un numero che puoi calcolare e testare. Usa il true range per misurare la volatilità, un moltiplicatore per fissare lo stop, la struttura del grafico per rifinirlo e un rischio percentuale fisso per dimensionare la posizione, così che ogni operazione in perdita costi più o meno lo stesso.

**Prima della prossima operazione inserisci ingresso, stop basato sull'ATR e rischio percentuale nel [calcolatore di position size](/it/tools#position-size).**
