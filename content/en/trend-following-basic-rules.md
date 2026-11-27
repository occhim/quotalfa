---
id: trend-following-basic-rules
order: 16
title: "Trend Following Strategy: The Basic Rules Every Trader Should Know"
description: "The core rules of a trend following strategy: how to define a trend, enter, place stops, size positions and survive the long losing streaks it brings."
date: "2026-11-27"
pillar: trading
coverAlt: "Abstract rising line climbing through soft layered bands of color"
---

Trend following is one of the oldest systematic approaches in trading, and one of the most misunderstood. The idea sounds trivial: buy what is going up, sell what is going down. The hard part is discipline. Most trend systems lose on more trades than they win, sit through long flat periods and make their results on a handful of large moves. If you do not understand that profile before you start, you will abandon the method at exactly the wrong moment. Here are the basic rules almost every trend approach shares, and why each one exists.

## What trend following actually is

Trend following does not predict where price will go; it reacts to where price has already gone. It assumes markets sometimes move in one direction for longer than most participants expect, so a trader who joins late and leaves late can still capture the middle of the move. Two consequences:

- **You never buy the bottom or sell the top.** You enter after a move has started and exit after it has ended.
- **You accept many small losses.** Most breakouts fail. The system pays for those failures with the few trends that run far.

## Rule 1: Define the trend objectively

A trend must be something you can measure, not something you feel. Three common definitions:

| Method | Long condition | Weakness |
|---|---|---|
| Moving average filter | Price above its 200-period moving average | Slow to react at turning points |
| Moving average crossover | 50-period average above the 200-period average | Many false signals in sideways markets |
| Price channel breakout | Price closes above the highest high of the last N bars | Enters at extended prices |

The price channel breakout is often associated with Richard Donchian, whose channel-based rules are a classic reference in systematic trading. None is better in absolute terms; what matters is that the rule is written down.

## Rule 2: Enter on confirmation, not on hope

Entry should be a mechanical event: a close above the channel, a crossover, a new high. Never enter "because it looks ready". A rule applied the same way every time is the only thing that makes results measurable. A useful habit is to take long signals only when the long-term filter is up, and short signals only when it is down.

## Rule 3: Place the stop where the trend is wrong

The initial stop marks the point where your trend thesis is invalid. Two common approaches:

- **Structural stop:** below the most recent swing low (for a long trade).
- **Volatility stop:** a multiple of the Average True Range below entry, so the stop adapts to how much the market is moving. We covered this method in detail in [ATR stop loss: how to use volatility](/en/blog/atr-stop-loss-how-to-use-volatility).

Trend systems usually need wide stops. A stop that sits inside normal daily noise turns a valid trend trade into a guaranteed small loss.

## Rule 4: Size every position by risk

Because stops are wide and vary from market to market, position size must be calculated, not guessed:

**Position size = (Account × Risk %) ÷ Stop distance**

Example: an account of €10,000, risk of 1% per trade, entry at 105.00, ATR of 2.00 and a stop at 3 × ATR = 6.00 below entry (99.00).

- Risk amount: 10,000 × 0.01 = €100
- Position size: 100 ÷ 6.00 ≈ 16.6 units

If the stop is hit, you lose about €100 regardless of how volatile the market is. If you trade leveraged products such as CFDs or forex, remember that most retail accounts in these products lose money, and leverage magnifies every sizing mistake.

## Rule 5: Let winners run with a trailing exit

The edge lives in the exit: cutting winners early destroys the few large gains that pay for everything else. Typical trailing exits:

- Exit when price closes below a shorter channel (for example, the lowest low of the last 20 bars).
- Exit when price closes below a moving average.
- Trail a stop at a fixed ATR multiple below the highest close since entry.

Stops in a trend system only move in the direction of the trade, never further away.

## Rule 6: Expect long losing streaks

Here is where the maths matters. Suppose a system wins 35% of trades, the average win is 3R and the average loss is 1R (R = the amount risked).

**Expectancy = (0.35 × 3) − (0.65 × 1) = 1.05 − 0.65 = +0.40R per trade**

That is positive, but the loss rate is 65%. The probability of ten losses in a row in any given sequence of ten trades is 0.65^10 ≈ 1.3%. At 1% risk per trade, ten consecutive losses take roughly 10% off the account. At 5% risk, they would take about 40%. For the full framework, see [expectancy, risk-reward and win rate](/en/blog/expectancy-risk-reward-win-rate).

## Rule 7: Test before you trust

Before trading any trend rule with real money:

1. Write every rule down: filter, entry, stop, size, exit.
2. Test across several markets and long periods, including sideways phases, with realistic costs (spreads, commissions, slippage, financing).
3. Run it on a demo or with minimal size and compare live behaviour to the test.

A backtest or a demo period does not guarantee future results.

## The bottom line

Trend following trades many small, controlled losses for occasional large gains. The rules are easy to write and hard to follow. Define the trend objectively, size by risk, trail your exits and plan for losing streaks before they arrive.

**Before you commit to any trend rule, run your own win rate and reward-to-risk through the [expectancy calculator](/en/tools#expectancy) and see whether the numbers hold up.**
