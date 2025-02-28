from django.db import models
from django.contrib.auth.models import User

class Startup(models.Model):
    """ Model to store startup details """
    name = models.CharField(max_length=255)
    founder = models.ForeignKey(User, on_delete=models.CASCADE)
    revenue = models.DecimalField(max_digits=15, decimal_places=2)
    growth_rate = models.FloatField()
    profitability = models.FloatField()
    cash_flow = models.DecimalField(max_digits=15, decimal_places=2)
    team_size = models.IntegerField()
    founder_experience = models.IntegerField(help_text="Years of experience")
    market_size = models.DecimalField(max_digits=15, decimal_places=2)
    competition_level = models.CharField(max_length=50, choices=[
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High')
    ])
    investment_history = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class InvestmentScore(models.Model):
    """ Model to store AI-generated readiness scores """
    startup = models.OneToOneField(Startup, on_delete=models.CASCADE)
    score = models.IntegerField()
    generated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.startup.name} - {self.score}"


class Recommendation(models.Model):
    """ Model to store recommendations based on the score """
    startup = models.ForeignKey(Startup, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Recommendation for {self.startup.name}"


# class Investor(models.Model):
#     """ Model to store investor details """
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     name = models.CharField(max_length=255)
#     interested_markets = models.TextField()
#     available_funds = models.DecimalField(max_digits=15, decimal_places=2)

#     def __str__(self):
#         return self.name


# class InvestmentInterest(models.Model):
#     """ Model to track which investors are interested in which startups """
#     investor = models.ForeignKey(Investor, on_delete=models.CASCADE)
#     startup = models.ForeignKey(Startup, on_delete=models.CASCADE)
#     interest_level = models.CharField(max_length=50, choices=[
#         ('Low', 'Low'),
#         ('Medium', 'Medium'),
#         ('High', 'High')
#     ])
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.investor.name} interested in {self.startup.name}"
# # 