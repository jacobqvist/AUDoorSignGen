import React from "react";
import {
    PDFDownloadLink,
    Image,
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    BlobProvider
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import BgAarhusUniversity from "./images/Design.png";
import OfficeMember from "./OfficeMember";
import AUPassata_Rg from "./fonts/AUPassata_Rg.ttf";
import AUPassata_Bold from "./fonts/AUPassata_Bold.ttf";
import AUPassata_Light from "./fonts/AUPassata_Light.ttf";
import {
    Formik,
    Field,
    Form,
    FieldArray,
    ErrorMessage,
    withFormik
} from "formik";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OfficeMemberXLSize from "./OfficeMemberXLSize";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import * as Yup from "yup";

const a4Dimensions = [595, 842];
const officeMemberAreaDimensions = [595 - 80, 158];

//From datalogisk institut's facebook page - has to be changed if it changes.
const placeholderImage =
    "https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/302393_245703808806967_1187233386_n.jpg?_nc_cat=109&_nc_ohc=X2iyi42KdKIAX-YznYW&_nc_ht=scontent-arn2-1.xx&oh=4d7a6c2d52c1e222758ee6cf6fda800a&oe=5E9378C3";

let initialValues = {
    members: [
        {
            name: "",
            email: "",
            titel: "",
            phone: "",
            imageUrl: ""
        }
    ]
};

const options = [
    { value: "ADA (5342)", label: "Ada (5342)" },
    { value: "BABBAGE (5340)", label: "Babbage (5340)" },
    { value: "BENJAMIN (5344)", label: "Benjamin (5344)" },
    { value: "BUSH (5343)", label: "Bush (5343)" },
    { value: "CHOMSKY (5363)", label: "Chomsky (5363)" },
    { value: "DREYER (5345)", label: "Dreyer (5345)" },
    { value: "HOPPER (5346)", label: "Hopper (5346" },
    { value: "NYGAARD (5335)", label: "Nygaard (5335)" },
    { value: "SCHÖN (5350)", label: "Schön (5350)" },
    { value: "STIBITZ (5365)", label: "Stibitz (5365)" },
    { value: "TURING (5341)", label: "Turing (5341)" },
    { value: "WIENER (5347)", label: "Wiener (5347)" }
];

let initialValuesOffice = {
    offices: [
        {
            room: "",
            building: ""
        }
    ]
};

//Formik

const MyForm = props => {
    const {
        values,
        touched,
        dirty,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        setFieldValue,
        setFieldTouched,
        isSubmitting
    } = props;
    return (
        <form onSubmit={handleSubmit}>
            <input
                id="room"
                placeholder="Room"
                type="text"
                value={values.room}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-100"
            />
            {errors.room && touched.room && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                    {errors.room}
                </div>
            )}
            <MySelect
                value={values.building}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.building}
                touched={touched.building}
                className="w-100"
            />
            <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-outline-dark"
            >
                Update office values
            </button>
        </form>
    );
};

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        room: Yup.string().required("Room is required!"),
        building: Yup.string().required("Building is required")
    }),
    mapPropsToValues: props => ({
        room: "",
        building: ""
    }),
    handleSubmit: (values, { setSubmitting }) => {
        initialValuesOffice = {
            offices: [
                {
                    room: values.room,
                    building: values.building.value
                }
            ]
        };
        setTimeout(() => {
            alert(initialValuesOffice);
            setSubmitting(false);
        }, 1000);
    },
    displayName: "MyForm"
});

class MySelect extends React.Component {
    handleChange = value => {
        // this is going to call setFieldValue and manually update values.topcis
        this.props.onChange("building", value);
    };

    handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        this.props.onBlur("building", true);
    };

    render() {
        return (
            <div style={{ margin: "1rem 0" }}>
                <Select
                    id="color"
                    options={options}
                    multi={false}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    value={this.props.value}
                />
                {!!this.props.error && this.props.touched && (
                    <div style={{ color: "red", marginTop: ".5rem" }}>
                        {this.props.error}
                    </div>
                )}
            </div>
        );
    }
}

