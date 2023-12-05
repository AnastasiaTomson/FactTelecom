from django.shortcuts import render


def index(request):
    return render(request, 'sitepages/index.html')


def coverage(request):
    return render(request, 'sitepages/coverage.html')