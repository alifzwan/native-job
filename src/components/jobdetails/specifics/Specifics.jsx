import { View, Text } from "react-native";
import styles from "./specifics.style";

const Specifics = ({title, details}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title} :</Text>

      <View style={styles.pointsContainer}>
        {details.map((item) => (
          <View key={item} style={styles.pointWrapper}>
            <View style={styles.pointDot}/>
            <Text style={styles.pointText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Specifics;