const MyEnhancedForm = formikEnhancer(MyForm);

const GeneratorHeader = () => (
    <div>
        <h1>Door Sign Generator v2</h1>
        <p>
            Fill the information of the office and press generate PDF. Links to
            images must be accessible from third party apps
        </p>
    </div>
);

const OfficeOfBuilding = () => (
    <div>
        <h2>Room & Building information</h2>
        <MyEnhancedForm />
    </div>
);

const MembersOfOffice = () => (
    <div>
        <Formik
            initialValues={initialValues}
            onSubmit={values => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                }, 500);
            }}
        >
            {({ values, isSubmitting }) => (
                <Form>
                    <FieldArray name="members">
                        {({ push, remove }) => (
                            <React.Fragment>
                                <h2>Office member information</h2>
                                {values.members &&
                                    values.members.length > 0 &&
                                    values.members.map((member, index) => (
                                        <div className="row">
                                            <div className="col">
                                                <Field
                                                    name={`members[${index}].name`}
                                                    type="text"
                                                    className="w-100"
                                                >
                                                    {({ field, form }) => (
                                                        <input
                                                            {...field}
                                                            type="text"
                                                            placeholder="Name"
                                                            className="w-100"
                                                        />
                                                    )}
                                                </Field>
                                            </div>
                                            <div className="col">
                                                <Field
                                                    name={`members[${index}].email`}
                                                    type="email"
                                                    placeholder="Email"
                                                    className="w-100"
                                                />
                                            </div>
                                            <div className="col">
                                                <Field
                                                    name={`members[${index}].titel`}
                                                    type="text"
                                                    placeholder="Titel"
                                                    className="w-100"
                                                />
                                            </div>
                                            <div className="col">
                                                <Field
                                                    name={`members[${index}].phone`}
                                                    type="text"
                                                    placeholder="Phone"
                                                    className="w-100"
                                                />
                                            </div>
                                            <div className="col">
                                                <Field
                                                    name={`members[${index}].imageUrl`}
                                                    type="text"
                                                    placeholder="Url of Image"
                                                    className="w-100"
                                                />
                                            </div>
                                            <div className="col">
                                                <button
                                                    className="btn btn-outline-danger"
                                                    type="button"
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                >
                                                    x
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                <button
                                    type="button"
                                    className="btn btn-outline-success"
                                    onClick={() =>
                                        push({
                                            name: "",
                                            email: "",
                                            titel: "",
                                            phone: "",
                                            imageUrl: ""
                                        })
                                    }
                                    disabled={isSubmitting}
                                >
                                    Add Member
                                </button>
                            </React.Fragment>
                        )}
                    </FieldArray>
                    <button
                        className="btn btn-outline-dark"
                        onClick={() => (initialValues = values)}
                    >
                        Update member info
                    </button>
                    {/*<pre>{JSON.stringify(values, null, 2)}</pre>*/}
                </Form>
            )}
        </Formik>
    </div>
);

let MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.page} wrap>
            <Image style={styles.image} src={BgAarhusUniversity} />
            <View style={{ flexDirection: "column" }}>
                <View
                    style={Object.assign(
                        {},
                        styles.topText,
                        styles.officeMemberContainer
                    )}
                >
                    <View style={{ marginTop: 107 }}>
                        <Text
                            style={{
                                opacity: 1,
                                marginLeft: 3,
                                fontFamily: "AU Passata Bold"
                            }}
                        >
                            {initialValuesOffice.offices[0].building}
                        </Text>
                    </View>
                    <View style={{ marginTop: 107 }}>
                        <Text>building</Text>
                    </View>
                </View>
                <View
                    style={Object.assign(
                        {},
                        styles.topText,
                        styles.officeMemberContainer
                    )}
                >
                    <View style={{ marginTop: 129 }}>
                        <Text
                            style={{
                                opacity: 1,
                                marginLeft: 3,
                                fontFamily: "AU Passata Bold"
                            }}
                        >
                            {initialValuesOffice.offices[0].room}
                        </Text>
                    </View>
                    <View style={{ marginTop: 129 }}>
                        <Text style={{ flexFlow: "right" }}>room</Text>
                    </View>
                </View>
                <View style={styles.emptySpacer}></View>
                {prePDFcheck()}
            </View>
        </Page>
    </Document>
);

