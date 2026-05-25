const getRand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const port = getRand(1000, 9999);

export default function App() {
  return <h1>{port}</h1>;
}
