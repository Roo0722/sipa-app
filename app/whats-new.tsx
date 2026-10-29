import { ScrollView, Text, View } from "react-native";
import { changelog } from "../src/changelog";
import { shared } from "../src/theme";

export default function WhatsNew() {
  return (
    <ScrollView style={shared.screen} contentContainerStyle={shared.content}>
      {changelog.map((c) => (
        <View key={c.id} style={shared.card}>
          <Text style={shared.h2}>Version {c.version}</Text>
          <Text style={shared.muted}>{c.date}</Text>
          {c.items.map((t) => (
            <Text key={t} style={[shared.body, { marginTop: 6 }]}>• {t}</Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
