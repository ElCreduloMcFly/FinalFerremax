from django.contrib import admin
from django.urls import path
from .views import mostrarhome,mostrarcarrito,mostrarherramientas,mostrarinicio,mostrarvendedor,iniciarsesion,registrar,finsesion,mostraragregar,agregarproducto,eliminarproducto,modificarproducto,mostrarproducto,mostrarnuevotrabajador,mostrarmenulogin,error,rechazo,webpay_plus_commit,webpay_plus_create,agregartrabajador

urlpatterns = [
    path('',mostrarhome,name="MenuPrincipal"),
    path('Carrito/',mostrarcarrito,name="Carrito"),
    path('Herramientas/',mostrarherramientas,name="Herramientas"),
    path('Inicio/',mostrarinicio,name="Sesion"),
    path('Vendedor/',mostrarvendedor,name="Vendedor"),
    path('MenuPrincipalLogin/',mostrarmenulogin,name="MenuPrincipalLogin"),
    path('mostrarproducto/',mostraragregar,name="mostrarcategoria"),
    path('mostrarnuevotrabajador/',mostrarnuevotrabajador,name="mostrarnuevotrabajador"),
    path('iniciarsesion/', iniciarsesion, name='iniciarsesion'),   
    path('registrar/',registrar,name="registrar"),
    path('finsesion/',finsesion, name='finsesion'),
    path('agregarproducto/',agregarproducto, name='agregarproducto'),
    path('agregartrabajador/',agregartrabajador, name='agregartrabajador'),
    path('eliminarproducto/<id_prod>',eliminarproducto, name='eliminarproducto'),
    path('mostrarproducto/<int:id_prod>',mostrarproducto, name='mostrarproducto'),
    path('modificarproducto/<int:id_prod>',modificarproducto, name='modificarproducto'),
    #WEBPAY
    path('error-compra', error),
    path('compra-rechazada', rechazo),
    path('create-webpay', webpay_plus_create),
    path('commit-webpay', webpay_plus_commit),
]