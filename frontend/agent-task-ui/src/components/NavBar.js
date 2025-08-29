export default function NavBar({ title }) {
  return (
    <div style={{
      height: '60px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #ccc',
      display: 'flex',
      alignItems: 'center',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <h2 style={{ margin: 0 }}>{title}</h2>
    </div>
  );
}