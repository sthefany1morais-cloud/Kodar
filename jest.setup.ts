import "@testing-library/jest-native/extend-expect";

interface NativeComponents {
  [key: string]: string;
  View: string;
  Text: string;
  TouchableOpacity: string;
  ActivityIndicator: string;
  Image: string;
  Modal: string;
  ScrollView: string;
  FlatList: string;
  TextInput: string;
  SafeAreaView: string;
}

const mockNativeComponents: NativeComponents = {
  View: "View",
  Text: "Text",
  TouchableOpacity: "TouchableOpacity",
  ActivityIndicator: "ActivityIndicator",
  Image: "Image",
  Modal: "Modal",
  ScrollView: "ScrollView",
  FlatList: "FlatList",
  TextInput: "TextInput",
  SafeAreaView: "SafeAreaView",
};

jest.mock("styled-components/native", () => {
  const React = require("react");

  const styled = (
    componentName: keyof NativeComponents,
  ): React.ComponentType<any> => {
    return function StyledComponent(props: any) {
      const NativeComponent = mockNativeComponents[componentName] || "View";
      return React.createElement(NativeComponent, props);
    };
  };

  return {
    __esModule: true,
    default: {
      styled: styled as any,
      View: styled("View"),
      Text: styled("Text"),
      TouchableOpacity: styled("TouchableOpacity"),
      ActivityIndicator: styled("ActivityIndicator"),
      Image: styled("Image"),
      Modal: styled("Modal"),
      ScrollView: styled("ScrollView"),
      FlatList: styled("FlatList"),
      TextInput: styled("TextInput"),
      SafeAreaView: styled("SafeAreaView"),
      css: jest.fn(),
      keyframes: jest.fn(),
      ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
      createGlobalStyle: () => () => null,
    },
  } as any;
});

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({ id: "1" }),
  router: { push: jest.fn(), back: jest.fn(), replace: jest.fn() },
  useRouter: () => ({ push: jest.fn(), back: jest.fn(), replace: jest.fn() }),
  usePathname: () => "/",
  useSegments: () => [],
}));

jest.mock("react-native/Libraries/Alert/Alert", () => ({
  alert: jest.fn(),
}));

jest.mock("react-native-webview", () => {
  const React = require("react");
  return {
    WebView: (props: any) =>
      React.createElement("View", { ...props, testID: "mock-webview" }),
  };
});

jest.mock("expo-screen-orientation", () => ({
  lockAsync: jest.fn().mockResolvedValue(undefined),
  unlockAsync: jest.fn().mockResolvedValue(undefined),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  } as Response),
) as jest.Mock;

jest.mock("react-native-reanimated", () => {
  const React = require("react");
  return {
    ...jest.requireActual("react-native-reanimated/mock"),
    default: {
      ...jest.requireActual("react-native-reanimated/mock").default,
      FadeIn: (props: any) => React.createElement("View", props),
      FadeOut: (props: any) => React.createElement("View", props),
    },
  };
});

jest.mock("react-native-linear-gradient", () => {
  const React = require("react");
  return (props: any) =>
    React.createElement("View", { ...props, testID: "linear-gradient" });
});

const originalWarn = console.warn;
beforeAll(() => {
  console.warn = jest.fn();
});

afterAll(() => {
  console.warn = originalWarn;
});
