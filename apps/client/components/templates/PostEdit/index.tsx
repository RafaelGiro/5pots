import { useContext, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import MdDashboard from "@meronex/icons/md/MdDashboard";
import MdDeveloperMode from "@meronex/icons/md/MdDeveloperMode";

import PostHeaderDev from "./PostHeaderDev";
import PostBodyDev from "./PostBodyDev";
import SavePostButton from "./SavePostButton";
import EditContext from "./EditContext";
import UIContext from "../../../core/contexts/UIContext";
import debouce from "../../../core/helpers/debouce";
import api from "../../../core/services/api";
import { defaultChampionChange } from "./helpers";

import { PostEditProps } from "./interfaces";

import postViewStyles from "../PostView/styles.module.scss";
import styles from "./styles.module.scss";

const PostEdit = (props: PostEditProps) => {
  const { post, champions, allChampions } = props;
  const [postState, setPostState] = useState(post);
  const [jsonMode, setJsonMode] = useState(false);
  const router = useRouter();
  const { slug } = router.query;
  const { uiDispatch: dispatch } = useContext(UIContext);
  const {
    category,
    title,
    blurb,
    img,
    author,
    url,
    sections,
    subTitles,
    postedAt,
    slug: postSlug,
    type,
  } = postState;
  const championSectionIndex = postState.sections.findIndex(
    (section) => section.champions
  );

  function handleChange(key: string, value: string) {
    const newPost = { ...postState };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    newPost[key] = value;

    setPostState(newPost);
  }

  function handleUpdate() {
    const token = localStorage.getItem("token");

    dispatch({ type: "OPEN_LOADING" });

    api
      .put(
        `/posts/${slug}`,
        { post: postState },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        setPostState(res.data);

        if (res.data.slug !== slug) {
          router.push(`/posts/${res.data.slug}/edit`);
        }
      })
      .catch((err) => {
        dispatch({
          type: "SHOW_SNACKBAR",
          snackbar: {
            msg: err.response.data.message || "Deu ruim mano.",
            variant: "error",
          },
        });
      })
      .finally(() => {
        dispatch({ type: "CLOSE_LOADING" });
      });
  }

  const hasIntro =
    sections[0]?.content && sections[0]?.content.slice(0, 3) === "<p>"
      ? ["Introdução", ...subTitles]
      : subTitles;

  return (
    <article
      className={clsx(
        postViewStyles["post-view"],
        postViewStyles[post.category]
      )}
    >
      <EditContext.Provider
        value={{
          json: jsonMode,
          postState,
          setPostState,
        }}
      >
        <PostHeaderDev
          category={category}
          title={title}
          blurb={blurb}
          img={img}
          author={author}
          url={url}
          postedAt={postedAt}
          handleChange={debouce(handleChange, 400)}
          slug={postSlug}
          type={type}
        />
        <PostBodyDev
          sections={sections}
          titles={hasIntro}
          title={title}
          champions={champions}
          type={type}
          allChampions={allChampions}
        />
        <SavePostButton hasChanged={true} handleUpdate={handleUpdate} />
        <div className={styles["json-mode"]}>
          <MdDeveloperMode
            className={clsx(jsonMode && styles["json-mode--active"])}
            onClick={() => setJsonMode(true)}
          />
          <MdDashboard
            className={clsx(!jsonMode && styles["json-mode--active"])}
            onClick={() => setJsonMode(false)}
          />
        </div>
      </EditContext.Provider>
    </article>
  );
};

export default PostEdit;
