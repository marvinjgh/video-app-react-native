import React from "react";
import { Text } from "react-native";
import { getTimeFromSec } from "../../../utils/time";

function TimeText(props) {
    return <Text style={[{color:"white"},props.style]}>{getTimeFromSec(props.time)}</Text>
}

export default TimeText;
