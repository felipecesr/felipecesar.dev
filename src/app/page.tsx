import Header from "@/components/header";

const Home = () => {
  return (
    <div>
      <Header />
      <section>
        <p>Jan 2025 Workshop</p>
        <h2>Testes de Unidade em aplicações React</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, voluptas dolorem voluptatibus natus deleniti assumenda.</p>
        <a href="#">Inscreva-se</a>
      </section>
      <h2>Blog</h2>
      <ul>
        <li>Post 1</li>
        <li>Post 2</li>
        <li>Post 3</li>
      </ul>
      <h2>Cursos</h2>
      <ul>
        <li>
          <p>Curso 1</p>
          <a href="#">Acessar</a>
        </li>
        <li>
          <p>Curso 2</p>
          <a href="#">Acessar</a>
        </li>
        <li>
          <p>Curso 3</p>
          <a href="#">Comprar na Udemy</a>
        </li>
      </ul>
    </div>
  );
};

export default Home;
