import ReactDisqusComments from "react-disqus-comments";
import styles from "./styles.module.scss";

const Comments = ({ url, title }) => {
  const completeUrl = "https://felipecesar.dev" + "/" + url;

  return (
    <section className={styles.comments}>
      <h2>Comentários</h2>
      <ReactDisqusComments
        shortname="felipecesar"
        identifier={completeUrl}
        title={title}
        url={completeUrl}
      />
    </section>
  );
};

export default Comments;
