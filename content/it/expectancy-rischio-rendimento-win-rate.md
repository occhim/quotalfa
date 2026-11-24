---
id: expectancy
order: 7
title: "Expectancy: perché un win rate del 70% può farti perdere soldi"
description: "La formula che dice se un sistema di trading ha un vantaggio: come combinare win rate e rapporto rischio/rendimento, con esempi e tabella di pareggio."
date: "2026-11-12"
pillar: trading
cover: /images/cover-expectancy.svg
coverAlt: "Istogramma dei risultati di un sistema: molte piccole perdite e meno vincite di dimensione maggiore"
---

Sette operazioni vinte su dieci e il conto scende comunque. Succede più spesso di quanto si pensi, e chi ci si trova di solito cerca un ingresso migliore, quando il problema è altrove. Finché non conosci un solo numero del tuo sistema, non sai se stai lavorando o giocando. Quel numero si chiama expectancy, e lo calcoli in due minuti.

## Cos’è l’expectancy

È il risultato medio che puoi attenderti da ogni operazione, su un numero ampio di operazioni. Si esprime in R, cioè in multipli del rischio assunto: se rischi 100 € per trade, 1R vale 100 €.

### La formula

**Expectancy = (Win rate × Vincita media) − (Loss rate × Perdita media)**

Un valore positivo indica un vantaggio statistico. Uno negativo indica che, continuando, perderai: non è questione di sfortuna, è questione di tempo.

## Due sistemi a confronto

### Sistema A: vince poco, guadagna

- Win rate 40%, vincita media 2R, perdita media 1R
- Expectancy = (0,40 × 2) − (0,60 × 1) = **+0,20R per trade**

Su 100 operazioni con 100 € di rischio: circa +2.000 €, prima dei costi.

### Sistema B: vince spesso, perde

- Win rate 70%, vincita media 0,3R, perdita media 1R
- Expectancy = (0,70 × 0,3) − (0,30 × 1) = **−0,09R per trade**

Su 100 operazioni: circa −900 €. Sette trade su dieci sono in guadagno e il sistema distrugge capitale. È il profilo tipico di chi chiude subito i guadagni e lascia correre le perdite.

## Il win rate di pareggio

Ogni rapporto tra vincita e perdita media ha una soglia minima di operazioni vincenti sotto la quale si perde.

![Win rate minimo per il pareggio in base al rapporto rendimento/rischio](/images/fig-expectancy-it.svg)

| Vincita media : perdita media | Win rate di pareggio |
|---|---|
| 0,5 : 1 | 66,7% |
| 1 : 1 | 50,0% |
| 2 : 1 | 33,3% |
| 3 : 1 | 25,0% |

La formula è: perdita media ÷ (vincita media + perdita media). Con un rapporto 2:1 puoi sbagliare due operazioni su tre e restare in pari.

## Tre cose che la formula non dice

### I costi

Commissioni, spread e slippage si sottraggono a ogni operazione. Un sistema da +0,10R lordi con costi pari a 0,12R per trade è un sistema in perdita. Calcola sempre l’expectancy al netto.

### La dimensione del campione

Dieci operazioni non dimostrano nulla. Servono almeno cento trade, eseguiti con le stesse regole, perché il numero abbia un significato. Prima di allora stai misurando il caso.

### La sequenza

Un’expectancy positiva non esclude serie negative lunghe. Con un win rate del 40%, dieci stop consecutivi sono un evento raro ma tutt’altro che impossibile su qualche centinaio di operazioni. Per questo l’expectancy va sempre abbinata a un rischio per trade contenuto.

## Come calcolare la tua

1. Registra ogni operazione in un diario: rischio iniziale ed esito in R.
2. Dopo cento trade, calcola win rate, vincita media e perdita media.
3. Applica la formula, sottraendo i costi medi.
4. Ripeti il calcolo per singolo setup: spesso uno solo genera tutto il vantaggio.

## In sintesi

Il win rate dice quanto spesso hai ragione; l’expectancy dice se avere ragione ti rende qualcosa. Un sistema si giudica dal secondo numero, mai dal primo.

**Calcola la tua adesso:** inserisci i tuoi dati nel [calcolatore di expectancy](/it/tools#expectancy). Se non li hai, il modello di diario è nella [Checklist Pre-Trade](/it/checklist).
