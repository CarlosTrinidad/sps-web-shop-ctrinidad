# SPS Web Shop - Carlos Trinidad

Este repositorio contiene el código fuente del cliente para la tienda web, construido con React, TypeScript y Material UI.

## Descripción

El proyecto es la interfaz de usuario para una tienda en línea. Permite a los usuarios explorar productos, filtrar y ordenar, iniciar sesión/registrarse, y agregar productos al carrito. Está construido utilizando React para la interfaz de usuario, TypeScript para la seguridad de tipos, Material UI para componentes de interfaz de usuario consistentes y Firebase para la autenticación.

## Características

- Autenticación de Usuario: Registro e inicio de sesión con correo electrónico/contraseña y proveedores sociales (Google, Facebook).
- Exploración de Productos: Visualización de productos con filtrado por categorías, precios y calificaciones.
- Ordenamiento de Productos: Ordenar productos por características.
- Carrito de Compras: Añadir y gestionar productos en el carrito de compras.
- Interfaz de Usuario Responsiva: Diseño adaptable a diferentes dispositivos.
- Internacionalización: Soporte para múltiples idiomas utilizando react-i18next.
- Pruebas Unitarias: Pruebas unitarias con Vitest y React Testing Library.

## Vista previa

![Productos](/public/img/preview/products.png "Produtos")
![Carrito de compras](/public/img/preview/shopping-cart.png "Carrito de compras")

## Requisitos Previos

- Node.js (versión recomendada: 18 o superior)
- npm, yarn o pnpm (gestor de paquetes)
- Cuenta de Firebase configurada (opcional).

## Configuración

1. Clonar el Repositorio:

```bash
  git clone https://github.com/CarlosTrinidad/sps-web-shop-ctrinidad.git
  
  cd sps-web-shop-ctrinidad/
```

2. Instalar Dependencias:

```bash
  npm install
```

3. Configurar Firebase (opcional):

- Crea un proyecto en la consola de Firebase.
- Habilita la autenticación por correo electrónico/contraseña y proveedores sociales (Google, Facebook).
- Copia la configuración de Firebase desde la consola y crea un archivo .env.local en la raíz del proyecto.
- Añade las variables de entorno necesarias (por ejemplo, VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, etc.).

4. Ejecutar la Aplicación:

```bash
npm run dev
```

La aplicación estará disponible en http://localhost:5173.

## Pruebas

Para ejecutar las pruebas unitarias:

```bash
npm test
```

## Despliegue

Para construir la aplicación para producción:

```bash
npm run build
```

Luego, puedes desplegar la carpeta dist en un servicio de alojamiento estático como Firebase Hosting o Netlify.

Puede acceder a la versión publicada a través del siguiente enlace: https://sps-web-shop-ctrinidad.web.app/

## Contribución
Las contribuciones son bienvenidas. Por favor, crea un issue para discutir cambios propuestos o envía un pull request.
