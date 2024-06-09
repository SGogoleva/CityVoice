import React, { useRef, useCallback, useEffect } from 'react';

interface InfiniteScrollProps {
  loadMore: () => void;
  loading: boolean;
  hasMore: boolean;
  children: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ loadMore, loading, hasMore, children }) => {
  const observer = useRef<IntersectionObserver>();
  
  const lastElementRef = useCallback((node: HTMLDivElement | null)  => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  return (
    <div>
      {children}
      <div ref={lastElementRef}></div>
    </div>
  );
};

export default InfiniteScroll;
