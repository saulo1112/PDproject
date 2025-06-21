import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as ExpoMediaLibrary from 'expo-media-library';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { Switch } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';

const ICON_SIZE = 26;
export default function PermissionScreen() {
    const [cameraPermission, setCameraPermission] = React.useState<CameraPermissionStatus>("not-determined");
    const [microphonePermission, setMicrophonePermission] = React.useState<CameraPermissionStatus>("not-determined");
    const [mediaLibraryPermission, requestMediaLibraryPermissions] = ExpoMediaLibrary.usePermissions();

    //Function to handle permission requests
    const requestMicrophonePermission = async () => {
        const permissions = await Camera.requestMicrophonePermission();
        setMicrophonePermission(permissions);
         
    }

    const requestCameraPermission = async () => {
        const permission = await Camera.requestCameraPermission();
        setCameraPermission(permission);
         
    }

    const handleContinue = () => {
        if (cameraPermission === "granted" &&
            microphonePermission === "granted" &&
            mediaLibraryPermission?.granted
        ) {
            router.replace("/")
         } else {
                Alert.alert("Plese go to settings and enable the permissions for Obscura.")
        }
    };
    return (
        <>
            <Stack.Screen options={{ headerTitle: "Permissions" }} />
            <ThemedView style={styles.container}>
                <View style={styles.spacer} />
                <ThemedText type="subtitle" style={styles.subtitle}>
                    Obscura needs access to a few permissions in order to work properly.
                </ThemedText>
                <View style={styles.row}>
                    <Ionicons 
                        name="lock-closed-outline"
                        size={ICON_SIZE} 
                        color={"orange"}
                    />
                    <ThemedText style={styles.footnote}>Required</ThemedText>
                </View>
                
                <View style={styles.spacer} />

                <View 
                    style={StyleSheet.compose(styles.row, styles.permissionContainer)}>
                    <Ionicons 
                        name = "camera-outline"
                        color={"gray"} 
                        size={ICON_SIZE}
                    />
                    <View style={styles.permissionText}>
                        <ThemedText type="subtitle">Camera</ThemedText>
                        <ThemedText>Used for taking photos and videos</ThemedText>
                    </View>
                    <Switch
                     trackColor={{ true: "orange" }}
                     value={cameraPermission === "granted"}
                     // @ts-ignore
                     onChange={requestCameraPermission}
                    />
                </View>

                <View style={styles.spacer} />
                <View 
                    style={StyleSheet.compose(styles.row, styles.permissionContainer)}>
                    <Ionicons 
                        name = "mic-circle-outline"
                        color={"gray"} 
                        size={ICON_SIZE}
                    />
                    <View style={styles.permissionText}>
                        <ThemedText type="subtitle">Microphone</ThemedText>
                        <ThemedText>Used for recording video</ThemedText>
                    </View>
                    <Switch
                     trackColor={{ true: "orange" }}
                     value={microphonePermission === "granted"}
                     // @ts-ignore
                     onChange={requestMicrophonePermission}
                    />
                </View>
                <View style={styles.spacer} />
                <View 
                    style={StyleSheet.compose(styles.row, styles.permissionContainer)}>
                    <Ionicons 
                        name = "library-outline"
                        color={"gray"} 
                        size={ICON_SIZE}
                    />
                    <View style={styles.permissionText}>
                        <ThemedText type="subtitle">Library</ThemedText>
                        <ThemedText>Used for saving, viewing and more.</ThemedText>
                    </View>
                    <Switch
                     trackColor={{ true: "orange" }}
                     value={mediaLibraryPermission?.granted}
                     // @ts-ignore
                     onChange={async () => await requestMediaLibraryPermissions()}
                    />
                </View>

                <View style={styles.spacer} />
                <View style={styles.spacer} />
                <View style={styles.spacer} />

                <TouchableOpacity
                    onPress={handleContinue}
                    style={StyleSheet.compose(styles.row, styles.continueButton)}
                >
                    <Ionicons
                        name="arrow-forward-outline"
                        color={"white"}
                        size={ICON_SIZE}
                    />
                </TouchableOpacity>
            </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    textAlign: "center",
  },
  footnote: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  spacer: {
    marginVertical: 8,
  },
  permissionContainer: {
    backgroundColor: "#fffff20",
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
  },
  permissionText: {
    marginLeft: 10,
    flexShrink: 1,
  },
  continueButton: {
    padding: 10,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 50,
    alignSelf: "center",
  },
});
