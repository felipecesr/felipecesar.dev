import { Wrapper } from "styles/utils";

export default function Main({ children }) {
  return (
    <main id="main">
      <Wrapper>{children}</Wrapper>
    </main>
  );
}
