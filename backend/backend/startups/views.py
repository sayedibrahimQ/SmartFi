from django.shortcuts import render
from rest_framework import generics 
from .models import Startup, InvestmentScore, Recommendation
from .serializers import StartupSerializer, isSerializer, RecommendationSerializer
from google import genai



class startupAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Startup.objects.all()
    serializer_class =  StartupSerializer
    lookup_field = 'pk'
     
class InvestmentScoreAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = InvestmentScore.objects.all()
    serializer_class =  isSerializer
    lookup_field = 'pk'
     
class RecommendationAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recommendation.objects.all()
    serializer_class = RecommendationSerializer
    lookup_field = 'pk'
    
def recommendation(request, pk):
    client = genai.Client(api_key="AIzaSyBpoglmysw9SdQzEkFNmvZq7Ud-Dtz_Gjs")
    startup = Startup.objects.get(pk = pk)
    
    response = client.models.generate_content(
    model="gemini-2.0-flash", contents=f'''
        for this json data return only json data
        [
            revenue : {startup.revenue},
            growth_rate : {startup.growth_rate},
            profitability : {startup.profitability},
            cash_flow : {startup.cash_flow},
            team_size : {startup.team_size},
            founder_experience : {startup.founder_experience},
            market_size : {}
            
            
            
        ]
    '''
)