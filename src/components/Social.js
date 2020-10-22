import styled from "styled-components";

const Wrapper = styled.ul`
  display: flex;
  font-family: "Source Code Pro", monospace;
  font-weight: 600;
  list-style-type: none;

  a {
    opacity: 0.5;
    text-decoration: none;

    &:hover {
      opacity: 1;
    }
  }

  li + li {
    margin-left: 1.75em;
  }
`;

export default function Social() {
  const socialNetworks = {
    Twitter: "https://twitter.com/felipecesr",
    Github: "https://github.com/felipecesr",
    LinkedIn: "https://www.linkedin.com/in/felipecesr/",
  };

  return (
    <Wrapper>
      {Object.keys(socialNetworks).map((key) => (
        <li key={key}>
          <a href={socialNetworks[key]} target="_blank" rel="noopener">
            {key}
          </a>
        </li>
      ))}
    </Wrapper>
  );
}
