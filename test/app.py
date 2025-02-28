# app.py
import streamlit as st
import yfinance as yf
from transformers import pipeline
import requests
import matplotlib.pyplot as plt
import google.generativeai as genai

# Set API Key for Gemini
genai.configure(api_key="AIzaSyDMb4fqjdezb1SHX90tjRyex0fokBAQubs")  # Replace with your API key

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

# Function to calculate risks
def calculate_risk(data):
    volatility = data["Close"].std()  # Price volatility
    return {
        "Volatility": round(volatility, 2),
        "Risk Level": "High" if volatility > 10 else "Low",
    }

# Function to analyze text using Gemini API
def analyze_with_gemini(prompt):
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(prompt)
    return response.text

# User interface using Streamlit
def main():
    st.set_page_config(page_title="Investment Readiness AI Agent", page_icon="📈", layout="wide")

    st.title("📈 Investment Readiness AI Agent")
    st.markdown("""
    **Enter the company ticker (e.g., AAPL, MSFT, TSLA) to analyze its investment readiness.**
    """)

    # Sidebar settings
    with st.sidebar:
        st.header("Settings")
        ticker = st.text_input("Company Ticker (e.g., AAPL):").strip().upper()
        period = st.selectbox("Select time period:", ["1mo", "3mo", "6mo", "1y", "2y"])
        st.markdown("---")
        st.markdown("**Developer:** SmartFi Team")
        st.markdown("**Version:** 1.0")

    if ticker:
        with st.spinner("Analyzing data..."):
            # Fetch stock data
            data = fetch_stock_data(ticker, period)
            if data.empty:
                st.warning(f"⚠️ No data available for ticker {ticker}")
                st.stop()

            # Display stock data
            st.subheader("📊 Stock Data")
            st.dataframe(data)

            # Plot stock prices
            st.subheader("📈 Stock Price Chart")
            plt.figure(figsize=(10, 5))
            plt.plot(data["Close"], label="Closing Price")
            plt.title(f"{ticker} Price Trend", fontsize=14)
            plt.xlabel("Date")
            plt.ylabel("Price (USD)")
            plt.grid(True)
            plt.legend()
            st.pyplot(plt)

            # Financial health analysis
            st.subheader("📉 Financial Health")
            financial_health = analyze_financial_health(ticker)
            col1, col2 = st.columns(2)
            with col1:
                st.metric("P/E Ratio", financial_health["P/E Ratio"])
                st.metric("Revenue Growth", financial_health["Revenue Growth"])
            with col2:
                st.metric("Debt-to-Equity Ratio", financial_health["Debt-to-Equity Ratio"])
                st.metric("ROE", financial_health["ROE"])

            # Risk analysis
            st.subheader("⚠️ Risk Analysis")
            risk = calculate_risk(data)
            st.metric("Volatility", risk["Volatility"])
            st.metric("Risk Level", risk["Risk Level"])

            # Investment recommendation using Gemini API
            st.subheader("💡 Investment Recommendation (Powered by Gemini)")
            prompt = f"Analyze the investment potential of {ticker} based on the following data: {financial_health}. Provide a detailed recommendation."
            recommendation = analyze_with_gemini(prompt)
            st.write(recommendation)

if __name__ == "__main__":
    main()