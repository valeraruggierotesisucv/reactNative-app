# Aplicación de Eventos en React Native

## Descripción

Eventify es una plataforma móvil diseñada para la gestión de eventos e interacción entre usuarios. Incluye funcionalidades esenciales como la administración de eventos, la conexión entre usuarios y características sociales, tales como seguidores, notificaciones y comentarios.

## Tecnologías Utilizadas

- **React Native**: Framework principal para el desarrollo de la aplicación móvil.
- **Expo**: Plataforma para simplificar el desarrollo de aplicaciones React Native.
- **TypeScript**: Lenguaje de programación que añade tipado estático a JavaScript.
- **Supabase**: Plataforma de backend como servicio (BaaS) para autenticación, base de datos y almacenamiento.
- **React Navigation**: Biblioteca para la navegación entre pantallas.
- **react-i18next**: Solución de internacionalización.
- **Jest & Testing Library**: Herramientas para pruebas unitarias e integración.

## Estructura del Proyecto

```
reactNative-app/
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── contexts/        # Contextos de React
│   │   └── AuthContext.tsx        # Contexto de autenticación
│   │   └── PushNotifications.tsx  # Contexto de notificaciones push
│   ├── hooks/           # Hooks personalizados
│   │   └── useAudioRecoder.tsx     # Hook para manejar audio
│   │   └── useCurrentLocation.tsx  # Hook para geolocalización
│   │   └── useImagePicker.tsx      # Hook para cámara y galería
│   │   └── useMusicPicker.tsx      # Hook para música
│   ├── lib/             # Bibliotecas y configuraciones
│   │   └── supabase.ts  # Configuración de Supabase
│   ├── services/        # Servicios
│   │   └── storage.ts   # Servicio de Almacenamiento
│   ├── models/          # Modelos
│   ├── views/           # Pantallas (vistas)
│   ├── controllers/     # Controllers
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
