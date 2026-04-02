import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import SavedScriptsScreen from './scripts';
import SavedVideosScreen from './videos';
import SavedCarouselsScreen from './carousels';
import { colors } from '../../../src/theme/colors';
import { typography } from '../../../src/theme/typography';

const renderScene = SceneMap({
  scripts: SavedScriptsScreen,
  videos: SavedVideosScreen,
  carousels: SavedCarouselsScreen,
});

/**
 * LibraryScreen - Tela principal da biblioteca com tabs
 * 
 * Integra as 3 telas de biblioteca:
 * - Roteiros salvos
 * - Vídeos salvos
 * - Carrosséis salvos
 * 
 * Requirements: 13.1
 */
export default function LibraryScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'scripts', title: 'Roteiros' },
    { key: 'videos', title: 'Vídeos' },
    { key: 'carousels', title: 'Carrosséis' },
  ]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            labelStyle={styles.label}
            activeColor={colors.primary}
            inactiveColor={colors.textSecondary}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white, // mesma cor do tabBar para evitar flash
  },
  tabBar: {
    backgroundColor: colors.white,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  indicator: {
    backgroundColor: colors.primary,
    height: 3,
  },
  label: {
    ...typography.label.large,
    textTransform: 'none',
  },
});
