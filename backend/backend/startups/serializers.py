from rest_framework import serializers
from .models import Startup, InvestmentScore, Recommendation

class StartupSerializer(serializers.Serializer):
    class meta():
        model = Startup
        fields = '__all__'

class isSerializer(serializers.Serializer):
    class meta():
        model = InvestmentScore
        fields = '__all__'
        
class RecommendationSerializer(serializers.Serializer):
    class meta():
        model = Recommendation
        fiels = '__all__'