import { useEffect, useState } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="preloader" className={visible ? '' : 'hidden'}>
      <div className="loader-circle" />
      <span className="loader-text">JaspuraHub</span>
    </div>
  );
}
