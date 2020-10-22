import ReactDisqusComments from "react-disqus-comments";
import * as S from "./styles";

const Comments = ({ url, title }) => {
  const completeUrl = "https://felipecesar.dev" + "/" + url;

  return (
    <S.CommentsWrapper>
      <h2>Comentários</h2>
      <ReactDisqusComments
        shortname="felipecesar"
        identifier={completeUrl}
        title={title}
        url={completeUrl}
      />
    </S.CommentsWrapper>
  );
};

export default Comments;
