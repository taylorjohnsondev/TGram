import { useState, useRef, useEffect } from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import domtoimage from "dom-to-image";
import axios from "../../hooks/useAxiosPrivate";

import sectionWrapper from "./SectionWrapper";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// https://github.com/dapi-labs/react-nice-avatar
const config = {
  sex: "woman",
  faceColor: "#995053",
  earSize: "big",
  eyeStyle: "smile",
  noseStyle: "long",
  mouthStyle: "peace",
  shirtStyle: "polo",
  glassesStyle: "round",
  hairColor: "#77311D",
  hairStyle: "normal",
  hatStyle: "none",
  hatColor: "#F48150",
  eyeBrowStyle: "up",
  shirtColor: "#9287FF",
  bgColor: "#74D153",
};

const AvatarEditor = ({ storedUser }) => {
  const [features, setFeatures] = useState(config);
  const [dataUrl, setDataUrl] = useState("");
  const [formData, setFormData] = useState("");
  const [file, setFile] = useState("");
  const canvasRef = useRef(null);

  const axios = useAxiosPrivate();

  function getRandomHexNumber() {
    const hexDigits = "0123456789ABCDEF";
    let hexNumber = "#";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(
        Math.random() * hexDigits.length
      );
      hexNumber += hexDigits[randomIndex];
    }
    return hexNumber;
  }

  const handleSkinColor = () => {
    setFeatures({ ...features, faceColor: getRandomHexNumber() });
  };

  const handleGender = () => {
    const newGender = features.sex === "man" ? "woman" : "man";
    setFeatures({
      ...features,
      sex: newGender,
    });
  };

  const hairStyleSelect = () => {
    const options = [
      "normal",
      "thick",
      "mohawk",
      "womanLong",
      "womanShort",
    ];
    const currentIndex = options.indexOf(features.hairStyle);
    const newIndex = (currentIndex + 1) % options.length;
    const newHairStyle = options[newIndex];
    setFeatures({ ...features, hairStyle: newHairStyle });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Render the avatar on the canvas after the component mounts
      const context = canvas.getContext("2d");
      const avatarConfig = genConfig(features);
    }
  }, [features]);

  const handleUpload = async () => {
    const form = new FormData();
    form.append("file", file);

    console.log(form);

    const res = await axios
      .post(`/users/avatar/${storedUser._id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    console.log(res);
  };
  const nodeRef = useRef(null);
  useEffect(() => {
    nodeRef.current = document.getElementById("my-avatar");
  }, []);

  function filter(node) {
    return node.tagName !== "i";
  }

  const handleBlob = async () => {
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
      domtoimage.toSvg(node, { filter: filter }).then((dataUrl) => {
        setFile(file);
      });
    }
  };

  const avatarConfig = genConfig(features);
  return (
    <div>
      <canvas ref={canvasRef} width={200} height={200} />

      <Avatar
        id="my-avatar"
        style={{ width: "8rem", height: "8rem" }}
        {...avatarConfig}
      />

      <button onClick={handleGender}>Change Gender</button>
      <button onClick={handleSkinColor}>Skin Color</button>

      <button onClick={hairStyleSelect}>Hair Style</button>
      <button onClick={handleBlob}>Set</button>
      <button onClick={handleUpload}>Upload it</button>
    </div>
  );
};

export default AvatarEditor;
