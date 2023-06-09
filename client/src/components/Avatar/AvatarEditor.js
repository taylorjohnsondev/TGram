import { useState, useRef, useEffect, useCallback } from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import SectionWrapper from "./SectionWrapper";
import domtoimage from "dom-to-image";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getRandomHexNumber } from "./getRandomHex";
import { facialFeatures } from "./facialFeatures";
import {
  Hair,
  Shirt,
  Eyes,
  Hat,
  Nose,
  Face,
  Mouth,
  Glasses,
  Ear,
} from "./SVG";

import "../Avatar/SectionWrapper/index.css";

const AvatarEditor = ({ storedUser }) => {
  const [features, setFeatures] = useState(facialFeatures);
  const [file, setFile] = useState("");
  const [choose, setChoose] = useState(false);

  const avatarConfig = genConfig(features);
  const axios = useAxiosPrivate();

  const handleSkinColor = () => {
    setFeatures({ ...features, faceColor: getRandomHexNumber() });
  };

  const handleBgColor = () => {
    setFeatures({ ...features, bgColor: getRandomHexNumber() });
  };

  const handleEars = () => {
    const newEars = features.earSize === "small" ? "big" : "small";
    setFeatures({
      ...features,
      earSize: newEars,
    });
  };

  const HAIR_STYLE_OPTIONS = [
    "normal",
    "thick",
    "mohawk",
    "womanLong",
    "womanShort",
  ];

  const hairStyleSelect = () => {
    const currentIndex = HAIR_STYLE_OPTIONS.indexOf(
      features.hairStyle
    );
    const newIndex = (currentIndex + 1) % HAIR_STYLE_OPTIONS.length;
    const newHairStyle = HAIR_STYLE_OPTIONS[newIndex];
    setFeatures({ ...features, hairStyle: newHairStyle });
  };

  const GLASSES_OPTIONS = ["none", "round", "square"];

  const handleGlasses = () => {
    const currentIndex = GLASSES_OPTIONS.indexOf(
      features.glassesStyle
    );
    const newIndex = (currentIndex + 1) % GLASSES_OPTIONS.length;
    const changeGlasses = GLASSES_OPTIONS[newIndex];
    setFeatures({ ...features, glassesStyle: changeGlasses });
  };

  const EYE_OPTIONS = ["circle", "oval", "smile"];

  const handleEyes = () => {
    const currentIndex = EYE_OPTIONS.indexOf(features.eyeStyle);
    const newIndex = (currentIndex + 1) % EYE_OPTIONS.length;
    const changeEyes = EYE_OPTIONS[newIndex];
    setFeatures({ ...features, eyeStyle: changeEyes });
  };

  const NOSE_OPTIONS = ["short", "long", "round"];

  const handleNose = () => {
    const currentIndex = NOSE_OPTIONS.indexOf(features.noseStyle);
    const newIndex = (currentIndex + 1) % NOSE_OPTIONS.length;
    const changeNose = NOSE_OPTIONS[newIndex];
    setFeatures({ ...features, noseStyle: changeNose });
  };
  const MOUTH_OPTIONS = ["laugh", "smile", "peace"];

  const handleMouth = () => {
    const currentIndex = MOUTH_OPTIONS.indexOf(features.mouthStyle);
    const newIndex = (currentIndex + 1) % MOUTH_OPTIONS.length;
    const changeMouth = MOUTH_OPTIONS[newIndex];
    setFeatures({ ...features, mouthStyle: changeMouth });
  };

  const SHIRT_OPTIONS = ["hoody", "short", "polo"];

  const handleShirt = () => {
    const currentIndex = SHIRT_OPTIONS.indexOf(features.shirtStyle);
    const newIndex = (currentIndex + 1) % SHIRT_OPTIONS.length;
    const changeShirt = SHIRT_OPTIONS[newIndex];
    setFeatures({ ...features, shirtStyle: changeShirt });
  };

  const handleShirtColor = () => {
    setFeatures({ ...features, shirtColor: getRandomHexNumber() });
  };

  const HAT_OPTIONS = ["none", "beanie", "turban"];

  const handleHat = () => {
    const currentIndex = HAT_OPTIONS.indexOf(features.hatStyle);
    const newIndex = (currentIndex + 1) % HAT_OPTIONS.length;
    const changeHat = HAT_OPTIONS[newIndex];
    setFeatures({ ...features, hatStyle: changeHat });
  };

  const handleHatColor = () => {
    setFeatures({ ...features, hatColor: getRandomHexNumber() });
  };

  const handleUpload = useCallback(async () => {
    const form = new FormData();
    form.append("file", file);

    const res = await axios
      .post(`/users/avatar/${storedUser._id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [axios, file, storedUser]);

  //get reference to the custom avatar element
  const nodeRef = useRef(null);
  useEffect(() => {
    nodeRef.current = document.getElementById("my-avatar");
  }, []);

  const handleBlob = async () => {
    setChoose((prev) => !prev);
    const scale = 2;
    const node = nodeRef.current;

    if (node) {
      const blob = await domtoimage.toBlob(node, {
        height: node.offsetHeight * scale,
        style: {
          transform: `scale(${scale}) translate(${
            node.offsetWidth / 2 / scale
          }px, ${node.offsetHeight / 2 / scale}px)`,
          "border-radius": 0,
        },
        width: node.offsetWidth * scale,
      });

      const file = new File([blob], `${storedUser.username}.png`, {
        type: blob.type,
      });
      setFile(file);
    }
  };

  return (
    <>
      <div className="preview-container">
        <Avatar
          id="my-avatar"
          style={{ width: "8rem", height: "8rem" }}
          {...avatarConfig}
        />

        <div className="avatar-container">
          <div className="selector-container">
            <SectionWrapper
              className={"section-item"}
              tip="Skin Color"
              handleFeatureChange={handleSkinColor}
            >
              <Face
                maskId={storedUser._id}
                pathId={storedUser._id}
                color={"#964B00"}
              />
            </SectionWrapper>

            <SectionWrapper
              className={"section-item"}
              tip="Hair Style"
              handleFeatureChange={hairStyleSelect}
            >
              <Hair color={"#ffffff"} />
            </SectionWrapper>

            <SectionWrapper
              className={"section-item"}
              tip="Glasses"
              handleFeatureChange={handleGlasses}
            >
              <Glasses />
            </SectionWrapper>

            <SectionWrapper
              className={"section-item"}
              tip="Eyes"
              handleFeatureChange={handleEyes}
            >
              <Eyes />
            </SectionWrapper>

            <SectionWrapper
              className={"section-item"}
              tip="Nose"
              handleFeatureChange={handleNose}
            >
              <Nose />
            </SectionWrapper>
            <SectionWrapper
              className={"section-item"}
              tip="Mouth"
              handleFeatureChange={handleMouth}
            >
              <Mouth id={storedUser._id} />
            </SectionWrapper>
            <SectionWrapper
              className={"section-item"}
              tip="Ears"
              handleFeatureChange={handleEars}
            >
              <Ear color="#ffffff" />
            </SectionWrapper>

            <SectionWrapper
              className={"section-item"}
              tip="Shirt"
              handleFeatureChange={handleShirt}
            >
              <Shirt color="#ffffff" />
            </SectionWrapper>

            <SectionWrapper
              className={"section-item"}
              tip="Shirt Color"
              handleFeatureChange={handleShirtColor}
            >
              <i className=" SectionWrapper" />
            </SectionWrapper>
            <SectionWrapper
              className={"section-item"}
              tip="Background Color"
              handleFeatureChange={handleBgColor}
            >
              <i className=" SectionWrapper" />
            </SectionWrapper>
            <SectionWrapper
              className={"section-item"}
              tip="Hat"
              handleFeatureChange={handleHat}
            >
              <Hat color={"#ffffff"} />
            </SectionWrapper>
            <SectionWrapper
              className={"section-item"}
              tip="Hat Color"
              handleFeatureChange={handleHatColor}
            >
              <i className=" SectionWrapper" />
            </SectionWrapper>
          </div>
        </div>
        <div className="btn-container">
          <button disabled={choose} onClick={handleBlob}>
            {choose ? "Selection Confirmed" : "Set my avatar"}
          </button>
          <button
            className="uploadIt"
            hidden={!choose}
            onClick={handleUpload}
          >
            Upload it
          </button>
          <button
            onClick={() => {
              setChoose((prev) => !prev);
              setFeatures(facialFeatures);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default AvatarEditor;
