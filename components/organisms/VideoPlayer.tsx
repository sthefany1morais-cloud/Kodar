import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";
import styled from "styled-components/native";
import { Course } from "../../types";

const { width: screenWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute" as const,
    top: "50%" as const,
    left: "50%" as const,
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  errorText: {
    color: "#ff6b6b",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    fontWeight: "500",
  },
});

const ModalContainer = styled(Modal)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.98);
`;

const VideoContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${Platform.OS === "ios" ? "40px" : "20px"};
`;

const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  top: ${Platform.OS === "ios" ? "70px" : "50px"};
  right: 20px;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 25px;
  padding: 15px 20px;
`;

const CloseButtonText = styled(Text)`
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
`;

const VideoWrapper = styled(View)`
  width: 95%;
  max-width: 500px;
  height: 60%;
  max-height: 300px;
  background-color: #000;
  border-radius: 20px;
  overflow: hidden;
`;

const TitleText = styled(Text)`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

interface VideoPlayerProps {
  course: Course;
  visible: boolean;
  onClose: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  course,
  visible,
  onClose,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    const handleOrientation = async () => {
      if (visible) {
        try {
          await ScreenOrientation.unlockAsync();
          StatusBar.setHidden(true, "fade");
          console.log("Rotação liberada - Landscape OK");
        } catch (error) {
          console.log("Rotação não suportada neste dispositivo");
        }
      } else {
        try {
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT_UP,
          );
          StatusBar.setHidden(false);
          console.log("Rotação travada - Portrait");
        } catch (error) {
          console.log("Lock falhou");
        }
      }
    };

    handleOrientation();

    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      ).catch(console.log);
      StatusBar.setHidden(false);
    };
  }, [visible]);

  const getYouTubeVideoId = (url: string): string => {
    const regex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const videoId = getYouTubeVideoId(course.youtubeUrl);
  if (!videoId || !visible) return null;

  const youtubeEmbedUrl = Platform.select({
    android: `https://m.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&fs=1`,
    ios: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&fs=1`,
    default: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&fs=1`,
  });

  const injectedJavaScript = `
    (function() {
      setTimeout(() => {
        const video = document.querySelector('video');
        if (video) video.play();
      }, 1000);
    })();
    true;
  `;

  return (
    <ModalContainer
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <VideoContainer>
        <CloseButton onPress={onClose}>
          <CloseButtonText>✕</CloseButtonText>
        </CloseButton>

        <TitleText>{course.title}</TitleText>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6366f1" />
          </View>
        )}

        <VideoWrapper>
          <WebView
            ref={webViewRef}
            source={{ uri: youtubeEmbedUrl }}
            style={{ flex: 1 }}
            allowsFullscreenVideo
            javaScriptEnabled
            domStorageEnabled
            mediaPlaybackRequiresUserAction={false}
            mixedContentMode="always"
            allowsInlineMediaPlayback
            onLoadStart={() => {
              setLoading(true);
              setError(false);
            }}
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
            injectedJavaScript={injectedJavaScript}
            scrollEnabled={false}
            bounces={false}
          />
        </VideoWrapper>

        {error && (
          <Text style={styles.errorText}>
            Erro ao carregar vídeo. Tente novamente.
          </Text>
        )}
      </VideoContainer>
    </ModalContainer>
  );
};
