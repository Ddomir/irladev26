import BlogLayout from '../../layouts/BlogLayout'
import { BlogSection, BlogList, BlogLink, BlogImage, CodeBox } from '../../components/blog'
import PricesChart from '../../assets/BlogImages/ArbitragePairsTrading/prices_KO_PEP.png'
import SpreadChart from '../../assets/BlogImages/ArbitragePairsTrading/spread_KO_PEP.png'
import ZScoreChart from '../../assets/BlogImages/ArbitragePairsTrading/zscore_KO_PEP.png'
import PerformanceChart from '../../assets/BlogImages/ArbitragePairsTrading/performance_KO_PEP.png'

export default function ArbitrageBlog() {
  return (
    <BlogLayout
      title="Arbitrage Pairs Trading"
      description="Market-neutral statistical arbitrage using cointegrated stock pairs."
      date="February, 2026"
      image={PerformanceChart}
    >
      <BlogSection title="Introduction">
        <p>Pairs trading is a market-neutral strategy that exploits the statistical relationship between two correlated stocks. Instead of betting on whether the market goes up or down, you bet on whether the price relationship between two stocks returns to its historical norm.</p>
        <p>I built a pairs trading program in Python using Coca-Cola (KO) and PepsiCo (PEP) as the example pair, spanning 6 years of data from 2018 to 2024. This article walks through the full process: finding a valid pair, building the signal, backtesting, and risk management.</p>
      </BlogSection>

      <BlogSection title="Getting the Data">
        <p>I used <BlogLink href="https://pypi.org/project/yfinance/">yfinance</BlogLink> to download closing prices for both stocks, then combined them into a single aligned DataFrame.</p>
        <CodeBox language="Python" code={`import yfinance as yf
import pandas as pd
import statsmodels.api as sm
import matplotlib.pyplot as plt

# Download close prices
ko = yf.download("KO", start="2018-01-01", end="2024-01-01")[["Close"]]
pep = yf.download("PEP", start="2018-01-01", end="2024-01-01")[["Close"]]

# Rename columns
ko.rename(columns={"Close": "KO"}, inplace=True)
pep.rename(columns={"Close": "PEP"}, inplace=True)

# Combine into one DataFrame, aligned
prices = pd.concat([ko, pep], axis=1)
prices.columns = ["KO", "PEP"]
prices.dropna(inplace=True)

print(prices.head())`} output={`                   KO        PEP
Date
2018-01-02  36.016151  94.238098
2018-01-03  35.937054  93.990646
2018-01-04  36.443207  94.453621
2018-01-05  36.435299  94.725006
2018-01-08  36.379932  94.182198`} />
        <p>We now have a DataFrame of the closing price of KO and PEP over a 6 year span.</p>
        <BlogImage src={PricesChart} alt="KO vs PEP Price History" caption="KO and PEP closing prices from 2018–2024." />
        <p>KO has an overall lower share price compared to PEP, so it will appear flatter on the chart. We account for this difference using hedge ratios.</p>
      </BlogSection>

      <BlogSection title="Cointegration">
        <p>Before trading a pair, we need to verify they are actually related. Two stocks are <strong>cointegrated</strong> if, even though they each wander randomly on their own, some linear combination of them (like KO – β·PEP) is stable and mean-reverting. So while Coke and Pepsi might each drift upward over years, their spread (difference adjusted by hedge ratio) tends to bounce around a fairly stable band — they revert back to their mean.</p>
        <CodeBox language="Python" code={`from statsmodels.tsa.stattools import coint

score, pvalue, _ = coint(prices["KO"], prices["PEP"])
print("Cointegration p-value:", pvalue)`} output={`Cointegration p-value: 0.04158324640329375`} />
        <p>If p &lt; 0.05, there is a statistically significant cointegration relationship — they are likely to move together. Our p-value of 0.0416 passes the test.</p>
      </BlogSection>

      <BlogSection title="Hedge Ratio">
        <p>The hedge ratio (β) tells you how much of one stock to buy or sell relative to the other. You want your dollar exposure to both stocks to be balanced to mitigate overexposure to either.</p>
        <p>For example: one share of KO might cost $60, one share of PEP might cost $120. If you just buy 1 KO and sell 1 PEP, your position is dominated by the more expensive stock. To neutralize exposure, you sell β shares of PEP for every 1 share of KO.</p>
        <p>I find β using <strong>Ordinary Least Squares (OLS) regression</strong>, fitting the line:</p>
        <p><code>KO = α + β · PEP</code></p>
        <p>Where α is the intercept (baseline KO value when PEP = 0) and β is the slope (how much KO changes per $1 change in PEP). We add a constant column to PEP to represent the intercept, then minimize the squared residuals:</p>
        <p><code>Σ (KOᵢ − (α + β · PEPᵢ))²</code></p>
        <CodeBox language="Python" code={`# Regression: KO = alpha + beta * PEP
X = sm.add_constant(prices["PEP"])
y = prices["KO"]
model = sm.OLS(y, X).fit()
beta = model.params["PEP"]
alpha = model.params["const"]
print("Hedge ratio (beta):", beta)`} output={`Hedge ratio (beta): 0.2718144219363545`} />
        <p>So for every 1 share of KO, we trade 0.272 shares of PEP to keep the position balanced.</p>
      </BlogSection>

      <BlogSection title="Spread and Z-Score">
        <p>With β in hand, we compute the <strong>spread</strong> — the residual after removing the linear relationship between the two stocks:</p>
        <CodeBox language="Python" code={`# Spread = KO - (alpha + beta * PEP)
spread = prices["KO"] - (alpha + beta * prices["PEP"])
spread.plot(figsize=(10,5), title="Spread (KO - beta*PEP)")
plt.show()`} />
        <BlogImage src={SpreadChart} alt="Mean-reverting spread" caption="The spread doesn't stray far from 0 and has no clear upward or downward trend." />
        <p>Next, we normalize the spread into a <strong>z-score</strong> — converting arbitrary price differences into standard deviations from the mean. This gives us a clear signal threshold regardless of the absolute price levels.</p>
        <CodeBox language="Python" code={`zscore = (spread - spread.mean()) / spread.std()
zscore.plot(figsize=(10,5), title="Z-score of Spread")
plt.axhline(1.0, color='red', linestyle='--')
plt.axhline(-1.0, color='green', linestyle='--')
plt.axhline(0.0, color='black')
plt.show()`} />
        <BlogImage src={ZScoreChart} alt="Z-score with trading thresholds" caption="Red line = sell signal (+1), green line = buy signal (-1)." />
        <BlogList items={[
          'Z-score > +1 (red): KO is "too expensive" vs PEP → short KO, long PEP.',
          'Z-score < -1 (green): KO is "too cheap" vs PEP → long KO, short PEP.',
        ]} />
      </BlogSection>

      <BlogSection title="Backtesting">
        <p>To assess the strategy, I backtested it over the full 6-year dataset. We generate daily positions from the z-score signal, compute daily returns, and track cumulative growth of $1 invested.</p>
        <CodeBox language="Python" code={`# Generate trading signals
longs = zscore < -1  # Buy KO, Sell PEP
shorts = zscore > 1  # Sell KO, Buy PEP
positions = pd.DataFrame({
    "KO": longs.astype(int) - shorts.astype(int),
    "PEP": shorts.astype(int) - longs.astype(int)
})

# Daily returns
returns = prices.pct_change().fillna(0)
strategy_returns = (positions.shift(1) * returns).mean(axis=1)  # shift(1) avoids lookahead bias

# Cumulative returns
cumulative = (1 + strategy_returns).cumprod()
cumulative.plot(figsize=(10,5), title="Strategy Performance")
plt.show()`} />
        <p><code>longs</code> and <code>shorts</code> are boolean series that get cast to integers (0 or 1) for math. The <code>positions</code> DataFrame encodes each day's stance: 1 = long, -1 = short, 0 = flat. Positions are shifted by one day (<code>shift(1)</code>) to avoid lookahead bias — we can't know the closing price of an ongoing day.</p>
        <p>For the S&P 500 benchmark comparison:</p>
        <CodeBox language="Python" code={`spy = yf.download("SPY", start="2018-01-01", end="2024-01-01")["Close"]
spy_returns = spy.pct_change().fillna(0)
spy_cumulative = (1 + spy_returns).cumprod()

plt.figure(figsize=(10,5))
plt.plot(cumulative, label="Pairs Trading Strategy")
plt.plot(spy_cumulative / spy_cumulative.iloc[0], label="S&P 500 (SPY)")
plt.title("Pairs Trading vs S&P 500 (2018–2024)")
plt.xlabel("Date")
plt.ylabel("Growth of $1")
plt.legend()
plt.show()`} />
        <BlogImage src={PerformanceChart} alt="Strategy vs S&P 500" caption="Pairs trading strategy vs S&P 500, 2018–2024." />
        <p>The pairs trading strategy averaged ~4.5% annually over the 6 years. This is lower than the S&P 500 (~10% APY) over the same period, but the strategy is <strong>market-neutral</strong> — it doesn't depend on the market going up. It's a stable, lower-risk approach that holds up during downturns.</p>
      </BlogSection>

      <BlogSection title="Risk Management">
        <p>No strategy is complete without risk management. I implemented a trailing stop-loss that closes a position when a stock drops a set percentage below its peak during the trade.</p>
        <CodeBox language="Python" code={`def trailing_stop_orders(prices, trail_pct=0.05):
    orders = []
    position = False
    entry_date, entry_price, peak_price = None, None, None

    for date, price in prices.items():
        if not position:
            position = True
            entry_date = date
            entry_price = price
            peak_price = price
        else:
            peak_price = max(peak_price, price)
            stop_price = peak_price * (1 - trail_pct)

            if price <= stop_price:
                orders.append({
                    "entry_date": entry_date,
                    "entry_price": entry_price,
                    "exit_date": date,
                    "exit_price": price
                })
                position = False
                entry_date, entry_price, peak_price = None, None, None

    return orders

ko_orders = trailing_stop_orders(prices.loc["2020"]["KO"], trail_pct=0.05)
pep_orders = trailing_stop_orders(prices.loc["2020"]["PEP"], trail_pct=0.05)`} />
        <p>Finally, the annualized Sharpe ratio tells us how much return we're getting per unit of risk (a ratio above 1.0 is generally considered good):</p>
        <CodeBox language="Python" code={`import numpy as np

strategy_returns = (positions.shift(1) * returns).sum(axis=1).fillna(0)

risk_free_rate = 0.0
mean_daily = strategy_returns.mean() - risk_free_rate / 252
std_daily = strategy_returns.std()

sharpe_ratio = (mean_daily / std_daily) * np.sqrt(252)
print("Annualized Sharpe Ratio:", round(sharpe_ratio, 2))`} output={`Annualized Sharpe Ratio: 0.97`} />
        <p>A Sharpe ratio of 0.97 is solid for a market-neutral strategy. The full source code and notebook are available on <BlogLink href="https://github.com/Ddomir/arbitrage-pairs-trading">GitHub</BlogLink>.</p>
      </BlogSection>
    </BlogLayout>
  )
}
