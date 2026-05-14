import { useState, useEffect } from 'react';

export function useHelpFlag() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('--help') || params.has('help')) {
      setShow(true);
    }
  }, []);

  return { show, setShow };
}
