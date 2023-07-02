
interface IHeaderProps {
  text:string
}
const Header: React.FC = () => {

  return (
    <header className="grid bg-surface items-center justify-center border-b-primary border-b">
      <h1 className="text-onSurface text-bold p-1 notranslate select-none">FixtureDB</h1>
    </header>
  );
}

export { Header };
