import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";

const TattooScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.title}>GranotaTattoo</Text>
              <Text style={styles.subtitle}>Mario LLinares Pedraza</Text>
              <View style={styles.info}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Tatuajes</Text>
                  <Text style={styles.infoValue}>34</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Ganancias</Text>
                  <Text style={styles.infoValue}>200€</Text>
                </View>
              </View>
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.buttonSolid}>
                  <Text style={styles.buttonText}>Ver Tattoos</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
    marginTop: Platform.OS === "android" ? 30 : 0, // Ajuste para Android
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 2 },
  },
  cardContent: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 6,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoItem: {
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: 14,
  },
  buttons: {
    flexDirection: "row",
  },
  buttonSolid: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    marginHorizontal: 4,
    backgroundColor: "purple",
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
  },
});

export default TattooScreen;
