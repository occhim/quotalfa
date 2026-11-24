---
id: stop-loss-placement
order: 9
title: "Stop loss: dove metterlo (e dove no) per proteggere il conto"
description: "Dove posizionare lo stop loss: punto di invalidazione, struttura, volatilità e tempo. Gli errori più comuni e la formula per collegarlo alla size."
date: "2026-11-20"
pillar: trading
coverAlt: "Linea di prezzo astratta che scende verso una soglia orizzontale tratteggiata"
---

Lo stop loss è l'unico elemento di un trade che decidi prima di sapere come andrà. Ingresso e obiettivo possono essere aggiustati strada facendo; lo stop, se lo sposti nel momento sbagliato, trasforma una piccola perdita prevista in un danno serio. Eppure molti trader lo scelgono quasi a caso: una cifra tonda, una percentuale fissa, "quanto mi sento di perdere". Questa guida spiega da cosa deve dipendere la posizione dello stop e quali scelte conviene evitare.

## A cosa serve davvero lo stop loss

Lo stop non è un freno emotivo: è il **punto in cui l'idea del trade smette di essere valida**. Se compri perché il prezzo sta rispettando un supporto, lo stop va dove quel supporto si considera rotto. Raggiunto quel livello, il motivo per cui eri entrato non esiste più.

Da qui discende una regola d'ordine:

1. Prima individui il livello di invalidazione sul grafico.
2. Poi misuri la distanza tra ingresso e stop.
3. Solo alla fine calcoli quante unità comprare, in base al rischio che accetti.

Chi fa il contrario, cioè parte dalla perdita massima in euro e mette lo stop di conseguenza, piazza il livello dove il mercato non ha alcuna ragione di fermarsi.

## Dove metterlo: quattro criteri

### 1. Sotto (o sopra) la struttura

Il riferimento più usato è la struttura di prezzo: per un acquisto, sotto l'ultimo minimo rilevante o sotto la zona di supporto; per una vendita, sopra l'ultimo massimo o la resistenza. Se non hai familiarità con questi concetti, il ripasso è nella guida su [supporti, resistenze e struttura di mercato](/it/blog/price-action-supporti-resistenze-struttura-di-mercato).

### 2. Con un margine di sicurezza

I supporti sono zone, non righe esatte. Uno stop piazzato esattamente sul minimo precedente viene spesso toccato da oscillazioni minime prima che il prezzo riparta. Lasciare un margine oltre il livello, anche solo pari allo spread più una frazione dell'escursione tipica della candela, riduce le uscite causate dal rumore.

### 3. In proporzione alla volatilità

Uno stop di 50 centesimi può essere ampio su un titolo tranquillo e ridicolo su uno che si muove di 3 euro al giorno. Per questo molti trader misurano la distanza in multipli dell'**ATR** (Average True Range), l'escursione media delle ultime sedute. Lo approfondiremo in una guida dedicata; per ora basta il principio: lo stop deve stare fuori dalla normale oscillazione dello strumento sul timeframe che usi.

### 4. Nel tempo

Esiste anche lo **stop temporale**: se dopo un numero prestabilito di candele il trade non ha fatto ciò che ti aspettavi, esci. Non sostituisce lo stop di prezzo, ma libera capitale da posizioni ferme.

## Dove non metterlo

| Scelta | Perché è un problema |
| --- | --- |
| Esattamente su una cifra tonda | Molti ordini si accumulano lì; il prezzo tende a raggiungerla e a superarla di poco |
| Percentuale fissa per ogni trade (es. sempre -2%) | Ignora struttura e volatilità dello strumento |
| "Quanto sono disposto a perdere" in euro | Il mercato non conosce il tuo conto: il livello non ha significato tecnico |
| Troppo stretto per migliorare il rapporto rischio/rendimento | Il rapporto migliora sulla carta, ma le uscite per rumore aumentano |
| Spostato più lontano quando il prezzo si avvicina | Annulla il piano e fa crescere la perdita oltre il previsto |

Lo stop si può spostare solo **a favore**: verso il pareggio o a protezione di un profitto, mai per allargarlo.

## Collegare lo stop alla size: la formula

Una volta fissato lo stop, la dimensione della posizione si ricava così:

**Unità = Rischio in euro ÷ (Prezzo di ingresso − Prezzo di stop)**

Esempio di calcolo: conto da 10.000 €, rischio dell'1% = 100 €. Ingresso a 50,00 €, stop strutturale a 47,50 €. Distanza = 2,50 €. Unità = 100 ÷ 2,50 = **40 azioni**.

Se lo stop corretto fosse a 45,00 €, la distanza diventerebbe 5,00 € e le unità 20. Il rischio resta 100 € in entrambi i casi: cambia la quantità, non la perdita massima. È lo stesso meccanismo descritto nella guida sulla [regola dell'1%](/it/blog/position-sizing-regola-dell-1-per-cento).

## Gap e slippage: il limite dello stop

Un ordine stop normale, una volta raggiunto il prezzo, diventa un ordine al mercato. Se il titolo apre in gap sotto il tuo livello, ad esempio dopo una trimestrale, l'esecuzione avviene al primo prezzo disponibile, che può essere ben peggiore. Lo stop limita il rischio nelle condizioni ordinarie, non lo azzera. Per questo conviene:

- verificare il calendario di eventi (utili, dati macro) prima di aprire una posizione;
- considerare una size più piccola se mantieni la posizione attraverso un evento noto;
- conoscere i tipi di ordine offerti dal tuo broker e le loro condizioni.

## In sintesi

Lo stop loss va dove l'idea di trading viene smentita, con un margine oltre la struttura e una distanza coerente con la volatilità. La size si calcola dopo, partendo da quella distanza. Evita cifre tonde, percentuali fisse e stop allargati in corsa.

**[Calcola subito la size corretta per il tuo prossimo stop con il calcolatore di position sizing](/it/tools#position-size).**
