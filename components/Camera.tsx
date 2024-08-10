import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [qrScanner, setQrScanner] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  const handleQrScanner = () => setQrScanner((event) => !event);

  const handleBarcodeScanned = (scanningResult: any) => {
    if (scanned) return;
    setScanned(true);
    setScannedData(scanningResult.data);
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const cameraModule = (
    <CameraView
      style={styles.camera}
      barcodeScannerSettings={{ barcodeTypes: ["qr"] }} onBarcodeScanned={scanned ? undefined:handleBarcodeScanned}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleQrScanner}>
          <Text style={styles.text}>Close QR</Text>
        </TouchableOpacity>
      </View>
      {scanned && (<View>
        <Text>Scanned Data: {scannedData}</Text>
        <Button title="Tap to Scan Again" onPress={() => setScanned(false)}></Button>
      </View>)}
    </CameraView>
  );

  return (
    <View style={styles.container}>
      {qrScanner ? (
        cameraModule
      ) : (
        <Button onPress={handleQrScanner} title="QR"></Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
