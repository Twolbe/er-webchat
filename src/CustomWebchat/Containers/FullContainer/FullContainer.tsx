import { KeycloakContext } from "@/index";
import { useContext } from "react";
import { ContainerProps } from "../interface";
import s from "./FullContainer.module.css";

const FullContainer = ({ header, workArea, input }: ContainerProps) => {
  const { background } = useContext(KeycloakContext);

  return (
    <div className={s["wrapper"]}>
      {header}
      <div className={s["work-area-and-input-wrapper"]} style={{ background }}>
        {workArea}
        <div className={s["input-wrapper"]}>{input}</div>
      </div>
    </div>
  );
};

export default FullContainer;
