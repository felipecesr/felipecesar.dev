import styled from "styled-components";

export const CommentsWrapper = styled.section`
  margin: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.15);

  h2 {
    font-size: 1.99326rem;
    margin-top: 1.45rem;
    margin-bottom: 1.45rem;
  }

  iframe[src="ads-iframe"] {
    display: none;
  }

  #disqus_thread {
    a {
      color: #1fa1f2 !important;
    }
  }
`;
