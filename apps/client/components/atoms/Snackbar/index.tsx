import { useContext, useEffect } from "react";
import clsx from "clsx";
import MdCheckmarkCircleOutline from "@meronex/icons/ios/MdCheckmarkCircleOutline";
import IosCloseCircleOutline from "@meronex/icons/ios/IosCloseCircleOutline";
import MdInformationCircleOutline from "@meronex/icons/ios/MdInformationCircleOutline";

import Typography from "../Typography";

import UIContext from "../../../core/contexts/UIContext";

import { SnackbackProps } from "./interfaces";

import styles from "./styles.module.scss";

const Snackbar = (props: SnackbackProps) => {
  const { className } = props;
  const { uiState: state, uiDispatch: dispatch } = useContext(UIContext);

  const snaccClass = clsx(
    styles.snackbar,
    styles[`snackbar--${state.snackbar.variant}`],
    state.snackbar.visible && styles["snackbar--visible"],
    className
  );

  let Icon;
  switch (state.snackbar.variant) {
    case "success":
      Icon = MdCheckmarkCircleOutline;
      break;
    case "error":
      Icon = IosCloseCircleOutline;
      break;
    default:
      Icon = MdInformationCircleOutline;
      break;
  }

  useEffect(() => {
    if (state.snackbar.visible) {
      setTimeout(() => {
        dispatch({
          type: "HIDE_SNACKBAR",
        });
      }, state.snackbar.time);
    }
  });

  return (
    <div className={snaccClass}>
      <Typography component="p" variant="p">
        {state.snackbar.msg}
      </Typography>
      <Icon className={styles.snackbar__icon} />
    </div>
  );
};

export default Snackbar;
