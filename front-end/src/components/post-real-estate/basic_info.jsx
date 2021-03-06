import React, { useState, Fragment, useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import NumberFormat from "react-number-format";
import axios from "axios";
import arrowDown from "../../assests/image/arrow-down.svg";

import "./basic_info.css";
const BasicInfo = ({ setTypeSelected, totalPrice, setTotalPrice }) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [category, setCategory] = useState([]);
  const [type, setType] = useState([]);

  const [idCategory, setIdCategory] = useState("");
  const [idCity, setIdCity] = useState("");
  const [idDistrict, setIdDistrict] = useState("");
  const [idWard, setIdWard] = useState("");

  const [unitReal, setUnitReal] = useState("");
  const [priceReal, setPriceReal] = useState("");
  const [areaReal, setAreaReal] = useState("");

  const [styleCate, setStyleCate] = useState("option_disable");
  const [styleType, setStyleType] = useState("option_disable");
  const [styleCity, setStyleCity] = useState("option_disable");
  const [styleDis, setStyleDis] = useState("option_disable");
  const [styleWard, setStyleWard] = useState("option_disable");
  const [styleUnit, setStyleUnit] = useState("option_disable");

  const [stateCate, setStateCate] = useState("");

  const [countTitle, setCountTitle] = useState(99);

  const [address, setAddress] = useState({
    city: "",
    district: "",
    ward: "",
    note: "",
    project: "",
  });

  useEffect(() => {
    setStyleDis("option_disable");
    setStyleWard("option_disable");
    setIdDistrict("");
    document.querySelector(".districtSelect").value = "";
    document.querySelector(".wardSelect").value = "";
  }, [idCity]);

  const [detailAddress, setDetailAddress] = useState("");

  useEffect(() => {
    const { city, district, ward, note, project } = address;
    const haveProject = project ? `${project}, ` : "";
    const haveNote = note ? `${note}, ` : "";
    const haveWard = ward ? `${ward}, ` : "";
    const haveDistrict = district ? `${district}, ` : "";
    const haveCity = city ? `${city}.` : "";

    let detail = `${haveNote}${haveWard}${haveDistrict}${haveCity}`;
    let detail2 = `${haveProject}${haveDistrict}${haveCity}`;
    if (haveProject) {
      setDetailAddress(detail2);
    } else {
      setDetailAddress(detail);
    }
  }, [address]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const [price, setPrice] = useState("");
  useEffect(() => {
    if (priceReal * areaReal < 1000000) {
      const kq = priceReal * areaReal;
      setPrice(`${numberWithCommas(kq)}`);
    }
    if (priceReal * areaReal >= 1000000 && priceReal * areaReal <= 999999999) {
      const kq = (priceReal * areaReal) / 1000000;
      setPrice(`${kq} tri???u`);
    }
    if (priceReal * areaReal >= 1000000000) {
      const kq = (priceReal * areaReal) / 1000000000;
      setPrice(`${kq} t???`);
    }
  }, [priceReal, areaReal, unitReal]);

  const handleFetchCategory = async () => {
    if (category.length == 0) {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/categories`
      );
      setCategory(response.data);
    }
  };
  useEffect(() => {
    setStyleType("option_disable");
    setAddress({ ...address, ward: "", note: "", project: "" });
  }, [idCategory]);

  useEffect(() => {}, [idWard]);
  const handleFetchType = async () => {
    const id = idCategory.split(",")[0];
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/categories/${id}/types`
    );
    setType(response.data);
  };
  const handleFetchCity = async () => {
    if (city.length == 0) {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/address/provinces`
      );
      setCity(response.data);
    }
  };

  const handleFetchDistrict = async () => {
    const id = idCity.split(",")[0];
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/address/provinces/${id}/districts`
    );
    setDistrict(response.data);
  };

  useEffect(() => {
    if (idDistrict !== "") {
      setAddress({
        ...address,
        ward: "",
        note: "",
        project: "",
      });
      document.querySelector(".wardSelect").value = "";
      setStyleWard("option_disable");
      handleFetchWard();
    }
  }, [idDistrict]);

  const handleFetchWard = async () => {
    if (idDistrict !== "") {
      const id = idDistrict.split(",")[0];
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/address/districts/${id}/wards`
      );
      setWard(response.data);
    }
  };

  const handleChangeType = (index) => {
    if (index) {
      const selectedType = type[index];
      setTypeSelected(selectedType);
    }
  };

  const handleGetNameCity = (id) => {
    if (id !== "") {
      const citySelected = city.find((item) => item._id === id);
      return citySelected.name;
    }
  };

  const handleGetNameDistrict = (id) => {
    if (id !== "") {
      const districtSelected = district.find((item) => item._id === id);
      return districtSelected.name;
    }
  };

  const handleGetNameWard = (id) => {
    if (id !== "") {
      const wardSelected = ward.find((item) => item._id === id);
      return wardSelected.name;
    }
  };

  const handleGetNameNote = (detail) => {
    const note = detail;
  };
  const handleGetNameProject = (proj) => {
    const project = proj;
    setAddress((prev) => ({
      ...prev,
      project,
    }));
  };

  return (
    <div className="basic_info">
      <h1>TH??NG TIN C?? B???N</h1>
      <p>
        Ti??u ????? <span>*</span>
      </p>
      <input
        type="text"
        pattern="[A-Za-z0-9_-\s.]{30,99}"
        placeholder="Nh???p ti??u ????? tin ????ng c???a b???n. T???i thi???u l?? 30 k?? t??? v?? t???i ??a l?? 99 k?? t???."
        className="input_title"
        {...register("title")}
        maxLength="99"
        minLength="30"
        onChange={(e) => {
          setCountTitle(99 - e.target.value.length);
        }}
      />
      <span className="count-key">{countTitle} </span>
      <p className={errors.title?.message ? "active" : "non-active"}>
        {errors.title?.message}
      </p>
      <div className="select_container">
        <div className="left">
          <p>
            H??nh th???c <span>*</span>
          </p>
          <div className="select__items">
            <select
              className={`${styleCate}`}
              {...register("category")}
              onClick={(e) => {
                handleFetchCategory();
              }}
              onChange={(e) => {
                setStateCate(e.target.value);
                setIdCategory(e.target.value);
                if (e.target.value == "none") {
                  setStyleCate("option_disable");
                } else {
                  setStyleCate("option_able");
                }
              }}
            >
              <option value="none" className="option_disable">
                Ch???n h??nh th???c
              </option>

              {category &&
                category.map((item) => {
                  return (
                    <option key={item._id} value={`${item._id},${item.name}`}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
            <img className="icon_down" src={arrowDown} alt="arrowDown" />
          </div>
          <p className={errors.category?.message ? "active" : "non-active"}>
            {errors.category?.message}
          </p>
        </div>
        <div className="right">
          <p>
            Lo???i <span>*</span>
          </p>
          <div className="select__items">
            <select
              className={`${styleType}`}
              {...register("type")}
              onClick={() => {
                handleFetchType();
              }}
              onChange={(e) => {
                handleChangeType(e.target.value);
                if (e.target.value == "none") {
                  setStyleType("option_disable");
                } else {
                  setStyleType("option_able");
                }
              }}
            >
              <option value="none" className="option_disable">
                Ch???n lo???i b???t ?????ng s???n
              </option>

              {type &&
                type.map((item, index) => {
                  return (
                    <option key={item._id} value={index}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
            <img className="icon_down" src={arrowDown} alt="arrowDown" />
          </div>
          <p className={errors.type?.message ? "active" : "non-active"}>
            {errors.type?.message}
          </p>
        </div>
      </div>
      <div className="select_container">
        <div className="left">
          <p>
            T???nh/Th??nh ph??? <span>*</span>
          </p>
          <div className="select__items">
            <select
              className={`${styleCity}`}
              {...register("province_Id")}
              onClick={() => {
                handleFetchCity();
              }}
              onChange={(e) => {
                setIdCity(e.target.value);

                setAddress({
                  city: handleGetNameCity(e.target.value),
                  district: "",
                  ward: "",
                  note: "",
                  project: "",
                });
                if (e.target.value == "") {
                  setStyleCity("option_disable");
                } else {
                  setStyleCity("option_able");
                }
              }}
            >
              <option value="" className="option_disable">
                Ch???n t???nh/th??nh ph???
              </option>

              {city &&
                city.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
            <img className="icon_down" src={arrowDown} alt="arrowDown" />
          </div>
          <p className={errors.province_Id?.message ? "active" : "non-active"}>
            {errors.province_Id?.message}
          </p>
        </div>
        <div className="right">
          <p>
            Qu???n/Huy???n <span>*</span>
          </p>
          <div className="select__items">
            <select
              className={`${styleDis} districtSelect`}
              {...register("district_Id")}
              onClick={() => {
                handleFetchDistrict();
              }}
              onChange={(e) => {
                setIdDistrict(e.target.value);
                setAddress({
                  ...address,
                  district: handleGetNameDistrict(e.target.value),
                  ward: "",
                });
                if (e.target.value == "") {
                  setStyleDis("option_disable");
                } else {
                  setStyleDis("option_able");
                }
              }}
            >
              <option value="" className="option_disable">
                Ch???n qu???n/huy???n
              </option>

              {district &&
                district.map((item) => {
                  return (
                    <option key={item._id} value={`${item._id}`}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
            <img className="icon_down" src={arrowDown} alt="arrowDown" />
          </div>
          <p className={errors.district_Id?.message ? "active" : "non-active"}>
            {errors.district_Id?.message}
          </p>
        </div>
      </div>
      {idDistrict !== "" ? (
        <div className="select_container">
          <div className="left">
            <p>
              Ph?????ng x?? <span>*</span>
            </p>
            <div className="select__items">
              <select
                className={`${styleWard} wardSelect`}
                {...register("ward_Id")}
                onClick={() => {
                  handleFetchWard();
                }}
                onChange={(e) => {
                  handleFetchWard();
                  setAddress({
                    ...address,
                    ward: handleGetNameWard(e.target.value),
                  });
                  setIdWard(e.target.value);

                  if (e.target.value == "") {
                    setStyleWard("option_disable");
                  } else {
                    setStyleWard("option_able");
                  }
                }}
              >
                <option value="" className="option_disable">
                  Ch???n ph?????ng/x??
                </option>

                {ward &&
                  ward.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
              <img className="icon_down" src={arrowDown} alt="arrowDown" />
            </div>
            <p className={errors.ward_Id?.message ? "active" : "non-active"}>
              {errors.ward_Id?.message}
            </p>
          </div>
          <div className="right">
            <p>
              ???????ng ph??? <span>*</span>
            </p>
            <input
              type="text"
              placeholder="Ch???n ???????ng ph???"
              className="input_items"
              {...register("note")}
              onChange={(e) => {
                handleGetNameNote(e.target.value);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="select_container">
          <div className="left">
            <p>
              Ph?????ng x?? <span>*</span>
            </p>
            <div className="select__items">
              <select
                className="option_disable wardSelect"
                {...register("ward_Id")}
              >
                <option value="" className="option_disable">
                  Ch???n ph?????ng/x??
                </option>
              </select>
              <img className="icon_down" src={arrowDown} alt="arrowDown" />
            </div>
            <p className={errors.ward_Id?.message ? "active" : "non-active"}>
              {errors.ward_Id?.message}
            </p>
          </div>
          <div className="right">
            <p>
              ???????ng ph??? <span>*</span>
            </p>
            <input
              type="text"
              placeholder="Ch???n ???????ng ph???"
              className="input_items"
              {...register("note")}
              onChange={(e) => {
                handleGetNameNote(e.target.value);
              }}
            />
          </div>
        </div>
      )}
      <div className="select_container">
        <div className="left">
          <p>D??? ??n </p>
          <div className="select__items">
            <input
              {...register("project")}
              placeholder="Nh???p t??n d??? ??n"
              className="input_items"
              onChange={(e) => {
                handleGetNameProject(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="right">
          <p>
            Di???n t??ch (m <sup>2</sup> )
          </p>
          <input
            type="number"
            placeholder="Nh???p di???n t??ch b???t ?????ng s???n"
            className="input_items"
            {...register("square")}
            onChange={(e) => {
              setAreaReal(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="select_container">
        <div className="left">
          <p>Gi?? </p>
          <input
            type="number"
            placeholder="Nh???p gi?? b???t ?????ng s???n"
            className="input_items input_price"
            {...register("unitPrice")}
            onChange={(e) => {
              setPriceReal(e.target.value);
            }}
          />
        </div>
        <div className="right">
          <p>
            ????n v??? <span>*</span>
          </p>
          {stateCate && stateCate !== "1" ? (
            <div className="select__items ">
              <select
                className={`${styleUnit}`}
                {...register("unit")}
                onChange={(e) => {
                  setUnitReal(e.target.value);
                  if (e.target.value == "") {
                    setStyleUnit("option_disable");
                  } else {
                    setStyleUnit("option_able");
                  }
                }}
              >
                <option value="">Ch???n ????n v???</option>
                <option value="thoathuan">Tho??? thu???n</option>
                {stateCate == "6193a1e36a03d69a07417779,Nh?? ?????t b??n" ? (
                  <>
                    <option value="VN??">VN??</option>

                    <option value="USD">USD</option>
                  </>
                ) : (
                  <>
                    <option value="VN??/Th??ng" selected>
                      VN??/Th??ng
                    </option>
                    <option value="USD/th??ng">USD/Th??ng</option>
                  </>
                )}
              </select>
              <img className="icon_down" src={arrowDown} alt="arrowDown" />
            </div>
          ) : (
            <Fragment>
              <div className="select__items ">
                <select
                  className={`${styleUnit} `}
                  {...register("unit")}
                  onChange={(e) => {
                    setUnitReal(e.target.value);
                    if (e.target.value == "") {
                      setStyleUnit("option_disable");
                    } else {
                      setStyleUnit("option_able");
                    }
                  }}
                >
                  <option value="" className="option_disable">
                    Ch???n ????n v???
                  </option>
                </select>
                <img className="icon_down" src={arrowDown} alt="arrowDown" />
              </div>
              <p className={errors.unit?.message ? "active" : "non-active"}>
                {errors.unit?.message}
              </p>
            </Fragment>
          )}
        </div>
      </div>
      <div className="select_container">
        {unitReal !== "thoathuan" ? (
          <p>
            T???ng ti???n :{" "}
            <input
              className="priceTotal"
              {...register("totalPrice")}
              placeholder={`${price} ${unitReal}`}
              disabled
            />
          </p>
        ) : (
          <p>
            T???ng ti???n :{" "}
            <input
              className="priceTotal"
              {...register("totalPrice")}
              placeholder="Th???a thu???n"
              disabled
            />
          </p>
        )}
        <p>
          ?????a ch??? <span>*</span>
        </p>
        <input
          disabled
          type="text"
          placeholder="T??n d??? ??n + Qu???n/Huy???n + T???nh/Th??nh ph???"
          className="input_title"
          value={detailAddress}
        />
        <p className={errors.address?.message ? "active" : "non-active"}>
          {errors.address?.message}
        </p>
      </div>
    </div>
  );
};

export default BasicInfo;
