import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { colors, typography, spacing } from '@/theme';

export type ScrollMode = 'auto' | 'manual' | 'voice';

export interface TeleprompterViewProps {
  text: string;
  scrollMode: ScrollMode;
  scrollSpeed?: number; // pixels per second
  fontSize?: number;
  isPlaying?: boolean;
  onScrollEnd?: () => void;
  onPlayPause?: () => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const TeleprompterView: React.FC<TeleprompterViewProps> = ({
  text,
  scrollMode,
  scrollSpeed = 50,
  fontSize = 24,
  isPlaying = false,
  onScrollEnd,
  onPlayPause,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  // Auto scroll effect
  useEffect(() => {
    if (scrollMode === 'auto' && isPlaying && contentHeight > 0) {
      const duration = (contentHeight / scrollSpeed) * 1000;
      
      animationRef.current = Animated.timing(scrollY, {
        toValue: contentHeight - SCREEN_HEIGHT,
        duration,
        useNativeDriver: false,
      });

      animationRef.current.start(({ finished }) => {
        if (finished && onScrollEnd) {
          onScrollEnd();
        }
      });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [scrollMode, isPlaying, contentHeight, scrollSpeed, scrollY, onScrollEnd]);

  // Sync scroll position with animated value
  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      scrollViewRef.current?.scrollTo({ y: value, animated: false });
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY]);

  // Pan responder for manual scroll
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => scrollMode === 'manual',
      onMoveShouldSetPanResponder: () => scrollMode === 'manual',
      onPanResponderMove: (_, gestureState) => {
        if (scrollMode === 'manual') {
          const newPosition = Math.max(
            0,
            Math.min(scrollPosition - gestureState.dy, contentHeight - SCREEN_HEIGHT)
          );
          scrollViewRef.current?.scrollTo({ y: newPosition, animated: false });
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (scrollMode === 'manual') {
          const newPosition = Math.max(
            0,
            Math.min(scrollPosition - gestureState.dy, contentHeight - SCREEN_HEIGHT)
          );
          setScrollPosition(newPosition);
        }
      },
    })
  ).current;

  const handleScroll = (event: any) => {
    const { y } = event.nativeEvent.contentOffset;
    setScrollPosition(y);
  };

  const handlePlayPause = () => {
    if (onPlayPause) {
      onPlayPause();
    }
  };

  return (
    <View style={styles.container}>
      {/* Controls */}
      {scrollMode === 'auto' && (
        <View style={styles.controls}>
          <IconButton
            icon={isPlaying ? 'pause' : 'play'}
            size={32}
            iconColor={colors.primary}
            onPress={handlePlayPause}
            accessibilityLabel={isPlaying ? 'Pausar' : 'Reproduzir'}
          />
        </View>
      )}

      {/* Teleprompter text */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={scrollMode === 'manual'}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        {...(scrollMode === 'manual' ? panResponder.panHandlers : {})}
      >
        <View
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setContentHeight(height);
          }}
        >
          <Text
            style={[
              styles.text,
              {
                fontSize,
                lineHeight: fontSize * 1.5,
              },
            ]}
          >
            {text}
          </Text>
        </View>
      </ScrollView>

      {/* Mode indicator */}
      <View style={styles.modeIndicator}>
        <Text style={styles.modeText}>
          {scrollMode === 'auto' && 'Modo: Automático'}
          {scrollMode === 'manual' && 'Modo: Manual (arraste para rolar)'}
          {scrollMode === 'voice' && 'Modo: Sincronizado com voz'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  controls: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: SCREEN_HEIGHT / 3,
  },
  text: {
    color: colors.white,
    fontFamily: typography.fontFamily.regular,
    textAlign: 'center',
  },
  modeIndicator: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.md,
    right: spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
  },
  modeText: {
    color: colors.white,
    fontSize: 12,
    fontFamily: typography.fontFamily.regular,
    textAlign: 'center',
  },
});
