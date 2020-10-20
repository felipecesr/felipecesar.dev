import Wrapper from "components/Wrapper";

export default function Main({ children }) {
  return (
    <main id="main">
      <Wrapper>{children}</Wrapper>
    </main>
  );
}
