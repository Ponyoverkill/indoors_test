from rest_framework import routers

from .views import KittenViewSet, BreedViewSet, WoolTypeViewSet, MyKittensViewSet

router = routers.SimpleRouter()

router.register(r'kittens', KittenViewSet)
router.register(r'my-kittens', MyKittensViewSet)
router.register(r'breeds', BreedViewSet)
router.register(r'wools', WoolTypeViewSet)
