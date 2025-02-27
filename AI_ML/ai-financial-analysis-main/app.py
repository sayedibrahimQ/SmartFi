import streamlit as st
import yfinance as yf
import plotly.graph_objects as go
import json
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()

st.set_page_config(layout="wide", page_title="Market Insider", page_icon="📈")
@st.cache_data
def load_company_tickers(filepath: str) -> dict:
    with open(filepath, "r") as file:
        return json.load(file)

company_tickers = load_company_tickers("company_tickers.json")

def search_companies(query: str, dataset: dict) -> list:
    """
    Search for companies based on a query.
    Args:
        query (str): The user-provided search term.
        dataset (dict): The loaded dataset of companies.

    Returns:
        list: A list of matching company tickers.
    """
    query = query.lower()
    results = []
    for _, company in dataset.items():
        if (
            query in company["title"].lower()
            or query in company["ticker"].lower()
        ):
            results.append(company["ticker"])
    return results[:5]  

def get_stock_info(symbol: str) -> dict:
    """
    Retrieves and formats detailed information about a stock from Yahoo Finance.
    Args:
        symbol (str): The stock ticker symbol to look up.
    Returns:
        dict: A dictionary containing detailed stock information.
    """
    data = yf.Ticker(symbol)
    info = data.info
    return {
        "name": info.get("shortName", "N/A"),
        "summary": info.get("longBusinessSummary", "N/A"),
        "sector": info.get("sector", "N/A"),
        "industry": info.get("industry", "N/A"),
        "market_cap": info.get("marketCap", "N/A"),
        "price": info.get("currentPrice", "N/A"),
        "revenue_growth": info.get("revenueGrowth", "N/A"),
        "recommendation": info.get("recommendationKey", "N/A"),
    }

def format_large_number(num):
    if num == "N/A":
        return "N/A"
    try:
        num = float(num)
        if num >= 1e12:
            return f"${num/1e12:.1f}T"
        elif num >= 1e9:
            return f"${num/1e9:.1f}B"
        elif num >= 1e6:
            return f"${num/1e6:.1f}M"
        else:
            return f"${num:,.0f}"
    except:
        return "N/A"

def format_percentage(value):
    if value == "N/A":
        return "N/A"
    try:
        return f"{float(value)*100:.1f}%"
    except:
        return "N/A"

def format_recommendation(value):
    match value:
        case "NONE":
            return "N/A"
        case "STRONG_BUY":
            return "BUY"
        case "STRONG_SELL":
            return "SELL"
        case "UNDERPERFORM":
            return "HOLD"
        case "OUTPERFORM":
            return "HOLD"
    return value

# Display stock data card
def stock_data_card(data, ticker):
    with st.container():
        st.markdown(f"""
            ### {data['name']} ({ticker})
            **{data['sector']} | {data['industry']}**
            {data['summary'][:60]}...
        """, unsafe_allow_html=True)

        metrics = [
            {"label": "Market Cap", "value": format_large_number(data['market_cap'])},
            {"label": "Price", "value": format_large_number(data['price'])},
            {"label": "Growth", "value": format_percentage(data['revenue_growth'])},
            {"label": "Rating", "value": format_recommendation(data['recommendation'].upper())}
        ]

        for metric in metrics:
            st.metric(label=metric['label'], value=metric['value'], delta=None)
st.title("Market Insider")
st.write("Discover and compare stocks traded on the NYSE")

user_query = st.text_input("Search for stocks by name, ticker, or characteristics:")

if st.button("🔍 Find Stocks"):
    with st.spinner("Searching for stocks..."):
        matching_tickers = search_companies(user_query, company_tickers)

        if not matching_tickers:
            st.warning("No matching stocks found. Please refine your search.")
        else:
            stock_data = []
            for ticker in matching_tickers:
                data = get_stock_info(ticker)
                if data:
                    stock_data.append(data)

            cols = st.columns(len(stock_data))
            for i in range(len(stock_data)):
                with cols[i]:
                    stock_data_card(stock_data[i], matching_tickers[i])

    
            if len(stock_data) > 0:
                st.subheader("Stock Price Comparison")
                fig = go.Figure()

                for i, ticker in enumerate(matching_tickers):
                    stock = yf.Ticker(ticker)
                   

