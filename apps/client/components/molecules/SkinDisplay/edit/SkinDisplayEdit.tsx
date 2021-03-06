/* eslint-disable @typescript-eslint/ban-ts-comment */
import clsx from "clsx";
import { useContext, useRef, useState } from "react";
import dynamic from "next/dynamic";
import MdDelete from "@meronex/icons/md/MdDelete";
import MdRemoveCircle from "@meronex/icons/md/MdRemoveCircle";
import UIContext from "../../../../core/contexts/UIContext";
import CurrencyIcons from "../../../atoms/Icons/CurrencyIcons";
import Typography from "../../../atoms/Typography";
import EditContext from "../../../templates/PostEdit/EditContext";
import Chromas from "../Chromas";
import ManageChromas from "./ManageChromas";

import { imgType, SkinDisplayEditProps } from "./interfaces";

import styles from "../styles.module.scss";
import editStyles from "./styles.module.scss";
import { uploadImage } from "../../../../core/helpers/uploadImage";
import ContentEditable from "react-contenteditable";
import SimpleSelect from "../../../atoms/SimpleSelect";
import debouce from "../../../../core/helpers/debouce";

const SkinDisplayEdit = (props: SkinDisplayEditProps) => {
  const {
    border,
    chromas,
    id,
    interactions,
    name,
    prestige,
    price,
    splash,
    loading,
    spotlight,
    still,
    turn,
    vo,
    description,
    gemstone,
    index: skinIndex,
    sectionIndex: skinSectionIndex,
  } = props;
  const { postState, setPostState } = useContext(EditContext);
  const { uiDispatch: dispatch } = useContext(UIContext);
  const loadingUploadRef = useRef<HTMLInputElement>(null);
  const splashUploadRef = useRef<HTMLInputElement>(null);
  const stillUploadRef = useRef<HTMLInputElement>(null);
  const turnUploadRef = useRef<HTMLInputElement>(null);
  const borderUploadRef = useRef<HTMLInputElement>(null);

  const skinTier: Record<string, string> = {
    "1350": "Épica",
    "1820": "Lendária",
    "3250": "Ultimate",
  };

  const baseURL = "https://assets.5pots.com/file/cincopots/pbe";

  const splashClass = clsx(
    styles["skin-display__splash"],
    border && styles["skin-display__splash--border"]
  );

  const skinCurrency: {
    price: string;
    currency: "gemstone" | "rp" | "be" | "prestige";
  } = { price: "", currency: "rp" };

  if (gemstone) {
    skinCurrency.price = "Hextech - 10";
    skinCurrency.currency = "gemstone";
  } else if (prestige) {
    skinCurrency.price = "Prestígio";
    skinCurrency.currency = "prestige";
  } else {
    skinCurrency.price = `${skinTier[price]} - ${price}`;
    skinCurrency.currency = "rp";
  }

  const priceOptions = [
    { value: "975", label: "975" },
    { value: "1350", label: "1350" },
    { value: "1920", label: "1820" },
    { value: "3250", label: "3250" },
  ];

  function setAsset(asset: imgType) {
    if (postState && (skinSectionIndex || skinSectionIndex === 0)) {
      const newPost = { ...postState };
      if (
        newPost.sections &&
        skinSectionIndex &&
        newPost.sections[skinSectionIndex].skins
      ) {
        const skinIndex = newPost.sections[skinSectionIndex].skins?.findIndex(
          (s) => s.id === id
        );

        const assetAlreadyExists =
          // @ts-ignore
          newPost.sections[skinSectionIndex].skins[skinIndex][asset];

        if (!assetAlreadyExists) {
          // @ts-ignore
          newPost.sections[skinSectionIndex].skins[skinIndex][asset] = true;
          setPostState(newPost);
        }
      }
    }
  }

  function unsetAsset(asset: imgType) {
    if (postState && (skinSectionIndex || skinSectionIndex === 0)) {
      const newPost = { ...postState };

      // @ts-ignore
      newPost.sections[skinSectionIndex].skins[skinIndex][asset] = false;
      setPostState(newPost);
    }
  }

  function handleUpload(image: FileList | null, type: imgType) {
    const token = localStorage.getItem("token");
    const fileName = `${id}-${type}`;

    if (image && token)
      uploadImage(image, token, dispatch, fileName, true, () => setAsset(type));
  }

  function handleDetailChange(key: string, value: string) {
    if (postState && (skinSectionIndex || skinSectionIndex === 0)) {
      const newPost = { ...postState };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newPost.sections[skinSectionIndex].skins[skinIndex][key] = value;
      setPostState(newPost);
    }
  }
  const debouncedDetailChange = debouce(handleDetailChange, 500);

  function handleCurrency(currency: "rp" | "gemstone" | "prestige") {
    if (postState && (skinSectionIndex || skinSectionIndex === 0)) {
      const newPost = { ...postState };

      if (currency === "rp") {
        // @ts-ignore
        newPost.sections[skinSectionIndex].skins[skinIndex].gemstone = false;
        // @ts-ignore
        newPost.sections[skinSectionIndex].skins[skinIndex].prestige = false;
      } else if (currency === "gemstone") {
        // @ts-ignore
        newPost.sections[skinSectionIndex].skins[skinIndex].gemstone = true;
        // @ts-ignore
        newPost.sections[skinSectionIndex].skins[skinIndex].prestige = false;
      } else {
        // @ts-ignore
        newPost.sections[skinSectionIndex].skins[skinIndex].gemstone = false;
        // @ts-ignore
        newPost.sections[skinSectionIndex].skins[skinIndex].prestige = true;
      }

      setPostState(newPost);
    }
  }

  function handleDeleteSkin() {
    if (
      postState &&
      postState.sections &&
      (skinSectionIndex || skinSectionIndex === 0)
    ) {
      console.log("rodo", skinIndex);
      const newState = { ...postState };

      newState.sections[skinSectionIndex].skins?.splice(skinIndex, 1);

      setPostState(newState);
    }
  }

  return (
    <div className={clsx(styles["skin-display"], editStyles.edit)}>
      <div className={styles["skin-display__title"]}>
        <Typography
          variant="sub"
          component="h6"
          className={editStyles.editable}
        >
          <ContentEditable
            tagName="span"
            html={id}
            onChange={(e) => debouncedDetailChange("id", e.target.value)}
          />
        </Typography>
        <Typography variant="h4" component="h4" className={editStyles.editable}>
          <ContentEditable
            tagName="span"
            html={name}
            onChange={(e) => debouncedDetailChange("name", e.target.value)}
          />
        </Typography>
        <div className={editStyles.currency}>
          <input
            type="radio"
            name="currency"
            value="rp"
            id="rp"
            checked={!gemstone && !prestige}
            onChange={() => handleCurrency("rp")}
          />
          <label htmlFor="rp">Riot Points</label>
          <input
            type="radio"
            name="currency"
            value="hextech"
            id="hextech"
            checked={gemstone}
            onChange={() => handleCurrency("gemstone")}
          />
          <label htmlFor="hextech">Hextech Gems</label>
          <input
            type="radio"
            name="currency"
            value="prestige"
            id="prestige"
            checked={prestige}
            onChange={() => handleCurrency("prestige")}
          />
          <label htmlFor="prestige">Prestige Points</label>
        </div>
        <div
          className={clsx(
            styles["skin-display__title__price"],
            editStyles["skin-price"]
          )}
        >
          <Typography variant="h4" component="h5">
            Skin{" "}
          </Typography>
          <SimpleSelect
            className={clsx(editStyles.select)}
            options={priceOptions}
            handleChange={(val) => console.log(val)}
            defaultValue={price}
          />
          <CurrencyIcons currency={skinCurrency.currency} />
        </div>
      </div>
      <Typography
        variant="p"
        component="p"
        className={clsx(
          styles["skin-display__description"],
          editStyles.editable
        )}
      >
        <ContentEditable
          tagName="span"
          html={description}
          onChange={(e) => debouncedDetailChange("description", e.target.value)}
        />
      </Typography>
      <div className={splashClass}>
        <div className={editStyles["asset-container"]}>
          <button onClick={() => loadingUploadRef.current?.click()}>
            {loading ? <img src={`${baseURL}/${id}-loading.jpg`} /> : "loading"}
          </button>
          <input
            ref={loadingUploadRef}
            className={editStyles["editable--invisible"]}
            type="file"
            onChange={(e) => handleUpload(e.target.files, "loading")}
          />
          {loading && (
            <MdDelete
              onClick={() => unsetAsset("loading")}
              className={editStyles["remove-btn"]}
            />
          )}
        </div>

        <div className={editStyles["asset-container"]}>
          <button onClick={() => splashUploadRef.current?.click()}>
            {splash ? <img src={`${baseURL}/${id}-splash.jpg`} /> : "splash"}
          </button>
          <input
            ref={splashUploadRef}
            className={editStyles["editable--invisible"]}
            type="file"
            onChange={(e) => handleUpload(e.target.files, "splash")}
          />
          {splash && (
            <MdDelete
              onClick={() => unsetAsset("splash")}
              className={editStyles["remove-btn"]}
            />
          )}
        </div>
      </div>
      <div className={styles["skin-display__screenshots"]}>
        <div className={editStyles["asset-container"]}>
          <button onClick={() => stillUploadRef.current?.click()}>
            {still ? <img src={`${baseURL}/${id}-still.jpg`} /> : "still"}
          </button>
          <input
            ref={stillUploadRef}
            className={editStyles["editable--invisible"]}
            type="file"
            onChange={(e) => handleUpload(e.target.files, "still")}
          />
          {still && (
            <MdDelete
              onClick={() => unsetAsset("still")}
              className={editStyles["remove-btn"]}
            />
          )}
        </div>

        <div className={editStyles["asset-container"]}>
          <button onClick={() => turnUploadRef.current?.click()}>
            {turn ? <img src={`${baseURL}/${id}-turn.jpg`} /> : "turn 360"}
          </button>
          <input
            ref={turnUploadRef}
            className={editStyles["editable--invisible"]}
            type="file"
            onChange={(e) => handleUpload(e.target.files, "turn")}
          />
          {turn && (
            <MdDelete
              onClick={() => unsetAsset("turn")}
              className={editStyles["remove-btn"]}
            />
          )}
        </div>

        <div className={editStyles.url}>
          <Typography variant="p" component="p">
            Spotlight
          </Typography>
          <Typography variant="sub" component="p">
            <ContentEditable
              tagName="span"
              html={spotlight}
              onChange={(e) =>
                debouncedDetailChange("spotlight", e.target.value)
              }
            />
          </Typography>
        </div>
        <div
          className={clsx(
            styles["skin-display__video"],
            editStyles["asset-container"]
          )}
        >
          {spotlight && (
            <iframe
              src={`https://www.youtube.com/embed/${spotlight.split("v=")[1]}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
        <div className={editStyles.url}>
          <Typography variant="p" component="p">
            Voice over
          </Typography>
          <Typography variant="sub" component="p">
            <ContentEditable
              tagName="span"
              html={vo}
              onChange={(e) => debouncedDetailChange("vo", e.target.value)}
            />
          </Typography>
        </div>
        <div
          className={clsx(
            styles["skin-display__video"],
            editStyles["asset-container"]
          )}
        >
          {vo && (
            <iframe
              src={`https://www.youtube.com/embed/${vo.split("v=")[1]}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
        <div className={editStyles.url}>
          <Typography variant="p" component="p">
            Special interactions
          </Typography>
          <Typography variant="sub" component="p">
            <ContentEditable
              tagName="span"
              html={interactions}
              onChange={(e) =>
                debouncedDetailChange("interactions", e.target.value)
              }
            />
          </Typography>
        </div>
        <div
          className={clsx(
            styles["skin-display__video"],
            editStyles["asset-container"]
          )}
        >
          {interactions && (
            <iframe
              src={`https://www.youtube.com/embed/${
                interactions.split("v=")[1]
              }`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
      {/* <Typography
        variant="p"
        component="p"
        className={styles["skin-display__p"]}
      >
        A skin {name} {!border ? "(por enquanto?) não" : ""} possui uma borda
        para acompanhar a linha de skin.
        {!chromas.length ? " E (por enquanto?) não" : "Também"} teremos chromas{" "}
        {!chromas.length
          ? "inclusos no client :("
          : "que você confere logo abaixo :D"}
      </Typography> */}
      <div className={styles["skin-display__chromas-border"]}>
        <div className={editStyles["asset-container"]}>
          <button onClick={() => borderUploadRef.current?.click()}>
            {border ? (
              <img src={`${baseURL}/${id}-border.jpg`} />
            ) : (
              "borda de carregamento"
            )}
          </button>
          <input
            ref={borderUploadRef}
            className={editStyles["editable--invisible"]}
            type="file"
            onChange={(e) => handleUpload(e.target.files, "border")}
          />
          {border && (
            <MdDelete
              onClick={() => unsetAsset("border")}
              className={editStyles["remove-btn"]}
            />
          )}
        </div>
        <Chromas chromas={chromas} id={id} />
      </div>
      <ManageChromas
        chromas={chromas}
        skinIndex={skinIndex}
        sectionIndex={skinSectionIndex}
        id={id}
      />
      <button onClick={() => handleDeleteSkin()}>
        <MdRemoveCircle
          className={clsx(editStyles["remove-btn"], editStyles.edit__remove)}
        />
      </button>
    </div>
  );
};

export default SkinDisplayEdit;
