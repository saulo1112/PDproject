import {
    Text,
    TouchableHighlight,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";
import Animated, { BounceIn } from "react-native-reanimated";

const MIN_ZOOM = 1;
const MAX_ZOOM = 128;
const NEUTRAL_ZOOM = 1;
const zoomOptions = [1, 2, 3, 4, 5];

export default function ZoomControls({
    setZoom,
    zoom,
    setShowZoomControls
}: {
    setZoom: (zoom: number) => void;
    setShowZoomControls: (show: boolean) => void;
    zoom: number;
}) {
    const { width, height } = useWindowDimensions();

    // Subimos el arco aumentando el factor restado
    const centerY = height / 4 - 50; // antes era height / 4
    const centerX = 40;
    const radius = Math.min(width, height - 100) * 0.35;

    const handleZoomPress = (zoomFactor: number) => {
        if (zoomFactor === -1) {
            setZoom(NEUTRAL_ZOOM);
        } else {
            const newZoom = Math.min(Math.max(zoomFactor, MIN_ZOOM), MAX_ZOOM);
            setZoom(newZoom);
        }
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            {zoomOptions.map((z, i) => {
                const angle = (i / zoomOptions.length / 3) * 2 * Math.PI - Math.PI / 2;
                const x = Math.cos(angle) * radius + centerX;
                const y = Math.sin(angle) * radius + centerY;

                return (
                    <Animated.View
                        key={i}
                        entering={BounceIn.delay(i * 100)}
                        style={{
                            position: "absolute",
                            left: x,
                            top: y,
                        }}
                    >
                        <TouchableHighlight
                            onPress={() => handleZoomPress(z)}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                backgroundColor: zoom === z ? "#ffffff" : "#ffffff30",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: zoom === z ? "black" : "white",
                                    fontWeight: "600",
                                }}
                            >
                                {z}x
                            </Text>
                        </TouchableHighlight>
                    </Animated.View>
                );
            })}

            <TouchableOpacity
                onPress={() => setShowZoomControls(false)}
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: "#ffffff30",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    left: centerX,
                    top: centerY,
                }}
            >
                <Text style={{ color: "white", fontWeight: "600" }}>X</Text>
            </TouchableOpacity>
        </View>
    );
}
