import Header from '../components/Header/header'

export default function OtherLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}