function prePDFcheck() {
    if (initialValues.members.length === 1) {
        return (
            <OfficeMember
                name={initialValues.members[0].name}
                titel={initialValues.members[0].titel}
                email={initialValues.members[0].email}
                phone={initialValues.members[0].phone}
                imageUrl={
                    initialValues.members[0].imageUrl === ""
                        ? placeholderImage
                        : initialValues.members[0].imageUrl
                }
            />
        );
    } else if (initialValues.members.length === 2) {
        return (
            <View>
                <OfficeMember
                    name={initialValues.members[0].name}
                    titel={initialValues.members[0].titel}
                    email={initialValues.members[0].email}
                    phone={initialValues.members[0].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMember
                    name={initialValues.members[1].name}
                    titel={initialValues.members[1].titel}
                    email={initialValues.members[1].email}
                    phone={initialValues.members[1].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
            </View>
        );
    } else if (initialValues.members.length === 3) {
        return (
            <View>
                <OfficeMember
                    name={initialValues.members[0].name}
                    titel={initialValues.members[0].titel}
                    email={initialValues.members[0].email}
                    phone={initialValues.members[0].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMember
                    name={initialValues.members[1].name}
                    titel={initialValues.members[1].titel}
                    email={initialValues.members[1].email}
                    phone={initialValues.members[1].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMember
                    name={initialValues.members[2].name}
                    titel={initialValues.members[2].titel}
                    email={initialValues.members[2].email}
                    phone={initialValues.members[2].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
            </View>
        );
    } else if (initialValues.members.length === 4) {
        return (
            <View>
                <OfficeMember
                    name={initialValues.members[0].name}
                    titel={initialValues.members[0].titel}
                    email={initialValues.members[0].email}
                    phone={initialValues.members[0].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMember
                    name={initialValues.members[1].name}
                    titel={initialValues.members[1].titel}
                    email={initialValues.members[1].email}
                    phone={initialValues.members[1].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMember
                    name={initialValues.members[2].name}
                    titel={initialValues.members[2].titel}
                    email={initialValues.members[2].email}
                    phone={initialValues.members[2].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMember
                    name={initialValues.members[3].name}
                    titel={initialValues.members[3].titel}
                    email={initialValues.members[3].email}
                    phone={initialValues.members[3].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
            </View>
        );
    } else if (initialValues.members.length === 5) {
        return (
            <View>
                <OfficeMemberXLSize
                    name={initialValues.members[0].name}
                    titel={initialValues.members[0].titel}
                    email={initialValues.members[0].email}
                    phone={initialValues.members[0].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[1].name}
                    titel={initialValues.members[1].titel}
                    email={initialValues.members[1].email}
                    phone={initialValues.members[1].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[2].name}
                    titel={initialValues.members[2].titel}
                    email={initialValues.members[2].email}
                    phone={initialValues.members[2].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[3].name}
                    titel={initialValues.members[3].titel}
                    email={initialValues.members[3].email}
                    phone={initialValues.members[3].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[4].name}
                    titel={initialValues.members[4].titel}
                    email={initialValues.members[4].email}
                    phone={initialValues.members[4].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
            </View>
        );
    } else if (initialValues.members.length === 6) {
        return (
            <View>
                <OfficeMemberXLSize
                    name={initialValues.members[0].name}
                    titel={initialValues.members[0].titel}
                    email={initialValues.members[0].email}
                    phone={initialValues.members[0].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[1].name}
                    titel={initialValues.members[1].titel}
                    email={initialValues.members[1].email}
                    phone={initialValues.members[1].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[2].name}
                    titel={initialValues.members[2].titel}
                    email={initialValues.members[2].email}
                    phone={initialValues.members[2].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[3].name}
                    titel={initialValues.members[3].titel}
                    email={initialValues.members[3].email}
                    phone={initialValues.members[3].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[4].name}
                    titel={initialValues.members[4].titel}
                    email={initialValues.members[4].email}
                    phone={initialValues.members[4].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[5].name}
                    titel={initialValues.members[5].titel}
                    email={initialValues.members[5].email}
                    phone={initialValues.members[5].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
            </View>
        );
    } else if (initialValues.members.length === 7) {
        return (
            <View>
                <OfficeMemberXLSize
                    name={initialValues.members[0].name}
                    titel={initialValues.members[0].titel}
                    email={initialValues.members[0].email}
                    phone={initialValues.members[0].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[1].name}
                    titel={initialValues.members[1].titel}
                    email={initialValues.members[1].email}
                    phone={initialValues.members[1].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[2].name}
                    titel={initialValues.members[2].titel}
                    email={initialValues.members[2].email}
                    phone={initialValues.members[2].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[3].name}
                    titel={initialValues.members[3].titel}
                    email={initialValues.members[3].email}
                    phone={initialValues.members[3].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[4].name}
                    titel={initialValues.members[4].titel}
                    email={initialValues.members[4].email}
                    phone={initialValues.members[4].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[5].name}
                    titel={initialValues.members[5].titel}
                    email={initialValues.members[5].email}
                    phone={initialValues.members[5].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[6].name}
                    titel={initialValues.members[6].titel}
                    email={initialValues.members[6].email}
                    phone={initialValues.members[6].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
            </View>
        );
    } else if (initialValues.members.length === 8) {
        return (
            <View>
                <OfficeMemberXLSize
                    name={initialValues.members[0].name}
                    titel={initialValues.members[0].titel}
                    email={initialValues.members[0].email}
                    phone={initialValues.members[0].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[1].name}
                    titel={initialValues.members[1].titel}
                    email={initialValues.members[1].email}
                    phone={initialValues.members[1].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[2].name}
                    titel={initialValues.members[2].titel}
                    email={initialValues.members[2].email}
                    phone={initialValues.members[2].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[3].name}
                    titel={initialValues.members[3].titel}
                    email={initialValues.members[3].email}
                    phone={initialValues.members[3].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[4].name}
                    titel={initialValues.members[4].titel}
                    email={initialValues.members[4].email}
                    phone={initialValues.members[4].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[5].name}
                    titel={initialValues.members[5].titel}
                    email={initialValues.members[5].email}
                    phone={initialValues.members[5].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[6].name}
                    titel={initialValues.members[6].titel}
                    email={initialValues.members[6].email}
                    phone={initialValues.members[6].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[7].name}
                    titel={initialValues.members[7].titel}
                    email={initialValues.members[7].email}
                    phone={initialValues.members[7].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
            </View>
        );
    } else if (initialValues.members.length === 9) {
        return (
            <View>
                <OfficeMemberXLSize
                    name={initialValues.members[0].name}
                    titel={initialValues.members[0].titel}
                    email={initialValues.members[0].email}
                    phone={initialValues.members[0].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[1].name}
                    titel={initialValues.members[1].titel}
                    email={initialValues.members[1].email}
                    phone={initialValues.members[1].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[2].name}
                    titel={initialValues.members[2].titel}
                    email={initialValues.members[2].email}
                    phone={initialValues.members[2].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[3].name}
                    titel={initialValues.members[3].titel}
                    email={initialValues.members[3].email}
                    phone={initialValues.members[3].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[4].name}
                    titel={initialValues.members[4].titel}
                    email={initialValues.members[4].email}
                    phone={initialValues.members[4].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[5].name}
                    titel={initialValues.members[5].titel}
                    email={initialValues.members[5].email}
                    phone={initialValues.members[5].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[6].name}
                    titel={initialValues.members[6].titel}
                    email={initialValues.members[6].email}
                    phone={initialValues.members[6].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[7].name}
                    titel={initialValues.members[7].titel}
                    email={initialValues.members[7].email}
                    phone={initialValues.members[7].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[8].name}
                    titel={initialValues.members[8].titel}
                    email={initialValues.members[8].email}
                    phone={initialValues.members[8].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
            </View>
        );
    } else if (initialValues.members.length === 10) {
        return (
            <View>
                <OfficeMemberXLSize
                    name={initialValues.members[0].name}
                    titel={initialValues.members[0].titel}
                    email={initialValues.members[0].email}
                    phone={initialValues.members[0].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[1].name}
                    titel={initialValues.members[1].titel}
                    email={initialValues.members[1].email}
                    phone={initialValues.members[1].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[2].name}
                    titel={initialValues.members[2].titel}
                    email={initialValues.members[2].email}
                    phone={initialValues.members[2].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[3].name}
                    titel={initialValues.members[3].titel}
                    email={initialValues.members[3].email}
                    phone={initialValues.members[3].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[4].name}
                    titel={initialValues.members[4].titel}
                    email={initialValues.members[4].email}
                    phone={initialValues.members[4].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[5].name}
                    titel={initialValues.members[5].titel}
                    email={initialValues.members[5].email}
                    phone={initialValues.members[5].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[6].name}
                    titel={initialValues.members[6].titel}
                    email={initialValues.members[6].email}
                    phone={initialValues.members[6].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[7].name}
                    titel={initialValues.members[7].titel}
                    email={initialValues.members[7].email}
                    phone={initialValues.members[7].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[8].name}
                    titel={initialValues.members[8].titel}
                    email={initialValues.members[8].email}
                    phone={initialValues.members[8].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
                <OfficeMemberXLSize
                    name={initialValues.members[9].name}
                    titel={initialValues.members[9].titel}
                    email={initialValues.members[9].email}
                    phone={initialValues.members[9].phone}
                    imageUrl={
                        initialValues.members[0].imageUrl === ""
                            ? placeholderImage
                            : initialValues.members[0].imageUrl
                    }
                />
            </View>
        );
    }
}

class App extends React.Component {
    state = { url: null, go: null, building: "null", room: null };

    onRender = ({ blob }) => {
        this.setState({ url: URL.createObjectURL(blob) });
    };
    handleUpdate = () => {
        this.setState({ go: "go" });
    };
    render() {
        return (
            <div
                style={{
                    marginTop: "100px",
                    marginLeft: "180px",
                    marginRight: "180px"
                }}
            >
                <GeneratorHeader />
                <OfficeOfBuilding />
                <MembersOfOffice />
                <div>
                    <div>
                        <button
                            className="btn btn-outline-dark"
                            onClick={this.handleUpdate}
                        >
                            Create PDF
                        </button>
                    </div>
                    Download your PDF here:
                    {this.state.go ? (
                        <PDFDownloadLink
                            document={<MyDocument />}
                            fileName="mybeautifuldoorsign.pdf"
                        >
                            {({ blob, url, loading, error }) =>
                                loading ? "Loading..." : "Download!"
                            }
                        </PDFDownloadLink>
                    ) : (
                        <Text>Insert text</Text>
                    )}
                </div>
            </div>
        );
    }
}

Font.register({
    family: "AU Passata",
    src: AUPassata_Rg
});
Font.register({
    family: "AU Passata Bold",
    src: AUPassata_Bold
});
Font.register({
    family: "AU Passata Light",
    src: AUPassata_Light
});

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#E4E4E4"
    },
    wideInput: {
        width: "100%"
    },
    title: {
        fontFamily: "AU Passata",
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
        fontFamily: "AU Passata",
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
        height: officeMemberAreaDimensions[1],
        width: 116
    },
    memberContainer: {
        marginTop: 6,
        marginLeft: 40,
        height: officeMemberAreaDimensions[1],
        width: 116,
        display: "flex"
    },
    imageOfMemberContainer: {
        flexDirection: "row",
        maxWidth: 116,
        height: officeMemberAreaDimensions[1]
    },
    informationalTextContainer: {
        marginLeft: 15,
        justifyContent: "center"
    }
});

export default App;
