import PropTypes, { number, string } from "prop-types";

import Post, { PostSkeleton } from "../../molecules/Post";
import Typography from "../../atoms/Typography";

import styles from "./styles.module.scss";

const PostList = (props) => {
  const { posts } = props;
  // Renderiza os posts
  const renderPosts = () => {
    // Verifica se os posts foram carregados
    if (posts) {
      const postsList = posts.map((post) => {
        return <Post key={post.slug} post={post} />;
      });
      return postsList;
    }

    return (
      <>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </>
    );
  };

  return (
    <section className={styles["post-list"]}>
      <div className={styles["post-list__controller"]}>
        <div>
          <Typography
            className={styles["stories__controller__sub-title"]}
            component="p"
            variant="p"
          >
            Todas as
          </Typography>
          <Typography
            className={styles.stories__controller__title}
            component="p"
            variant="p"
          >
            Postagens
          </Typography>
        </div>
        <Typography
          className={styles.stories__controller__desc}
          component="p"
          variant="p"
        >
          Confira o restante das postagens da 5pots em ordem cronológica.
        </Typography>
      </div>
      <div className={styles["post-list__cards-container"]}>
        {renderPosts()}
      </div>
    </section>
  );
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      author: string,
      subTitles: PropTypes.arrayOf(string),
      _id: string,
      title: string,
      img: string,
      blurb: string,
      category: string,
      url: string,
      postedAt: string,
      __v: number,
      slug: string,
    })
  ).isRequired,
};

export default PostList;