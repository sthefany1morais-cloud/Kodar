import React, { useState, useRef } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import { WebView } from "react-native-webview";
import styled from "styled-components/native";
import { Course } from "../../types";

const { width: screenWidth } = Dimensions.get("window");

const ModalContainer = styled(Modal)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.95);
`;

const VideoContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  top: 60px;
  right: 20px;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  padding: 12px 16px;
`;

const CloseButtonText = styled(Text)`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`;

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  errorText: {
    color: "#ff6b6b",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});

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
  console.log("VideoPlayer:", course.id, "visible:", visible);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const webViewRef = useRef<WebView>(null);

  const getYouTubeVideoId = (url: string): string => {
    const regex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const videoId = getYouTubeVideoId(course.youtubeUrl);
  if (!videoId || !visible) return null;

  const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`;

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

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6366f1" />
          </View>
        )}

        <View
          style={{
            width: screenWidth - 40,
            height: (screenWidth - 40) * 0.5625,
            backgroundColor: "#000",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <WebView
            ref={webViewRef}
            source={{ uri: youtubeEmbedUrl }}
            style={{ flex: 1 }}
            allowsFullscreenVideo
            javaScriptEnabled
            domStorageEnabled
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
            mediaPlaybackRequiresUserAction={false}
            mixedContentMode="always"
          />
        </View>

        {error && <Text style={styles.errorText}>Erro ao carregar vídeo.</Text>}
      </VideoContainer>
    </ModalContainer>
  );
};
