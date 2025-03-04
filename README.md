# Aplicación de Eventos en React Native

## Descripción

Esta aplicación móvil desarrollada con React Native permite a los usuarios gestionar eventos, utilizando autenticación segura, geolocalización y una interfaz de usuario intuitiva. La aplicación está diseñada para proporcionar una experiencia fluida tanto en dispositivos Android como iOS.

## Características Principales

- **Autenticación de Usuarios**: Sistema completo de registro, inicio de sesión y gestión de sesiones utilizando Supabase.
- **Gestión de Eventos**: Creación, visualización, edición y eliminación de eventos.
- **Geolocalización**: Integración con servicios de ubicación para asociar eventos a lugares específicos.
- **Interfaz Adaptativa**: Diseño responsive que se adapta a diferentes tamaños de pantalla.
- **Internacionalización**: Soporte para múltiples idiomas mediante i18next.
- **Navegación Intuitiva**: Sistema de navegación fluido utilizando React Navigation.

## Tecnologías Utilizadas

- **React Native**: Framework principal para el desarrollo de la aplicación móvil.
- **TypeScript**: Lenguaje de programación que añade tipado estático a JavaScript.
- **Supabase**: Plataforma de backend como servicio (BaaS) para autenticación y base de datos.
- **React Navigation**: Biblioteca para la navegación entre pantallas.
- **Expo**: Plataforma para simplificar el desarrollo de aplicaciones React Native.
- **i18next**: Solución de internacionalización.
- **Jest & Testing Library**: Herramientas para pruebas unitarias e integración.

## Estructura del Proyecto

```
reactNative-app/
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── Input/       # Componente de entrada de texto
│   │   └── Modal/       # Componente de modal
│   ├── contexts/        # Contextos de React
│   │   └── AuthContext.tsx  # Contexto de autenticación
│   ├── hooks/           # Hooks personalizados
│   │   └── useCurrentLocation.tsx  # Hook para geolocalización
│   ├── lib/             # Bibliotecas y configuraciones
│   │   └── supabase.ts  # Configuración de Supabase
│   ├── views/           # Pantallas de la aplicación
│   │   ├── AddEventView.tsx  # Vista para añadir eventos
│   │   └── AddDefaultView.tsx  # Vista predeterminada
├── __tests__/          # Pruebas de la aplicación
├── App.tsx             # Punto de entrada de la aplicación
├── package.json        # Dependencias y scripts
└── jest.setup.js       # Configuración de Jest para pruebas
```

## Requisitos Previos

- Node.js (v23 o superior)
- npm o yarn
- Expo CLI
- Cuenta en Supabase

## Configuración del Entorno

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd reactNative-app
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto
   - Añade las siguientes variables:
     ```
     SUPABASE_URL=tu_url_de_supabase
     SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
     
     ```

## Ejecución de la Aplicación

### Desarrollo

Para iniciar la aplicación en modo desarrollo:

```bash
npm start
# o
yarn start
```

Esto iniciará el servidor de desarrollo de Expo. Puedes ejecutar la aplicación en:
- Dispositivo físico: Escanea el código QR con la aplicación Expo Go
- Emulador: Presiona 'a' para Android o 'i' para iOS

### Pruebas

Para ejecutar las pruebas:

```bash
npm test
```

Para ejecutar pruebas específicas:

```bash
npm test -- --testNamePattern="nombre_del_test"
```

## Despliegue

### Generación de APK/IPA

Para generar archivos de instalación:

```bash
expo build:android  # Para Android (APK)
```

## Contacto

Para preguntas o sugerencias, por favor contacta a valeraruggierotesisucv@gmail.com