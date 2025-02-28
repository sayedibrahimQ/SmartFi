# app.py
import streamlit as st
import yfinance as yf
import matplotlib.pyplot as plt
import google.generativeai as genai

# Set API Key for Gemini
genai.configure(
    api_key="your key"  # Replace with your API key
)

# Function to fetch stock data
def fetch_stock_data(ticker, period="1y"):
    stock = yf.Ticker(ticker)
    data = stock.history(period=period)
    return data

# Function to analyze financial health
def analyze_financial_health(ticker):
    stock = yf.Ticker(ticker)
    info = stock.info

    pe_ratio = info.get("trailingPE", "N/A")
    revenue_growth = info.get("revenueGrowth", "N/A")
    debt_to_equity = info.get("debtToEquity", "N/A")
    pb_ratio = info.get("priceToBook", "N/A")
    roe = info.get("returnOnEquity", "N/A")

    return {
        "P/E Ratio": pe_ratio,
        "Revenue Growth": revenue_growth,
        "Debt-to-Equity Ratio": debt_to_equity,
        "P/B Ratio": pb_ratio,
        "ROE": roe,
    }

# Function to calculate risk
def calculate_risk(data):
    volatility = data["Close"].std()  # Price volatility
    return {
        "Volatility": volatility,
        "Risk Level": "High" if volatility > 10 else "Low",
    }

# Function to analyze text using Gemini API
def analyze_with_gemini(prompt):
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(prompt)
    return response.text

# User interface using Streamlit
def main():
    st.title("Investment Readiness AI Agent")
    st.write("Enter a company ticker to analyze its investment readiness.")

    # User input
    ticker = st.text_input("Company Ticker (e.g., AAPL):")
    period = st.selectbox("Select Period", ["1mo", "3mo", "6mo", "1y", "2y"])

    if ticker:
        # Fetch stock data
        data = fetch_stock_data(ticker, period)
        st.write("### Stock Data")
        st.write(data)

        # Plot stock price chart
        st.write("### Stock Price Chart")
        plt.figure(figsize=(10, 5))
        plt.plot(data["Close"])
        plt.title(f"{ticker} Stock Price")
        plt.xlabel("Date")
        plt.ylabel("Price (USD)")
        plt.grid(True)
        st.pyplot(plt)

        # Analyze financial health
        financial_health = analyze_financial_health(ticker)
        st.write("### Financial Health")
        st.write(financial_health)

        # Calculate risk
        risk = calculate_risk(data)
        st.write("### Risk Analysis")
        st.write(risk)

        # Analyze text using Gemini API
        st.write("### Investment Recommendation (Powered by Gemini)")
        prompt = f"Analyze the investment potential of {ticker} based on the following data: {financial_health}. Provide a detailed recommendation."
        recommendation = analyze_with_gemini(prompt)
        st.write(recommendation)

if __name__ == "__main__":
    main()