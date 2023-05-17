from django.shortcuts import render
from django.http import JsonResponse
from django.utils import timezone
from .models import Order


def index(request):
    return render(request, 'orders/index.html', {
        'title': 'Управління кошиком',
        'page': 'index',
        'app': 'orders',
        'user_orders': Order.objects.filter(user_id=request.user.id)
    })


def ajax_cart(request):
    response = dict()
    response['test_message'] = 'AJAX work fine!'
    # 1
    uid = request.GET.get('uid')
    pid = request.GET.get('pid')
    # 2
    Order.objects.create(
        code=f'Order-{pid}/{uid}/{timezone.now()}',
        user_id=uid,
        product_id=pid,
        notes='Очікує підтвердження'
    )
    # 3
    total = 0
    user_orders = Order.objects.filter(user_id=uid)
    for order in user_orders:
        total += order.product.price * order.count
    # 4
    response['count'] = len(user_orders)
    response['total'] = total
    return JsonResponse(response)


def ajax_cart_display(request):
    response = dict()
    uid = request.GET.get('uid')
    user_orders = Order.objects.filter(user_id=uid)
    #
    total = 0
    for order in user_orders:
        total += order.product.price * order.count
    #
    response['count'] = len(user_orders)
    response['total'] = total
    return JsonResponse(response)
