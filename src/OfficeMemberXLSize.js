import React from "react";
import ReactDOM from "react-dom";
import { Image, Text, View, StyleSheet } from "@react-pdf/renderer";

const a4Dimensions = [595, 842];
const officeMemberAreaDimensions = [515, 55];

class OfficeMemberXLSize extends React.Component {
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
                    {/*
                    Used to display image in 
                    <View style={styles.imageOfMemberContainer}>
                      <Image
                        ref="image"
                        src={this.props.imageUrl}
                        style={{ height: "100%", objectFit: "cover" }}
                      />
                    </View>
                    */}
                    <View style={styles.informationalTextContainer}>
                        <Text style={styles.title}>{this.props.name}</Text>
                        <Text style={styles.subtitle}>{this.props.titel}</Text>
                        <Text style={styles.contact}>
                            Mail: {this.props.email ? this.props.email : "Null"}{" "}
                            - Phone: {this.props.phone}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}
export default OfficeMemberXLSize;

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#E4E4E4"
    },
    title: {
        fontFamily: "AU Passata Bold",
        fontSize: 20,
        fontWeight: 700,
        color: "#003c84"
    },
    subtitle: {
        fontFamily: "AU Passata",
        fontSize: 14,
        color: "#003c84"
    },
    contact: {
        fontFamily: "AU Passata Light",
        fontWeight: 100,
        fontSize: 12,
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
        height: 50,
        width: 109,
        display: "flex"
    },
    imageOfMemberContainer: {
        flexDirection: "row",
        maxWidth: 30,
        height: 40
    },
    informationalTextContainer: {
        marginLeft: 15,
        justifyContent: "center"
    }
});
