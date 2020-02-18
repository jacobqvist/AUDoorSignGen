import React from "react";
import ReactDOM from "react-dom";
import { Image, Text, View, StyleSheet } from "@react-pdf/renderer";

const a4Dimensions = [595, 842];
const officeMemberAreaDimensions = [515, 150];

class OfficeMember extends React.Component {
    render() {
        return (
            <View
                style={Object.assign(
                    {},
                    styles.memberContainer,
                    styles.officeMemberContainer
                )}
            >
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.imageOfMemberContainer}>
                        <Image
                            ref="image"
                            source={this.props.imageUrl}
                            style={{ height: "100%", objectFit: "cover" }}
                        />
                    </View>
                    <View style={styles.informationalTextContainer}>
                        <Text style={styles.title} break>
                            {this.props.name}
                        </Text>
                        <Text style={styles.subtitle}>{this.props.titel}</Text>
                        <Text style={styles.contact}>
                            Mail: {this.props.email}
                        </Text>
                        <Text style={styles.contact}>
                            Phone: {this.props.phone}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}
export default OfficeMember;

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#E4E4E4"
    },
    title: {
        fontFamily: "AU Passata Bold",
        fontSize: 28,
        fontWeight: 700,
        color: "#003c84"
    },
    subtitle: {
        fontFamily: "AU Passata",
        fontSize: 20,
        color: "#003c84"
    },
    contact: {
        fontFamily: "AU Passata Light",
        fontWeight: 100,
        fontSize: 16,
        color: "#003c84"
    },

    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    image: {
        position: "absolute",
        top: 0,
        right: 0,
        width: a4Dimensions[0],
        height: a4Dimensions[1]
    },
    pdfViewContainer: {
        alignSelf: "center",
        width: window.innerWidth * 0.8,
        height: window.innerHeight
    },
    officeMemberContainer: {
        width: officeMemberAreaDimensions[0],
        height: officeMemberAreaDimensions[1],
        display: "flex"
    },
    topText: {
        marginTop: 6,
        marginLeft: 40,
        marginRight: 40,
        height: officeMemberAreaDimensions[1],
        width: 116,
        flexDirection: "row-reverse",
        position: "absolute",
        fontSize: 17,
        color: "#003c84",
        opacity: 0.3,
        display: "flex"
    },
    emptySpacer: {
        marginTop: 6,
        marginLeft: 40,
        height: officeMemberAreaDimensions[1] - 20,
        width: 116
    },
    memberContainer: {
        marginTop: 6,
        marginLeft: 40,
        height: 148,
        width: 109,
        display: "flex"
    },
    imageOfMemberContainer: {
        flexDirection: "row",
        width: 109,
        height: 148
    },
    informationalTextContainer: {
        marginLeft: 15,
        marginRight: 40,
        maxWidth: 390,
        justifyContent: "center"
    }
});
