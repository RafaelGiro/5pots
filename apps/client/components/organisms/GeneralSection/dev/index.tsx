import dynamic from "next/dynamic";
import clsx from "clsx";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { useRef, useContext, useState, useEffect } from "react";
import MdCheckBoxOutlineBlank from "@meronex/icons/md/MdCheckBoxOutlineBlank";
import MdCheckBox from "@meronex/icons/md/MdCheckBox";

import { useSaveCallback, useSetData } from "../../../atoms/Editor/hooks";
import { options } from "../../../atoms/Editor/options";
import EditContext from "../../../templates/PostEdit/EditContext";
import SectionDev from "../../Section/dev";
import SectionTitleEdit from "../../../atoms/SectionTitle/dev";
import SectionIcon from "../../../atoms/Icons/SectionIcon";

import { GeneralSectionDevProps } from "./interfaces";

import styles from "../styles.module.scss";

const Editor = dynamic(() => import("../../../atoms/Editor/editor"), {
  ssr: false,
});

const GeneralSectionDev = (props: GeneralSectionDevProps) => {
  const { sectionIndex, content, title } = props;
  const [editor, setEditor] = useState<EditorJS | null>(null);
  const [unsaved, setUnsaved] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { postState, setPostState } = useContext(EditContext);
  useSetData(editor, content);

  const onSave = useSaveCallback(editor!);

  function onChange() {
    buttonRef.current?.click();
  }

  function handleSave(data?: OutputData) {
    if (data && postState) {
      const newPost = { ...postState };
      postState.sections[sectionIndex].content = data;
      setPostState(newPost);
    }
  }

  useEffect(() => {
    if (!unsaved) onSave().then((data) => handleSave(data));
  }, [unsaved]);

  return (
    <SectionDev className={styles["post-section"]} sectionIndex={sectionIndex}>
      <SectionTitleEdit title={title} sectionIndex={sectionIndex}>
        <SectionIcon section="normal" />
      </SectionTitleEdit>
      <div className={styles.general}>
        <Editor options={options} editorRef={setEditor} onChange={onChange} />
        <button
          className={clsx(
            styles["change-btn"],
            !unsaved && styles["change-btn--checked"]
          )}
          onClick={() => setUnsaved(false)}
        >
          {unsaved ? <MdCheckBoxOutlineBlank /> : <MdCheckBox />}
        </button>
        <button ref={buttonRef} onClick={() => setUnsaved(true)} />
      </div>
    </SectionDev>
  );
};

export default GeneralSectionDev;
