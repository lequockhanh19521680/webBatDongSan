import React, { Component, useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import exit from "../../assests/sign_up/exit.png";
import eyeOn from "../../assests/sign_up/eye_on.png";
import eyeOff from "../../assests/sign_up/eye_off.png";
import Cookies from "js-cookie";
import { checkValidEmail } from "./valid-email";
import { checkValidPassword } from "./valid-password";
import { checkValidIdentity } from "./valid-identity";
import { checkValidName } from "./valid-name";
import SignIn from "./sign-in";
import ConfirmEmail from "./confirm-email";
import "./sign-up.css";
import Select from "react-select";
import axios from "axios";
import { showErrMsg } from "./notification/notification";
import { Backdrop, CircularProgress } from "@material-ui/core";

import Popup from "reactjs-popup";
const SignUp = ({
  setIsSignUpOpen,
  handleSignInOpen,
  handleConfirm,
  setEmailHeader,
}) => {
  const customStyle = {
    dropdownIndicator: (base) => ({
      ...base,
      color: "rgba(0,0,0,1)",
      opacity: "0.96",
      "&:hover": {
        color: "rgba(0,0,0,1)",
        opacity: "0.96",
      },
    }),
    control: (provided) => ({
      ...provided,
      border: "1px solid #a18474",
      borderRadius: "10px",
      height: "56px",
      color: "#a18474",
    }),
  };
  const [passVisibility, setPassVisibility] = useState(eyeOff);
  const [rePassVisibility, setRePassVisibility] = useState(eyeOff);
  const [inputType, setInputType] = useState("password");
  const [reInputType, setReInputType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState();
  const [type, setType] = useState();
  const [identityNumber, setIdentityNumber] = useState("");
  const [province, setProvince] = useState("");
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const ref = useRef();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedWards, setSelectedWards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [isTypeDate, setIsTypeDate] = useState(false);
  // checkValid
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidRePassword, setIsValidRePassword] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidID, setIsValidID] = useState(true);
  const [isSetGender, setIsSetGender] = useState(true);
  const [isSetType, setIsSetType] = useState(true);
  const [isAgreeChecked, setIsAgreeChecked] = useState(true);
  // errorMessage
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [rePasswordError, setRePasswordError] = useState();
  const [nameError, setNameError] = useState();
  const [idError, setIDError] = useState();
  const [isAgreeError, setIsAgreeError] = useState();
  const [genderError, setGenderError] = useState();
  const [typeError, setTypeError] = useState();
  const [error, setError] = useState("");
  useEffect(() => {
    getProvinces();
  }, []);

  async function getProvinces() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/address/provinces`)
      .then((res) => {
        const data = res.data;
        const list = data.map((item) => ({
          value: item._id,
          label: item.name,
        }));
        setProvinces(list);
      });
  }

  function getEmailError(email) {
    let errorMessage = "";
    if (!checkValidEmail(email)) {
      errorMessage = email ? "Email sai ?????nh d???ng" : "Email kh??ng ???????c tr???ng";
      setIsValidEmail(false);
      setEmailError(errorMessage);
    } else {
      setIsValidEmail(true);
    }
  }
  function getPasswordError(password) {
    let errorMessage = "";
    if (!checkValidPassword(password)) {
      errorMessage = password
        ? "M???t kh???u t???i thi???u 6 k?? t??? bao g???m t???i thi???u 1 k?? t??? in hoa v?? 1 ch??? s???"
        : "M???t kh???u kh??ng ???????c tr???ng";
      setIsValidPassword(false);
      setPasswordError(errorMessage);
    } else {
      setIsValidPassword(true);
    }
  }
  function getRePasswordError(password, rePassword) {
    let errorMessage = "";
    if (rePassword == password && rePassword && password) {
      setIsValidRePassword(true);
      return;
    } else {
      setIsValidRePassword(false);
      if (!rePassword) {
        errorMessage = "Nh???p l???i m???t kh???u kh??ng ???????c ????? tr???ng";
      } else {
        errorMessage = "M???t kh???u kh??ng kh???p";
      }
      setRePasswordError(errorMessage);
      return;
    }
  }
  function getNameError(name) {
    let errorMessage = "";
    if (!checkValidName(name)) {
      errorMessage = name
        ? "T??n sai ?????nh d???ng, ch??? bao g???m ch??? c??i ho???c kho???ng tr???ng, ????? d??i t??? 3 ?????n 50 k?? t???"
        : "T??n kh??ng ???????c ????? tr???ng";
      setIsValidName(false);
      setNameError(errorMessage);
    } else {
      setIsValidName(true);
    }
  }
  function getIDError(idNumber) {
    let errorMessage = "";
    if (!checkValidIdentity(idNumber)) {
      errorMessage = idNumber
        ? "CMND/CCCD sai ?????nh d???ng, ch??? ch???a s???, ????? d??i 9 ho???c 12 ch??? s???"
        : "CMND/CCCD kh??ng ???????c ????? tr???ng";
      setIsValidID(false);
      setIDError(errorMessage);
    } else {
      setIsValidID(true);
    }
  }
  function getSetGenderError(gender) {
    let errorMessage = "";
    if (gender) {
      setIsSetGender(true);
    } else {
      errorMessage = "Vui l??ng ch???n gi???i t??nh";
      setIsSetGender(false);
      setGenderError(errorMessage);
    }
  }
  function getSetTypeError(type) {
    let errorMessage = "";
    if (type) {
      setIsSetType(true);
    } else {
      errorMessage = "Vui l??ng ch???n lo???i ?????i t?????ng ????ng k??";
      setIsSetType(false);
      setTypeError(errorMessage);
    }
  }
  function getIsAgreeError(isAgree) {
    let errorMessage = "";
    if (isAgree) {
      setIsAgreeChecked(true);
    } else {
      errorMessage = "B???n ph???i ?????ng ?? ??i???u kho???n s??? d???ng ????? ????ng k??";
      setIsAgreeChecked(false);
      setIsAgreeError(errorMessage);
    }
  }
  const handleSignUp = () => {
    setError("");
    getEmailError(email);
    getPasswordError(password);
    getRePasswordError(password, rePassword);
    getNameError(name);
    getIDError(identityNumber);
    getSetGenderError(gender);
    getSetTypeError(type);
    getIsAgreeError(isAgree);
    if (
      checkValidEmail(email) &&
      checkValidPassword(password) &&
      checkValidName(name) &&
      checkValidIdentity(identityNumber) &&
      isAgree &&
      rePassword &&
      password == rePassword &&
      gender &&
      type
    ) {
      setIsLoading(true);
      console.log("isLoading is" + isLoading);
      const image =
        "https://firebasestorage.googleapis.com/v0/b/book-store-app-3d8a6.appspot.com/o/none_avatar.jpg?alt=media&token=41662994-4635-45ef-ae01-0d929fbd8f91";
      if (province !== "" && district !== "" && ward !== "") {
        const address = {
          province_Id: province,
          district_Id: district,
          ward_Id: ward,
        };
        if (birthday !== "")
          register(
            name,
            email,
            password,
            image,
            birthday,
            gender,
            identityNumber,
            identityNumber,
            address,
            type
          );
        else {
          const defaultBirthday = "2001-01-01";
          register(
            name,
            email,
            password,
            image,
            defaultBirthday,
            gender,
            identityNumber,
            identityNumber,
            address,
            type
          );
        }
      } else {
        const address = {};
        if (birthday !== "")
          register(
            name,
            email,
            password,
            image,
            birthday,
            gender,
            identityNumber,
            identityNumber,
            address,
            type
          );
        else {
          const defaultBirthday = "2001/01/01";
          register(
            name,
            email,
            password,
            image,
            defaultBirthday,
            gender,
            identityNumber,
            identityNumber,
            address,
            type
          );
        }
      }
    }
  };
  const register = (
    name,
    email,
    password,
    image,
    birthday,
    gender,
    identityNumber,
    accountNumber,
    address,
    type
  ) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/auth/register`, {
        fullName: name,
        email: email,
        password: password,
        image: image,
        birthday: birthday,
        sex: gender,
        cardNumber: identityNumber,
        accountNumber: accountNumber,
        address: address,
        type: type,
      })
      .then((res) => {
        const bearerToken = res.headers["authorization"];

        Cookies.set("bearerToken", bearerToken);
        if (bearerToken.startsWith("Bearer ")) {
          const token = bearerToken.substring(7, bearerToken.length);
          Cookies.set("token", token);
        }
        setEmailHeader(email);
        handleConfirm();
      })
      .catch((err) => {
        setIsLoading(false);
        const code = err.message.substring(32, err.message.length);
        if (code == "401") {
          setEmail("");
          setError("Email n??y ???? ???????c ????ng k?? tr?????c ????");
        } else if (code == "402") {
          setIdentityNumber("");
          setError("CMND/CCCD ???? c?? t??i kho???n kh??c s??? d???ng");
        } else if (code == "403") {
          setIdentityNumber("");
          setError("S??? t??i kho???n n??y ???? c?? t??i kho???n kh??c s??? d???ng");
        } else {
          setError("L???i m???ng kh??ng x??c ?????nh");
        }
      });
  };

  const changePassVisibility = () => {
    if (passVisibility === eyeOn) {
      setPassVisibility(eyeOff);
      setInputType("password");
    }
    if (passVisibility === eyeOff) {
      setPassVisibility(eyeOn);
      setInputType("text");
    }
  };
  const changeRePassVisibility = () => {
    if (rePassVisibility === eyeOn) {
      setRePassVisibility(eyeOff);
      setReInputType("password");
    }
    if (rePassVisibility === eyeOff) {
      setRePassVisibility(eyeOn);
      setReInputType("text");
    }
  };

  const selectedProvince = (e) => {
    setProvince(e.value);
    setDistricts([]);
    setSelectedDistricts([]);
    setWards([]);
    setSelectedWards([]);
    setDistrict("");
    setWard("");
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/address/provinces/${e.value}/districts`
      )
      .then((res) => {
        const data = res.data;
        const list = data.map((item) => ({
          value: item._id,
          label: item.name,
        }));
        setDistricts(list);
      });
  };
  const selectedDistrict = (e) => {
    setDistrict(e.value);
    setSelectedDistricts(e);
    setWards([]);
    setSelectedWards([]);
    setWard("");
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/address/districts/${e.value}/wards`
      )
      .then((res) => {
        const data = res.data;
        const list = data.map((item) => ({
          value: item._id,
          label: item.name,
        }));
        setWards(list);
      });
  };

  const selectedWard = (e) => {
    setSelectedWards(e);
    setWard(e.value);
  };

  return (
    <Fragment>
      <div className="container mx-auto ">
        <div className="header-sign-up">
          <span></span>
          <span className="sign-up-title m-top-28">????ng k??</span>
          <button
            className=" m-top-28"
            onClick={() => {
              setIsSignUpOpen(false);
            }}
          >
            <img src={exit} />
          </button>
        </div>
        {error && showErrMsg(error)}
        <div className="information-container  ">
          <div className="account-detail">Th??ng tin t??i kho???n</div>
          <div className={isValidEmail ? "input-field" : "invalid-input"}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-sign-up required"
              type="text"
              required="required"
            ></input>
            <div className="placeholder weight-400 size-16">
              Email <span className="require">*</span>
            </div>
          </div>
          {!isValidEmail && (
            <small className="sign-up-text-danger">{emailError}</small>
          )}

          <div className={isValidPassword ? "input-field" : "invalid-input"}>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-sign-up required"
              type={inputType}
              required="required"
            />
            <div className="placeholder">
              M???t kh???u <span className="require">*</span>
            </div>
            <button onClick={changePassVisibility} className="m-right-20">
              <img src={passVisibility} />
            </button>
          </div>

          {!isValidPassword && (
            <small className="sign-up-text-danger">{passwordError}</small>
          )}
          <div className={isValidRePassword ? "input-field" : "invalid-input"}>
            <input
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              className="input-sign-up required"
              type={reInputType}
              required="required"
            />
            <div className="placeholder">
              Nh???p l???i m???t kh???u <span className="require">*</span>
            </div>
            <button onClick={changeRePassVisibility} className="m-right-20">
              <img src={rePassVisibility} />
            </button>
          </div>
          {!isValidRePassword && (
            <small className="sign-up-text-danger">{rePasswordError}</small>
          )}
          <div className="account-detail m-top-16">Th??ng tin c?? nh??n</div>
          <div className={isValidName ? "input-field" : "invalid-input"}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-sign-up required"
              type="text"
              required="required"
            />
            <div className="placeholder">
              T??n ?????y ????? <span className="require">*</span>
            </div>
          </div>
          {!isValidName && (
            <small className="sign-up-text-danger">{nameError}</small>
          )}
          <div className="input-field  ">
            <input
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="input-sign-up required"
              type="text"
              required
              ref={ref}
              onFocus={() => {
                setIsTypeDate(true);
                ref.current.type = "date";
              }}
              onBlur={() => {
                setIsTypeDate(false);
                ref.current.type = "text";
              }}
            />
            {!isTypeDate && <div className="placeholder">Ng??y sinh</div>}
          </div>

          <div className="row-state">
            <Select
              options={provinces}
              placeholder={<div className="select-placeholder">T???nh/Th??nh</div>}
              onChange={selectedProvince}
              styles={customStyle}
              components={{ IndicatorSeparator: () => null }}
              className=" w-48 weight-400 custom-select m-top-16 h-56"
            ></Select>

            <Select
              value={selectedDistricts}
              options={districts}
              placeholder={<div className="select-placeholder">Qu???n/Huy???n</div>}
              onChange={selectedDistrict}
              styles={customStyle}
              components={{ IndicatorSeparator: () => null }}
              className=" w-48 custom-select m-top-16 h-56"
            ></Select>
          </div>

          <Select
            value={selectedWards}
            options={wards}
            placeholder={<div className="select-placeholder">Ph?????ng/X??</div>}
            onChange={selectedWard}
            styles={customStyle}
            components={{ IndicatorSeparator: () => null }}
            className="w-full custom-select m-top-16 h-56"
          ></Select>

          <div className="m-top-14">
            <div className="CompulsoryTitle">
              Gi???i t??nh <span className="require">*</span>
            </div>
            <div className="gender-select m-top-10">
              <label className="custom-radio-btn">
                <span className="label">Nam</span>
                <input
                  value={"Nam"}
                  checked={gender == "Nam"}
                  onChange={(e) => setGender(e.target.value)}
                  type="radio"
                  name="gender"
                  value="Nam"
                />
                <span className="checkmark"></span>
              </label>

              <label className="custom-radio-btn">
                <span className="label">N???</span>
                <input
                  value={"N???"}
                  checked={gender == "N???"}
                  onChange={(e) => setGender(e.target.value)}
                  type="radio"
                  name="gender"
                  value="N???"
                />
                <span className="checkmark"></span>
              </label>

              <label className="custom-radio-btn">
                <span className="label">Kh??c</span>
                <input
                  value={"Kh??c"}
                  checked={gender == "Kh??c"}
                  onChange={(e) => setGender(e.target.value)}
                  type="radio"
                  name="gender"
                  value="Kh??c"
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
          {!isSetGender && (
            <small className="sign-up-text-danger">{genderError}</small>
          )}
          <div className="m-top-12">
            <div className="CompulsoryTitle">
              Lo???i t??i kho???n <span className="require">*</span>
            </div>
            <div className="type-select m-top-10 width-85">
              <label className="custom-radio-btn">
                <span className="label">C?? nh??n</span>
                <input
                  value={"CN"}
                  checked={type == "CN"}
                  onChange={(e) => setType(e.target.value)}
                  type="radio"
                  name="type"
                />
                <span className="checkmark"></span>
              </label>

              <label className="custom-radio-btn">
                <span className="label">C??ng ty</span>
                <input
                  value={"DN"}
                  checked={type == "DN"}
                  onChange={(e) => setType(e.target.value)}
                  type="radio"
                  name="type"
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
          {!isSetType && (
            <small className="sign-up-text-danger">{typeError}</small>
          )}
          <div className={isValidID ? "input-field" : "invalid-input"}>
            <input
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
              className="input-sign-up required"
              type="text"
              required="required"
            />
            <div className="placeholder">
              CMND/CCCD <span className="require">*</span>
            </div>
          </div>
          {!isValidID && (
            <small className="sign-up-text-danger">{idError}</small>
          )}
          <div className="m-top-16 flex-form">
            <input
              checked={isAgree}
              type="checkbox"
              onClick={() => {
                setIsAgree(!isAgree);
              }}
            />
            <label className="m-left-16 opacity-50 weight-400">
              T??i ?????ng ?? ...
            </label>
          </div>

          {!isAgreeChecked && (
            <small className="sign-up-text-danger">{isAgreeError}</small>
          )}

          <button
            onClick={handleSignUp}
            className="w-full sign-up-btn m-top-16"
          >
            ????ng k??
          </button>

          <Backdrop sx={{ color: "#ffff", zIndex: 1000000 }} open={isLoading}>
            <CircularProgress color="primary" />
          </Backdrop>
          <div className="custom-footer m-top-24 padding-bot-26">
            <label className="weight-400 size-14">
              ???? l?? th??nh vi??n!&nbsp;
            </label>
            <button
              onClick={handleSignInOpen}
              className="weight-400 size-14 des-color"
            >
              ????ng nh???p
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;
