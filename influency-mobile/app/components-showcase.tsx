import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Card from '@/components/atoms/Card';
import Chip from '@/components/atoms/Chip';
import Badge from '@/components/atoms/Badge';
import Avatar from '@/components/atoms/Avatar';
import Loading from '@/components/atoms/Loading';
import ProgressBar from '@/components/atoms/ProgressBar';
import Switch from '@/components/atoms/Switch';
import Checkbox from '@/components/atoms/Checkbox';
import Radio from '@/components/atoms/Radio';
import Slider from '@/components/atoms/Slider';
import Divider from '@/components/atoms/Divider';
import { colors, spacing, typography } from '@/theme';

export default function ComponentsShowcase() {
  const [inputValue, setInputValue] = useState('');
  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [chipSelected, setChipSelected] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Showcase de Componentes Atoms</Text>
        <Text style={styles.subtitle}>14 componentes base implementados</Text>

        {/* Button */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Button</Text>
          <View style={styles.row}>
            <Button variant="primary" onPress={() => {}}>
              Primary
            </Button>
            <Button variant="secondary" onPress={() => {}}>
              Secondary
            </Button>
          </View>
          <View style={styles.row}>
            <Button variant="outline" onPress={() => {}}>
              Outline
            </Button>
            <Button variant="text" onPress={() => {}}>
              Text
            </Button>
          </View>
        </View>

        <Divider />

        {/* Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Input</Text>
          <Input
            label="Email"
            placeholder="Digite seu email"
            value={inputValue}
            onChangeText={setInputValue}
            type="email"
          />
          <Input
            label="Senha"
            placeholder="Digite sua senha"
            value=""
            onChangeText={() => {}}
            type="password"
          />
          <Input
            label="Com erro"
            placeholder="Campo com erro"
            value=""
            onChangeText={() => {}}
            error="Este campo é obrigatório"
          />
        </View>

        <Divider />

        {/* Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Card</Text>
          <Card variant="elevated" padding={spacing.md}>
            <Text>Card Elevated (com sombra)</Text>
          </Card>
          <Card variant="outlined" padding={spacing.md}>
            <Text>Card Outlined (com borda)</Text>
          </Card>
          <Card variant="filled" padding={spacing.md}>
            <Text>Card Filled (com background)</Text>
          </Card>
        </View>

        <Divider />

        {/* Chip */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Chip</Text>
          <View style={styles.row}>
            <Chip label="Default" onPress={() => {}} />
            <Chip
              label="Selected"
              selected={chipSelected}
              onPress={() => setChipSelected(!chipSelected)}
            />
          </View>
        </View>

        <Divider />

        {/* Badge */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Badge</Text>
          <View style={styles.row}>
            <View>
              <Text>Badge com contagem:</Text>
              <Badge count={5} />
            </View>
            <View>
              <Text>Badge 99+:</Text>
              <Badge count={150} max={99} />
            </View>
            <View>
              <Text>Badge dot:</Text>
              <Badge variant="dot" />
            </View>
          </View>
        </View>

        <Divider />

        {/* Avatar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Avatar</Text>
          <View style={styles.row}>
            <Avatar size="small" fallback="RC" />
            <Avatar size="medium" fallback="RC" />
            <Avatar size="large" fallback="RC" />
          </View>
        </View>

        <Divider />

        {/* Loading */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Loading</Text>
          <Loading size="large" />
        </View>

        <Divider />

        {/* ProgressBar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. ProgressBar</Text>
          <ProgressBar progress={0.3} animated />
          <ProgressBar progress={0.7} animated />
          <ProgressBar progress={1.0} animated />
        </View>

        <Divider />

        {/* Switch */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Switch</Text>
          <Switch
            value={switchValue}
            onValueChange={setSwitchValue}
            label="Ativar notificações"
          />
        </View>

        <Divider />

        {/* Checkbox */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Checkbox</Text>
          <Checkbox
            checked={checkboxValue}
            onPress={() => setCheckboxValue(!checkboxValue)}
            label="Aceito os termos"
          />
        </View>

        <Divider />

        {/* Radio */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Radio</Text>
          <Radio
            selected={radioValue}
            onPress={() => setRadioValue(!radioValue)}
            label="Opção selecionada"
          />
        </View>

        <Divider />

        {/* Slider */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. Slider</Text>
          <Text>Valor: {sliderValue}</Text>
          <Slider
            value={sliderValue}
            onValueChange={setSliderValue}
            minimumValue={0}
            maximumValue={100}
          />
        </View>

        <Divider />

        {/* Divider */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>13. Divider</Text>
          <Text>Linha acima</Text>
          <Divider />
          <Text>Linha abaixo</Text>
        </View>

        {/* Resumo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✅ Resumo</Text>
          <Text style={styles.summary}>
            Todos os 14 componentes atoms foram implementados com sucesso:
            {'\n\n'}
            1. Button (5 variantes){'\n'}
            2. Input (4 tipos){'\n'}
            3. Card (3 variantes){'\n'}
            4. Chip (2 estados){'\n'}
            5. Badge (2 variantes){'\n'}
            6. Avatar (3 tamanhos){'\n'}
            7. Loading{'\n'}
            8. ProgressBar{'\n'}
            9. Switch{'\n'}
            10. Checkbox{'\n'}
            11. Radio{'\n'}
            12. Slider{'\n'}
            13. Divider{'\n'}
            14. (Icon - via Lucide)
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface.background,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  title: {
    ...typography.headline.large,
    color: colors.primary[500],
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body.large,
    color: colors.neutral[600],
    marginBottom: spacing.xl,
  },
  section: {
    marginVertical: spacing.md,
  },
  sectionTitle: {
    ...typography.title.medium,
    color: colors.neutral[900],
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
    marginVertical: spacing.sm,
  },
  summary: {
    ...typography.body.medium,
    color: colors.neutral[700],
    lineHeight: 24,
  },
});
