---
id: expectancy
order: 7
title: "Expectancy: Why a 70% Win Rate Can Still Lose You Money"
description: "The formula that tells you whether a trading system has an edge: how to combine win rate and risk/reward, with examples and a breakeven table."
date: "2026-11-12"
pillar: trading
cover: /images/cover-expectancy.svg
coverAlt: "Histogram of a system’s results: many small losses and fewer, larger wins"
---

Seven winning trades out of ten and the account still shrinks. It happens more often than people think, and those it happens to usually go looking for a better entry when the problem lies elsewhere. Until you know one number about your system, you cannot tell whether you are working or gambling. That number is expectancy, and it takes two minutes to calculate.

## What expectancy is

It is the average result you can expect from each trade over a large number of trades. It is expressed in R, multiples of the risk taken: if you risk €100 per trade, 1R is €100.

### The formula

**Expectancy = (Win rate × Average win) − (Loss rate × Average loss)**

A positive value indicates a statistical edge. A negative one means that if you carry on, you will lose: it is not a matter of luck but of time.

## Two systems compared

### System A: wins rarely, makes money

- Win rate 40%, average win 2R, average loss 1R
- Expectancy = (0.40 × 2) − (0.60 × 1) = **+0.20R per trade**

Over 100 trades risking €100 each: about +€2,000, before costs.

### System B: wins often, loses money

- Win rate 70%, average win 0.3R, average loss 1R
- Expectancy = (0.70 × 0.3) − (0.30 × 1) = **−0.09R per trade**

Over 100 trades: about −€900. Seven trades in ten are winners and the system destroys capital. It is the typical profile of someone who banks gains quickly and lets losses run.

## The breakeven win rate

Every ratio of average win to average loss has a minimum share of winners below which you lose.

![Minimum win rate to break even by reward/risk ratio](/images/fig-expectancy-en.svg)

| Average win : average loss | Breakeven win rate |
|---|---|
| 0.5 : 1 | 66.7% |
| 1 : 1 | 50.0% |
| 2 : 1 | 33.3% |
| 3 : 1 | 25.0% |

The formula is: average loss ÷ (average win + average loss). At 2:1 you can be wrong on two trades out of three and still break even.

## Three things the formula leaves out

### Costs

Commissions, spread and slippage come off every trade. A system grossing +0.10R with costs of 0.12R per trade is a losing system. Always compute expectancy net.

### Sample size

Ten trades prove nothing. You need at least a hundred, executed under the same rules, for the number to mean anything. Before that you are measuring chance.

### Sequence

Positive expectancy does not rule out long losing runs. With a 40% win rate, ten straight losses are rare but far from impossible over a few hundred trades. That is why expectancy must always be paired with small risk per trade.

## How to calculate yours

1. Log every trade in a journal: initial risk and result in R.
2. After a hundred trades, compute win rate, average win and average loss.
3. Apply the formula, subtracting average costs.
4. Repeat per setup: often a single one generates the whole edge.

## The bottom line

Win rate tells you how often you are right; expectancy tells you whether being right pays. Judge a system by the second number, never the first.

**Calculate yours now:** enter your figures in the [expectancy calculator](/en/tools#expectancy). If you do not have them yet, the journal template is in the [Pre-Trade Checklist](/en/checklist).
