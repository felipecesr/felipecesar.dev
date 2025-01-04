const Wave = () => (
  <svg
    className="wave"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 24 150 28 "
    preserveAspectRatio="none"
  >
    <defs>
      <path
        id="page-divide"
        fill="var(--wave-bg)"
        x="50"
        y="0"
        d="M-160 44c30 0 
    58-18 88-18s
    58 18 88 18 
    58-18 88-18 
    58 18 88 18
    v44h-352z"
      ></path>
    </defs>
    <g>
      <use xlinkHref="#page-divide" x="50" y="0" fill="var(--wave-bg)"></use>
    </g>
  </svg>
);

export default Wave;
