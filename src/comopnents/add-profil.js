import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
// import "./inputFile.sass";
import {
  Upload,
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Icon
} from "antd";
import { addPerson } from "../actions/centActions";
import { connect } from "react-redux";
import { async } from "q";
import isEmpty from "../validation/is-empty";
const { Option } = Select;
const countryList = [
  "Espagne",
  "France",
  "Italie",
  "Malte",
  "Portugal",
  "Algérie",
  "Libye",
  "Mauritanie",
  "Tunisie",
  "Maroc"
];
class DrawerForm extends React.Component {
  state = {
    visible: false,
    country: "",
    name: "",
    bio: "",
    chief: "",
    fileList: [],
    uploading: false,
    file: {}
  };

  handleUpload = e => {
    this.setState(
      {
        file: e.target.files
      },
      () => {
        console.log("hello");
        console.log(this.state.file.length, "this.state.file");
      }
    );
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleChange = event => {
    console.log(event.target.value);
    this.setState({ chief: event.target.value });
  };

  onSubmit = () => {
    console.log(this.state.file, "file sttttt");
    if (this.state.file.length === undefined) {
      /* create with out upload photo */
      console.log(this.state.file, "no");

      const profileData = {
        country: this.state.country,
        name: this.state.name,
        bio: this.state.bio,
        chief: this.state.chief
      };
      this.props.addPerson(profileData, this.onClose);
    } else if (this.state.file.length == 1) {
      const formData = new FormData();
      formData.append("photo", this.state.file[0]);
      console.log(this.state.file[0], "yes");
      formData.set("country", this.state.country);
      formData.set("name", this.state.name);
      formData.set("bio", this.state.bio);
      formData.set("chief", this.state.chief);
      console.log(formData, "profileData");
      this.props.addPerson(formData, this.onClose);
    }
  };
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      country: "",
      name: "",
      bio: "",
      chief: "",
      fileList: [],
      uploading: false,
      file: {}
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          <Icon type="plus" /> Ajouter un profil
        </Button>
        <Drawer
          title="Ajouter un profil"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Nom et Prénom">
                  {getFieldDecorator("name", {
                    rules: [
                      { required: true, message: "ce champ est obliagtoire" }
                    ]
                  })(
                    <div>
                      <Input
                        name="name"
                        onChange={this.onChange}
                        placeholder="Nom et Prénom"
                      />
                      <div style={{ color: "red" }}>
                        {this.props.errors.name}
                      </div>
                    </div>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Chef de file">
                  {getFieldDecorator("chief", {
                    rules: [
                      { required: true, message: "Please if he is a  chief" }
                    ]
                  })(
                    <select
                      // value={this.state.value}
                      onChange={this.handleChange}
                      placeholder="chef"
                      className="select-tag"
                    >
                      <option setFieldsValue="true"> false</option>
                      <option setFieldsValue="false">true </option>
                    </select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="pays">
                  {getFieldDecorator("country", {
                    rules: [
                      { required: true, message: "ce champ est obliagtoire" }
                    ]
                  })(
                    <div>
                      <select
                        className="select-tag"
                        onChange={this.onChange}
                        name="country"
                      >
                        {countryList.map(el => (
                          <Fragment>
                            <option> </option>
                            <option value={el}> {el}</option>
                          </Fragment>
                        ))}
                      </select>
                      <div style={{ color: "red" }}>
                        {this.props.errors.country}
                      </div>
                    </div>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                Photo
                <label class="upload-zone">
                  <i>&nbsp;</i>
                  <input
                    type="file"
                    onChange={this.handleUpload}
                    className="custom-file-input"
                  />
                </label>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="bio">
                  {getFieldDecorator("description", {
                    rules: [
                      {
                        required: true,
                        message: "please enter bio"
                      }
                    ]
                  })(
                    <Input.TextArea
                      rows={4}
                      name="bio"
                      placeholder="Bio"
                      name="bio"
                      onChange={this.onChange}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              padding: "10px 16px",
              background: "#fff",
              textAlign: "right"
            }}
          >
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
              Annuler
            </Button>
            <Button onClick={this.onSubmit} type="primary">
              Soumettre
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

const AddProfil = Form.create()(DrawerForm);
export default connect(
  mapStateToProps,
  { addPerson }
)(AddProfil);

// import React from "react";
// import ReactDOM from "react-dom";
// import "antd/dist/antd.css";
// // import "./inputFile.sass";
// import {
//   Upload,
//   Drawer,
//   Form,
//   Button,
//   Col,
//   Row,
//   Input,
//   Select,
//   DatePicker,
//   Icon
// } from "antd";
// import { addPerson } from "../actions/centActions";
// import { connect } from "react-redux";
// import { async } from "q";
// import isEmpty from "../validation/is-empty";
// const { Option } = Select;
// const countryList = [
//   "Espagne",
//   "France",
//   "Italie",
//   "Malte",
//   "Portugal",
//   "Algérie",
//   "Libye",
//   "Mauritanie",
//   "Tunisie",
//   "Maroc"
// ];
// class DrawerForm extends React.Component {
//   state = {
//     visible: false,
//     country: "",
//     name: "",
//     bio: "",
//     chief: "",
//     fileList: [],
//     uploading: false,
//     file: {}
//   };

//   handleUpload = e => {
//     this.setState(
//       {
//         file: e.target.files
//       },
//       () => {
//         console.log("hello");
//         console.log(this.state.file.length, "this.state.file");
//       }
//     );
//   };

//   onChange = e => {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   };
//   handleChange = event => {
//     console.log(event.target.value);
//     this.setState({ chief: event.target.value });
//   };

//   onSubmit = () => {
//     console.log(this.state.file, "file sttttt");
//     if (this.state.file.length === undefined) {
//       /* create with out upload photo */
//       console.log(this.state.file, "no");

//       const profileData = {
//         country: this.state.country,
//         name: this.state.name,
//         bio: this.state.bio,
//         chief: this.state.chief
//       };
//       this.props.addPerson(profileData, this.onClose);
//     } else if (this.state.file.length == 1) {
//       const formData = new FormData();
//       formData.append("photo", this.state.file[0]);
//       console.log(this.state.file[0], "yes");
//       formData.set("country", this.state.country);
//       formData.set("name", this.state.name);
//       formData.set("bio", this.state.bio);
//       formData.set("chief", this.state.chief);
//       console.log(formData, "profileData");
//       this.props.addPerson(formData, this.onClose);
//     }
//   };
//   showDrawer = () => {
//     this.setState({
//       visible: true
//     });
//   };

//   onClose = () => {
//     this.setState({
//       visible: false
//     });
//   };

//   render() {
//     const { getFieldDecorator } = this.props.form;

//     return (
//       <div>
//         <Button type="primary" onClick={this.showDrawer}>
//           <Icon type="plus" /> Ajouter un profil
//         </Button>
//         <Drawer
//           title="Ajouter un profil"
//           width={720}
//           onClose={this.onClose}
//           visible={this.state.visible}
//         >
//           <Form layout="vertical" hideRequiredMark>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item label="Nom et Prénom">
//                   {getFieldDecorator("name", {
//                     rules: [
//                       { required: true, message: "ce champ est obliagtoire" }
//                     ]
//                   })(
//                     <div>
//                       <Input
//                         name="name"
//                         onChange={this.onChange}
//                         placeholder="Nom et Prénom"
//                       />
//                       <div style={{ color: "red" }}>
//                         {this.props.errors.name}
//                       </div>
//                     </div>
//                   )}
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item label="chief">
//                   {getFieldDecorator("chief", {
//                     rules: [
//                       { required: true, message: "Please if he is a  chief" }
//                     ]
//                   })(
//                     <select
//                       // value={this.state.value}
//                       onChange={this.handleChange}
//                       placeholder="chef"
//                     >
//                       <option setFieldsValue="true">true</option>
//                       <option setFieldsValue="false">false </option>
//                     </select>
//                   )}
//                 </Form.Item>
//               </Col>
//             </Row>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item label="country">
//                   {getFieldDecorator("country", {
//                     rules: [
//                       { required: true, message: "ce champ est obliagtoire" }
//                     ]
//                   })(
//                     <div>
//                       <select
//                         className="select-tag"
//                         onChange={this.onChange}
//                         name="country"
//                       >
//                         {countryList.map(el => (
//                           <option value={el}> {el}</option>
//                         ))}
//                       </select>
//                       <div style={{ color: "red" }}>
//                         {this.props.errors.name}
//                       </div>
//                     </div>
//                   )}
//                 </Form.Item>
//               </Col>
//             </Row>
//             <Row gutter={16}>
//               <Col span={12}>
//                 Photo
//                 <label class="upload-zone">
//                   <i>&nbsp;</i>
//                   <input
//                     type="file"
//                     onChange={this.handleUpload}
//                     className="custom-file-input"
//                   />
//                 </label>
//               </Col>
//             </Row>

//             <Row gutter={16}>
//               <Col span={24}>
//                 <Form.Item label="bio">
//                   {getFieldDecorator("description", {
//                     rules: [
//                       {
//                         required: true,
//                         message: "please enter bio"
//                       }
//                     ]
//                   })(
//                     <Input.TextArea
//                       rows={4}
//                       name="bio"
//                       placeholder="please enter bio"
//                       name="bio"
//                       onChange={this.onChange}
//                     />
//                   )}
//                 </Form.Item>
//               </Col>
//             </Row>
//           </Form>
//           <div
//             style={{
//               position: "absolute",
//               left: 0,
//               bottom: 0,
//               width: "100%",
//               borderTop: "1px solid #e9e9e9",
//               padding: "10px 16px",
//               background: "#fff",
//               textAlign: "right"
//             }}
//           >
//             <Button onClick={this.onClose} style={{ marginRight: 8 }}>
//               Cancel
//             </Button>
//             <Button onClick={this.onSubmit} type="primary">
//               Submit
//             </Button>
//           </div>
//         </Drawer>
//       </div>
//     );
//   }
// }
// const mapStateToProps = state => {
//   return {
//     errors: state.errors
//   };
// };

// const AddProfil = Form.create()(DrawerForm);
// export default connect(
//   mapStateToProps,
//   { addPerson }
// )(AddProfil);
