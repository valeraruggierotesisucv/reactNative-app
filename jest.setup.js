// Mock para expo-font
jest.mock('expo-font', () => ({
  isLoaded: jest.fn(() => true),
  loadAsync: jest.fn(() => Promise.resolve()),
  __internal__: {
    isLoaded: jest.fn(() => true),
  },
  Font: {
    isLoaded: jest.fn(() => true),
    loadAsync: jest.fn(() => Promise.resolve()),
  }
}));

// Mock para expo-location
jest.mock('expo-location', () => {
  // Crear datos de ubicación mock
  const mockLocation = {
    coords: {
      latitude: 37.7749,
      longitude: -122.4194,
      altitude: 0,
      accuracy: 10,
      altitudeAccuracy: 10,
      heading: 0,
      speed: 0
    },
    timestamp: Date.now()
  };

  // Crear respuestas síncronas para evitar advertencias de act()
  return {
    requestForegroundPermissionsAsync: jest.fn(() => ({ status: 'granted' })),
    getCurrentPositionAsync: jest.fn(() => mockLocation),
    watchPositionAsync: jest.fn(() => ({
      remove: jest.fn()
    })),
    geocodeAsync: jest.fn(() => [{
      latitude: 37.7749,
      longitude: -122.4194,
      altitude: 0,
      accuracy: 10,
      altitudeAccuracy: 10,
      heading: 0,
      speed: 0
    }]),
    reverseGeocodeAsync: jest.fn(() => [{
      city: 'San Francisco',
      country: 'United States',
      district: 'Downtown',
      isoCountryCode: 'US',
      name: 'Apple Store',
      postalCode: '94102',
      region: 'CA',
      street: 'Market St',
      streetNumber: '1'
    }]),
  };
});

// Mock para el hook useCurrentLocation
jest.mock('./src/hooks/useCurrentLocation', () => ({
  useCurrentLocation: () => ({
    location: {
      coords: {
        latitude: 37.7749,
        longitude: -122.4194,
        altitude: 0,
        accuracy: 10,
        altitudeAccuracy: 10,
        heading: 0,
        speed: 0
      },
      timestamp: Date.now()
    },
    errorMsg: null,
    isLoading: false,
    getCurrentLocation: jest.fn(),
  }),
}));

// Mock para @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const { View, Text } = require('react-native');
  
  // Crear un componente mock para cada tipo de icono
  const createIconMock = (name) => {
    return ({ name, size, color, ...props }) => (
      <View testID={`icon-${name}`} {...props}>
        <Text>{name}</Text>
      </View>
    );
  };
  
  return {
    MaterialIcons: createIconMock('keyboard-arrow-right'),
    Ionicons: createIconMock('ion'),
    FontAwesome: createIconMock('fa'),
    MaterialCommunityIcons: createIconMock('plus'),
    Feather: createIconMock('x'),
    AntDesign: createIconMock('ant'),
    Entypo: createIconMock('entypo'),
    EvilIcons: createIconMock('evil'),
    Fontisto: createIconMock('fontisto'),
    Foundation: createIconMock('foundation'),
    Octicons: createIconMock('octicons'),
    SimpleLineIcons: createIconMock('simple'),
    Zocial: createIconMock('zocial'),
    // Añadir otros iconos según sea necesario
  };
});

// Mock para AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock para i18next y react-i18next
jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

// Mock para React Navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      setOptions: jest.fn(),
      addListener: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
    useIsFocused: () => true,
    NavigationContainer: ({ children }) => children,
    useFocusEffect: (callback) => {
      // Ejecutar el callback inmediatamente para simular el efecto
      callback();
      return;
    },
  };
});

// Mock para @react-navigation/core
jest.mock('@react-navigation/core', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      setOptions: jest.fn(),
      addListener: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
    useIsFocused: () => true,
    useFocusEffect: (callback) => {
      // Ejecutar el callback inmediatamente para simular el efecto
      callback();
      return;
    },
  };
});

// Mock para react-native-toast-notifications
jest.mock('react-native-toast-notifications', () => ({
  useToast: () => ({
    show: jest.fn(),
    hide: jest.fn(),
    hideAll: jest.fn(),
  }),
}));

// Mock para react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native');
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children }) => <View>{children}</View>,
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  };
});

// Mock para Alert de react-native
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

// Mock directo para Supabase sin depender de @env
jest.mock('./src/lib/supabase', () => {
  const mockSupabase = {
    auth: {
      signUp: jest.fn(() => Promise.resolve({ data: { user: {}, session: {} }, error: null })),
      signInWithPassword: jest.fn(() => Promise.resolve({ data: { user: {}, session: {} }, error: null })),
      signOut: jest.fn(() => Promise.resolve({ error: null })),
      resetPasswordForEmail: jest.fn(() => Promise.resolve({ error: null })),
      updateUser: jest.fn(() => Promise.resolve({ data: { user: {} }, error: null })),
      getSession: jest.fn(() => Promise.resolve({ data: { session: {} }, error: null })),
      onAuthStateChange: jest.fn(() => ({ data: { subscription: { unsubscribe: jest.fn() } } })),
      startAutoRefresh: jest.fn(),
      stopAutoRefresh: jest.fn(),
    },
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    then: jest.fn(() => Promise.resolve({ data: [], error: null })),
  };
  
  return {
    supabase: mockSupabase,
    createClient: jest.fn(() => mockSupabase)
  };
});

// Mock para AuthContext
jest.mock('./src/contexts/AuthContext', () => ({
  AuthProvider: ({ children }) => children,
  useAuth: () => ({
    user: { id: 'mock-user-id', email: 'test@example.com' },
    session: { access_token: 'mock-token' },
    login: jest.fn(),
    logout: jest.fn(),
    signup: jest.fn(),
    resetPassword: jest.fn(),
    updatePassword: jest.fn(),
  }),
})); 